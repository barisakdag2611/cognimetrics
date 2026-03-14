// IRT-based scoring system
// Uses 2-Parameter Logistic Model (2PL)
// P(θ) = 1 / (1 + exp(-a(θ - b)))
// where a = discrimination, b = difficulty, θ = ability

import CryptoJS from 'crypto-js';

const VERIFICATION_SECRET = "StructuraMentis-2026-Structural-Assessment";

// 2PL IRT probability
function irtProbability(theta, a, b) {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

// Log-likelihood for a response pattern
function logLikelihood(theta, responses) {
  let ll = 0;
  for (const r of responses) {
    const p = irtProbability(theta, r.discrimination, r.difficulty);
    if (r.correct) {
      ll += Math.log(Math.max(p, 1e-10));
    } else {
      ll += Math.log(Math.max(1 - p, 1e-10));
    }
  }
  return ll;
}

// Maximum Likelihood Estimation of theta
// Uses grid search + Newton-Raphson refinement
export function estimateTheta(responses) {
  if (responses.length === 0) return 0;

  // Grid search (extended range for extreme items)
  let bestTheta = 0;
  let bestLL = -Infinity;
  for (let theta = -4; theta <= 5; theta += 0.1) {
    const ll = logLikelihood(theta, responses);
    if (ll > bestLL) {
      bestLL = ll;
      bestTheta = theta;
    }
  }

  // Newton-Raphson refinement (5 iterations)
  let theta = bestTheta;
  for (let i = 0; i < 5; i++) {
    let firstDeriv = 0;
    let secondDeriv = 0;
    for (const r of responses) {
      const p = irtProbability(theta, r.discrimination, r.difficulty);
      const a = r.discrimination;
      const diff = r.correct ? 1 - p : -p;
      firstDeriv += a * diff;
      secondDeriv -= a * a * p * (1 - p);
    }
    if (Math.abs(secondDeriv) < 1e-10) break;
    const step = firstDeriv / secondDeriv;
    theta -= step;
    theta = Math.max(-4, Math.min(5, theta));
  }

  return theta;
}

// Convert theta to IQ scale (mean=100, SD=15)
// Internal range: 40-175. Display capped at 160 (shows ">160")
export function thetaToIQ(theta) {
  const iq = 100 + theta * 15;
  return Math.round(Math.max(40, Math.min(175, iq)));
}

// Format IQ for display — shows ">160" for scores above 160
export function formatIQ(iq) {
  if (iq > 160) return ">160";
  return String(iq);
}

// Score each subtest independently
export function scoreSubtests(allResponses) {
  const subtestScores = {};

  // Group responses by subtest
  const grouped = {};
  for (const r of allResponses) {
    const subtest = r.subtestId;
    if (!grouped[subtest]) grouped[subtest] = [];
    grouped[subtest].push(r);
  }

  for (const [subtestId, responses] of Object.entries(grouped)) {
    const theta = estimateTheta(responses);
    const iq = thetaToIQ(theta);
    const correctCount = responses.filter(r => r.correct).length;
    subtestScores[subtestId] = {
      theta,
      iq,
      correct: correctCount,
      total: responses.length,
      percentage: Math.round((correctCount / responses.length) * 100),
    };
  }

  return subtestScores;
}

// Calculate composite IQ (FSIQ equivalent)
export function calculateCompositeIQ(subtestScores, weights) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [subtestId, score] of Object.entries(subtestScores)) {
    const weight = weights[subtestId] || 0.1;
    weightedSum += score.theta * weight;
    totalWeight += weight;
  }

  const compositeTheta = weightedSum / totalWeight;
  return {
    theta: compositeTheta,
    iq: thetaToIQ(compositeTheta),
  };
}

