// ============================================================
// COMPUTERIZED ADAPTIVE TESTING (CAT) ENGINE
// ============================================================
//
// Implements Maximum Fisher Information item selection with:
// - MLE theta estimation (Newton-Raphson)
// - SEM-based stopping rule (SEM < 0.3 ≈ ±4.5 IQ)
// - Content balancing (minimum items per subtest)
// - Exposure control (Sympson-Hetter: top-3 random selection)
//
// References:
//   Wainer, H. (2000). Computerized Adaptive Testing: A Primer.
//   Sympson, J.B. & Hetter, R.D. (1985). Controlling item-exposure
//     rates in computerized adaptive testing.
// ============================================================

// 2PL IRT probability
function irtProbability(theta, a, b) {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

// Fisher Information for a single item at given theta
function itemInformation(theta, a, b) {
  const p = irtProbability(theta, a, b);
  return a * a * p * (1 - p);
}

// MLE theta estimation via grid search + Newton-Raphson
function estimateTheta(responses) {
  if (responses.length === 0) return 0;

  // Need at least one correct and one incorrect for MLE
  const allCorrect = responses.every(r => r.correct);
  const allIncorrect = responses.every(r => !r.correct);

  if (allCorrect) {
    // Return upper bound based on hardest item answered correctly
    const maxB = Math.max(...responses.map(r => r.difficulty));
    return maxB + 1;
  }
  if (allIncorrect) {
    const minB = Math.min(...responses.map(r => r.difficulty));
    return minB - 1;
  }

  // Grid search
  let bestTheta = 0;
  let bestLL = -Infinity;
  for (let theta = -4; theta <= 5; theta += 0.1) {
    let ll = 0;
    for (const r of responses) {
      const p = irtProbability(theta, r.discrimination, r.difficulty);
      ll += r.correct ? Math.log(Math.max(p, 1e-10)) : Math.log(Math.max(1 - p, 1e-10));
    }
    if (ll > bestLL) { bestLL = ll; bestTheta = theta; }
  }

  // Newton-Raphson refinement
  let theta = bestTheta;
  for (let i = 0; i < 10; i++) {
    let f1 = 0, f2 = 0;
    for (const r of responses) {
      const p = irtProbability(theta, r.discrimination, r.difficulty);
      const a = r.discrimination;
      f1 += a * (r.correct ? 1 - p : -p);
      f2 -= a * a * p * (1 - p);
    }
    if (Math.abs(f2) < 1e-10) break;
    const step = f1 / f2;
    theta -= step;
    theta = Math.max(-4, Math.min(5, theta));
    if (Math.abs(step) < 1e-6) break;
  }

  return theta;
}

// Standard Error of Measurement
function calculateSEM(theta, responses) {
  if (responses.length === 0) return 999;
  let info = 0;
  for (const r of responses) {
    info += itemInformation(theta, r.discrimination, r.difficulty);
  }
  return info > 0 ? 1 / Math.sqrt(info) : 999;
}

// ============================================================
// CAT ENGINE
// ============================================================

export class CATEngine {
  constructor(itemPool, options = {}) {
    // Item pool: array of items with { id, subtestId, difficulty, discrimination, ... }
    this.itemPool = itemPool;
    this.administered = [];     // items already given
    this.responses = [];        // response records
    this.currentTheta = 0;      // current ability estimate
    this.currentSEM = 999;      // current standard error

    // Configuration
    this.config = {
      maxItems: options.maxItems || 60,
      semThreshold: options.semThreshold || 0.3,  // ≈ 4.5 IQ points
      minPerSubtest: options.minPerSubtest || 3,   // content balancing
      exposureK: options.exposureK || 3,           // Sympson-Hetter top-K
      startTheta: options.startTheta || 0,         // initial theta estimate
      ...options,
    };

    this.currentTheta = this.config.startTheta;

    // Track items per subtest
    this.subtestCounts = {};
    const subtestIds = [...new Set(itemPool.map(i => i.subtestId))];
    for (const id of subtestIds) {
      this.subtestCounts[id] = 0;
    }
  }

  // Get the next item to administer
  selectNextItem() {
    // Available items (not yet administered)
    const administeredIds = new Set(this.administered.map(i => i.id));
    let available = this.itemPool.filter(i => !administeredIds.has(i.id));

    if (available.length === 0) return null;

    // Content balancing: if any subtest is below minimum, prioritize it
    const subtestsBelowMin = Object.entries(this.subtestCounts)
      .filter(([_, count]) => count < this.config.minPerSubtest)
      .map(([id]) => id);

    if (subtestsBelowMin.length > 0) {
      const fromNeeded = available.filter(i => subtestsBelowMin.includes(i.subtestId));
      if (fromNeeded.length > 0) {
        available = fromNeeded;
      }
    }

    // Maximum Fisher Information: rank by information at current theta
    const withInfo = available.map(item => ({
      item,
      info: itemInformation(this.currentTheta, item.discrimination, item.difficulty),
    }));

    withInfo.sort((a, b) => b.info - a.info);

    // Sympson-Hetter exposure control: select randomly from top-K
    const topK = withInfo.slice(0, this.config.exposureK);
    const selected = topK[Math.floor(Math.random() * topK.length)];

    return selected.item;
  }

  // Record a response and update theta
  recordResponse(item, correct) {
    this.administered.push(item);
    this.responses.push({
      itemId: item.id,
      subtestId: item.subtestId,
      difficulty: item.difficulty,
      discrimination: item.discrimination,
      correct,
    });

    // Update subtest count
    if (this.subtestCounts[item.subtestId] !== undefined) {
      this.subtestCounts[item.subtestId]++;
    }

    // Re-estimate theta
    this.currentTheta = estimateTheta(this.responses);
    this.currentSEM = calculateSEM(this.currentTheta, this.responses);
  }

  // Check if the test should stop
  shouldStop() {
    if (this.responses.length >= this.config.maxItems) return true;
    if (this.responses.length >= 10 && this.currentSEM <= this.config.semThreshold) return true;
    return false;
  }

  // Get current state
  getState() {
    const iq = Math.round(Math.max(40, Math.min(175, 100 + this.currentTheta * 15)));
    return {
      theta: this.currentTheta,
      sem: this.currentSEM,
      iq,
      semIQ: Math.round(this.currentSEM * 15 * 100) / 100,
      itemsAdministered: this.responses.length,
      maxItems: this.config.maxItems,
      subtestCounts: { ...this.subtestCounts },
      progress: this.responses.length / this.config.maxItems,
      responses: [...this.responses],
    };
  }

  // Get per-subtest theta estimates
  getSubtestScores() {
    const grouped = {};
    for (const r of this.responses) {
      if (!grouped[r.subtestId]) grouped[r.subtestId] = [];
      grouped[r.subtestId].push(r);
    }

    const scores = {};
    for (const [subtestId, resps] of Object.entries(grouped)) {
      const theta = estimateTheta(resps);
      const sem = calculateSEM(theta, resps);
      const iq = Math.round(Math.max(40, Math.min(175, 100 + theta * 15)));
      scores[subtestId] = {
        theta,
        iq,
        sem,
        correct: resps.filter(r => r.correct).length,
        total: resps.length,
        percentage: Math.round(resps.filter(r => r.correct).length / resps.length * 100),
      };
    }
    return scores;
  }
}

// ============================================================
// UTILITY: Flatten item bank for CAT
// ============================================================
// Takes the subtest arrays and creates a flat pool with subtestId attached.

export function createCATPool(subtestItems) {
  const pool = [];
  for (const [subtestId, items] of Object.entries(subtestItems)) {
    for (const item of items) {
      pool.push({
        ...item,
        subtestId,
      });
    }
  }
  return pool;
}
