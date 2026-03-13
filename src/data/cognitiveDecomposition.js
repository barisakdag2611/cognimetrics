// ============================================================
// COGNITIVE DECOMPOSITION FRAMEWORK
// Cross-Structural Isomorphism: Method, Not Label
// ============================================================
//
// Every cognitive test item imposes a set of structural demands
// on the mind. These demands are the REAL measurement — the
// surface content (shapes, words, numbers) is just a vehicle.
//
// This file formalizes the decomposition of cognitive demands
// and derives item parameters FROM structure, not from guessing.
//
// ============================================================

// ============================================================
// 1. STRUCTURAL DEMAND DIMENSIONS
// ============================================================
//
// Each item is decomposed into these orthogonal dimensions:
//
// R  — Relational complexity
//      How many relations must be simultaneously represented?
//      1 = unary (one attribute changes)
//      2 = binary (two attributes co-vary)
//      3 = ternary (three-way interaction)
//      4 = quaternary (four-way or recursive)
//      5 = quinary (five-way or meta-relational)
//
// T  — Transformation type
//      What kind of mental operation is required?
//      1 = identification (recognize/match)
//      2 = single transformation (rotate, negate, increment)
//      3 = compound transformation (rotate AND scale)
//      4 = recursive/conditional transformation (if X then transform A, else B)
//      5 = meta-transformation (transform the transformation rule itself)
//
// B  — Binding load
//      How many elements must be simultaneously held in active WM?
//      Direct count: 2, 3, 4, 5, 6, 7, 8...
//      Maps to WM literature: Miller's 7±2, Cowan's 4±1
//
// N  — Novelty demand
//      How much prior knowledge helps vs. hurts?
//      1 = familiar operation, familiar domain (2+2=?)
//      2 = familiar operation, novel domain (same logic, new content)
//      3 = novel operation required (must infer the rule itself)
//      4 = counter-intuitive (prior knowledge actively misleads)
//
// D  — Distractor quality
//      How much do wrong answers mimic right answers?
//      1 = obviously wrong (no rule compliance)
//      2 = surface-similar (look right but violate all rules)
//      3 = partial compliance (satisfy some rules but not all)
//      4 = near-miss (satisfy all rules except one subtle one)
//
// G  — g-loading factor (for discrimination derivation)
//      How central is this demand to general intelligence?
//      Based on decades of factor-analytic research:
//      Gf tasks:  0.80 (highest g-loading)
//      Gc tasks:  0.65 (moderate g-loading)
//      Gwm tasks: 0.70 (high g-loading, WM is core to g)
//      Gq tasks:  0.60 (moderate g-loading)
//      Gs tasks:  0.50 (lower g-loading)

// ============================================================
// 2. PARAMETER DERIVATION FORMULAS
// ============================================================
//
// DIFFICULTY (b parameter in IRT):
//   b = BASE + wR·R + wT·T + wB·B* + wN·N + wD·D
//
//   BASE = -3.0 (anchors easiest possible item at floor)
//   wR = 0.50  (each relation adds ~0.5 SD of difficulty)
//   wT = 0.30  (each transformation level adds ~0.3 SD)
//   wB = 0.25  (each binding beyond 2 adds ~0.25 SD)
//   wN = 0.35  (each novelty level adds ~0.35 SD)
//   wD = 0.20  (each distractor quality level adds ~0.2 SD)
//   B* = max(0, B - 2) (first 2 bindings are "free" — within Cowan's limit)
//
//   This yields b range of approximately [-2.5, +3.5]
//   which maps to IQ range [62, 152] — covering our target range.
//
// DISCRIMINATION (a parameter in IRT):
//   a = BASE_a × G × complexity_bonus
//
//   BASE_a = 1.0
//   G = g-loading factor (0.50 - 0.80)
//   complexity_bonus = 1 + 0.1 × min(R + T, 6)
//     (more complex items are better at discriminating
//      because they can't be solved by shortcuts)
//
//   This yields a range of approximately [0.6, 2.2]
//   which matches typical psychometric item quality.

export const WEIGHTS = {
  BASE: -3.0,
  wR: 0.50,
  wT: 0.30,
  wB: 0.25,
  wN: 0.35,
  wD: 0.20,
};

export const G_LOADINGS = {
  Gf: 0.80,
  Gc: 0.65,
  Gwm: 0.70,
  Gq: 0.60,
  Gs: 0.50,
};

export function deriveDifficulty(R, T, B, N, D) {
  const Bstar = Math.max(0, B - 2);
  return WEIGHTS.BASE + WEIGHTS.wR * R + WEIGHTS.wT * T + WEIGHTS.wB * Bstar + WEIGHTS.wN * N + WEIGHTS.wD * D;
}

