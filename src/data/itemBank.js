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
  // PM1: Latin square — each shape once per row/column
  // R=1 (one rule: permutation), T=2 (cyclic shift), B=3 (track 3 shapes), N=2, D=2
  item({
    id: "pm1",
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

  // PM2: Increment pattern — dots increase +1 per cell
  // R=1 (one rule: +1), T=2 (increment), B=3, N=1 (very familiar), D=2
  item({
    id: "pm2",
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

  // PM7: XOR logic — each cell is the XOR of two base patterns; row wraps
  // R=3 (XOR operation + two source patterns + wraparound rule), T=3 (compound: overlay + XOR), B=5, N=3 (novel operation), D=3
  item({
    id: "pm7",
    grid: [
      ["A-xor-B", "B-xor-C", "C-xor-A"],
      ["D-xor-E", "E-xor-F", "F-xor-D"],
      ["G-xor-H", "H-xor-I", "?"]
    ],
    rule: "Each cell = XOR of two base patterns; third cell XORs last element with first (wraparound)",
    options: ["I-xor-G", "I-xor-H", "G-xor-I", "H-xor-G"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 3, factor: "Gf" }),

  // PM8: Row rule + column rule independently — reflection + rotation + color shift
  // R=3 (3 independent rules across 2 axes), T=3 (compound), B=6, N=3, D=3
  item({
    id: "pm8",
    grid: [
      ["r1c1", "r1c2", "r1c3"],
      ["r2c1", "r2c2", "r2c3"],
      ["r3c1", "r3c2", "?"]
    ],
    rule: "Row axis: progressive horizontal reflection. Column axis: progressive 90° rotation. Both: progressive color darkening",
    options: ["r3c3-a", "r3c3-b", "r3c3-c", "r3c3-d"],
    correct: 0,
    timeLimit: 90,
    // Rendered programmatically — shape transforms along both axes
    programmatic: {
      baseShape: "L-shape",
      rowTransform: "reflect-horizontal",
      colTransform: "rotate-90-cw",
      colorProgression: ["#818cf8", "#6366f1", "#4f46e5"],
    }
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  // PM9: Two overlaid rules — shape transformation + independent pattern overlay
  // R=4 (shape rule + overlay rule + row context + column context), T=4 (conditional), B=6, N=3, D=4
  item({
    id: "pm9",
    grid: [
      ["shape-a1-overlay-x", "shape-a2-overlay-y", "shape-a3-overlay-z"],
      ["shape-b1-overlay-z", "shape-b2-overlay-x", "shape-b3-overlay-y"],
      ["shape-c1-overlay-y", "shape-c2-overlay-z", "?"]
    ],
    rule: "Shapes follow one Latin square, overlays follow another independent Latin square. Must track both simultaneously",
    options: ["shape-c3-overlay-x", "shape-c3-overlay-y", "shape-c3-overlay-z", "shape-b3-overlay-x"],
    correct: 0,
    timeLimit: 120,
    programmatic: {
      shapeLatin: [["circle","square","triangle"],["square","triangle","circle"],["triangle","circle","?"]],
      overlayLatin: [["dots","stripes","grid"],["grid","dots","stripes"],["stripes","grid","?"]],
    }
  }, { R: 4, T: 4, B: 6, N: 3, D: 4, factor: "Gf" }),

  // PM10: Three simultaneous rules + meta-pattern
  // R=4, T=5 (meta — rule itself changes), B=7, N=4 (counter-intuitive), D=4
  item({
    id: "pm10",
    grid: [
      ["meta-1", "meta-2", "meta-3"],
      ["meta-4", "meta-5", "meta-6"],
      ["meta-7", "meta-8", "?"]
    ],
    rule: "Three rules: shape, fill, size. But: the RULE for shape changes per row (row1=cycle, row2=reverse-cycle, row3=?). Must infer the meta-pattern of how rules themselves transform",
    options: ["meta-9a", "meta-9b", "meta-9c", "meta-9d"],
    correct: 0,
    timeLimit: 120,
    programmatic: {
      description: "Row 1: shapes cycle (A→B→C). Row 2: shapes reverse-cycle (C→B→A). Row 3: shapes follow the meta-pattern of the rule transformation. Fill: always increments. Size: Latin square.",
    }
  }, { R: 4, T: 5, B: 7, N: 4, D: 4, factor: "Gf" }),
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

  // RR6: Causal system — 3 switches, 3 lights, non-trivial mapping
  // R=3 (3 switch-light mappings to infer), T=3 (compound: toggle + interaction), B=6, N=3, D=3
  item({
    id: "rr6",
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

  // RR7: Code-breaking — letter→number mapping from 3 examples
  // R=3 (3 simultaneous equations), T=3 (solve system), B=6 (6 letter-number pairs), N=2, D=3
  item({
    id: "rr7",
    premise: "A code maps letters to numbers: CAB = 312, BAD = 213, ACE = 135. Each letter always maps to the same number.",
    question: "What is the code for BED?",
    options: ["253", "235", "325", "532"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 6, N: 2, D: 3, factor: "Gf" }),

  // RR8: Dynamic system with feedback — must simulate to equilibrium
  // R=4 (4 causal links forming a cycle), T=4 (conditional + recursive simulation), B=5 (5 variables), N=3, D=4
  item({
    id: "rr8",
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

  // RR9: Gear system — ratio + direction propagation through chain
  // R=3 (ratio × direction × chain), T=3 (multiplicative chain), B=6 (4 gears × teeth + direction), N=3, D=3
  item({
    id: "rr9",
    premise: "Four gears mesh in sequence: A→B→C→D. A has 12 teeth, B has 8, C has 16, D has 6. When A makes exactly 3 full turns clockwise:",
    question: "How many turns does D make and in which direction?",
    options: [
      "12 turns clockwise",
      "12 turns counterclockwise",
      "8 turns clockwise",
      "6 turns counterclockwise"
    ],
    correct: 0,
    timeLimit: 120,
  }, { R: 3, T: 3, B: 6, N: 3, D: 3, factor: "Gf" }),

  // RR10: Interleaved cyclical rule application — must track rule index + state
  // R=4 (3 rules + cycle tracking), T=4 (conditional application by position), B=7 (sequence + rule state + position), N=3, D=4
  item({
    id: "rr10",
    premise: "A sequence is generated by three interleaved rules applied cyclically. Rule 1: multiply by 2. Rule 2: add 3. Rule 3: subtract 1. Starting from 1: 1, 2, 5, 4, 8, 11, 10, 20, 23, ...",
    question: "What is the 12th number in this sequence?",
    options: ["44", "45", "43", "46"],
    correct: 0,
    timeLimit: 120,
  }, { R: 4, T: 4, B: 7, N: 3, D: 4, factor: "Gf" }),
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
];

// ========================================
// SUBTEST 4: WORD DEPTH (Gc)
// ========================================
// WAIS Vocabulary isomorphism:
// Structural demands: semantic precision.
// Difficulty scales with:
//   Word frequency (rare = harder)
//   Abstractness (abstract = harder)
//   Distractor similarity (near-synonyms = harder)
// B is low (2-3) but D scales high for hard items.

export const wordDepth = [
  // WD1: Common word, concrete meaning
  // R=1, T=1 (identify), B=2, N=1 (familiar), D=1 (obvious distractors)
  item({
    id: "wd1",
    question: "Which word means 'to make something better'?",
    options: ["Improve", "Destroy", "Maintain", "Observe"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 1, factor: "Gc" }),

  // WD2: Medium frequency, precise temporal meaning
  // R=1, T=1, B=2, N=1, D=2 (sequential is a plausible confuse)
  item({
    id: "wd2",
    question: "Which word means 'happening at the same time'?",
    options: ["Simultaneous", "Sequential", "Frequent", "Occasional"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 1, D: 2, factor: "Gc" }),

  // WD3: Lower frequency, specific political meaning
  // R=1, T=1, B=2, N=2, D=3 (resign/retire are near-synonyms)
  item({
    id: "wd3",
    question: "Which word means 'to formally give up a position of power'?",
    options: ["Abdicate", "Resign", "Retire", "Surrender"],
    correct: 0,
    timeLimit: 30,
  }, { R: 1, T: 1, B: 2, N: 2, D: 3, factor: "Gc" }),

  // WD4: Requires distinguishing between related concepts
  // R=1, T=1, B=3 (must compare 4 similar concepts), N=2, D=3
  item({
    id: "wd4",
    question: "Which word means 'the use of irony to mock or convey contempt'?",
    options: ["Sarcasm", "Humor", "Satire", "Wit"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 3, factor: "Gc" }),

  // WD5: Abstract concept, fine distinctions
  // R=1, T=1, B=3, N=2, D=4 (cynicism, nihilism, skepticism are all close)
  item({
    id: "wd5",
    question: "Which word best describes 'a tendency to see the worst aspect of things'?",
    options: ["Pessimism", "Cynicism", "Nihilism", "Skepticism"],
    correct: 0,
    timeLimit: 45,
  }, { R: 1, T: 1, B: 3, N: 2, D: 4, factor: "Gc" }),

  // WD6: Rare word, precise temporal meaning
  // R=1, T=1, B=3, N=2, D=3
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

  // WD7: Rare word, abstract meaning about cognition
  // R=1, T=1, B=3, N=3, D=3
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 3, factor: "Gc" }),

  // WD8: Very rare, meta-concept about truth/appearance
  // R=1, T=1, B=3, N=3, D=4 (similarity/truthful are near-misses)
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD9: Self-referential word — meta-linguistic
  // R=1, T=1, B=3, N=3, D=4
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),

  // WD10: Rare cognitive/perceptual concept
  // R=1, T=1, B=3, N=3, D=4
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
  }, { R: 1, T: 1, B: 3, N: 3, D: 4, factor: "Gc" }),
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

  // QR5: Increasing differences — differences form +2 sequence
  // R=2 (first-order sequence + second-order pattern), T=2, B=4, N=2, D=3
  item({
    id: "qr5",
    sequence: "3, 5, 9, 15, 23, ___",
    options: ["33", "31", "29", "35"],
    correct: 0,
    timeLimit: 60,
  }, { R: 2, T: 2, B: 4, N: 2, D: 3, factor: "Gq" }),

  // QR6: Factorial — n! = n × (n-1)!
  // R=1, T=3 (must identify factorial growth), B=4, N=3 (less familiar operation), D=2
  item({
    id: "qr6",
    sequence: "1, 2, 6, 24, 120, ___",
    options: ["720", "600", "240", "360"],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 3, B: 4, N: 3, D: 2, factor: "Gq" }),

  // QR7: Prime number sequence
  // R=1, T=2, B=4, N=3 (requires prime concept), D=3
  item({
    id: "qr7",
    sequence: "2, 3, 5, 7, 11, 13, ___",
    options: ["17", "15", "19", "16"],
    correct: 0,
    timeLimit: 60,
  }, { R: 1, T: 2, B: 4, N: 3, D: 3, factor: "Gq" }),

  // QR8: 2ⁿ - 1 (Mersenne-like)
  // R=2 (exponential + offset), T=3, B=4, N=3, D=3
  item({
    id: "qr8",
    sequence: "1, 3, 7, 15, 31, ___",
    options: ["63", "47", "55", "62"],
    correct: 0,
    timeLimit: 75,
  }, { R: 2, T: 3, B: 4, N: 3, D: 3, factor: "Gq" }),

  // QR9: Tribonacci — each term = sum of three preceding
  // R=1, T=2, B=5 (need 3 preceding terms), N=3, D=3
  item({
    id: "qr9",
    sequence: "0, 1, 1, 2, 4, 7, 13, ___",
    options: ["24", "20", "26", "22"],
    correct: 0,
    timeLimit: 90,
  }, { R: 1, T: 2, B: 5, N: 3, D: 3, factor: "Gq" }),

  // QR10: n²(n+1) — polynomial with interaction
  // R=3 (squaring + increment + multiplication), T=3, B=5, N=3, D=4
  item({
    id: "qr10",
    sequence: "2, 12, 36, 80, 150, ___",
    options: ["252", "210", "240", "270"],
    correct: 0,
    timeLimit: 90,
  }, { R: 3, T: 3, B: 5, N: 3, D: 4, factor: "Gq" }),
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
    itemCount: 10,
    estimatedTime: "8 min",
    weight: 0.20,
  },
  {
    id: "relational_reasoning",
    name: "Relational Reasoning",
    nameShort: "RR",
    factor: "Gf-WMC",
    description: "Multi-step logical deduction requiring large relational structures to be held simultaneously",
    icon: "🔗",
    itemCount: 10,
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
    itemCount: 10,
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
    itemCount: 10,
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
    itemCount: 13,
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
    itemCount: 10,
    estimatedTime: "8 min",
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
