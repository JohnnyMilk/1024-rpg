# 1024 RPG Project History

## Site hierarchy
- `index.html` — project entrance.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Version 1 v1.0 FINAL; gameplay frozen.
- `type-01-v2/` — Version 2 entrance and development log.
- `rpg-v2-v0-1/` — Version 2 v0.1 archive.
- `rpg-v2-v0-2/` — Version 2 v0.2 stabilized baseline.
- `rpg-v2-v0-3/` — Version 2 v0.3 playable general-skill test.
- `shared/` — reusable engine/UI/animation/help modules.
- `tests/refactor.test.js` + `.github/workflows/refactor-tests.yml` — regression and syntax checks.
- `V0_3_META_PROGRESSION.md` — v0.3 skill/meta design notes.

## Naming rules
Type = core gameplay. Type 01 remains four-direction 1024-style sliding, same-value hero merging, and heroes/enemies sharing the board.

Version = major design generation inside the same Type.
- Type 01 / Version 1: completed at v1.0 FINAL.
- Type 01 / Version 2: v0.1 -> v0.2 -> v0.3 -> v0.4 ... DEVELOPMENT.

## Version 1 — completed baseline
Version 1 v1.0 established the 4x4 board, hero merging, enemies/Bosses, HP/ATK combat, endless Boss progression, scoring, animation pipeline and Game Over statistics.

Fixed V1 skills:
- Warrior: every merge.
- Archer: every 3 merges.
- Mage: every 5 merges.

V1 score baseline: valid move +1; merge adds resulting hero value; normal enemy +20; Boss +100; hero death subtracts hero value; score floor 0.

Version 1 gameplay is frozen. Shared UI/engine maintenance may be reused without changing V1 rules.

## Version 2 v0.1 — Skill Pool Prototype
Replaced the fixed V1 class attacks with a run-wide Skill Pool. First creation of each new historical highest hero value (2, 4, 8, 16...) grants a choice of 1 from 3 unowned skills. Recreating an already reached value gives no reward.

## Version 2 v0.2 — Stabilized Baseline
Status: STABILIZED PLAYABLE BASELINE.

Playable: `rpg-v2-v0-2/index.html`.

Key stabilized systems:
- 27-skill original Skill Pool;
- centered enemy/Boss sword slash;
- fixed animation sequence: move -> merge -> attack/HP -> death;
- Death Wave chaining: death-trigger effects wait until the causing death animation finishes;
- Game Over score/run history and acquired-skill summary;
- hero/Boss HP bars; normal Shadow Assassin omits redundant 1 HP text;
- shared animation library and mobile-first clickable stat help;
- activity log removed.

v0.2 remains archived and must not be overwritten by later gameplay versions.

## Version 2 v0.3 — General Skill Pool Rework
Status: PLAYABLE TEST.

Playable: `rpg-v2-v0-3/index.html`.

v0.3 is intentionally limited to the General Skill Pool. Special classes and special units are moved to v0.4.

### Global rules
- New highest hero values continue to trigger General Skill 3-choice rewards.
- Unit-generation priority is always: **player Hero first -> enemy second**.
- If the Hero uses the final empty cell, the enemy does not spawn.
- Normal enemies remain fixed at 1 HP; normal-enemy HP does not scale with progression. Bosses remain the main high-HP targets.
- Skill categories are design/debug labels only; they do not constrain gameplay.
- Every skill uses a unique Emoji so future skill upgrades can keep a stable visual identity.

