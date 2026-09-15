# 1024 RPG Project History

## Site hierarchy
- `index.html` — project entrance
- `classic/` — Standard 1024 baseline
- `type-01/` — Type 01 Version 1 history
- `rpg-v1-0/` — Version 1 v1.0 FINAL; gameplay frozen
- `type-01-v2/` — Version 2 entrance and development log
- `rpg-v2-v0-1/` through `rpg-v2-v0-4/` — earlier Version 2 archives
- `rpg-v2-v0-5/` — archived Game History + Skill Level baseline
- `rpg-v2-v0-6/` — completed stable v0.6 baseline
- `rpg-v2-v0-7/` — current Boss Encounter design/development
- `shared/` — reusable engine, UI, animation and help modules
- `tests/` + `.github/workflows/` — regression and syntax checks

## Version milestones
- **v0.1:** Skill Pool prototype.
- **v0.2:** stabilized combat/readability baseline.
- **v0.3:** General Skill Pool rework.
- **v0.4:** Special Classes and Special Units.
- **v0.5:** main menu, Game History, permanent skill-use counts and LV1 → LV2 → LV3 → MAX foundation.
- **v0.6:** completed Turn Engine, revised HP/enemy scaling, mastery effects, profession refinements and finalized Type 01 merge-combat rules.
- **v0.7:** Boss Encounter development, including memorable Boss mechanics and variable/dynamic/irregular battlefields.

## v0.6 final state — 2026-09-15
Status: **COMPLETE / STABLE**. User gameplay testing completed with no remaining known issues at milestone close.

The final Type 01 merge rules are documented in `rpg-v2-v0-6/RULES.md`. Key changes:
- Every merge gives the merged hero one nearby melee strike for 1 damage.
- Every third cumulative merge additionally selects up to two enemies anywhere on the board for 1 ranged damage each.
- Normal heroes and Special units both use these innate merge abilities.
- The every-five-merges innate ability is cancelled.
- General Skill `resonance` is **波動共鳴**, triggered by enemy defeat; LV1–LV3 do not chain, MAX can chain.
- General Skill `precision` / **精準** is removed.
- Player-facing mastery details show only the currently unlocked level effect.
- Special Common Skills are fixed and excluded from mastery/Game History.
- Final Special Common pool: **躍升、覺醒、轉生**.
- **連奏** and **連攜** were removed before v0.6 completion.

## v0.6 Turn Engine summary
- One Turn = one Player Phase + one Enemy Phase.
- Phase determines active action authority; reaction/event chains do not change Phase.
- Player movement remains an atomic 1024-style whole-board swipe.
- Contact with an enemy blocks movement but does not itself cause collision damage or count as a legal move.
- Normal enemy queue resolves before Boss queue.
- Revival/re-entry reactions fully settle before the current phase resumes.
- Phase-start spawned enemies may act that phase; mid-phase summons wait for the next Enemy Phase.

## v0.6 mastery
- LV1: 0–29 successful uses
- LV2: 30–59
- LV3: 60–89
- MAX: 90+
- Lifetime uses continue beyond MAX.
- Profession base abilities and Special Common Skills remain fixed and do not use mastery.

## v0.7 direction
Boss encounters are the active development workstream. Each Boss should combine Boss identity, attack pattern, special mechanic, counterplay, readable telegraph/animation and battlefield design. Initial battlefield experiments include 4×6 maps, moving/changing battlefields and irregular maps with unavailable cells, corridors or separated regions.

## Cross-conversation handoff rules
1. Read this file first.
2. Fetch the current target version before modifying it.
3. Never overwrite archived/completed playable versions unless explicitly fixing that version.
4. Preserve established Death Wave, animation and UI sequencing unless explicitly changed.
5. Version 1 remains gameplay-frozen.
6. Keep General Skills, innate Type 01 rules and profession-specific gameplay conceptually separate.
7. Update the version directory, `type-01-v2/index.html`, relevant MD documentation and tests/CI at meaningful milestones.
8. v0.6 is complete; new feature development belongs to v0.7 unless a v0.6 regression is discovered.