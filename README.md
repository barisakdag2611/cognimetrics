# Structura Mentis

A structural cognitive assessment that derives item parameters from cognitive architecture rather than norm groups. Live at [structuramentis.org](https://structuramentis.org).

## What Makes This Different

Most IQ tests copy established formats (matrix puzzles, number sequences) without understanding the cognitive operations those formats isolate. Structura Mentis starts from the opposite direction: it identifies the **structural demands** each item places on cognition and derives difficulty from those demands mathematically.

Every item is decomposed into five cognitive demand dimensions:

| Dimension | Symbol | Source |
|---|---|---|
| Relational Complexity | R | Halford et al. (1998) |
| Transformation Type | T | Sternberg (1977) |
| Binding Load | B | Cowan (2001), Oberauer (2012) |
| Novelty Demand | N | Cattell (1963) |
| Distractor Quality | D | Embretson (1998) |

Difficulty is computed, not estimated:

```
b = -3.0 + 0.50R + 0.30T + 0.25max(0, B-2) + 0.35N + 0.20D
```

Two items with identical R/T/B/N/D profiles produce identical difficulty regardless of whether they use visual matrices, verbal analogies, or number sequences. This is **cross-structural isomorphism** applied to test design.

## Validation Results (Monte Carlo, N=10,000)

| Metric | Result |
|---|---|
| Theta recovery | r = 0.963 |
| Weight sensitivity (±30% perturbation) | Worst-case ρ = 0.973 |
| WAIS-IV cross-validation | 97.5% concordance |
| g variance explained | 64.0% |
| SRMR | 0.052 |
| Full test reliability | 0.922 |
| Difficulty ordering concordance | ρ = 0.988-1.000 |
| SEM (IQ 85-145) | ±3.7-4.5 IQ points |

## Architecture

- **Frontend:** React + Vite
- **Scoring:** 2-Parameter Logistic IRT (MLE via Newton-Raphson)
- **Speed scoring:** EZ-diffusion model (Wagenmakers et al. 2007)
- **Adaptive mode:** CAT with Maximum Fisher Information selection
- **7 subtests, 5 CHC factors:** Gf (PM + RR), Gc (CL + WD), Gwm (MS), Gq (QR), Gs (SM)
- **Item pool:** 99 items + 40 speed trials
- **IQ range:** 40-160 (reports >160 for ceiling)

## Setup

```bash
npm install
npm run dev
```

## Limitations

- Not a clinical instrument. Diagnosis requires a licensed psychologist.
- Item parameters are structurally derived, not yet empirically calibrated. Updates will follow as response data accumulates.
- Online administration introduces measurement noise relative to individual assessment.
- Gc subtests carry language bias (EN/TR only).

## References

Carroll, J.B. (1993). *Human Cognitive Abilities.* Cambridge.
Cowan, N. (2001). The magical number 4 in short-term memory. *BBS, 24*(1).
Embretson, S.E. & Reise, S.P. (2000). *Item Response Theory for Psychologists.* LEA.
Halford, G.S. et al. (1998). Processing capacity defined by relational complexity. *BBS, 21*(6).
Kovacs, K. & Conway, A.R.A. (2016). Process Overlap Theory. *Psych. Inquiry, 27*(3).
Oberauer, K. (2002). Access to information in working memory. *JEP:LMC, 28*(3).
Sternberg, R.J. (1977). *Intelligence, Information Processing, and Analogical Reasoning.* LEA.
Wagenmakers, E.-J. et al. (2007). An EZ-diffusion model. *Psychonomic B&R, 14*(1).

---

*Muhammet Baris Akdag, 2026. All rights reserved.*
