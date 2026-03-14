import { useState, useEffect, useCallback, useRef } from 'react';
import {
  patternMatrices, relationalReasoning, conceptualLinks,
  wordDepth, memorySequences, quantitativeReasoning,
  speedMatch, subtests
} from '../data/itemBank';
import { conceptualLinksTR, wordDepthTR, relationalReasoningTR } from '../data/itemBankTR';
import { subtestTransKeys } from '../data/translations';
import {
  scoreSubtests, calculateCompositeIQ, calculateFactorScores,
  scoreSpeedMatch, generateVerificationCode, generateTestId, thetaToIQ
} from '../utils/scoring';
import {
  trackTestStart, trackSubtestStart, trackSubtestComplete,
  trackTestComplete, trackTestQuit
} from '../utils/tracking';

const SUBTEST_ORDER = [
  'pattern_matrices', 'relational_reasoning', 'conceptual_links',
  'word_depth', 'memory_sequences', 'quantitative_reasoning', 'speed_match'
];

function getItemData(lang) {
  return {
    pattern_matrices: patternMatrices,
    relational_reasoning: lang === 'tr' ? relationalReasoningTR : relationalReasoning,
    conceptual_links: lang === 'tr' ? conceptualLinksTR : conceptualLinks,
    word_depth: lang === 'tr' ? wordDepthTR : wordDepth,
    quantitative_reasoning: quantitativeReasoning,
  };
}

const WEIGHTS = {
  pattern_matrices: 0.20,
  relational_reasoning: 0.20,
  conceptual_links: 0.15,
  word_depth: 0.10,
  memory_sequences: 0.15,
  quantitative_reasoning: 0.10,
  speed_match: 0.10,
};

// Shape rendering for pattern matrices
function renderShape(desc) {
  const baseShapes = ['circle', 'square', 'triangle', 'diamond'];
  const colorMap = {
    red: '#ef4444', blue: '#3b82f6', green: '#10b981',
    default_circle: '#6366f1', default_square: '#10b981',
    default_triangle: '#f59e0b', default_diamond: '#ef4444',
  };
  const sizeScales = { small: 0.6, medium: 0.8, large: 1.0 };

  // Dot patterns
  const dotMatch = desc.match(/^(\d)dot$/);
  if (dotMatch) return renderDots(parseInt(dotMatch[1]));

  // Line counts: "2lines", "3lines", "4lines"
  const lineMatch = desc.match(/^(\d)lines$/);
  if (lineMatch) return renderLines(parseInt(lineMatch[1]));

  // Compound: "X-inside-Y"
  const insideMatch = desc.match(/^(.+)-inside-(.+)$/);
  if (insideMatch) {
    const innerDesc = insideMatch[1];
    const outerDesc = insideMatch[2];
    // Parse size from compound prefix (e.g. "small-circle-inside-square" → size on inner)
    const innerParsed = parseShapeDesc(innerDesc);
    const outerParsed = parseShapeDesc(outerDesc);
    return renderCompound(outerParsed, innerParsed);
  }

  // Parse composite descriptions (size, color, fill, rotation, shape)
  const parsed = parseShapeDesc(desc);
  if (parsed.shape) {
    return renderSVGShapeAdvanced(parsed);
  }

  // Legacy: lines with prefix (filled-2lines, dashed-2lines, 2lines-cross, etc.)
  const prefixLineMatch = desc.match(/(\d)lines/);
  if (prefixLineMatch) return renderLines(parseInt(prefixLineMatch[1]));

  // Fallback: show text
  return <span style={{ fontSize: 11, color: '#94a3b8' }}>{desc}</span>;
}

// Parse a shape description string into { shape, color, size, fill, rotated }
function parseShapeDesc(desc) {
  const baseShapes = ['circle', 'square', 'triangle', 'diamond'];
  const colorMap = { red: '#ef4444', blue: '#3b82f6', green: '#10b981' };
  const defaultColors = {
    circle: '#6366f1', square: '#10b981', triangle: '#f59e0b', diamond: '#ef4444',
  };
  const sizeScales = { small: 0.6, medium: 0.8, large: 1.0 };

  const parts = desc.split('-');
  let shape = null, color = null, size = 1.0, fill = 'filled', rotated = false;

  for (const part of parts) {
    if (baseShapes.includes(part)) shape = part;
    else if (colorMap[part]) color = colorMap[part];
    else if (sizeScales[part] !== undefined) size = sizeScales[part];
    else if (part === 'filled' || part === 'hollow' || part === 'striped') fill = part;
    else if (part === 'rotated') rotated = true;
  }

  if (shape && !color) color = defaultColors[shape];
  return { shape, color, size, fill, rotated };
}

