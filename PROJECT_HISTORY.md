# 1024 RPG Project History

## Project status — 2026-09-17
**TYPE 01 DEVELOPMENT COMPLETE. TYPE 02 POC DEVELOPMENT ACTIVE.**

Type 01 is formally closed after completing both major generations:
- **Version 1** — complete / final / gameplay frozen.
- **Version 2** — complete / final at **V1.0**, and the primary final work of Type 01.

Type 01's defining core is the 1024-style whole-board swipe + merge system with heroes and enemies coexisting on the same board. No Version 3 is planned for Type 01.

Type 02 is a different 1024 game type rather than an extension of Type 01. Its first active direction is a **City / Management Simulation**.

## Site hierarchy
- `index.html` — main project entrance with left/right Type 01 / Type 02 switching tabs.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Type 01 Version 1 final release; gameplay frozen.
- `type-01-v2/` — Type 01 Version 2 release/history entrance.
- `rpg-v2-v0-1/` through `rpg-v2-v0-7/` — Version 2 development archives.
- `rpg-v2-v1-0/` — **Type 01 Version 2 V1.0 formal release; primary final Type 01 work.**
- `type-02/` — Type 02 City / Management planning page and design documentation.
- `type-02/TYPE02_DESIGN.md` — canonical Type 02 design notes.
- `type-02-v1-v0-1/` — **Type 02 Version 1 v0.1 playable POC.**
- `shared/` — reusable Type 01 modules; do not assume Type 02 inherits them.
- `tests/` + `.github/workflows/` — regression and syntax checks where applicable.

## Type 01 final state
Status: **COMPLETE / FINAL / FROZEN**.

### Version 1
First completed Board Party Combat generation: 4×4 board, hero merging, shadow enemies, endless Boss progression, fixed profession skills and formal scoring.

### Version 2 · V1.0
Type 01's primary final work. It integrates Special Classes, Special Units, mastery, Shadow Assassin, Giant Elephant Guard, dynamic Boss battlefield, formal Game History persistence and final presentation/UI.

The previous B36/v0.7 build is a frozen test archive and must no longer be used as the active source.

## Final Type 01 Version 2 gameplay foundation
- One Turn = one Player Phase + one Enemy Phase.
- Player movement remains an atomic 1024-style whole-board swipe.
- Contact with an enemy blocks movement but does not itself cause collision damage or count as a legal move.
- Normal enemy queue resolves before Boss queue.
- Revival/re-entry reactions fully settle before the current phase resumes.
- Phase-start spawned enemies may act that phase; mid-phase summons wait for the next Enemy Phase.
- Every merge gives the merged hero one nearby melee strike for 1 damage.
- Every third cumulative merge additionally selects up to two enemies anywhere on the board for 1 ranged damage each.
- Normal heroes and Special units both use these innate merge abilities.
- The every-five-merges innate ability is cancelled.
- General Skill `resonance` is **波動共鳴**; LV1–LV3 do not chain, MAX can chain.
- General Skill `precision` / **精準** is removed.
- Final Special Common pool: **躍升、覺醒、轉生**.
- **連奏** and **連攜** were removed before completion.

## Final Type 01 Boss
**🗿 巨像守衛**
- Battlefield expands 4×4 → 4×6.
- HP: 10 → 15 → 20 → 25…
- Charge: CD1, same row/column clear line, max two squares, direct struck hero takes 1, contiguous units pushed one square, off-board units removed.
- Quake: CD4, surrounding eight cells, 2 damage.
- Stomp: no CD, approaches nearest hero, 2 contact damage.
- After defeat, expanded rows warn and collapse one at a time before returning to 4×4.

## Type 02 — active direction
Status: **CONCEPT / POC TESTING — NOT FINAL**.

Core hypothesis:

> **4×4 planning board = decisions**  
> **LIVE CITY simulation = results**

The player merges city buildings instead of heroes. The planning board drives a separate visible city simulation and management meters.

### Type 02 Version 1 · v0.1 POC — 2026-09-17
Path: `type-02-v1-v0-1/`

Purpose: test whether 1024 merging and city-management simulation feel like one coherent game before adding deeper systems.

Implemented:
- 4×4 touch/keyboard swipe board.
- Residential, Industry / Commerce, Energy / Infrastructure, Public / Environment building families.
- Same-family + same-level merging.
- Valid swipe advances one simulation day and spawns one new Level 1 building.
- Live Population, Finance, Energy and Happiness meters.
- Interacting economic formulas for housing, jobs/income, power supply/demand and happiness.
- Separate LIVE CITY visualization with buildings, traffic and pedestrians.
- City classification changes with population.
- City log for management feedback.
- Management event every seven days with two choices.
- Board lock ends the current POC run.
- Reset for repeated testing.

Not yet implemented / deliberately open:
- save system;
- formal victory condition;
- fixed run length;
- meta-progression;
- final balance;
- spatial simulation inside LIVE CITY;
- final event system;
- final building generation rules.

Detailed Type 02 rules and open questions belong in `type-02/TYPE02_DESIGN.md`.

## Archive policy
1. `rpg-v1-0/` is frozen as the final Type 01 Version 1 release.
2. Type 01 Version 2 v0.x builds, including B36/v0.7, are historical archives.
3. `rpg-v2-v1-0/` is the final Type 01 Version 2 release. Only explicit maintenance/regression fixes should alter it.
4. Type 01 is complete. Do not create Type 01 Version 3 unless this policy is explicitly reversed.
5. Type 02 development must remain in its own directory structure.

## Cross-conversation handoff rules
1. Read this file and `type-02/TYPE02_DESIGN.md` before continuing Type 02 work.
2. Treat Type 02 as a new core game design, not as Version 3 of Type 01.
3. Do not automatically inherit Type 01 combat, profession, enemy, Boss, mastery or runtime architecture.
4. Preserve Type 01 directories as frozen completed work.
5. Fetch the exact active Type 02 target version before modifying it.
6. At meaningful Type 02 milestones, update `index.html`, the Type 02 planning page and relevant MD documentation together.
7. v0.1 is a POC: observations from actual user play should drive the next rules rather than treating current formulas as final.