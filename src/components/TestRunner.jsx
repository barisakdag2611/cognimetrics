import { useState, useEffect, useCallback, useRef } from 'react';
import {
  patternMatrices, relationalReasoning, conceptualLinks,
  wordDepth, memorySequences, quantitativeReasoning,
  speedMatch, subtests
} from '../data/itemBank';
import {
  scoreSubtests, calculateCompositeIQ, calculateFactorScores,
  scoreSpeedMatch, generateVerificationCode, generateTestId, thetaToIQ
} from '../utils/scoring';

const SUBTEST_ORDER = [
  'pattern_matrices', 'relational_reasoning', 'conceptual_links',
  'word_depth', 'memory_sequences', 'quantitative_reasoning', 'speed_match'
];

const ITEM_DATA = {
  pattern_matrices: patternMatrices,
  relational_reasoning: relationalReasoning,
  conceptual_links: conceptualLinks,
  word_depth: wordDepth,
  quantitative_reasoning: quantitativeReasoning,
};

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
  const shapes = {
    'circle': { shape: 'circle', color: '#6366f1' },
    'square': { shape: 'square', color: '#10b981' },
    'triangle': { shape: 'triangle', color: '#f59e0b' },
    'diamond': { shape: 'diamond', color: '#ef4444' },
  };

  // Parse composite descriptions
  const parts = desc.split('-');

  // Simple shape names
  if (shapes[desc]) {
    return renderSVGShape(shapes[desc].shape, shapes[desc].color);
  }

  // Dot patterns
  const dotMatch = desc.match(/^(\d)dot$/);
  if (dotMatch) {
    const count = parseInt(dotMatch[1]);
    return renderDots(count);
  }

  // Color-shape combos
  const colorShapeMatch = desc.match(/^(red|blue|green)-(circle|square|triangle)$/);
  if (colorShapeMatch) {
    const colors = { red: '#ef4444', blue: '#3b82f6', green: '#10b981' };
    return renderSVGShape(colorShapeMatch[2], colors[colorShapeMatch[1]]);
  }

  // Fallback: show text
  return <span style={{ fontSize: 11, color: '#94a3b8' }}>{desc}</span>;
}

function renderSVGShape(shape, color) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {shape === 'circle' && <circle cx="20" cy="20" r="14" fill={color} />}
      {shape === 'square' && <rect x="6" y="6" width="28" height="28" fill={color} />}
      {shape === 'triangle' && <polygon points="20,4 36,36 4,36" fill={color} />}
      {shape === 'diamond' && <polygon points="20,4 36,20 20,36 4,20" fill={color} />}
    </svg>
  );
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

export default function TestRunner({ onComplete, onQuit }) {
  const [phase, setPhase] = useState('intro'); // intro, item, memory-show, memory-input, speed, done
  const [subtestIndex, setSubtestIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime] = useState(Date.now());
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
          setTimeout(() => inputRef.current?.focus(), 100);
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
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={onQuit}
          itemText={`Subtest ${subtestIndex + 1}/${SUBTEST_ORDER.length}`}
        />
        <div className="test-body">
          <div className="subtest-intro">
            <div className="subtest-intro-icon">{currentSubtest?.icon}</div>
            <div className="subtest-intro-name">{currentSubtest?.name}</div>
            <div className="subtest-intro-factor">{currentSubtest?.factor}</div>
            <div className="subtest-intro-desc">{currentSubtest?.description}</div>
            <div className="subtest-intro-meta">
              <span>{currentSubtest?.itemCount} items</span>
              <span>~{currentSubtest?.estimatedTime}</span>
            </div>
            {currentSubtestId === 'memory_sequences' && (
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
                Numbers will appear one at a time. Memorize them, then type them back.
                For "backward" items, type the sequence in reverse order.
              </p>
            )}
            {currentSubtestId === 'speed_match' && (
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
                Match the target symbol as quickly and accurately as possible.
                You have {speedMatch.timeLimit} seconds for {speedMatch.totalTrials} trials.
              </p>
            )}
            <button className="btn-primary" onClick={startSubtest}>
              Begin
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
          subtest={currentSubtest}
          progress={progress}
          timeLeft={timeLeft}
          onQuit={onQuit}
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
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={onQuit}
          itemText={`${itemIndex + 1}/${memorySequences.length}`}
        />
        <div className="test-body">
          <div className="memory-instruction">
            {item.type === 'backward' ? 'Memorize, then type BACKWARDS' : 'Memorize the sequence'}
          </div>
          <div className="memory-display">
            {item.sequence.slice(0, memoryDigitIndex).map((digit, i) => (
              <div key={i} className="memory-digit">{digit}</div>
            ))}
          </div>
          {item.type === 'backward' && (
            <div style={{ color: 'var(--warning)', fontSize: 13, marginTop: 16 }}>
              BACKWARD — type in reverse order
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
          subtest={currentSubtest}
          progress={progress}
          timeLeft={null}
          onQuit={onQuit}
          itemText={`${itemIndex + 1}/${memorySequences.length}`}
        />
        <div className="test-body">
          <div className="memory-instruction">
            {item.type === 'backward'
              ? `Type the ${item.sequence.length} digits in REVERSE order`
              : `Type the ${item.sequence.length} digits in order`
            }
          </div>
          <div className="memory-input-area">
            <input
              ref={inputRef}
              className="memory-input"
              type="text"
              inputMode="numeric"
              maxLength={item.sequence.length}
              value={memoryInput}
              onChange={e => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setMemoryInput(val);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && memoryInput.length === item.sequence.length) {
                  handleMemorySubmit();
                }
              }}
              autoFocus
            />
            <button
              className="btn-primary"
              disabled={memoryInput.length !== item.sequence.length}
              onClick={handleMemorySubmit}
              style={{ opacity: memoryInput.length === item.sequence.length ? 1 : 0.5 }}
            >
              Submit
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
          subtest={currentSubtest}
          progress={progress}
          timeLeft={timeLeft}
          onQuit={onQuit}
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

function TestHeader({ subtest, progress, timeLeft, onQuit, itemText }) {
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
        <button className="test-quit" onClick={onQuit}>Quit</button>
      </div>
      <div className="test-progress-bar">
        <div className="test-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </>
  );
}
