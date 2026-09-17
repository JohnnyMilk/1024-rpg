# 1024 RPG Project History

## Project status — 2026-09-17
**TYPE 01 DEVELOPMENT COMPLETE. TYPE 01 VERSION 2 V1.1 FINAL OFFICIAL. TYPE 02 NEW CORE DESIGN ACTIVE.**

Type 01 is formally closed after completing Version 1 and Version 2 V1.1. Version 2 V1.1 is the current final Type 01 work. V1.0 is retained as a frozen archive and gameplay-rule baseline. No Type 01 Version 3 is planned.

Type 02 is a fundamentally different 1024 game type. The former City / Management direction has been abandoned after v0.1–v0.3 playtesting. The new active direction is **Expedition + Alchemy + Dungeon Roguelite**.

## Site hierarchy
- `index.html` — project entrance with Type 01 / Type 02 tabs.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Type 01 Version 1 final release; frozen.
- `type-01-v2/` — Type 01 Version 2 release/history entrance.
- `rpg-v2-v1-1/` — **Type 01 Version 2 V1.1 final official release.**
- `rpg-v2-v1-0/` — Type 01 Version 2 V1.0 formal release; frozen archive / gameplay baseline.
- `type-02/` — Type 02 current planning page.
- `type-02/TYPE02_DESIGN.md` — canonical Type 02 design notes.
- `type-02-v1-v0-1/` — abandoned City v0.1 archived POC.
- `type-02-v1-v0-2/` — abandoned City v0.2 archived POC.
- `type-02-v1-v0-3/` — abandoned City v0.3 archived POC.

## Type 01 final state
Status: **COMPLETE / FINAL / FROZEN AFTER V1.1.**

### Version 1
First completed Board Party Combat generation: 4×4 hero merging, shadow enemies, Boss progression and formal scoring.

### Version 2 · V1.0 — FROZEN ARCHIVE
First formal Version 2 release and gameplay-rule baseline: Special Classes/Units, mastery, Shadow Assassin, Giant Elephant Guard, dynamic Boss battlefield, Game History persistence and final presentation/UI.

### Version 2 · V1.1 — FINAL OFFICIAL
V1.1 is an UI-only mobile release. Gameplay rules remain the V1.0 ruleset. It adds phone-first full viewport layout, PWA standalone support, unified player/Boss tabbed HUD and protected 4×4 / Boss 4×6 gameplay surfaces.

B36/v0.7 and all earlier v0.x builds remain historical archives.

## Type 02 — current direction
Status: **NEW CORE DESIGN / PRE-POC**.

### Abandoned City experiments — v0.1 to v0.3
v0.1 tested four city building families on a 4×4 merge board and suffered fragmentation / premature lock.

v0.2 tested a shorter quarter-based 1024 planning loop plus a separate LIVE CITY. It reduced board lock but produced weak 1024 variation, limited meaningful decisions and mostly passive city feedback.

v0.3 tested making each 4×4 board a city district. Direct placement was rejected as cumbersome and the experiment returned to swipe controls, but actual playtesting still found the city-management core boring. Presentation and animation could not compensate for the weak core loop.

**Decision: City / Management is abandoned. v0.1–v0.3 remain playable archives only. No further city POC development is planned.**

### New Type 02 concept — Expedition Alchemy Roguelite
The new concept combines three connected game layers:

1. **Kingdom Expedition / Unit Forge** — lower 4×4 board uses 1024-style swipes to create and strengthen units; upper screen is a flat 2D auto-expedition moving left-to-right. Changes on the lower board immediately change the party above. Enemies and exploration provide materials.
2. **Alchemy Workshop** — materials collected during expeditions are combined into potions, bombs, scrolls, enchantments, charms and special utility items. Recipes can be discovered through experimentation.
3. **Dungeon Exploration** — crafted items are carried into branching roguelike dungeons and used to solve combat, traps, blocked routes and other encounters. Deeper exploration yields rarer materials but increases the risk of losing the run.

Core loop:

> **1024 UNIT FORGE → 2D EXPEDITION → MATERIALS → ALCHEMY → DUNGEON → RARE MATERIALS → HOME → NEXT EXPEDITION**

Roguelite persistence should primarily unlock new possibilities — recipes, units, materials, regions and dungeon access — rather than simply granting large permanent stat bonuses.

### First new POC plan
Do not build all three layers at once. The first POC should only test:

> **Swipe/merge on the lower 4×4 board → immediately create or strengthen a unit above → auto-fight enemies → enemies drop materials.**

Only if this minimal loop is fun should the project add the Alchemy Workshop, followed by Dungeon Exploration.

Detailed current design belongs in `type-02/TYPE02_DESIGN.md`.

## Archive policy
1. `rpg-v1-0/` is frozen as Type 01 Version 1 final.
2. Type 01 Version 2 v0.x builds, including B36/v0.7, are historical archives.
3. `rpg-v2-v1-0/` is a frozen V1.0 archive / gameplay baseline after V1.1 release.
4. `rpg-v2-v1-1/` is the final official Type 01 Version 2 release; only explicit maintenance/regression fixes may alter it.
5. Do not create Type 01 Version 3 unless this policy is explicitly reversed.
6. Type 02 City v0.1–v0.3 builds are abandoned archives and should not be overwritten.
7. New Type 02 POCs must follow the Expedition Alchemy Roguelite direction unless the user explicitly changes the core design again.

## Cross-conversation handoff rules
1. Read this file and `type-02/TYPE02_DESIGN.md` before continuing Type 02 work.
2. Treat Type 02 as a new core game design, not Type 01 Version 3.
3. Do not automatically inherit Type 01 combat/runtime architecture.
4. Preserve Type 01 as frozen completed work.
5. Preserve the abandoned Type 02 City POCs as historical experiments only.
6. Build the smallest new Type 02 gameplay loop before investing in elaborate UI or animation.
7. At meaningful Type 02 milestones, update root index, Type 02 planning page and relevant MD documentation together.
8. POC observations from actual user play should drive the next rules; current formulas and counts are not final.
