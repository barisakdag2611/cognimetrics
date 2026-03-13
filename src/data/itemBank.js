// IQ Test Item Bank
// Each item has: id, difficulty (IRT b parameter), discrimination (IRT a parameter)
// Difficulty range: -3 (very easy) to +3 (very hard)
// Items are WAIS-isomorphic but legally distinct

// ========================================
// SUBTEST 1: Pattern Matrices (Gf - WM weighted)
// Visual pattern completion - 3x3 grid with missing piece
// Encoded as SVG pattern descriptions
// ========================================
export const patternMatrices = [
  // Easy items (IQ ~85-100)
  {
    id: "pm1",
    difficulty: -2.0,
    discrimination: 1.2,
    // Simple rotation pattern
    grid: [
      ["circle", "square", "triangle"],
      ["square", "triangle", "circle"],
      ["triangle", "circle", "?"]
    ],
    rule: "Each shape appears once per row and column (Latin square)",
    options: ["square", "triangle", "circle", "diamond"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "pm2",
    difficulty: -1.5,
    discrimination: 1.3,
    grid: [
      ["1dot", "2dot", "3dot"],
      ["2dot", "3dot", "4dot"],
      ["3dot", "4dot", "?"]
    ],
    rule: "Each row increases by 1 dot; column pattern +1",
    options: ["4dot", "5dot", "6dot", "3dot"],
    correct: 1,
    timeLimit: 60,
  },
  {
    id: "pm3",
    difficulty: -1.0,
    discrimination: 1.4,
    grid: [
      ["red-circle", "blue-circle", "green-circle"],
      ["red-square", "blue-square", "green-square"],
      ["red-triangle", "blue-triangle", "?"]
    ],
    rule: "Rows share shape, columns share color",
    options: ["green-triangle", "red-triangle", "blue-circle", "green-square"],
    correct: 0,
    timeLimit: 60,
  },
  // Medium items (IQ ~100-120)
  {
    id: "pm4",
    difficulty: -0.5,
    discrimination: 1.5,
    grid: [
      ["up-arrow-1", "right-arrow-2", "down-arrow-3"],
      ["right-arrow-2", "down-arrow-3", "left-arrow-4"],
      ["down-arrow-3", "left-arrow-4", "?"]
    ],
    rule: "90° clockwise rotation per cell, count increases by 1",
    options: ["up-arrow-5", "up-arrow-4", "right-arrow-5", "left-arrow-5"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "pm5",
    difficulty: 0.0,
    discrimination: 1.6,
    grid: [
      ["small-circle-inside-square", "medium-circle-inside-square", "large-circle-inside-square"],
      ["small-square-inside-circle", "medium-square-inside-circle", "large-square-inside-circle"],
      ["small-triangle-inside-diamond", "medium-triangle-inside-diamond", "?"]
    ],
    rule: "Size increases left to right; inner/outer shapes pair by row",
    options: [
      "large-triangle-inside-diamond",
      "large-diamond-inside-triangle",
      "medium-triangle-inside-diamond",
      "large-circle-inside-diamond"
    ],
    correct: 0,
    timeLimit: 75,
  },
  {
    id: "pm6",
    difficulty: 0.5,
    discrimination: 1.7,
    grid: [
      ["2lines-cross", "3lines-star", "4lines-asterisk"],
      ["filled-2lines", "filled-3lines", "filled-4lines"],
      ["dashed-2lines", "dashed-3lines", "?"]
    ],
    rule: "Lines increase by 1; fill style changes per row",
    options: ["dashed-4lines", "dashed-5lines", "filled-4lines", "solid-4lines"],
    correct: 0,
    timeLimit: 75,
  },
  // Hard items (IQ ~120-140)
  {
    id: "pm7",
    difficulty: 1.0,
    discrimination: 1.8,
    grid: [
      ["A-xor-B", "B-xor-C", "C-xor-A"],
      ["D-xor-E", "E-xor-F", "F-xor-D"],
      ["G-xor-H", "H-xor-I", "?"]
    ],
    rule: "XOR operation between two overlapping shapes per cell; third cell XORs last and first",
    options: ["I-xor-G", "I-xor-H", "G-xor-I", "H-xor-G"],
    correct: 0,
    timeLimit: 90,
  },
  {
    id: "pm8",
    difficulty: 1.5,
    discrimination: 1.9,
    grid: [
      ["transform-1", "transform-2", "transform-3"],
      ["transform-4", "transform-5", "transform-6"],
      ["transform-7", "transform-8", "?"]
    ],
    rule: "Row: progressive reflection + rotation; Column: progressive scaling + color shift",
    options: ["transform-9a", "transform-9b", "transform-9c", "transform-9d"],
    correct: 0,
    timeLimit: 90,
  },
  // Very hard items (IQ ~140-160)
  {
    id: "pm9",
    difficulty: 2.0,
    discrimination: 2.0,
    grid: [
      ["dual-rule-1", "dual-rule-2", "dual-rule-3"],
      ["dual-rule-4", "dual-rule-5", "dual-rule-6"],
      ["dual-rule-7", "dual-rule-8", "?"]
    ],
    rule: "Two independent rules operating simultaneously: shape transformation + pattern overlay",
    options: ["dual-9a", "dual-9b", "dual-9c", "dual-9d"],
    correct: 0,
    timeLimit: 120,
  },
  {
    id: "pm10",
    difficulty: 2.5,
    discrimination: 2.0,
    grid: [
      ["triple-rule-1", "triple-rule-2", "triple-rule-3"],
      ["triple-rule-4", "triple-rule-5", "triple-rule-6"],
      ["triple-rule-7", "triple-rule-8", "?"]
    ],
    rule: "Three simultaneous rules: shape, fill, orientation — each following independent progression",
    options: ["triple-9a", "triple-9b", "triple-9c", "triple-9d"],
    correct: 0,
    timeLimit: 120,
  },
];

// ========================================
// SUBTEST 2: Relational Reasoning (Gf - WMC weighted)
// Multi-step logical deduction - more complex, requires holding multiple rules
// ========================================
export const relationalReasoning = [
  {
    id: "rr1",
    difficulty: -1.5,
    discrimination: 1.3,
    premise: "All A are B. All B are C.",
    question: "If X is A, then X is definitely:",
    options: ["C", "Not C", "Maybe C", "Cannot determine"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "rr2",
    difficulty: -1.0,
    discrimination: 1.4,
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
  },
  {
    id: "rr3",
    difficulty: -0.5,
    discrimination: 1.5,
    premise: "P → Q. Q → R. ¬R.",
    question: "What can we conclude?",
    options: ["¬P", "P", "Q", "Cannot determine"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "rr4",
    difficulty: 0.0,
    discrimination: 1.6,
    premise: "Among 5 people (A-E): A is taller than B. C is shorter than D. B is taller than C. E is shorter than A but taller than D.",
    question: "Who is the shortest?",
    options: ["C", "B", "E", "D"],
    correct: 0,
    timeLimit: 75,
  },
  {
    id: "rr5",
    difficulty: 0.5,
    discrimination: 1.7,
    premise: "In a row of 6 seats: F sits next to G. H cannot sit next to I. J sits at one end. K sits exactly 2 seats from J.",
    question: "If G sits in seat 3, which seat must F be in?",
    options: ["2 or 4", "Only 2", "Only 4", "1 or 5"],
    correct: 0,
    timeLimit: 90,
  },
  {
    id: "rr6",
    difficulty: 1.0,
    discrimination: 1.8,
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
  },
  {
    id: "rr7",
    difficulty: 1.5,
    discrimination: 1.9,
    premise: "A code maps letters to numbers: CAB = 312, BAD = 213, ACE = 135. Each letter always maps to the same number.",
    question: "What is the code for BED?",
    options: ["253", "235", "325", "532"],
    correct: 0,
    timeLimit: 90,
  },
  {
    id: "rr8",
    difficulty: 2.0,
    discrimination: 2.0,
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
  },
  {
    id: "rr9",
    difficulty: 2.5,
    discrimination: 2.0,
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
  },
  {
    id: "rr10",
    difficulty: 3.0,
    discrimination: 2.0,
    premise: "A sequence is generated by three interleaved rules applied cyclically. Rule 1: multiply by 2. Rule 2: add 3. Rule 3: subtract 1. Starting from 1: 1, 2, 5, 4, 8, 11, 10, 20, 23, ...",
    question: "What is the 12th number in this sequence?",
    options: ["44", "45", "43", "46"],
    correct: 0,
    timeLimit: 120,
  },
];

// ========================================
// SUBTEST 3: Conceptual Links (Gc - Verbal reasoning)
// Verbal analogies with increasing abstraction
// ========================================
export const conceptualLinks = [
  {
    id: "cl1",
    difficulty: -2.0,
    discrimination: 1.2,
    analogy: "Hot is to Cold as Day is to ___",
    options: ["Night", "Sun", "Light", "Morning"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "cl2",
    difficulty: -1.5,
    discrimination: 1.3,
    analogy: "Pen is to Writer as Brush is to ___",
    options: ["Painter", "Canvas", "Art", "Color"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "cl3",
    difficulty: -1.0,
    discrimination: 1.4,
    analogy: "Seed is to Tree as Egg is to ___",
    options: ["Bird", "Nest", "Shell", "Chicken"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "cl4",
    difficulty: -0.5,
    discrimination: 1.5,
    analogy: "Telescope is to Stars as Microscope is to ___",
    options: ["Cells", "Glass", "Laboratory", "Eyes"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "cl5",
    difficulty: 0.0,
    discrimination: 1.6,
    analogy: "Caterpillar is to Butterfly as Tadpole is to ___",
    options: ["Frog", "Water", "Lily", "Metamorphosis"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "cl6",
    difficulty: 0.5,
    discrimination: 1.7,
    analogy: "Symphony is to Composer as Blueprint is to ___",
    options: ["Architect", "Building", "Engineer", "Design"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "cl7",
    difficulty: 1.0,
    discrimination: 1.8,
    analogy: "Entropy is to Order as Erosion is to ___",
    options: ["Landscape", "Water", "Mountain", "Geology"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "cl8",
    difficulty: 1.5,
    discrimination: 1.9,
    analogy: "Axiom is to Theorem as Constitution is to ___",
    options: ["Law", "Government", "Rights", "Democracy"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "cl9",
    difficulty: 2.0,
    discrimination: 2.0,
    analogy: "Syntax is to Grammar as Protocol is to ___",
    options: ["Communication", "Network", "Internet", "Rules"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "cl10",
    difficulty: 2.5,
    discrimination: 2.0,
    analogy: "Isomorphism is to Structure as Translation is to ___",
    options: ["Meaning", "Language", "Words", "Culture"],
    correct: 0,
    timeLimit: 60,
  },
];

// ========================================
// SUBTEST 4: Word Depth (Gc - Semantic knowledge)
// "Which word most precisely means..." — vocabulary depth
// ========================================
export const wordDepth = [
  {
    id: "wd1",
    difficulty: -2.0,
    discrimination: 1.2,
    question: "Which word means 'to make something better'?",
    options: ["Improve", "Destroy", "Maintain", "Observe"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "wd2",
    difficulty: -1.5,
    discrimination: 1.3,
    question: "Which word means 'happening at the same time'?",
    options: ["Simultaneous", "Sequential", "Frequent", "Occasional"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "wd3",
    difficulty: -1.0,
    discrimination: 1.4,
    question: "Which word means 'to formally give up a position of power'?",
    options: ["Abdicate", "Resign", "Retire", "Surrender"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "wd4",
    difficulty: -0.5,
    discrimination: 1.5,
    question: "Which word means 'the use of irony to mock or convey contempt'?",
    options: ["Sarcasm", "Humor", "Satire", "Wit"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "wd5",
    difficulty: 0.0,
    discrimination: 1.6,
    question: "Which word best describes 'a tendency to see the worst aspect of things'?",
    options: ["Pessimism", "Cynicism", "Nihilism", "Skepticism"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "wd6",
    difficulty: 0.5,
    discrimination: 1.7,
    question: "'Ephemeral' most precisely means:",
    options: [
      "Lasting for a very short time",
      "Extremely beautiful",
      "Difficult to understand",
      "Relating to the physical world"
    ],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "wd7",
    difficulty: 1.0,
    discrimination: 1.8,
    question: "'Perspicacious' most precisely means:",
    options: [
      "Having keen mental perception and understanding",
      "Being extremely careful and precise",
      "Showing great ambition",
      "Being stubbornly persistent"
    ],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "wd8",
    difficulty: 1.5,
    discrimination: 1.9,
    question: "'Verisimilitude' most precisely means:",
    options: [
      "The appearance of being true or real",
      "The quality of being similar",
      "A truthful statement",
      "An exact replica"
    ],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "wd9",
    difficulty: 2.0,
    discrimination: 2.0,
    question: "'Sesquipedalian' most precisely means:",
    options: [
      "Characterized by long words or the use of long words",
      "Relating to a period of 150 years",
      "Having multiple sequential steps",
      "Being extremely precise in measurement"
    ],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "wd10",
    difficulty: 2.5,
    discrimination: 2.0,
    question: "'Apophenia' most precisely means:",
    options: [
      "The tendency to perceive meaningful connections between unrelated things",
      "A sudden loss of consciousness",
      "The process of removing unnecessary elements",
      "A type of divine revelation"
    ],
    correct: 0,
    timeLimit: 60,
  },
];

// ========================================
// SUBTEST 5: Memory Sequences (Gwm)
// Forward and backward span — digit, letter, spatial
// ========================================
export const memorySequences = [
  // Forward span
  { id: "ms1", difficulty: -2.0, discrimination: 1.2, type: "forward", sequence: [3, 7, 2], timeLimit: 10 },
  { id: "ms2", difficulty: -1.5, discrimination: 1.3, type: "forward", sequence: [5, 1, 8, 4], timeLimit: 12 },
  { id: "ms3", difficulty: -1.0, discrimination: 1.4, type: "forward", sequence: [9, 2, 6, 3, 7], timeLimit: 15 },
  { id: "ms4", difficulty: -0.5, discrimination: 1.5, type: "forward", sequence: [4, 8, 1, 5, 9, 3], timeLimit: 18 },
  { id: "ms5", difficulty: 0.0, discrimination: 1.6, type: "forward", sequence: [7, 2, 5, 9, 1, 8, 3], timeLimit: 20 },
  { id: "ms6", difficulty: 0.5, discrimination: 1.7, type: "forward", sequence: [3, 6, 1, 9, 4, 7, 2, 8], timeLimit: 22 },
  { id: "ms7", difficulty: 1.0, discrimination: 1.8, type: "forward", sequence: [5, 8, 2, 9, 1, 6, 3, 7, 4], timeLimit: 25 },
  // Backward span
  { id: "ms8", difficulty: 0.5, discrimination: 1.5, type: "backward", sequence: [6, 2, 9], timeLimit: 15 },
  { id: "ms9", difficulty: 1.0, discrimination: 1.6, type: "backward", sequence: [3, 7, 1, 5], timeLimit: 18 },
  { id: "ms10", difficulty: 1.5, discrimination: 1.7, type: "backward", sequence: [8, 4, 2, 7, 1], timeLimit: 20 },
  { id: "ms11", difficulty: 2.0, discrimination: 1.8, type: "backward", sequence: [5, 9, 3, 6, 2, 8], timeLimit: 22 },
  { id: "ms12", difficulty: 2.5, discrimination: 1.9, type: "backward", sequence: [1, 4, 7, 2, 9, 5, 3], timeLimit: 25 },
  { id: "ms13", difficulty: 3.0, discrimination: 2.0, type: "backward", sequence: [6, 3, 8, 1, 5, 9, 2, 7], timeLimit: 28 },
];

// ========================================
// SUBTEST 6: Quantitative Reasoning (Gq)
// Number patterns and mathematical relationships
// ========================================
export const quantitativeReasoning = [
  {
    id: "qr1",
    difficulty: -2.0,
    discrimination: 1.2,
    sequence: "2, 4, 6, 8, ___",
    options: ["10", "9", "12", "11"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "qr2",
    difficulty: -1.5,
    discrimination: 1.3,
    sequence: "1, 4, 9, 16, ___",
    options: ["25", "20", "24", "36"],
    correct: 0,
    timeLimit: 30,
  },
  {
    id: "qr3",
    difficulty: -1.0,
    discrimination: 1.4,
    sequence: "2, 6, 18, 54, ___",
    options: ["162", "108", "72", "148"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "qr4",
    difficulty: -0.5,
    discrimination: 1.5,
    sequence: "1, 1, 2, 3, 5, 8, ___",
    options: ["13", "11", "12", "10"],
    correct: 0,
    timeLimit: 45,
  },
  {
    id: "qr5",
    difficulty: 0.0,
    discrimination: 1.6,
    sequence: "3, 5, 9, 15, 23, ___",
    options: ["33", "31", "29", "35"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "qr6",
    difficulty: 0.5,
    discrimination: 1.7,
    sequence: "1, 2, 6, 24, 120, ___",
    options: ["720", "600", "240", "360"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "qr7",
    difficulty: 1.0,
    discrimination: 1.8,
    sequence: "2, 3, 5, 7, 11, 13, ___",
    options: ["17", "15", "19", "16"],
    correct: 0,
    timeLimit: 60,
  },
  {
    id: "qr8",
    difficulty: 1.5,
    discrimination: 1.9,
    sequence: "1, 3, 7, 15, 31, ___",
    options: ["63", "47", "55", "62"],
    correct: 0,
    timeLimit: 75,
  },
  {
    id: "qr9",
    difficulty: 2.0,
    discrimination: 2.0,
    sequence: "0, 1, 1, 2, 4, 7, 13, ___",
    options: ["24", "20", "26", "22"],
    correct: 0,
    timeLimit: 90,
  },
  {
    id: "qr10",
    difficulty: 2.5,
    discrimination: 2.0,
    sequence: "2, 12, 36, 80, 150, ___",
    options: ["252", "210", "240", "270"],
    correct: 0,
    timeLimit: 90,
  },
];

// ========================================
// SUBTEST 7: Speed Match (Gs - Processing speed)
// Symbol matching under time pressure
// ========================================
export const speedMatch = {
  // Symbol pairs for matching
  symbols: ["◆", "◇", "●", "○", "■", "□", "▲", "△", "★", "☆", "♠", "♣", "♥", "♦", "⬟", "⬡"],
  totalTrials: 40,
  timeLimit: 90, // 90 seconds total for all 40 trials
  // Each trial: show a target symbol + 4 options, one matches
  // Score = correct responses / total time
};

// Subtest metadata
export const subtests = [
  {
    id: "pattern_matrices",
    name: "Pattern Matrices",
    nameShort: "PM",
    factor: "Gf-WM",
    description: "Visual pattern completion requiring working memory to track multiple rules",
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
    description: "Multi-step logical deduction requiring working memory capacity",
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
    description: "Verbal analogies measuring crystallized intelligence",
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
    description: "Vocabulary depth and semantic precision",
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
    description: "Digit span forward and backward",
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
    description: "Number pattern recognition and mathematical reasoning",
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
    description: "Symbol matching under time pressure measuring processing speed",
    icon: "⚡",
    itemCount: 40,
    estimatedTime: "2 min",
    weight: 0.10,
  },
];
