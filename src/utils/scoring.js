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

// Speed Match scoring — EZ-diffusion model (Wagenmakers et al. 2007)
// ============================================================
// Structural derivation:
//
// The diffusion model (Ratcliff, 1978) decomposes speeded binary
// decisions into three parameters:
//   v  — drift rate (quality of evidence accumulation → Gs)
//   a  — boundary separation (speed-accuracy tradeoff)
//   Ter — non-decision time (encoding + motor response)
//
// EZ-diffusion recovers these from summary statistics:
//   Pc  = proportion correct
//   VRT = variance of correct-trial RTs
//   MRT = mean of correct-trial RTs
//
// Drift rate (v) is the parameter of interest: it directly
// reflects processing speed capacity (Gs). Higher v = faster
// and more accurate evidence accumulation.
//
// Hick-Hyman structural norms:
//   2-alternative perceptual comparison: baseline RT ≈ 350ms
//   Symbol comparison (WAIS-IV Coding analog): +400-600ms processing
//   Total structural norm: ~750-950ms
//   Intra-individual RT SD: ~20-30% of mean RT (Halderson & Glasnapp)
//
// References:
//   Wagenmakers, E.-J., van der Maas, H.L.J., & Grasman, R.P.P.P. (2007).
//     An EZ-diffusion model for response time and accuracy.
//     Psychonomic Bulletin & Review, 14(1), 3-22.
//   Ratcliff, R. (1978). A theory of memory retrieval.
//     Psychological Review, 85(2), 59-108.
// ============================================================
export function scoreSpeedMatch(trials, totalTimeMs) {
  const correct = trials.filter(t => t.correct).length;
  const total = trials.length;
  const accuracy = correct / total;
  const avgTimePerTrial = totalTimeMs / total;

  // Per-trial RTs (approximate from total time if individual times unavailable)
  const trialRTs = trials.map(t => t.rt || avgTimePerTrial);
  const correctRTs = trials.filter(t => t.correct).map(t => t.rt || avgTimePerTrial);

  // EZ-diffusion inputs
  const Pc = Math.max(0.51, Math.min(0.99, accuracy)); // clamp to valid range
  const MRT = correctRTs.length > 0
    ? correctRTs.reduce((s, v) => s + v, 0) / correctRTs.length / 1000 // convert to seconds
    : avgTimePerTrial / 1000;

  // Variance of correct RTs (in seconds²)
  let VRT;
  if (correctRTs.length > 2) {
    const meanRT = correctRTs.reduce((s, v) => s + v, 0) / correctRTs.length;
    VRT = correctRTs.reduce((s, v) => s + ((v - meanRT) / 1000) ** 2, 0) / (correctRTs.length - 1);
  } else {
    // Fallback: estimate VRT from structural norm (SD ≈ 25% of mean RT)
    VRT = (MRT * 0.25) ** 2;
  }
  VRT = Math.max(VRT, 0.001); // floor to prevent division by zero

  // EZ-diffusion equations (Wagenmakers et al. 2007, Eq. 1-3)
  // Edge correction for Pc
  const s = 0.1; // scaling parameter (conventional)
  const s2 = s * s;

  // Logit of Pc
  const L = Math.log(Pc / (1 - Pc)); // = qnorm-like transform

  // Drift rate (v)
  // v = sign(Pc - 0.5) · s · (L · (L·Pc² - L·Pc + Pc - 0.5)) / VRT)^(1/4)
  // Simplified EZ formula:
  const y = -L * (L * Pc * Pc - L * Pc + Pc - 0.5) / VRT;
  const v = (y > 0) ? Math.sign(Pc - 0.5) * s * Math.pow(y, 0.25) : 0;

  // Boundary separation (a)
  const a = (v !== 0) ? s2 * L / v : 0.1;

  // Non-decision time (Ter)
  const Ter = (a !== 0 && v !== 0)
    ? MRT - (a / (2 * v)) * (1 - Math.exp(-v * a / s2)) / (1 + Math.exp(-v * a / s2))
    : MRT * 0.3;

  // Convert drift rate to theta scale
  // Structural norms from Ratcliff & McKoon (2008):
  //   Average adult v ≈ 0.15-0.25 for simple perceptual tasks
  //   SD of v ≈ 0.08
  // Map: theta = (v - 0.20) / 0.08
  const v_mean = 0.20;  // population mean drift rate
  const v_sd = 0.08;    // population SD of drift rate
  const theta = Math.max(-3, Math.min(3, (v - v_mean) / v_sd));

  return {
    theta,
    correct,
    total,
    avgTimeMs: Math.round(avgTimePerTrial),
    accuracy: Math.round(accuracy * 100),
    // EZ-diffusion parameters (for diagnostics/methodology page)
    driftRate: Math.round(v * 1000) / 1000,
    boundarySep: Math.round(a * 1000) / 1000,
    nonDecisionTime: Math.round(Ter * 1000) / 1000,
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
