// ============================================================
// COGNIMETRICS ITEM BANK
// Every parameter derived from structural decomposition.
// See cognitiveDecomposition.js for the derivation framework.
// ============================================================

import { decomposeItem } from './cognitiveDecomposition';

// Helper: decompose and attach derived params to an item
function item(content, decomp) {
  const derived = decomposeItem(decomp);
  return { ...content, ...derived };
}

// ========================================
// SUBTEST 1: PATTERN MATRICES (Gf-WM)
// ========================================
// WAIS Matrix Reasoning isomorphism:
// Same structural demands — rule extraction, simultaneous
// rule tracking, novel pattern completion.
// Surface: our own geometric patterns.
//
// Difficulty progression via R, T, B scaling:
// Easy:  1 rule, single transform, 3 bindings
// Hard:  3+ rules, compound transforms, 6+ bindings

export const patternMatrices = [
  // PM1: Increment pattern — dots increase +1 per cell (easiest: N=1)
  // R=1 (one rule: +1), T=2 (increment), B=3, N=1 (very familiar), D=2
  // b = -0.90, IQ ~86.5
  item({
    id: "pm1",
    grid: [
      ["1dot", "2dot", "3dot"],
      ["2dot", "3dot", "4dot"],
      ["3dot", "4dot", "?"]
    ],
    rule: "Each cell = row_start + column_index; both row and column increment by 1",
    options: ["4dot", "5dot", "6dot", "3dot"],
    correct: 1,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 1, D: 2, factor: "Gf" }),

  // PM2: Latin square — each shape once per row/column
  // R=1 (one rule: permutation), T=2 (cyclic shift), B=3 (track 3 shapes), N=2, D=2
  // b = -0.55, IQ ~91.8
  item({
    id: "pm2",
    grid: [
      ["circle", "square", "triangle"],
      ["square", "triangle", "circle"],
      ["triangle", "circle", "?"]
    ],
    rule: "Latin square: each shape once per row and column",
    options: ["square", "triangle", "circle", "diamond"],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 2, D: 2, factor: "Gf" }),

  // PM3: Two independent attributes — shape by row, color by column
  // R=2 (two rules: shape AND color), T=1 (identity per axis), B=4 (2 attrs × track), N=2, D=2
  item({
    id: "pm3",
    grid: [
      ["red-circle", "blue-circle", "green-circle"],
      ["red-square", "blue-square", "green-square"],
      ["red-triangle", "blue-triangle", "?"]
    ],
    rule: "Rows share shape, columns share color — two independent attributes",
    options: ["green-triangle", "red-triangle", "blue-circle", "green-square"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 1, B: 4, N: 2, D: 2, factor: "Gf" }),

  // PM4: Rotation + count — direction rotates 90° CW, count increments
  // R=2 (rotation AND count), T=2 (rotation transform), B=4 (direction+count), N=2, D=3
  item({
    id: "pm4",
    grid: [
      ["up-arrow-1", "right-arrow-2", "down-arrow-3"],
      ["right-arrow-2", "down-arrow-3", "left-arrow-4"],
      ["down-arrow-3", "left-arrow-4", "?"]
    ],
    rule: "Direction rotates 90° CW per cell; count increments +1; both rules operate simultaneously",
    options: ["up-arrow-5", "up-arrow-4", "right-arrow-5", "left-arrow-5"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gf" }),

  // PM5: Nested shapes — size increases L→R, inner/outer pair defined per row
  // R=2 (size rule + shape-pair rule), T=2 (scaling), B=5 (size×shape×nesting), N=2, D=3
  item({
    id: "pm5",
    grid: [
      ["small-circle-inside-square", "medium-circle-inside-square", "large-circle-inside-square"],
      ["small-square-inside-circle", "medium-square-inside-circle", "large-square-inside-circle"],
      ["small-triangle-inside-diamond", "medium-triangle-inside-diamond", "?"]
    ],
    rule: "Size increases L→R; each row has fixed inner-outer shape pair",
    options: [
      "large-triangle-inside-diamond",
      "large-diamond-inside-triangle",
      "medium-triangle-inside-diamond",
      "large-circle-inside-diamond"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 5, N: 2, D: 3, factor: "Gf" }),

  // PM6: Three attributes — line count + fill style + both vary independently
  // R=2 (lines + fill), T=2 (increment + categorical change), B=4, N=2, D=3
  item({
    id: "pm6",
    grid: [
      ["2lines-cross", "3lines-star", "4lines-asterisk"],
      ["filled-2lines", "filled-3lines", "filled-4lines"],
      ["dashed-2lines", "dashed-3lines", "?"]
    ],
    rule: "Lines increase +1 across columns; fill style is constant within each row",
    options: ["dashed-4lines", "dashed-5lines", "filled-4lines", "solid-4lines"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gf" }),

  // PM7: 3 overlapping rules — shape cycles per column, color per row, size increases per row
  // R=2, T=3, B=5, N=2, D=3
  item({
    id: "pm7",
    grid: [
      ["small-red-circle", "small-blue-square", "small-green-triangle"],
      ["medium-green-circle", "medium-red-square", "medium-blue-triangle"],
      ["large-blue-circle", "large-green-square", "?"]
    ],
    rule: "Shape cycles per column; color cycles per row; size increases per row",
    options: [
      "large-red-triangle",
      "large-blue-triangle",
      "medium-red-triangle",
      "large-green-triangle"
    ],
    correct: 0,
    timeLimit: 90,
  }, { R: 2, T: 3, B: 5, N: 2, D: 3, factor: "Gf" }),

  // PM7b: Mirror symmetry + color shift — left half mirrors right, colors rotate
  // R=2, T=3, B=5, N=2, D=3
  // b = +0.95 → IQ ~114 (mirror is familiar, N=2 not 3)
  item({
    id: "pm7b",
    grid: [
      ["red-left", "blue-center", "red-right"],
      ["green-left", "yellow-center", "green-right"],
      ["blue-left", "red-center", "?"]
    ],
    rule: "Left mirrors right (same shape); center color = next in cycle; mirror symmetry + color rotation",
    options: ["blue-right", "red-right", "green-right", "yellow-right"],
    correct: 0,
    timeLimit: 90,
  }, { R: 2, T: 3, B: 5, N: 2, D: 3, factor: "Gf" }),

  // PM7c: XOR-like pattern — cell = row XOR column property
  // R=2, T=3, B=5, N=3, D=3
  // b = +1.30 → IQ ~119.5 (double Latin square is novel, N=3)
  item({
    id: "pm7c",
    grid: [
      ["hollow-circle", "filled-square", "striped-triangle"],
      ["filled-square", "striped-triangle", "hollow-circle"],
      ["striped-triangle", "hollow-circle", "?"]
    ],
    rule: "Each row and column contains exactly one of each shape-fill combination; double Latin square",
    options: ["filled-square", "hollow-square", "striped-circle", "filled-triangle"],
    correct: 0,
    timeLimit: 90,
  }, { R: 2, T: 3, B: 5, N: 3, D: 3, factor: "Gf" }),

  // PM7d: Progressive scaling + rotation — size doubles, rotation +45° each step
  // R=3, T=3, B=5, N=2, D=3
  // b ≈ +0.95 → IQ ~114
  item({
    id: "pm7d",
    grid: [
      ["tiny-0deg", "small-45deg", "medium-90deg"],
      ["small-45deg", "medium-90deg", "large-135deg"],
      ["medium-90deg", "large-135deg", "?"]
    ],
    rule: "Size doubles and rotation increases by 45° per step (both row and column progression)",
    options: ["xlarge-180deg", "large-180deg", "xlarge-135deg", "xlarge-90deg"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 2, D: 3, factor: "Gf" }),

  // PM8: Compound transformation — outer shape follows one rule, inner shape follows another
  // R=3, T=3, B=5, N=3, D=3
  item({
    id: "pm8",
    grid: [
      ["circle-inside-square", "square-inside-triangle", "triangle-inside-diamond"],
      ["square-inside-diamond", "triangle-inside-circle", "diamond-inside-square"],
      ["triangle-inside-circle", "diamond-inside-square", "?"]
    ],
    rule: "Inner shape = previous outer shape; outer shape cycles independently",
    options: [
      "circle-inside-triangle",
      "square-inside-circle",
      "diamond-inside-triangle",
      "circle-inside-diamond"
    ],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 3, factor: "Gf" }),

  // PM9: Size + rotation + shape = 3 independent varying dimensions (Latin square)
  // R=3, T=3, B=5, N=3, D=4
  item({
    id: "pm9",
    grid: [
      ["small-circle", "medium-rotated-square", "large-triangle"],
      ["medium-triangle", "large-rotated-circle", "small-square"],
      ["large-square", "small-rotated-triangle", "?"]
    ],
    rule: "Each attribute (shape, size, rotation) appears exactly once per row and column (Latin square on 3 dimensions)",
    options: [
      "medium-rotated-circle",
      "medium-circle",
      "large-rotated-circle",
      "small-rotated-circle"
    ],
    correct: 0,
    timeLimit: 105,
  }, { R: 3, T: 3, B: 5, N: 3, D: 4, factor: "Gf" }),

  // PM10: 4 overlapping rules — Latin square on both shape AND fill style
  // R=3, T=4, B=6, N=3, D=4
  item({
    id: "pm10",
    grid: [
      ["filled-circle", "hollow-square", "striped-triangle"],
      ["hollow-triangle", "striped-circle", "filled-square"],
      ["striped-square", "filled-triangle", "?"]
    ],
    rule: "Latin square on both shape AND fill style — each combination unique",
    options: [
      "hollow-circle",
      "hollow-diamond",
      "striped-circle",
      "filled-circle"
    ],
    correct: 0,
    timeLimit: 105,
  }, { R: 3, T: 4, B: 6, N: 3, D: 4, factor: "Gf" }),
];

// ========================================
// SUBTEST 2: RELATIONAL REASONING (Gf-WMC)
// ========================================
// WAIS Similarities + Figure Weights isomorphism:
// Same demands — holding multiple relations, transitive
// inference, multi-premise deduction.
// Key difference from PM: bottleneck is CAPACITY (how much
// relational structure can be held), not MANIPULATION speed.

export const relationalReasoning = [
  // RR1: Simple syllogism — 2 premises, 1 conclusion
  // R=1 (transitive chain), T=1 (identify), B=3 (A,B,C), N=1, D=2
  item({
    id: "rr1",
    premise: "All A are B. All B are C.",
    question: "If X is A, then X is definitely:",
    options: ["C", "Not C", "Maybe C", "Cannot determine"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 1, D: 2, factor: "Gf" }),

  // RR2: Affirming the consequent — logical fallacy detection
  // R=1, T=2 (must negate the intuitive answer), B=3, N=2, D=3 (intuitive wrong answer)
  item({
    id: "rr2",
    premise: "If it rains, the ground is wet. The ground is wet.",
    question: "Can we conclude it rained?",
    options: [
      "No — the ground could be wet for other reasons",
      "Yes — rain causes wet ground",
      "Only if there are no other water sources",
      "Yes — the statement guarantees it"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 2, B: 3, N: 2, D: 3, factor: "Gf" }),

  // RR3: Modus tollens — contrapositive chain
  // R=2 (two implications + contrapositive), T=2 (negation propagation), B=4 (P,Q,R,¬R), N=2, D=2
  item({
    id: "rr3",
    premise: "P → Q. Q → R. ¬R.",
    question: "What can we conclude?",
    options: ["¬P", "P", "Q", "Cannot determine"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 2, D: 2, factor: "Gf" }),

  // RR4: 5-element linear ordering from partial comparisons
  // R=2 (multiple binary relations to integrate), T=2 (transitive ordering), B=5 (A,B,C,D,E), N=2, D=3
  item({
    id: "rr4",
    premise: "Among 5 people (A-E): A is taller than B. C is shorter than D. B is taller than C. E is shorter than A but taller than D.",
    question: "Who is the shortest?",
    options: ["C", "B", "E", "D"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 5, N: 2, D: 3, factor: "Gf" }),

  // RR5: Constraint satisfaction — 6 elements with conditional placement rules
  // R=3 (adjacency + exclusion + distance constraints), T=2, B=6, N=2, D=3
  item({
    id: "rr5",
    premise: "In a row of 6 seats: F sits next to G. H cannot sit next to I. J sits at one end. K sits exactly 2 seats from J.",
    question: "If G sits in seat 3, which seat must F be in?",
    options: ["2 or 4", "Only 2", "Only 4", "1 or 5"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 2, B: 6, N: 2, D: 3, factor: "Gf" }),

  // RR6: Code-breaking — letter→number mapping from 3 examples
  // R=3 (3 simultaneous equations), T=3 (solve system), B=6 (6 letter-number pairs), N=2, D=3
  // b = +1.70, IQ ~125.5 — comes BEFORE rr7 (IQ 130.8)
  item({
    id: "rr6",
    premise: "A code maps letters to numbers: CAB = 312, BAD = 213, ACE = 135. Each letter always maps to the same number.",
    question: "What is the code for BED?",
    options: ["253", "235", "325", "532"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 6, N: 2, D: 3, factor: "Gf" }),

  // RR7: Causal system — 3 switches, 3 lights, non-trivial mapping
  // R=3 (3 switch-light mappings to infer), T=3 (compound: toggle + interaction), B=6, N=3, D=3
  // b = +2.05, IQ ~130.8
  item({
    id: "rr7",
    premise: "Three switches (X, Y, Z) control three lights (1, 2, 3) — not necessarily in order. Flipping X turns on light 2. Flipping X and Y turns on lights 2 and 3. Flipping all three turns on only light 1.",
    question: "What does switch Z control?",
    options: [
      "Z turns off lights 2 and 3, and turns on light 1",
      "Z controls only light 1",
      "Z controls lights 1 and 3",
      "Cannot determine"
    ],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  // RR8: Gear system — ratio + direction propagation through chain
  // R=3 (ratio × direction × chain), T=3 (multiplicative chain), B=6 (4 gears × teeth + direction), N=3, D=3
  // b = +2.05, IQ ~130.8 — comes BEFORE dynamic system (IQ 142)
  // A→B: 12/8=1.5, 3×1.5=4.5 turns, reverses to CCW
  // B→C: 8/16=0.5, 4.5×0.5=2.25, reverses to CW
  // C→D: 16/6=8/3, 2.25×8/3=6, reverses to CCW → answer: 6 turns counterclockwise
  item({
    id: "rr9",
    premise: "Four gears mesh in sequence: A→B→C→D. A has 12 teeth, B has 8, C has 16, D has 6. When A makes exactly 3 full turns clockwise:",
    question: "How many turns does D make and in which direction?",
    options: [
      "6 turns counterclockwise",
      "12 turns clockwise",
      "8 turns clockwise",
      "12 turns counterclockwise"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  // RR9b: Dynamic system with feedback — must simulate to equilibrium
  // R=4 (4 causal links forming a cycle), T=4 (conditional + recursive simulation), B=5 (5 variables), N=3, D=4
  // b = +2.80, IQ ~142
  item({
    id: "rr9b",
    premise: "In a system: if A and B are both true, C becomes false. If C is false and D is true, E becomes true. If E is true, A becomes false. Initially: A=true, B=true, D=true, C=true, E=false.",
    question: "After the system reaches equilibrium, what are the final values?",
    options: [
      "A=false, B=true, C=false, D=true, E=true",
      "A=true, B=true, C=false, D=true, E=true",
      "A=false, B=true, C=true, D=true, E=false",
      "The system oscillates and never reaches equilibrium"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 5, N: 3, D: 4, factor: "Gf" }),

  // RR10: Interleaved cyclical rule application — must track rule index + state
  // R=4 (3 rules + cycle tracking), T=4 (conditional application by position), B=7 (sequence + rule state + position), N=3, D=4
  // Sequence: 1, ×2→2, +3→5, -1→4, ×2→8, +3→11, -1→10, ×2→20, +3→23, -1→22, ×2→44, +3→47
  // 10th=22, 11th=44, 12th=47
  item({
    id: "rr10",
    premise: "A sequence is generated by three interleaved rules applied cyclically. Rule 1: multiply by 2. Rule 2: add 3. Rule 3: subtract 1. Starting from 1: 1, 2, 5, 4, 8, 11, 10, 20, 23, ...",
    question: "What is the 12th number in this sequence?",
    options: ["47", "44", "46", "45"],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 7, N: 3, D: 4, factor: "Gf" }),

  // RR11: 8-element constraint satisfaction with bidirectional conditionals
  // 8 people seated around a circular table with 6 constraints including
  // if-then-else conditionals. Must resolve all constraints simultaneously.
  // R=5 (6 constraints including conditionals), T=4 (circular + bidirectional), B=8, N=4, D=5
  item({
    id: "rr11",
    premise: "Eight diplomats (A-H) sit around a circular table. Constraints: (1) A sits directly opposite E. (2) B is adjacent to C but not adjacent to D. (3) If F is adjacent to A, then G must be adjacent to H; otherwise G sits opposite H. (4) D sits exactly 3 seats from A. (5) H is not adjacent to A or E. (6) C and F cannot both be in the same half of the table as B.",
    question: "If B sits in seat 1 and A sits in seat 3, which seat must G occupy?",
    options: ["6", "5", "8", "2"],
    correct: 0,
    timeLimit: 180,
  }, { R: 5, T: 4, B: 8, N: 4, D: 5, factor: "Gf" }),

  // RR12: Nested conditional with quantifier logic and exception handling
  // 5 categorical rules with nested exceptions and universal/existential quantifiers.
  // R=5 (5 rules with nested conditions), T=5 (quantifier reasoning + exception priority), B=8, N=4, D=5
  // b = +4.90, IQ ~173.5
  item({
    id: "rr12",
    premise: "In a classification system: (1) All items with property P are class Alpha. (2) All items with property Q are class Beta. (3) Exception: items with both P and Q are class Gamma UNLESS they also have property R. (4) Items with P, Q, and R are class Alpha only if they lack property S; otherwise they are class Delta. (5) All class Delta items that also have property T are reclassified as Gamma. Item X has properties: P, Q, R, S, T.",
    question: "What is the final class of item X?",
    options: ["Gamma", "Delta", "Alpha", "Beta"],
    correct: 0,
    timeLimit: 150,
  }, { R: 5, T: 5, B: 8, N: 4, D: 5, factor: "Gf" }),

  // RR13: Multi-system causal network with delayed effects and thresholds
  // 7 variables with threshold-based activation, delayed propagation, and feedback loops.
  // Must simulate 4 time steps to find equilibrium.
  // R=5 (7 causal links + thresholds + delays), T=5 (temporal simulation with thresholds), B=9, N=4, D=5
  // b = +5.15, IQ ~177.2
  item({
    id: "rr13",
    premise: "Seven variables (A-G) form a causal network. Rules: A activates B after 1 step delay. B and C together (both >0) activate D immediately. D activates E, but only if D>2. E inhibits A (sets A=0) after 2 step delay. F = A + C at each step. G activates when F>5. C is constant at 3. Initial values at t=0: A=4, B=0, C=3, D=0, E=0, F=7, G=1.",
    question: "What are the values of (A, D, E, G) at t=4?",
    options: [
      "A=0, D=3, E=1, G=0",
      "A=4, D=3, E=1, G=1",
      "A=0, D=0, E=0, G=0",
      "A=4, D=0, E=0, G=1"
    ],
    correct: 0,
    timeLimit: 180,
  }, { R: 5, T: 5, B: 9, N: 4, D: 5, factor: "Gf" }),
];

// ========================================
// SUBTEST 3: CONCEPTUAL LINKS (Gc)
// ========================================
// WAIS Similarities isomorphism:
// Structural demands: identify the abstract relational
// category that binds two concepts.
// Difficulty scales with ABSTRACTION LEVEL:
//   concrete → functional → categorical → abstract → meta-categorical
// And SEMANTIC DISTANCE between concepts.

export const conceptualLinks = [
  // CL1: Concrete opposition — direct antonym
  // R=1 (one relation: opposition), T=1 (identify), B=2, N=1 (highly familiar), D=1
  item({
    id: "cl1",
    analogy: "Hot is to Cold as Day is to ___",
    options: ["Night", "Sun", "Light", "Morning"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gc" }),

  // CL2: Functional relation — agent uses tool
  // R=1, T=1, B=3 (agent+tool+domain), N=1, D=2
  item({
    id: "cl2",
    analogy: "Pen is to Writer as Brush is to ___",
    options: ["Painter", "Canvas", "Art", "Color"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 3, N: 1, D: 2, factor: "Gc" }),

  // CL3: Developmental/causal — precursor→outcome
  // R=1, T=2 (transformation: growth), B=3, N=1, D=2
  item({
    id: "cl3",
    analogy: "Seed is to Tree as Egg is to ___",
    options: ["Bird", "Nest", "Shell", "Chicken"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 2, B: 3, N: 1, D: 2, factor: "Gc" }),

  // CL4: Instrument→domain — tool extends perception to domain
  // R=1, T=1, B=3, N=2 (requires domain knowledge), D=2
  item({
    id: "cl4",
    analogy: "Telescope is to Stars as Microscope is to ___",
    options: ["Cells", "Glass", "Laboratory", "Eyes"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 2, factor: "Gc" }),

  // CL5: Metamorphosis — structural transformation (same entity, different form)
  // R=2 (identity-through-transformation + biological process), T=2, B=3, N=2, D=2
  item({
    id: "cl5",
    analogy: "Caterpillar is to Butterfly as Tadpole is to ___",
    options: ["Frog", "Water", "Lily", "Metamorphosis"],
    correct: 0,
    timeLimit: 45,
  }, { R: 2, T: 2, B: 3, N: 2, D: 2, factor: "Gc" }),

  // CL6: Creator→creation (abstract plan → concrete instantiation)
  // R=2 (creator-creation + abstract-concrete mapping), T=2, B=4, N=2, D=3
  item({
    id: "cl6",
    analogy: "Symphony is to Composer as Blueprint is to ___",
    options: ["Architect", "Building", "Engineer", "Design"],
    correct: 0,
    timeLimit: 45,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gc" }),

  // CL7: Process→substrate — entropic process acts on structure
  // R=2, T=2, B=4, N=3 (requires abstract concept of entropy), D=3
  item({
    id: "cl7",
    analogy: "Entropy is to Order as Erosion is to ___",
    options: ["Landscape", "Water", "Mountain", "Geology"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 3, D: 3, factor: "Gc" }),

  // CL8: Foundation→derivation — axiom generates theorems, constitution generates laws
  // R=2, T=3 (derivation relation — more abstract than cause-effect), B=4, N=3, D=3
  item({
    id: "cl8",
    analogy: "Axiom is to Theorem as Constitution is to ___",
    options: ["Law", "Government", "Rights", "Democracy"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 3, B: 4, N: 3, D: 3, factor: "Gc" }),

  // CL9: Formal structure→instantiation — syntax constrains grammar, protocol constrains communication
  // R=3 (structure-instance + domain-mapping + meta-relation), T=3, B=4, N=3, D=4
  item({
    id: "cl9",
    analogy: "Syntax is to Grammar as Protocol is to ___",
    options: ["Communication", "Network", "Internet", "Rules"],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 3, B: 4, N: 3, D: 4, factor: "Gc" }),

  // CL10: Meta-structural — isomorphism preserves structure, translation preserves meaning
  // R=3, T=3, B=5 (must grasp meta-concept of structure-preservation), N=4 (counter-intuitive: "meaning" not "language"), D=4
  item({
    id: "cl10",
    analogy: "Isomorphism is to Structure as Translation is to ___",
    options: ["Meaning", "Language", "Words", "Culture"],
    correct: 0,
    timeLimit: 60,
  }, { R: 3, T: 3, B: 5, N: 4, D: 4, factor: "Gc" }),

  // CL10b: Meta-structural relation — observer affects observed system
  // R=4, T=3, B=5, N=4, D=5
  item({
    id: "cl10b",
    analogy: "Observer Effect is to Quantum Mechanics as Reflexivity is to ___",
    options: ["Social Science", "Mathematics", "Consciousness", "Epistemology"],
    correct: 0,
    timeLimit: 75,
  }, { R: 4, T: 3, B: 5, N: 4, D: 5, factor: "Gc" }),

  // CL11: Cross-domain structural invariant — Gödel incompleteness maps to Heisenberg uncertainty
  // Both express fundamental limits of a formal system's self-description.
  // R=4 (cross-domain mapping + meta-epistemological relation + formal limits + self-reference), T=4, B=6, N=5, D=5
  item({
    id: "cl11",
    analogy: "Gödel's Incompleteness is to Formal Systems as Heisenberg's Uncertainty is to ___",
    options: ["Measurement Systems", "Quantum Mechanics", "Physics", "Probability"],
    correct: 0,
    timeLimit: 90,
  }, { R: 4, T: 4, B: 6, N: 5, D: 5, factor: "Gc" }),

  // CL12: Second-order relation — the relationship between two analogies
  // Must identify that both pairs share the meta-relation "necessary precondition for emergence"
  // R=5 (meta-analogy: relation between relations + emergence + necessity + sufficiency), T=5, B=7, N=5, D=5
  item({
    id: "cl12",
    analogy: "Recursion is to Consciousness as Autocatalysis is to ___",
    options: ["Life", "Chemistry", "Metabolism", "Reproduction"],
    correct: 0,
    timeLimit: 90,
  }, { R: 5, T: 5, B: 7, N: 5, D: 5, factor: "Gc" }),
];

// ========================================
// SUBTEST 4: WORD DEPTH (Gc)
// ========================================
// WAIS Vocabulary isomorphism:
// Structural demands: semantic precision.
//
// IMPORTANT: For vocabulary recognition, the cognitive operation is
// fundamentally identification (T=1-2) with low relational complexity (R=1-2).
// The primary difficulty drivers are:
//   N (novelty) = word frequency/rarity — rare words are harder
//   D (distractor quality) = semantic proximity of wrong answers
//   B = number of competing definitions to evaluate (2-4)
//
// R and T are kept honest: vocabulary recognition does NOT involve
// multi-relational binding (R>2) or compound transformations (T>2).
// This means WD has a natural ceiling around IQ ~128, which is
// consistent with WAIS Vocabulary's contribution to the composite.
// High-ability differentiation is handled by Gf subtests, not Gc.

export const wordDepth = [
  // WD1: Common word, concrete meaning
  // R=1, T=1, B=2, N=1, D=1 → b=-1.65, IQ ~75
  item({
    id: "wd1",
    question: "Which word means 'to make something better'?",
    options: ["Improve", "Destroy", "Maintain", "Observe"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gc" }),

  // WD2: Medium frequency, precise temporal meaning
  // R=1, T=1, B=2, N=1, D=2 → b=-1.45, IQ ~78
  item({
    id: "wd2",
    question: "Which word means 'happening at the same time'?",
    options: ["Simultaneous", "Sequential", "Frequent", "Occasional"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 2, factor: "Gc" }),

  // WD3: Lower frequency, specific political meaning
  // R=1, T=1, B=2, N=2, D=3 → b=-0.85, IQ ~87
  item({
    id: "wd3",
    question: "Which word means 'to formally give up a position of power'?",
    options: ["Abdicate", "Resign", "Retire", "Surrender"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 2, D: 3, factor: "Gc" }),

  // WD6: Rare word, precise temporal meaning (reordered: before wd4 by b value)
  // R=1, T=1, B=3, N=2, D=3 → b=-0.60, IQ ~91
  item({
    id: "wd6",
    question: "'Ephemeral' most precisely means:",
    options: [
      "Lasting for a very short time",
      "Extremely beautiful",
      "Difficult to understand",
      "Relating to the physical world"
    ],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 3, factor: "Gc" }),

  // WD4: Requires distinguishing between related concepts
  // R=1, T=1, B=3, N=2, D=3 → b=-0.60, IQ ~91 (same as wd6)
  item({
    id: "wd4",
    question: "Which word means 'the use of irony to mock or convey contempt'?",
    options: ["Sarcasm", "Humor", "Satire", "Wit"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 3, factor: "Gc" }),

  // WD5: Abstract concept, fine distinctions
  // R=1, T=1, B=3, N=2, D=4 → b=-0.40, IQ ~94
  item({
    id: "wd5",
    question: "Which word best describes 'a tendency to see the worst aspect of things'?",
    options: ["Pessimism", "Cynicism", "Nihilism", "Skepticism"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 4, factor: "Gc" }),

  // WD9: Self-referential word — meta-linguistic (reordered by b)
  // R=1, T=1, B=3, N=3, D=3 → b=-0.25, IQ ~96
  item({
    id: "wd9",
    question: "'Sesquipedalian' most precisely means:",
    options: [
      "Characterized by long words or the use of long words",
      "Relating to a period of 150 years",
      "Having multiple sequential steps",
      "Being extremely precise in measurement"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 1, B: 3, N: 3, D: 3, factor: "Gc" }),

  // WD7: Rare word, abstract meaning about cognition
  // R=1, T=2, B=3, N=3, D=3 → b=0.05, IQ ~101
  // T=2: must distinguish between related cognitive concepts (not just identify)
  item({
    id: "wd7",
    question: "'Perspicacious' most precisely means:",
    options: [
      "Having keen mental perception and understanding",
      "Being extremely careful and precise",
      "Showing great ambition",
      "Being stubbornly persistent"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 3, D: 3, factor: "Gc" }),

  // WD8: Very rare, meta-concept about truth/appearance
  // R=1, T=2, B=3, N=3, D=4 → b=0.25, IQ ~104
  item({
    id: "wd8",
    question: "'Verisimilitude' most precisely means:",
    options: [
      "The appearance of being true or real",
      "The quality of being similar",
      "A truthful statement",
      "An exact replica"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD10: Rare cognitive/perceptual concept
  // R=1, T=2, B=3, N=3, D=4 → b=0.25, IQ ~104
  item({
    id: "wd10",
    question: "'Apophenia' most precisely means:",
    options: [
      "The tendency to perceive meaningful connections between unrelated things",
      "A sudden loss of consciousness",
      "The process of removing unnecessary elements",
      "A type of divine revelation"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD13: Technical philosophical term with overlapping near-concepts
  // R=2, T=1, B=4, N=3, D=4 → b=0.50, IQ ~108
  // R=2: must simultaneously compare 2 conceptual dimensions (subjective vs objective)
  item({
    id: "wd13",
    question: "'Qualia' most precisely refers to:",
    options: [
      "Individual instances of subjective, conscious experience",
      "The measurable qualities of sensory stimuli",
      "The philosophical study of consciousness",
      "Neural correlates of perceptual awareness"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 1, B: 4, N: 3, D: 4, factor: "Gc" }),

  // WD14: Rare logical/philosophical term with near-synonym distractors
  // R=2, T=1, B=4, N=4, D=4 → b=0.85, IQ ~113
  item({
    id: "wd14",
    question: "'Apodictic' most precisely means:",
    options: [
      "Necessarily or demonstrably true, beyond dispute",
      "Based on empirical evidence and observation",
      "Self-evidently true without requiring proof",
      "Logically valid but not necessarily sound"
    ],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 1, B: 4, N: 4, D: 4, factor: "Gc" }),

  // WD15: Technical term requiring cross-domain understanding
  // R=2, T=2, B=4, N=4, D=4 → b=1.15, IQ ~117
  // T=2: must grasp convergence concept (transformation from two domains to one)
  item({
    id: "wd15",
    question: "'Ergodicity' in its precise technical sense means:",
    options: [
      "The property where time averages converge to ensemble averages for a system",
      "The tendency of all systems to reach maximum entropy",
      "The irreversibility of thermodynamic processes",
      "The statistical independence of sequential observations"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 4, D: 4, factor: "Gc" }),

  // WD16: Philosophical term with highly similar distractors
  // R=2, T=2, B=4, N=4, D=5 → b=1.35, IQ ~120
  item({
    id: "wd16",
    question: "'Hypostasis' in philosophical usage most precisely means:",
    options: [
      "The underlying reality or substance, or the reification of an abstract concept",
      "A fundamental assumption upon which a theory rests",
      "The process by which abstract ideas become concrete institutions",
      "A state of suspended existence between two opposing forces"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 4, D: 5, factor: "Gc" }),

  // WD11: Extremely rare philosophical term with near-synonym distractors
  // R=2, T=2, B=4, N=5, D=5 → b=1.70, IQ ~126
  // N=5: word is so rare that prior knowledge actively misleads (common "infinite" associations)
  item({
    id: "wd11",
    question: "'Apeiron' in its original philosophical sense most precisely means:",
    options: [
      "The boundless, indefinite source from which all things arise and to which they return",
      "The concept of infinite mathematical regression",
      "A state of perfect formlessness preceding creation",
      "The unknowable essence underlying all phenomena"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 5, D: 5, factor: "Gc" }),

  // WD12: Rare term requiring precise differentiation of overlapping concepts
  // R=2, T=2, B=4, N=5, D=5 → b=1.70, IQ ~126
  // Same structural ceiling as WD11 — vocabulary recognition maxes out here
  item({
    id: "wd12",
    question: "'Hyperpraxis' most precisely means:",
    options: [
      "Excessive or compulsive engagement in purposeful activity beyond functional necessity",
      "The ability to perform multiple complex actions simultaneously",
      "An elevated state of practical skill transcending conscious effort",
      "Pathological repetition of goal-directed movements"
    ],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 5, D: 5, factor: "Gc" }),
];

// ========================================
// SUBTEST 5: MEMORY SEQUENCES (Gwm)
// ========================================
// WAIS Digit Span isomorphism:
// Structural demands: sequential WM storage.
// Forward: B = span length, R=1, T=1
// Backward: B = span length, R=1, T=2 (reversal transform)
// Difficulty is DIRECTLY determined by B (binding load).
// This is the purest structural mapping — no ambiguity.

export const memorySequences = [
  // Forward span — difficulty scales linearly with B
  item({ id: "ms1", type: "forward", sequence: [3, 7, 2], timeLimit: 10 },
    { R: 1, T: 1, B: 3, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms2", type: "forward", sequence: [5, 1, 8, 4], timeLimit: 12 },
    { R: 1, T: 1, B: 4, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms3", type: "forward", sequence: [9, 2, 6, 3, 7], timeLimit: 15 },
    { R: 1, T: 1, B: 5, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms4", type: "forward", sequence: [4, 8, 1, 5, 9, 3], timeLimit: 18 },
    { R: 1, T: 1, B: 6, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms5", type: "forward", sequence: [7, 2, 5, 9, 1, 8, 3], timeLimit: 20 },
    { R: 1, T: 1, B: 7, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms6", type: "forward", sequence: [3, 6, 1, 9, 4, 7, 2, 8], timeLimit: 22 },
    { R: 1, T: 1, B: 8, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms7", type: "forward", sequence: [5, 8, 2, 9, 1, 6, 3, 7, 4], timeLimit: 25 },
    { R: 1, T: 1, B: 9, N: 1, D: 1, factor: "Gwm" }),

  // Backward span — same B but T=2 (must reverse)
  item({ id: "ms8", type: "backward", sequence: [6, 2, 9], timeLimit: 15 },
    { R: 1, T: 2, B: 3, N: 2, D: 1, factor: "Gwm" }),
  item({ id: "ms9", type: "backward", sequence: [3, 7, 1, 5], timeLimit: 18 },
    { R: 1, T: 2, B: 4, N: 2, D: 1, factor: "Gwm" }),
  item({ id: "ms10", type: "backward", sequence: [8, 4, 2, 7, 1], timeLimit: 20 },
    { R: 1, T: 2, B: 5, N: 2, D: 1, factor: "Gwm" }),
  item({ id: "ms11", type: "backward", sequence: [5, 9, 3, 6, 2, 8], timeLimit: 22 },
    { R: 1, T: 2, B: 6, N: 2, D: 1, factor: "Gwm" }),
  item({ id: "ms12", type: "backward", sequence: [1, 4, 7, 2, 9, 5, 3], timeLimit: 25 },
    { R: 1, T: 2, B: 7, N: 2, D: 1, factor: "Gwm" }),
  item({ id: "ms13", type: "backward", sequence: [6, 3, 8, 1, 5, 9, 2, 7], timeLimit: 28 },
    { R: 1, T: 2, B: 8, N: 2, D: 1, factor: "Gwm" }),

  // Extreme forward spans — 9, 10, 11 digits
  item({ id: "ms14", type: "forward", sequence: [2, 8, 5, 1, 7, 4, 9, 3, 6], timeLimit: 28 },
    { R: 1, T: 1, B: 9, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms15", type: "forward", sequence: [6, 1, 9, 4, 7, 2, 8, 5, 3, 0], timeLimit: 32 },
    { R: 1, T: 1, B: 10, N: 1, D: 1, factor: "Gwm" }),
  item({ id: "ms16", type: "forward", sequence: [3, 9, 2, 7, 0, 5, 8, 1, 6, 4, 9], timeLimit: 35 },
    { R: 1, T: 1, B: 11, N: 1, D: 1, factor: "Gwm" }),
];

// ========================================
// SUBTEST 6: QUANTITATIVE REASONING (Gq)
// ========================================
// WAIS Arithmetic isomorphism:
// Structural demands: numerical rule extraction + application.
// Difficulty scales with:
//   R = number of rules operating in the sequence
//   T = complexity of the mathematical operation
//   B = numbers that must be held to compute next

export const quantitativeReasoning = [
  // QR1: +2 constant addition
  // R=1, T=1 (identify constant), B=2, N=1 (very familiar), D=1
  item({
    id: "qr1",
    sequence: "2, 4, 6, 8, ___",
    options: ["10", "9", "12", "11"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gq" }),

  // QR2: Perfect squares (n²)
  // R=1 (one rule: squaring), T=2 (must identify squaring), B=3, N=1, D=2
  item({
    id: "qr2",
    sequence: "1, 4, 9, 16, ___",
    options: ["25", "20", "24", "36"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 2, B: 3, N: 1, D: 2, factor: "Gq" }),

  // QR3: ×3 geometric progression
  // R=1, T=2 (multiplicative), B=3, N=2, D=2
  item({
    id: "qr3",
    sequence: "2, 6, 18, 54, ___",
    options: ["162", "108", "72", "148"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 2, B: 3, N: 2, D: 2, factor: "Gq" }),

  // QR4: Fibonacci — each term = sum of two preceding
  // R=1 (one rule), T=2, B=4 (need 2 preceding terms + result), N=2, D=2
  item({
    id: "qr4",
    sequence: "1, 1, 2, 3, 5, 8, ___",
    options: ["13", "11", "12", "10"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 2, B: 4, N: 2, D: 2, factor: "Gq" }),

  // QR5: Prime number sequence (reordered: b=+0.25, IQ ~104)
  // R=1, T=2, B=4, N=3 (requires prime concept), D=3
  item({
    id: "qr5",
    sequence: "2, 3, 5, 7, 11, 13, ___",
    options: ["17", "15", "19", "16"],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 4, N: 3, D: 3, factor: "Gq" }),

  // QR6: Factorial — n! = n × (n-1)! (b=+0.35, IQ ~105)
  // R=1, T=3 (must identify factorial growth), B=4, N=3 (less familiar operation), D=2
  item({
    id: "qr6",
    sequence: "1, 2, 6, 24, 120, ___",
    options: ["720", "600", "240", "360"],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 3, B: 4, N: 3, D: 2, factor: "Gq" }),

  // QR7: Increasing differences — differences form +2 sequence (b=+0.40, IQ ~106)
  // R=2 (first-order sequence + second-order pattern), T=2, B=4, N=2, D=3
  item({
    id: "qr7",
    sequence: "3, 5, 9, 15, 23, ___",
    options: ["33", "31", "29", "35"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gq" }),

  // QR8: Alternating operations — ×2 then +3 repeating (b=+0.40, IQ ~106)
  // R=2 (two alternating rules), T=2, B=4, N=2, D=3
  item({
    id: "qr8",
    sequence: "1, 2, 5, 10, 13, 26, ___",
    options: ["29", "52", "30", "28"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gq" }),

  // QR9: Tribonacci — each term = sum of three preceding (b=+0.50, IQ ~108)
  // R=1, T=2, B=5 (need 3 preceding terms), N=3, D=3
  item({
    id: "qr9",
    sequence: "0, 1, 1, 2, 4, 7, 13, ___",
    options: ["24", "20", "26", "22"],
    correct: 0,
    timeLimit: 90,
  }, { R: 1, T: 2, B: 5, N: 3, D: 3, factor: "Gq" }),

  // QR9g: 2ⁿ - 1 (Mersenne-like) (b=+1.05, IQ ~116)
  // R=2 (exponential + offset), T=3, B=4, N=3, D=3
  item({
    id: "qr9g",
    sequence: "1, 3, 7, 15, 31, ___",
    options: ["63", "47", "55", "62"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 3, B: 4, N: 3, D: 3, factor: "Gq" }),

  // QR9c: Second-order differences increasing by 3
  // R=2 (first + second order), T=3, B=5, N=3, D=3
  // b ≈ +1.20 → IQ ~118
  item({
    id: "qr9c",
    sequence: "1, 4, 10, 20, 35, ___",
    options: ["56", "50", "55", "60"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 3, B: 5, N: 3, D: 3, factor: "Gq" }),

  // QR9d: Triangular numbers × position index
  // R=3 (triangular + position + multiplication), T=3, B=5, N=3, D=3
  // b ≈ +1.50 → IQ ~123
  item({
    id: "qr9d",
    sequence: "1, 6, 18, 40, 75, ___",
    options: ["126", "105", "120", "130"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 3, factor: "Gq" }),

  // QR9e: Cubic sequence — third differences constant at 2
  // Differences: 2,5,10,17 → second: 3,5,7 → third: 2,2
  // R=3 (three levels of differencing), T=3, B=5, N=3, D=4
  // b ≈ +1.85 → IQ ~128
  item({
    id: "qr9e",
    sequence: "1, 3, 8, 18, 35, ___",
    options: ["61", "55", "58", "65"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 4, factor: "Gq" }),

  // QR9f: Cube differences — n³ - (n-1)³ = 3n²-3n+1
  // R=3 (cubic + differencing + quadratic result), T=3, B=5, N=3, D=4
  // b ≈ +2.10 → IQ ~132
  item({
    id: "qr9f",
    sequence: "1, 7, 19, 37, 61, ___",
    options: ["91", "85", "95", "87"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 4, factor: "Gq" }),

  // QR10: n²(n+1) — polynomial with interaction
  // R=3 (squaring + increment + multiplication), T=3, B=5, N=3, D=4
  item({
    id: "qr10",
    sequence: "2, 12, 36, 80, 150, ___",
    options: ["252", "210", "240", "270"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 4, factor: "Gq" }),

  // QR10b: Multi-step optimization with constraints
  // R=4, T=4, B=6, N=3, D=4
  item({
    id: "qr10b",
    question: "A function f satisfies: f(x+y) = f(x)\u00b7f(y) for all real x,y, and f(1) = 3. What is f(5)?",
    options: ["243", "125", "81", "729"],
    correct: 0,
    timeLimit: 90,
  }, { R: 4, T: 4, B: 6, N: 3, D: 4, factor: "Gq" }),

  // QR10c: Abstract number theory reasoning
  // R=4, T=4, B=7, N=4, D=5
  // Squares: 31, Cubes: 10, Sixth powers: 3 (1,64,729). Inclusion-exclusion: 31+10-3=38. Answer: 1000-38=962
  item({
    id: "qr10c",
    question: "How many integers from 1 to 1000 are neither perfect squares nor perfect cubes?",
    options: ["962", "963", "958", "970"],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 7, N: 4, D: 5, factor: "Gq" }),

  // QR11: Nested recurrence with modular arithmetic
  // a(n) = a(n-1)² mod 97 + a(n-2), requiring simultaneous modular squaring and addition
  // R=5 (squaring + modular reduction + addition + two-term lookback + interaction), T=5, B=7, N=4, D=5
  // a(1)=3, a(2)=5
  // a(3) = 25 mod 97 + 3 = 28
  // a(4) = 784 mod 97 + 5 = 8 + 5 = 13 (784 = 8×97 + 8)
  // a(5) = 169 mod 97 + 28 = 72 + 28 = 100
  // a(6) = 10000 mod 97 + 13 = 9 + 13 = 22 (10000 = 103×97 + 9)
  item({
    id: "qr11",
    question: "Given a(1)=3, a(2)=5, and a(n) = a(n-1)² mod 97 + a(n-2), what is a(6)?",
    options: ["22", "45", "13", "100"],
    correct: 0,
    timeLimit: 150,
  }, { R: 5, T: 5, B: 7, N: 4, D: 5, factor: "Gq" }),

  // QR12: Multi-rule interleaved sequence with conditional branching
  // If previous term is even: divide by 2 then add the position index.
  // If previous term is odd: multiply by 3 then subtract the position index.
  // Starting from 7: must track parity, position, and two different operations.
  // R=5 (parity check + two operation branches + position tracking + cumulative state), T=5, B=8, N=4, D=5
  item({
    id: "qr12",
    sequence: "Position 1: 7 (odd→3×7−1=20), Position 2: 20 (even→20/2+2=12), Position 3: 12 (even→12/2+3=9), Position 4: 9 (odd→3×9−4=23), Position 5: 23 (odd→3×23−5=64), Position 6: ?",
    question: "Given the rule: if a(n) is even, a(n+1) = a(n)/2 + n; if a(n) is odd, a(n+1) = 3×a(n) − n. Starting with a(1)=7, what is a(7)?",
    options: ["38", "35", "41", "29"],
    correct: 0,
    timeLimit: 150,
  }, { R: 5, T: 5, B: 8, N: 4, D: 5, factor: "Gq" }),
];

// ========================================
// SUBTEST 7: SPEED MATCH (Gs)
// ========================================
// WAIS Coding/Symbol Search isomorphism:
// Structural demands: perceptual matching + motor response.
// Low R, low T, low N — variance comes from SPEED, not complexity.
// Scored differently: accuracy × speed composite.

export const speedMatch = {
  symbols: ["◆", "◇", "●", "○", "■", "□", "▲", "△", "★", "☆", "♠", "♣", "♥", "♦", "⬟", "⬡"],
  totalTrials: 40,
  timeLimit: 90,
  // Each trial: R=1, T=1, B=2, N=1, D=2
  // Uniform structural demand — speed is the measurement target
  trialDecomp: { R: 1, T: 1, B: 2, N: 1, D: 2, factor: "Gs" },
};

// ========================================
// SUBTEST METADATA
// ========================================
export const subtests = [
  {
    id: "pattern_matrices",
    name: "Pattern Matrices",
    nameShort: "PM",
    factor: "Gf-WM",
    description: "Visual pattern completion requiring simultaneous rule tracking and active manipulation in working memory",
    icon: "🧩",
    itemCount: 13,
    estimatedTime: "10 min",
    weight: 0.20,
  },
  {
    id: "relational_reasoning",
    name: "Relational Reasoning",
    nameShort: "RR",
    factor: "Gf-WMC",
    description: "Multi-step logical deduction requiring large relational structures to be held simultaneously",
    icon: "🔗",
    itemCount: 13,
    estimatedTime: "10 min",
    weight: 0.20,
  },
  {
    id: "conceptual_links",
    name: "Conceptual Links",
    nameShort: "CL",
    factor: "Gc",
    description: "Verbal analogies measuring depth of abstract conceptual reasoning",
    icon: "💡",
    itemCount: 13,
    estimatedTime: "5 min",
    weight: 0.15,
  },
  {
    id: "word_depth",
    name: "Word Depth",
    nameShort: "WD",
    factor: "Gc",
    description: "Vocabulary depth — precision of semantic knowledge",
    icon: "📖",
    itemCount: 16,
    estimatedTime: "5 min",
    weight: 0.10,
  },
  {
    id: "memory_sequences",
    name: "Memory Sequences",
    nameShort: "MS",
    factor: "Gwm",
    description: "Forward and backward digit span — pure working memory capacity",
    icon: "🧠",
    itemCount: 16,
    estimatedTime: "6 min",
    weight: 0.15,
  },
  {
    id: "quantitative_reasoning",
    name: "Quantitative Reasoning",
    nameShort: "QR",
    factor: "Gq",
    description: "Number pattern recognition and mathematical rule extraction",
    icon: "🔢",
    itemCount: 19,
    estimatedTime: "12 min",
    weight: 0.10,
  },
  {
    id: "speed_match",
    name: "Speed Match",
    nameShort: "SM",
    factor: "Gs",
    description: "Perceptual symbol matching under time pressure — processing speed",
    icon: "⚡",
    itemCount: 40,
    estimatedTime: "2 min",
    weight: 0.10,
  },
];
