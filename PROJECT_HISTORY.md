# 1024 RPG Project History

## Project status — 2026-09-17
**TYPE 01 DEVELOPMENT COMPLETE. TYPE 02 VERSION 1 v0.3 POC ACTIVE.**

Type 01 is formally closed after completing Version 1 and Version 2 V1.0. Version 2 V1.0 remains the primary final Type 01 work. No Type 01 Version 3 is planned.

Type 02 is a fundamentally different 1024 game type. Its active direction is City / Management, explored through independent playable POCs.

## Site hierarchy
- `index.html` — project entrance with Type 01 / Type 02 tabs.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Type 01 Version 1 final release; frozen.
- `type-01-v2/` — Type 01 Version 2 release/history entrance.
- `rpg-v2-v1-0/` — Type 01 Version 2 V1.0 formal release; primary final Type 01 work.
- `type-02/` — Type 02 planning page.
- `type-02/TYPE02_DESIGN.md` — canonical Type 02 design notes.
- `type-02-v1-v0-1/` — Type 02 v0.1 archived POC.
- `type-02-v1-v0-2/` — Type 02 v0.2 archived/comparison POC.
- `type-02-v1-v0-3/` — **Type 02 v0.3 current playable POC.**

## Type 01 final state
Status: **COMPLETE / FINAL / FROZEN**.

### Version 1
First completed Board Party Combat generation: 4×4 hero merging, shadow enemies, Boss progression and formal scoring.

### Version 2 · V1.0
Type 01's primary final work: Special Classes/Units, mastery, Shadow Assassin, Giant Elephant Guard, dynamic Boss battlefield, Game History persistence and final presentation/UI.

B36/v0.7 and all earlier v0.x builds are historical archives. Type 01 files should only receive explicit maintenance/regression fixes.

## Type 02 Version 1 POC history
Status: **POC TESTING — NOT FINAL**.

### v0.1 — 2026-09-17
Four building families lived directly on a whole-board swipe 4×4 board. Same-family + same-level merging caused category fragmentation and premature board lock. Retained as archive.

### v0.2 — 2026-09-17
Changed to a single merge chain with 12 valid planning moves per quarter. Every merge generated development rights, which were allocated to Residential, Industry, Energy or Public development. The board reset each quarter while LIVE CITY and management stats persisted.

Playtesting showed that this solved the immediate fragmentation/long-session problem, but the player still had too few meaningful spatial decisions; 1024 variation and feedback were weak; LIVE CITY was largely passive; and the city presentation did not itself create enough gameplay depth. v0.2 is retained as a comparison build.

### v0.3 — 2026-09-17 — CURRENT
v0.3 changes the core hypothesis:

> **The board itself is the city. One 4×4 board is one district; multiple districts form the complete city.**

Current POC rules:
- direct placement rather than whole-board swipe;
- four building families: Residential, Industry, Energy, Public;
- orthogonally adjacent same-family + same-level buildings merge and can chain-upgrade;
- 16 placements per district (test value);
- one next-building reroll per district;
- run starts in the center of a 3×3 district map;
- after a district is completed, the player chooses an adjacent district to develop next;
- completed districts remain visible as permanent city pieces;
- all districts contribute to global Population, Finance, Energy and Happiness;
- nine completed districts produce a final city score/summary.

v0.3 deliberately omits roads, terrain, rivers, landmarks, disasters, cross-district adjacency bonuses, scenarios, meta-progression and final economy balance. These should be added only after the placement/merge/district-expansion loop is evaluated.

Detailed rules and open questions belong in `type-02/TYPE02_DESIGN.md`.

## Archive policy
1. `rpg-v1-0/` is frozen as Type 01 Version 1 final.
2. Type 01 Version 2 v0.x builds, including B36/v0.7, are historical archives.
3. `rpg-v2-v1-0/` is Type 01 Version 2 final; only explicit maintenance/regression fixes may alter it.
4. Do not create Type 01 Version 3 unless this policy is explicitly reversed.
5. Type 02 versions remain in their own directories; previous POCs are preserved rather than overwritten.

## Cross-conversation handoff rules
1. Read this file and `type-02/TYPE02_DESIGN.md` before continuing Type 02 work.
2. Treat Type 02 as a new core game design, not Type 01 Version 3.
3. Do not automatically inherit Type 01 combat/runtime architecture.
4. Preserve Type 01 as frozen completed work.
5. Fetch the exact active Type 02 target before modifying it.
6. At meaningful Type 02 milestones, update root index, Type 02 planning page and relevant MD documentation together.
7. POC observations from actual user play should drive the next rules; current formulas and counts are not final.