function renderSVGShapeAdvanced({ shape, color, size, fill, rotated }) {
  const svgSize = 40;
  const scale = size;
  const rotation = rotated ? 45 : 0;

  // Build a unique id for striped pattern
  const patternId = `stripe-${shape}-${Math.random().toString(36).substr(2, 5)}`;

  const fillAttr = fill === 'filled' ? color
    : fill === 'hollow' ? 'none'
    : `url(#${patternId})`;
  const strokeAttr = fill === 'hollow' ? color : (fill === 'striped' ? color : 'none');
  const strokeWidth = fill === 'hollow' ? 2.5 : (fill === 'striped' ? 1.5 : 0);

  return (
    <svg width={svgSize} height={svgSize} viewBox="0 0 40 40">
      {fill === 'striped' && (
        <defs>
          <pattern id={patternId} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke={color} strokeWidth="2" />
          </pattern>
        </defs>
      )}
      <g transform={`translate(20,20) rotate(${rotation}) scale(${scale}) translate(-20,-20)`}>
        {shape === 'circle' && <circle cx="20" cy="20" r="14" fill={fillAttr} stroke={strokeAttr} strokeWidth={strokeWidth} />}
        {shape === 'square' && <rect x="6" y="6" width="28" height="28" fill={fillAttr} stroke={strokeAttr} strokeWidth={strokeWidth} />}
        {shape === 'triangle' && <polygon points="20,4 36,36 4,36" fill={fillAttr} stroke={strokeAttr} strokeWidth={strokeWidth} />}
        {shape === 'diamond' && <polygon points="20,4 36,20 20,36 4,20" fill={fillAttr} stroke={strokeAttr} strokeWidth={strokeWidth} />}
      </g>
    </svg>
  );
}

// Render X-inside-Y compound shape
function renderCompound(outerParsed, innerParsed) {
  const outerColor = outerParsed.color || '#6366f1';
  const innerColor = innerParsed.color || '#ef4444';
  const outerShape = outerParsed.shape;
  const innerShape = innerParsed.shape;

  function shapeElements(s, cx, cy, r, fillC) {
    if (s === 'circle') return <circle cx={cx} cy={cy} r={r} fill={fillC} />;
    const half = r;
    if (s === 'square') return <rect x={cx - half} y={cy - half} width={half * 2} height={half * 2} fill={fillC} />;
    if (s === 'triangle') return <polygon points={`${cx},${cy - r} ${cx + r},${cy + r} ${cx - r},${cy + r}`} fill={fillC} />;
    if (s === 'diamond') return <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} fill={fillC} />;
    return null;
  }

  const outerScale = outerParsed.size || 1.0;
  const innerScale = innerParsed.size || 1.0;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <g transform={`translate(20,20) scale(${outerScale}) translate(-20,-20)`}>
        {shapeElements(outerShape, 20, 20, 16, outerColor)}
      </g>
      <g transform={`translate(20,20) scale(${innerScale * 0.5}) translate(-20,-20)`}>
        {shapeElements(innerShape, 20, 20, 14, innerColor)}
      </g>
    </svg>
  );
}

// Render N lines radiating from center
function renderLines(count) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const angle = (i * 180) / count;
    const rad = (angle * Math.PI) / 180;
    const x1 = 20 + 14 * Math.cos(rad);
    const y1 = 20 + 14 * Math.sin(rad);
    const x2 = 20 - 14 * Math.cos(rad);
    const y2 = 20 - 14 * Math.sin(rad);
    lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />);
  }
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {lines}
    </svg>
  );
}

// Legacy simple renderer (kept for any direct calls)
function renderSVGShape(shape, color) {
  return renderSVGShapeAdvanced({ shape, color, size: 1.0, fill: 'filled', rotated: false });
}

function renderDots(count) {
  const positions = {
    1: [[20, 20]],
    2: [[14, 20], [26, 20]],
    3: [[20, 10], [10, 28], [30, 28]],
    4: [[12, 12], [28, 12], [12, 28], [28, 28]],
    5: [[12, 12], [28, 12], [20, 20], [12, 28], [28, 28]],
    6: [[12, 10], [28, 10], [12, 20], [28, 20], [12, 30], [28, 30]],
  };
  const dots = positions[Math.min(count, 6)] || positions[6];
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#818cf8" />
      ))}
    </svg>
  );
}