// Factor scores (Gf, Gc, Gwm, Gs, Gq)
export function calculateFactorScores(subtestScores) {
  const factors = {};

  // Gf = average of PM and RR
  const pmTheta = subtestScores.pattern_matrices?.theta || 0;
  const rrTheta = subtestScores.relational_reasoning?.theta || 0;
  const gfTheta = (pmTheta + rrTheta) / 2;
  factors.Gf = { theta: gfTheta, iq: thetaToIQ(gfTheta), label: "Fluid Reasoning" };

  // Gf-WM (just PM)
  factors["Gf-WM"] = {
    theta: pmTheta,
    iq: thetaToIQ(pmTheta),
    label: "Fluid Reasoning (WM-weighted)"
  };

  // Gf-WMC (just RR)
  factors["Gf-WMC"] = {
    theta: rrTheta,
    iq: thetaToIQ(rrTheta),
    label: "Fluid Reasoning (WMC-weighted)"
  };

  // Gc = average of CL and WD
  const clTheta = subtestScores.conceptual_links?.theta || 0;
  const wdTheta = subtestScores.word_depth?.theta || 0;
  const gcTheta = (clTheta + wdTheta) / 2;
  factors.Gc = { theta: gcTheta, iq: thetaToIQ(gcTheta), label: "Crystallized Intelligence" };

  // Gwm
  const msTheta = subtestScores.memory_sequences?.theta || 0;
  factors.Gwm = { theta: msTheta, iq: thetaToIQ(msTheta), label: "Working Memory" };

  // Gq
  const qrTheta = subtestScores.quantitative_reasoning?.theta || 0;
  factors.Gq = { theta: qrTheta, iq: thetaToIQ(qrTheta), label: "Quantitative Reasoning" };

  // Gs
  const smTheta = subtestScores.speed_match?.theta || 0;
  factors.Gs = { theta: smTheta, iq: thetaToIQ(smTheta), label: "Processing Speed" };

  return factors;
}

// Speed Match scoring — IRT-compatible via efficiency metric
// Maps accuracy × speed into a pseudo-IRT theta with proper scaling
export function scoreSpeedMatch(trials, totalTimeMs) {
  const correct = trials.filter(t => t.correct).length;
  const accuracy = correct / trials.length;
  const avgTimePerTrial = totalTimeMs / trials.length;

  // Efficiency = accuracy weighted by speed relative to norm
  // Norm: 1200ms per trial is mean, SD ~400ms
  const speedZ = (1200 - avgTimePerTrial) / 400; // positive = faster than average
  const clampedSpeedZ = Math.max(-2, Math.min(2, speedZ));

  // Accuracy contributes most, speed modulates
  // accuracyTheta: transform accuracy to theta via logit
  const accuracyLogit = Math.log(Math.max(accuracy, 0.01) / Math.max(1 - accuracy, 0.01));

  // Combined theta: 70% accuracy logit + 30% speed z-score
  // This preserves IRT-like scaling while incorporating speed
  const theta = 0.7 * Math.max(-3, Math.min(3, accuracyLogit)) + 0.3 * clampedSpeedZ;

  return {
    theta: Math.max(-3, Math.min(3, theta)),
    correct,
    total: trials.length,
    avgTimeMs: Math.round(avgTimePerTrial),
    accuracy: Math.round(accuracy * 100),
  };
}

// Standard Error of Measurement for a theta estimate
// Uses Fisher Information from 2PL model
export function calculateSEM(theta, responses) {
  if (responses.length === 0) return 999;

  let fisherInfo = 0;
  for (const r of responses) {
    const p = irtProbability(theta, r.discrimination, r.difficulty);
    const a = r.discrimination;
    fisherInfo += a * a * p * (1 - p);
  }

  if (fisherInfo <= 0) return 999;
  return 1 / Math.sqrt(fisherInfo);
}

// 95% confidence interval for an IQ estimate
export function iqConfidenceInterval(theta, responses) {
  const sem = calculateSEM(theta, responses);
  const iq = thetaToIQ(theta);
  const marginIQ = Math.round(sem * 15 * 1.96); // 95% CI
  return {
    iq,
    sem: Math.round(sem * 100) / 100,
    lower: Math.max(40, iq - marginIQ),
    upper: Math.min(175, iq + marginIQ),
    marginIQ,
  };
}

// Generate verification code for certificate
export function generateVerificationCode(testData) {
  const payload = JSON.stringify({
    id: testData.id,
    iq: testData.compositeIQ,
    date: testData.date,
    subtests: testData.subtestScores,
  });
  const hash = CryptoJS.HmacSHA256(payload, VERIFICATION_SECRET);
  const code = CryptoJS.enc.Base64.stringify(hash).substring(0, 12).replace(/[+/=]/g, 'X');
  return `SM-${code}`.toUpperCase();
}

// Generate unique test ID
export function generateTestId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`.toUpperCase();
}

// Percentile from IQ (assuming normal distribution)
export function iqToPercentile(iq) {
  // Standard normal CDF approximation
  const z = (iq - 100) / 15;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327;
  const p = d * Math.exp(-z * z / 2) * (t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.3302744)))));
  return Math.round((z > 0 ? (1 - p) : p) * 100);
}

// Classification label from IQ
export function iqClassification(iq) {
  if (iq >= 145) return "Exceptionally Gifted";
  if (iq >= 130) return "Very Superior";
  if (iq >= 120) return "Superior";
  if (iq >= 110) return "High Average";
  if (iq >= 90) return "Average";
  if (iq >= 80) return "Low Average";
  if (iq >= 70) return "Borderline";
  return "Extremely Low";
}