### Reviewed 27-skill design
1. 💨 疾行 — every 5 valid moves, the next valid move does not generate an enemy.
2. 🌪️ 風壓 — one swipe moves at least 4 Heroes: 1 random enemy takes 1 damage.
3. ⏳ 餘勢 — 3 consecutive turns without merging: all Heroes heal 1 HP on turn 3.
4. 💥 共鳴 — every 5 merges, all enemies take 1 damage.
5. 🌱 融合再生 — merged result restores to full HP.
6. ✨ 超載 — 2+ merges in one swipe: all enemies take 1 damage.
7. ❤️‍🩹 求生 — every 10 valid moves, all Heroes heal 1 HP.
8. 🍀 幸運 — every 10 valid moves, next normal Hero has 25% chance to spawn one tier higher.
9. 💣 遺爆 — Hero death damages 1 random enemy within the surrounding 8 cells.
10. 👻 遺志 — Hero death makes the next merge add 1 random attack.
11. 🩸 血祭 — every 3 allied deaths, next allied spawn rises one tier; ready effect does not stack.
12. 🌑 靈魂收割 — every 3 enemy kills, 1 random Hero heals 1 HP.
13. ⚔️ 連殺 — 3 enemy kills in the same turn adds 1 random attack.
14. 🔴 殺意 — every 5 accumulated enemy kills, next skill damage +1.
15. ⚡ 先制 — Boss takes 2 damage when it appears.
16. 🏰 堡壘 — first 2 turns after Boss appears, Hero damage received -1.
17. 🌟 優質增援 — every 10th generated Hero appears as value 2.
18. 🎲 突變 — 10% chance for a new Hero to become a special unit; **defined but disabled in v0.3, activates with v0.4 special-unit system**.
19. 🐺 孤軍 — while Heroes <=3, skill damage +1.
20. 🧱 人海 — while Heroes >=6, every 5 turns 1 random Hero heals 1 HP.
21. 🚨 危機感知 — with <=1 empty cell, next Hero is guaranteed special; **defined but disabled in v0.3, activates in v0.4**.
22. 👑 突破者 — new highest hero value grants extra Score equal to value x2.
23. 🏆 獵王 — Boss kill score +100 -> +150.
24. 💎 高風險投資 — enemy kill score x2; Hero-death penalty x2.
25. 🗡️ 強襲 — damage dealt to Boss +1.
26. 🎯 精準 — every 15 merges, 3 random enemies each take 1 damage.
27. 🪖 援軍 — each Hero-generation event has 5% chance to generate 2 Heroes; intended to also apply to special units when v0.4 enables them.

Because special classes/units are deferred, v0.3 skill choices draw from the 25 currently executable skills; 突變 and 危機感知 remain in the 27-skill design registry for v0.4.

### Meta progression design
Every skill is planned to support Base + 3 out-of-run upgrades. Upgrade currency/method is still undecided. Example: 幸運 Base 25% -> Upgrade 1 50% -> Upgrade 2 75% -> Upgrade 3 100%.

## Version 2 v0.4 — next major system
Special profession/class work moves here. Current intended directions:
- Melee / 近戰
- Ranged / 遠程
- Support / 輔助

v0.4 will define class selection, class-specific skill pools, special units, special-unit spawning and the interactions of 突變／危機感知／援軍 with those units. Do not back-port these mechanics into v0.3 unless explicitly requested.

## Shared architecture
Keep shared infrastructure separate from version-specific gameplay.
- `shared/core.js`: timing, random/array/cell helpers, HP markup, input binding, run-history renderer.
- `shared/rpg-ui.css`: common board/unit/HP/result presentation.
- `shared/animations.js` + `shared/animations.css`: reusable damage/heal/buff/slash/burst/arrow/magic/board animations.
- Targeted player burst uses center-bloom: appears at target center, scales up, fades.
- Enemy/Boss slash crosses the visual center of the tile.
- `shared/game-help.js` + CSS: reusable mobile-first stat help overlay.

## Regression / CI
`tests/refactor.test.js` covers shared helpers, preserved V1/V2 rules, v0.2 archive expectations, v0.3 skill registry, spawn priority, shared animations and help wiring.

`.github/workflows/refactor-tests.yml` runs regression assertions and JavaScript syntax checks, including v0.3 `game.js` and `help-data.js`.

## Cross-conversation handoff rules
1. Read this file first.
2. Fetch the current target version from GitHub before modifying it.
3. Read shared modules before duplicating shared behavior.
4. Never reconstruct current game code from memory alone.
5. Never overwrite archived playable versions.
6. Preserve v0.2 Death Wave/animation/UI behavior unless explicitly changed.
7. Version 1 remains gameplay-frozen.
8. Update tests/CI and this history after meaningful gameplay milestones.

## Current milestone — 2026-09-14
- Version 1 v1.0: FINAL.
- Version 2 v0.2: STABILIZED BASELINE / archived playable.
- Version 2 v0.3: PLAYABLE TEST / General Skill Pool rework.
- Version 2 v0.4: NEXT / special classes and special units.