export default function TestRunner({ t, lang, onComplete, onQuit }) {
  const ITEM_DATA = getItemData(lang);
  const [phase, setPhase] = useState('intro'); // intro, item, memory-show, memory-input, speed, done
  const [subtestIndex, setSubtestIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime] = useState(() => {
    trackTestStart(lang);
    return Date.now();
  });
  const [itemStartTime, setItemStartTime] = useState(Date.now());

  // Memory sequence state
  const [memoryPhase, setMemoryPhase] = useState('show'); // show, input
  const [memoryInput, setMemoryInput] = useState('');
  const [memoryDigitIndex, setMemoryDigitIndex] = useState(0);

  // Speed match state
  const [speedTrials, setSpeedTrials] = useState([]);
  const [speedStartTime, setSpeedStartTime] = useState(0);
  const [speedTarget, setSpeedTarget] = useState(null);
  const [speedOptions, setSpeedOptions] = useState([]);
  const [speedTrialIndex, setSpeedTrialIndex] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const currentSubtestId = SUBTEST_ORDER[subtestIndex];
  const currentSubtest = subtests.find(s => s.id === currentSubtestId);

  const handleQuit = useCallback(() => {
    const completed = SUBTEST_ORDER.slice(0, subtestIndex);
    trackTestQuit(currentSubtestId, completed);
    onQuit();
  }, [subtestIndex, currentSubtestId, onQuit]);

  // Timer
  useEffect(() => {
    if (phase === 'item' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timerRef.current);
    }
    if (phase === 'item' && timeLeft === 0 && currentSubtestId !== 'memory_sequences' && currentSubtestId !== 'speed_match') {
      handleAnswer(-1); // time's up
    }
  }, [phase, timeLeft]);

  // Memory digit display
  useEffect(() => {
    if (phase === 'memory-show' && currentSubtestId === 'memory_sequences') {
      const item = memorySequences[itemIndex];
      if (memoryDigitIndex < item.sequence.length) {
        const timer = setTimeout(() => {
          setMemoryDigitIndex(i => i + 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // All digits shown, wait a beat then switch to input
        const timer = setTimeout(() => {
          setPhase('memory-input');
          setMemoryInput('');
          setTimeout(() => {
            if (Array.isArray(inputRef.current)) inputRef.current[0]?.focus();
            else inputRef.current?.focus();
          }, 100);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, memoryDigitIndex, itemIndex, currentSubtestId]);

  // Speed match timer
  useEffect(() => {
    if (phase === 'speed') {
      const total = speedMatch.timeLimit;
      const elapsed = Math.floor((Date.now() - speedStartTime) / 1000);
      const remaining = total - elapsed;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        finishSpeedMatch();
        return;
      }

      const timer = setTimeout(() => {
        const newElapsed = Math.floor((Date.now() - speedStartTime) / 1000);
        setTimeLeft(total - newElapsed);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, timeLeft, speedStartTime]);

  const totalItems = SUBTEST_ORDER.reduce((sum, id) => {
    const st = subtests.find(s => s.id === id);
    return sum + (st?.itemCount || 0);
  }, 0);

  const completedItems = responses.length + speedTrials.length;
  const progress = (completedItems / totalItems) * 100;

  function startSubtest() {
    setItemIndex(0);
    setItemStartTime(Date.now());
    trackSubtestStart(currentSubtestId, lang);

    if (currentSubtestId === 'memory_sequences') {
      setMemoryDigitIndex(0);
      setPhase('memory-show');
    } else if (currentSubtestId === 'speed_match') {
      startSpeedMatch();
    } else {
      const items = ITEM_DATA[currentSubtestId];
      if (items && items[0]) {
        setTimeLeft(items[0].timeLimit || 60);
      }
      setPhase('item');
    }
  }

  function handleAnswer(selectedIndex) {
    const items = ITEM_DATA[currentSubtestId];
    const item = items[itemIndex];
    const isCorrect = selectedIndex === item.correct;

    const response = {
      subtestId: currentSubtestId,
      itemId: item.id,
      difficulty: item.difficulty,
      discrimination: item.discrimination,
      correct: isCorrect,
      responseTime: Date.now() - itemStartTime,
      selectedIndex,
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Next item or next subtest
    if (itemIndex + 1 < items.length) {
      setItemIndex(itemIndex + 1);
      setItemStartTime(Date.now());
      setTimeLeft(items[itemIndex + 1].timeLimit || 60);
    } else {
      moveToNextSubtest(newResponses);
    }
  }

  function handleMemorySubmit() {
    const item = memorySequences[itemIndex];
    const expectedSequence = item.type === 'backward'
      ? [...item.sequence].reverse()
      : item.sequence;
    const userSequence = memoryInput.split('').map(Number);
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(expectedSequence);

    const response = {
      subtestId: 'memory_sequences',
      itemId: item.id,
      difficulty: item.difficulty,
      discrimination: item.discrimination,
      correct: isCorrect,
      responseTime: Date.now() - itemStartTime,
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    if (itemIndex + 1 < memorySequences.length) {
      setItemIndex(itemIndex + 1);
      setMemoryDigitIndex(0);
      setMemoryInput('');
      inputRef.current = [];
      setItemStartTime(Date.now());
      setPhase('memory-show');
    } else {
      moveToNextSubtest(newResponses);
    }
  }

  function startSpeedMatch() {
    setSpeedTrials([]);
    setSpeedTrialIndex(0);
    setSpeedStartTime(Date.now());
    setTimeLeft(speedMatch.timeLimit);
    generateSpeedTrial(0);
    setPhase('speed');
  }

  function generateSpeedTrial(index) {
    const symbols = speedMatch.symbols;
    const target = symbols[Math.floor(Math.random() * symbols.length)];
    const correctPos = Math.floor(Math.random() * 4);
    const opts = [];
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) {
        opts.push(target);
      } else {
        let s;
        do {
          s = symbols[Math.floor(Math.random() * symbols.length)];
        } while (s === target || opts.includes(s));
        opts.push(s);
      }
    }
    setSpeedTarget(target);
    setSpeedOptions(opts);
    setSpeedTrialIndex(index);
    setItemStartTime(Date.now());
  }

  function handleSpeedAnswer(selectedIndex) {
    const isCorrect = speedOptions[selectedIndex] === speedTarget;
    const trial = {
      correct: isCorrect,
      responseTime: Date.now() - itemStartTime,
    };

    const newTrials = [...speedTrials, trial];
    setSpeedTrials(newTrials);

    if (newTrials.length >= speedMatch.totalTrials) {
      finishSpeedMatch(newTrials);
    } else {
      generateSpeedTrial(newTrials.length);
    }
  }

  function finishSpeedMatch(trials) {
    const finalTrials = trials || speedTrials;
    const totalTime = Date.now() - speedStartTime;
    const speedResult = scoreSpeedMatch(finalTrials, totalTime);

    // Add speed match as a response for composite scoring
    const speedResponse = {
      subtestId: 'speed_match',
      itemId: 'speed_composite',
      difficulty: 0,
      discrimination: 1.5,
      correct: speedResult.theta > 0,
      theta: speedResult.theta,
    };

    const newResponses = [...responses, speedResponse];
    setResponses(newResponses);
    moveToNextSubtest(newResponses, speedResult);
  }

  function moveToNextSubtest(currentResponses, speedResult) {
    // Track completed subtest
    const justFinished = currentSubtestId;
    const subtestResponses = currentResponses.filter(r => r.subtestId === justFinished);
    if (subtestResponses.length > 0 && justFinished !== 'speed_match') {
      const correct = subtestResponses.filter(r => r.correct).length;
      trackSubtestComplete(justFinished, {
        iq: 0, theta: 0, correct, total: subtestResponses.length,
        percentage: Math.round((correct / subtestResponses.length) * 100),
      });
    } else if (speedResult) {
      trackSubtestComplete('speed_match', {
        iq: thetaToIQ(speedResult.theta), theta: speedResult.theta,
        correct: speedResult.correct, total: speedResult.total,
        percentage: speedResult.accuracy,
      });
    }

    if (subtestIndex + 1 < SUBTEST_ORDER.length) {
      setSubtestIndex(subtestIndex + 1);
      setPhase('intro');
    } else {
      // All done — calculate results
      finishTest(currentResponses, speedResult);
    }
  }

  function finishTest(allResponses, speedResult) {
    const subtestScores = scoreSubtests(allResponses.filter(r => r.subtestId !== 'speed_match'));

    // Add speed match score
    if (speedResult) {
      subtestScores.speed_match = {
        theta: speedResult.theta,
        iq: thetaToIQ(speedResult.theta),
        correct: speedResult.correct,
        total: speedResult.total,
        percentage: speedResult.accuracy,
        avgTimeMs: speedResult.avgTimeMs,
      };
    }

    const composite = calculateCompositeIQ(subtestScores, WEIGHTS);
    const factorScores = calculateFactorScores(subtestScores);
    const testId = generateTestId();
    const duration = formatDuration(Date.now() - startTime);
    const date = new Date().toISOString().split('T')[0];

    const results = {
      testId,
      compositeIQ: composite.iq,
      compositeTheta: composite.theta,
      subtestScores,
      factorScores,
      date,
      duration,
    };

    results.verificationCode = generateVerificationCode(results);

    results.lang = lang;
    trackTestComplete(results);

    // Submit results to server via fetch (reliable, not sendBeacon)
    try {
      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
        keepalive: true,
      }).catch(() => {});
    } catch (e) {}

    onComplete(results);
  }

  function formatDuration(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  }

  // Render based on phase
  if (phase === 'intro') {
    return (
      <div className="test-runner">
        <TestHeader
          t={t}
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={handleQuit}
          itemText={`${t.subtestOf} ${subtestIndex + 1}/${SUBTEST_ORDER.length}`}
        />
        <div className="test-body">
          <div className="subtest-intro">
            <div className="subtest-intro-icon">{currentSubtest?.icon}</div>
            <div className="subtest-intro-name">{t[subtestTransKeys[currentSubtestId]]?.name || currentSubtest?.name}</div>
            <div className="subtest-intro-factor">{currentSubtest?.factor}</div>
            <div className="subtest-intro-desc">{t[subtestTransKeys[currentSubtestId]]?.desc || currentSubtest?.description}</div>
            <div className="subtest-intro-meta">
              <span>{currentSubtest?.itemCount} {t.items}</span>
              <span>~{currentSubtest?.estimatedTime}</span>
            </div>
            {currentSubtestId === 'memory_sequences' && (
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
                {t.memoryInstructions}
              </p>
            )}
            {currentSubtestId === 'speed_match' && (
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
                {t.speedInstructions} {speedMatch.timeLimit} {t.speedTime} {speedMatch.totalTrials} {t.speedTrials}.
              </p>
            )}
            <button className="btn-primary" onClick={startSubtest}>
              {t.begin}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard item (PM, RR, CL, WD, QR)
  if (phase === 'item') {
    const items = ITEM_DATA[currentSubtestId];
    const item = items[itemIndex];

    return (
      <div className="test-runner">
        <TestHeader
          t={t}
          subtest={currentSubtest}
          progress={progress}
          timeLeft={timeLeft}
          onQuit={handleQuit}
          itemText={`${itemIndex + 1}/${items.length}`}
        />
        <div className="test-body">
          {/* Pattern Matrix grid */}
          {currentSubtestId === 'pattern_matrices' && item.grid && (
            <div className="matrix-grid">
              {item.grid.flat().map((cell, i) => (
                <div key={i} className={`matrix-cell ${cell === '?' ? 'missing' : ''}`}>
                  {cell !== '?' && renderShape(cell)}
                </div>
              ))}
            </div>
          )}

          {/* Premise for relational reasoning */}
          {item.premise && (
            <div className="test-premise">{item.premise}</div>
          )}

          {/* Analogy */}
          {item.analogy && (
            <div className="test-question">{item.analogy}</div>
          )}

          {/* Question */}
          {item.question && (
            <div className="test-question">{item.question}</div>
          )}

          {/* Sequence */}
          {item.sequence && typeof item.sequence === 'string' && (
            <div className="test-question" style={{ fontFamily: 'var(--mono)' }}>
              {item.sequence}
            </div>
          )}

          {/* Options */}
          <div className="test-options">
            {item.options.map((opt, i) => (
              <button
                key={i}
                className="test-option"
                onClick={() => handleAnswer(i)}
              >
                <span className="test-option-key">{String.fromCharCode(65 + i)}</span>
                {currentSubtestId === 'pattern_matrices' ? renderShape(opt) : opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Memory - show phase
  if (phase === 'memory-show') {
    const item = memorySequences[itemIndex];
    return (
      <div className="test-runner">
        <TestHeader
          t={t}
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={handleQuit}
          itemText={`${itemIndex + 1}/${memorySequences.length}`}
        />
        <div className="test-body">
          <div className="memory-instruction">
            {item.type === 'backward' ? t.memorizeBackward : t.memorizeForward}
          </div>
          <div className="memory-display">
            {item.sequence.slice(0, memoryDigitIndex).map((digit, i) => (
              <div key={i} className="memory-digit">{digit}</div>
            ))}
          </div>
          {item.type === 'backward' && (
            <div style={{ color: 'var(--warning)', fontSize: 13, marginTop: 16 }}>
              {t.backward}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Memory - input phase
  if (phase === 'memory-input') {
    const item = memorySequences[itemIndex];
    return (
      <div className="test-runner">
        <TestHeader
          t={t}
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={handleQuit}
          itemText={`${itemIndex + 1}/${memorySequences.length}`}
        />
        <div className="test-body">
          <div className="memory-instruction">
            {item.type === 'backward'
              ? `${item.sequence.length} ${t.typeBackward}`
              : `${item.sequence.length} ${t.typeForward}`
            }
          </div>
          <div className="memory-input-area">
            <div className="memory-boxes">
              {Array.from({ length: item.sequence.length }, (_, i) => (
                <input
                  key={i}
                  ref={el => {
                    if (!inputRef.current) inputRef.current = [];
                    inputRef.current[i] = el;
                  }}
                  className="memory-box"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={memoryInput[i] || ''}
                  autoFocus={i === 0}
                  onChange={e => {
                    const digit = e.target.value.replace(/[^0-9]/g, '');
                    if (!digit) return;
                    setMemoryInput(prev => {
                      const arr = prev.split('');
                      arr[i] = digit;
                      return arr.join('');
                    });
                    // Auto-advance to next box
                    if (digit && i < item.sequence.length - 1 && inputRef.current?.[i + 1]) {
                      inputRef.current[i + 1].focus();
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace' && !memoryInput[i]) {
                      // Move to previous box on backspace if current is empty
                      if (i > 0 && inputRef.current?.[i - 1]) {
                        setMemoryInput(prev => {
                          const arr = prev.split('');
                          arr[i - 1] = '';
                          return arr.join('').replace(/\s+$/, '');
                        });
                        inputRef.current[i - 1].focus();
                      }
                    } else if (e.key === 'Enter') {
                      const filled = memoryInput.replace(/[^0-9]/g, '');
                      if (filled.length === item.sequence.length) {
                        handleMemorySubmit();
                      }
                    }
                  }}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
            <button
              className="btn-primary"
              disabled={memoryInput.replace(/[^0-9]/g, '').length !== item.sequence.length}
              onClick={handleMemorySubmit}
              style={{ opacity: memoryInput.replace(/[^0-9]/g, '').length === item.sequence.length ? 1 : 0.5 }}
            >
              {t.submit}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Speed match
  if (phase === 'speed') {
    return (
      <div className="test-runner">
        <TestHeader
          t={t}
          subtest={currentSubtest}
          progress={progress}
          timeLeft={timeLeft}
          onQuit={handleQuit}
          itemText={`${speedTrialIndex + 1}/${speedMatch.totalTrials}`}
        />
        <div className="test-body">
          <div className="speed-target">{speedTarget}</div>
          <div className="speed-options">
            {speedOptions.map((sym, i) => (
              <button
                key={i}
                className="speed-option"
                onClick={() => handleSpeedAnswer(i)}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function TestHeader({ t, subtest, progress, timeLeft, onQuit, itemText }) {
  const timerClass = timeLeft !== null
    ? timeLeft <= 5 ? 'test-timer danger'
    : timeLeft <= 15 ? 'test-timer warning'
    : 'test-timer'
    : 'test-timer';

  return (
    <>
      <div className="test-header">
        <div className="test-header-left">
          <span className="test-subtest-name">{subtest?.nameShort}</span>
          <span className="test-progress-text">{itemText}</span>
        </div>
        {timeLeft !== null && (
          <span className={timerClass}>{timeLeft}s</span>
        )}
        <button className="test-quit" onClick={onQuit}>{t?.quit || 'Quit'}</button>
      </div>
      <div className="test-progress-bar">
        <div className="test-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}
