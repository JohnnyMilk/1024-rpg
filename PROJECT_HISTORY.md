# 1024 RPG Project History

## Project status — 2026-09-17
**TYPE 01 DEVELOPMENT COMPLETE. TYPE 01 VERSION 2 V1.1 FINAL OFFICIAL. TYPE 02 VERSION 1 v0.3 POC ACTIVE.**

Type 01 is formally closed after completing Version 1 and Version 2 V1.1. Version 2 V1.1 is the current final Type 01 work. V1.0 is retained as a frozen archive and gameplay-rule baseline. No Type 01 Version 3 is planned.

Type 02 is a fundamentally different 1024 game type. Its active direction is City / Management, explored through independent playable POCs.

## Site hierarchy
- `index.html` — project entrance with Type 01 / Type 02 tabs.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Type 01 Version 1 final release; frozen.
- `type-01-v2/` — Type 01 Version 2 release/history entrance.
- `rpg-v2-v1-1/` — **Type 01 Version 2 V1.1 final official release.**
- `rpg-v2-v1-0/` — Type 01 Version 2 V1.0 formal release; **frozen archive / gameplay baseline.**
- `type-02/` — Type 02 planning page.
- `type-02/TYPE02_DESIGN.md` — canonical Type 02 design notes.
- `type-02-v1-v0-1/` — Type 02 v0.1 archived POC.
- `type-02-v1-v0-2/` — Type 02 v0.2 archived/comparison POC.
- `type-02-v1-v0-3/` — **Type 02 v0.3 current playable POC.**

## Type 01 final state
Status: **COMPLETE / FINAL / FROZEN AFTER V1.1.**

### Version 1
First completed Board Party Combat generation: 4×4 hero merging, shadow enemies, Boss progression and formal scoring.

### Version 2 · V1.0 — FROZEN ARCHIVE
First formal Version 2 release and gameplay-rule baseline: Special Classes/Units, mastery, Shadow Assassin, Giant Elephant Guard, dynamic Boss battlefield, Game History persistence and final presentation/UI.

V1.0 is frozen after V1.1 release. Do not modify it unless the archive policy is explicitly reversed.

### Version 2 · V1.1 — FINAL OFFICIAL
V1.1 is an **UI-only mobile release**. Gameplay rules remain the V1.0 ruleset.

Final V1.1 UI changes:
- phone-first full-viewport layout with no page scrolling in the title/gameplay flow;
- PWA/standalone launch support for browser-chrome-free home-screen play;
- title/menu proportions tuned from iPhone screenshots;
- Special Profession and player skills combined into one combat HUD;
- Boss name/skills/CD integrated into the same tabbed HUD instead of stacking separate panels;
- 4×4 board size is protected as the primary gameplay surface;
- Boss expansion preserves the same four-column/cell scale for the 4×6 battlefield instead of shrinking the board to make HUD content fit;
- browser and PWA Boss 4×6 layouts were accepted from user-provided iPhone screenshots;
- final HUD cleanup removes the duplicate profession emoji from the player tab.

B36/v0.7 and all earlier v0.x builds remain historical archives.

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

Current active direction keeps **1024-style up/down/left/right swiping as the primary interaction**. The earlier tap/direct-placement experiment was rejected as too cumbersome. Strategic depth should live above the swipe layer through district rules, special tiles, district choice and city-level consequences.

Detailed rules and open questions belong in `type-02/TYPE02_DESIGN.md`.

## Archive policy
1. `rpg-v1-0/` is frozen as Type 01 Version 1 final.
2. Type 01 Version 2 v0.x builds, including B36/v0.7, are historical archives.
3. `rpg-v2-v1-0/` is a **frozen V1.0 archive / gameplay baseline** after V1.1 release.
4. `rpg-v2-v1-1/` is the **final official Type 01 Version 2 release**. Treat it as frozen completed work after release; only explicit maintenance/regression fixes may alter it.
5. Do not create Type 01 Version 3 unless this policy is explicitly reversed.
6. Type 02 versions remain in their own directories; previous POCs are preserved rather than overwritten.

## Cross-conversation handoff rules
1. Read this file and `type-02/TYPE02_DESIGN.md` before continuing Type 02 work.
2. Treat Type 02 as a new core game design, not Type 01 Version 3.
3. Do not automatically inherit Type 01 combat/runtime architecture.
4. Preserve Type 01 as frozen completed work.
5. Fetch the exact active Type 02 target before modifying it.
6. At meaningful Type 02 milestones, update root index, Type 02 planning page and relevant MD documentation together.
7. POC observations from actual user play should drive the next rules; current formulas and counts are not final.
