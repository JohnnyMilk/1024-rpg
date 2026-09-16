# 1024 RPG Project History

## Project status — 2026-09-17
**TYPE 01 DEVELOPMENT COMPLETE.**

Type 01 is now formally closed after completing both major generations:
- **Version 1** — complete / final / gameplay frozen.
- **Version 2** — complete / final at **V1.0**.

Type 01's defining core is the 1024-style whole-board swipe + merge system with heroes and enemies coexisting on the same board. No Version 3 is planned for Type 01. Existing releases and development builds are retained as playable/history archives.

The next project phase is **Type 02**. Type 02 must be treated as a different 1024 game type rather than an extension of Type 01. Its core controls, board rules, combat structure and progression may be redesigned from the ground up.

## Site hierarchy
- `index.html` — main project entrance; Type 01 marked complete and Type 02 shown as next project.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Type 01 Version 1 final release; gameplay frozen.
- `type-01-v2/` — Type 01 Version 2 release/history entrance.
- `rpg-v2-v0-1/` through `rpg-v2-v0-7/` — Version 2 development archives.
- `rpg-v2-v1-0/` — **Type 01 Version 2 V1.0 formal release; final active release.**
- `shared/` — reusable engine, UI, animation and help modules from Type 01. Reuse in Type 02 only when appropriate; do not assume Type 02 shares Type 01 gameplay architecture.
- `tests/` + `.github/workflows/` — regression and syntax checks.

## Type 01 Version 1
Status: **COMPLETE / FINAL / FROZEN**.

Version 1 established the first Board Party Combat generation: 4×4 board, hero merging, shadow enemies, endless Boss progression, fixed profession skills and formal scoring.

## Type 01 Version 2 milestones
- **v0.1:** Skill Pool prototype.
- **v0.2:** stabilized combat/readability baseline.
- **v0.3:** General Skill Pool rework.
- **v0.4:** Special Classes and Special Units.
- **v0.5:** main menu, Game History, permanent skill-use counts and LV1 → LV2 → LV3 → MAX foundation.
- **v0.6:** completed Turn Engine, revised HP/enemy scaling, mastery effects, profession refinements and finalized Type 01 merge-combat rules.
- **v0.7:** Boss Encounter development, including memorable Boss mechanics and variable/dynamic battlefields.
- **V1.0:** formal Version 2 release. Integrates Special Classes, Special Units, mastery, Shadow Assassin, Giant Elephant Guard, dynamic Boss battlefield, formal Game History persistence and final presentation/UI.

## Version 2 V1.0 final state — 2026-09-17
Status: **COMPLETE / FORMAL RELEASE**.

V1.0 is the canonical final release for Type 01 Version 2. The previous B36/v0.7 build is a frozen test archive and must no longer be used as the active source.

Final V1.0 presentation includes the formal title screen and shared full-screen background across title, game and history views. The test-only Boss battle entry was removed from the formal release.

Game History is persisted in real time for game starts, valid moves, actual merges, normal enemy kills, Boss kills, final hero deaths, best hero and best score.

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
- General Skill `resonance` is **波動共鳴**, triggered by enemy defeat; LV1–LV3 do not chain, MAX can chain.
- General Skill `precision` / **精準** is removed.
- Special Common Skills are fixed and excluded from mastery/Game History.
- Final Special Common pool: **躍升、覺醒、轉生**.
- **連奏** and **連攜** were removed before completion.

## Mastery
- LV1: 0–29 successful uses
- LV2: 30–59
- LV3: 60–89
- MAX: 90+
- Lifetime uses continue beyond MAX.
- Profession base abilities and Special Common Skills remain fixed and do not use mastery.

## Final Boss system
The formal Version 2 Boss is **🗿 巨像守衛**.
- Boss battlefield expands from 4×4 to 4×6.
- Boss HP progression: 10 → 15 → 20 → 25…
- Charge: CD1, clear same-row/column line, moves at most two squares, direct struck hero takes 1 damage, contiguous units are pushed one square, off-board units are removed.
- Quake: CD4, surrounding eight cells, 2 damage.
- Stomp: no CD, approaches the nearest hero and deals 2 damage on contact.
- After Boss defeat, expanded rows warn and collapse one at a time before returning to 4×4.

## Archive policy
1. `rpg-v1-0/` is frozen as the final Type 01 Version 1 release.
2. Type 01 Version 2 v0.x builds, including B36/v0.7, are historical archives and should not be modified for new development.
3. `rpg-v2-v1-0/` is the final Type 01 Version 2 release. Only explicit maintenance/regression fixes should alter it.
4. Type 01 is complete. Do not create a Type 01 Version 3 unless this project policy is explicitly reversed.

## Type 02 handoff rules
1. Read this file first when continuing the 1024 project in a new conversation.
2. Treat **Type 02 as a new core game design**, not as Version 3 of Type 01.
3. Do not automatically inherit Type 01 combat, profession, enemy, Boss, mastery or runtime architecture.
4. Standard 1024 may remain the common conceptual baseline, but Type 02 can redefine how 1024 numbers, movement, merging, board space and progression are used.
5. Keep Type 01 directories frozen while Type 02 is developed in its own directory structure.
6. At meaningful Type 02 milestones, update the main `index.html` and this MD project history together.
7. Before modifying any playable version, fetch the exact target source and preserve completed/archived versions.