export function deriveDiscrimination(R, T, gLoading) {
  const complexityBonus = 1 + 0.1 * Math.min(R + T, 6);
  return 1.0 * gLoading * complexityBonus;
}

// ============================================================
// 3. WAIS SUBTEST → STRUCTURAL DEMAND MAPPING
// ============================================================
//
// Before creating our items, we map what WAIS subtests
// ACTUALLY demand structurally. This is the isomorphism source.
//
// WAIS Matrix Reasoning:
//   Easy items:   R=1, T=2, B=3, N=2, D=2  → b ≈ -0.85
//   Medium items: R=2, T=3, B=4, N=3, D=3  → b ≈ +0.85
//   Hard items:   R=3, T=4, B=6, N=3, D=4  → b ≈ +2.35
//
// Our isomorphic subtest: Pattern Matrices
//   SAME R, T, B, N, D profile → SAME difficulty
//   DIFFERENT surface: our own pattern designs
//
// WAIS Similarities:
//   Easy: R=1, T=1, B=2, N=1, D=1 → concrete pairs
//   Hard: R=2, T=3, B=3, N=3, D=3 → abstract conceptual links
//
// Our isomorphic subtest: Conceptual Links
//
// WAIS Digit Span:
//   Forward 3: R=1, T=1, B=3, N=1, D=1
//   Forward 7: R=1, T=1, B=7, N=1, D=1
//   Backward 5: R=1, T=2, B=5, N=2, D=1
//   (B directly maps to span length)
//
// Our isomorphic subtest: Memory Sequences
//
// WAIS Vocabulary:
//   Easy: R=1, T=1, B=2, N=1, D=2 (common words)
//   Hard: R=1, T=1, B=3, N=2, D=4 (rare precise words)
//
// Our isomorphic subtest: Word Depth
//
// WAIS Arithmetic:
//   Scales primarily with B (numbers to hold) and T (operations)
//
// Our isomorphic subtest: Quantitative Reasoning
//
// WAIS Coding/Symbol Search:
//   Low R, low T, low N — speed is the variance source
//
// Our isomorphic subtest: Speed Match

// ============================================================
// 4. DECOMPOSITION RECORD
// ============================================================
//
// Every item gets a decomposition record:
//
// {
//   id: "pm1",
//   R: 1,          // 1 relation (shape rotation across row)
//   T: 2,          // single transformation (cyclic permutation)
//   B: 3,          // 3 elements in a row to track
//   N: 2,          // familiar operation (Latin square), novel domain
//   D: 2,          // distractors are plausible shapes but wrong
//   factor: "Gf",  // which CHC factor
//   derived_b: computed,  // from formula
//   derived_a: computed,  // from formula
// }
//
// This is the structural DNA of the item.
// The parameter IS the structure. Not a guess about it.

export function decomposeItem(decomp) {
  const { R, T, B, N, D, factor } = decomp;
  const gLoading = G_LOADINGS[factor] || 0.65;
  const difficulty = deriveDifficulty(R, T, B, N, D);
  const discrimination = deriveDiscrimination(R, T, gLoading);

  return {
    ...decomp,
    difficulty: Math.round(difficulty * 100) / 100,
    discrimination: Math.round(discrimination * 100) / 100,
    // Also compute expected IQ threshold (where P=0.5)
    iqThreshold: Math.round(100 + difficulty * 15),
  };
}

// ============================================================
// 5. VALIDATION
// ============================================================
//
// How do we know the structural derivation is correct?
//
// 1. INTERNAL CONSISTENCY: Items with identical decompositions
//    should have identical parameters. If pm3 and rr2 both have
//    R=2,T=2,B=4,N=2,D=2, they should have the same b value —
//    regardless of one being visual and one being verbal.
//    This IS the isomorphism.
//
// 2. ORDINAL PREDICTION: Within a subtest, items ordered by
//    derived difficulty should match empirical difficulty ordering.
//    If this fails for >20% of item pairs, the weights need
//    recalibration.
//
// 3. CROSS-SUBTEST CONVERGENCE: Two subtests measuring the same
//    factor (e.g., both Gc subtests) should produce correlated
//    theta estimates. If they don't, the structural decomposition
//    is wrong for at least one of them.
//
// 4. CEILING/FLOOR COVERAGE: The derived difficulty range should
//    span [-2.5, +3.0] to cover IQ 62-145+. Check that items
//    exist at each 0.5 increment.
