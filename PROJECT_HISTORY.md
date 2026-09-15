# 1024 RPG Project History

## Site hierarchy
- `index.html` — project entrance
- `classic/` — Standard 1024 baseline
- `type-01/` — Type 01 Version 1 history
- `rpg-v1-0/` — Version 1 v1.0 FINAL; gameplay frozen
- `type-01-v2/` — Version 2 entrance and development log
- `rpg-v2-v0-1/` through `rpg-v2-v0-4/` — earlier Version 2 archives
- `rpg-v2-v0-5/` — archived Game History + Skill Level baseline
- `rpg-v2-v0-6/` — current FEATURE COMPLETE / FINAL TEST BUILD
- `shared/` — reusable engine, UI, animation and help modules
- `tests/` + `.github/workflows/` — regression and syntax checks

## Version milestones
- **v0.1:** Skill Pool prototype.
- **v0.2:** stabilized combat/readability baseline.
- **v0.3:** General Skill Pool rework.
- **v0.4:** Special Classes and Special Units.
- **v0.5:** main menu, Game History, permanent skill-use counts and LV1 → LV2 → LV3 → MAX foundation.
- **v0.6:** Turn Engine, revised HP/enemy scaling, full mastery effects, profession refinements and finalized Type 01 merge-combat rules.

## v0.6 final state — 2026-09-15
Status: **FEATURE COMPLETE / TESTING**. Remaining work is gameplay/regression testing and bug fixing.

The final Type 01 merge rules are documented in `rpg-v2-v0-6/RULES.md`. Key changes:
- Every merge gives the merged hero one nearby melee strike for 1 damage.
- Every third cumulative merge additionally selects up to two enemies anywhere on the board for 1 ranged damage each.
- Normal heroes and Special units both use these innate merge abilities.
- The previously discussed every-five-merges innate ability is cancelled.
- General Skill `resonance` is now **波動共鳴**, triggered by enemy defeat; LV1–LV3 do not chain, MAX can chain.
- General Skill `precision` / **精準** is removed from the v0.6 skill pool.
- Player-facing mastery details show only the currently unlocked level effect; future effects remain hidden for discovery.

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
- Profession base abilities remain fixed and do not use mastery.

## Cross-conversation handoff rules
1. Read this file first.
2. Fetch the current target version before modifying it.
3. Never overwrite archived playable versions.
4. Preserve established Death Wave, animation and UI sequencing unless explicitly changed.
5. Version 1 remains gameplay-frozen.
6. Keep General Skills, innate Type 01 rules and profession-specific gameplay conceptually separate.
7. Update the version directory, `type-01-v2/index.html`, relevant MD documentation and tests/CI at meaningful milestones.
8. v0.6 rule design is complete; next workstream is testing and fixes.
