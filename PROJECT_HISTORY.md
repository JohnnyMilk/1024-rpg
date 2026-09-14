# 1024 RPG Project History

## Site hierarchy
- `index.html` — project entrance.
- `classic/` — Standard 1024 baseline.
- `type-01/` — Type 01 Version 1 history.
- `rpg-v1-0/` — Version 1 v1.0 FINAL; gameplay frozen.
- `type-01-v2/` — Version 2 entrance and development log.
- `rpg-v2-v0-1/` — Version 2 v0.1 archive.
- `rpg-v2-v0-2/` — Version 2 v0.2 stabilized baseline.
- `rpg-v2-v0-3/` — Version 2 v0.3 playable General Skill Pool test.
- `rpg-v2-v0-4/` — Version 2 v0.4 playable Special Class / Special Unit test.
- `shared/` — reusable engine/UI/animation/help modules.
- `tests/refactor.test.js` + `.github/workflows/refactor-tests.yml` — regression and syntax checks.

## Naming rules
Type = core gameplay. Type 01 remains four-direction 1024-style sliding, same-value hero merging, and heroes/enemies sharing the board.

Version = major design generation inside the same Type.
- Type 01 / Version 1: completed at v1.0 FINAL.
- Type 01 / Version 2: v0.1 -> v0.2 -> v0.3 -> v0.4 ... DEVELOPMENT.

## Version 1 — completed baseline
Version 1 v1.0 established the 4x4 board, hero merging, enemies/Bosses, HP/ATK combat, endless Boss progression, scoring, animation pipeline and Game Over statistics. Version 1 gameplay is frozen; shared UI/engine maintenance may be reused without changing V1 rules.

## Version 2 v0.1 — Skill Pool Prototype
First creation of each new historical highest hero value grants a choice of 1 from 3 unowned General Skills.

## Version 2 v0.2 — Stabilized Baseline
Status: STABILIZED PLAYABLE BASELINE. Preserve Death Wave sequencing, Game Over history, HP bars, shared animations/help and overall combat readability behavior.

## Version 2 v0.3 — General Skill Pool Rework
Status: ARCHIVED PLAYABLE TEST.

Playable: `rpg-v2-v0-3/index.html`.

Key rules retained into v0.4:
- 27 General Skills with unique Emoji.
- New highest hero values grant General Skill 3-choice rewards.
- Hero-first spawn order: player Hero first, enemy second.
- Normal enemies fixed at 1 HP; Bosses are the primary multi-HP targets.
- `突變` and `危機感知` were defined in v0.3 but disabled until special units existed.
- `援軍` may generate a second hero during one hero-generation event.
- General skill meta progression remains planned as Base + 3 out-of-run upgrades; upgrade currency/method undecided.

## Version 2 v0.4 — Special Classes / Special Units
Status: PLAYABLE TEST.

Playable: `rpg-v2-v0-4/index.html`.

### Class selection and rewards
- The **first successful merge of the run** triggers class selection first.
- Choose exactly one class for the run: **Warrior / Ranger / Priest**.
- Class is locked for the rest of the run.
- If the first merge also creates a new historical highest hero value, class selection resolves first, then the General Skill 3-choice reward.
- After every Boss kill, choose 1 of 3 randomly offered, **unowned** class rewards.
- Boss reward pool = selected class's 3 exclusive skills + 5 universal class skills = 8 total possible class rewards.
- Bosses can continue indefinitely, so a sufficiently long run may eventually collect all 8 class rewards. When fewer than 3 remain, show all remaining choices.

### Special-unit identity and merging
- Special-unit abilities belong to the individual special unit; effects originate from that unit's tile whenever practical.
- A run contains only the selected class of special unit.
- Normal + Special of the same value can merge; the result remains Special.
- Special + Special of the same value can merge normally.
- Numeric 1024 merge identity remains 1 -> 2 -> 4 -> 8... .

### Special-unit generation
Special units may be created by:
1. the next normally generated hero after first class selection;
2. each first-reached Score milestone 100, 200, 300... (milestones are claimed once even if Score later falls);
3. General Skill `突變`: 10% chance a generated hero becomes Special;
4. General Skill `危機感知`: when empty cells <=1, the next generated hero is Special;
5. class reward `轉生`;
6. permanent class reward state `覺醒` after its condition is met.

Hero-first spawn order remains mandatory. `援軍` applies to Special generation as well; when it duplicates a generation event, the second hero follows the first hero's Special/Normal state in v0.4.

### Warrior — base abilities
1. **迎戰** — when a Warrior Special enters the board, randomly choose up to 2 enemies in the surrounding 8 cells; each takes 1 skill damage.
2. **突進** — if a Warrior actually moves and is stopped by an enemy in its forward direction, that blocking enemy takes 1 skill damage.

Warrior exclusive skills:
- **橫掃** — 迎戰 attacks all enemies in the surrounding 8 cells instead of up to 2 random enemies.
- **衝擊** — after the Warrior actually moves at least 2 cells in one swipe, 1 random enemy in the surrounding 8 cells takes 1 skill damage.
- **重擊** — when a Warrior participates in a merge, all enemies in the surrounding 8 cells of the merged result take 1 skill damage.

### Ranger — base abilities
1. **遠射** — when a Ranger Special enters the board, randomly choose up to 2 enemies outside its surrounding 8 cells; each takes 1 skill damage.
2. **回身射擊** — after a Ranger actually moves, it attacks the nearest enemy on the straight line in the direction opposite to movement for 1 skill damage.

Ranger exclusive skills:
- **狙擊** — 遠射 attacks up to 4 valid enemies instead of 2.
- **穿透箭** — 回身射擊 attacks every enemy on that straight line instead of only the nearest one.
- **箭雨** — when a Ranger participates in a merge, every enemy outside the merged result's surrounding 8 cells takes 1 skill damage.

### Priest — base abilities
1. **治癒波** — when a Priest Special enters the board, all injured allies in its surrounding 8 cells recover 1 HP.
2. **守護** — after a Priest actually moves, every allied unit in the 3x3 area centered on its final tile, including the Priest, receives one full-damage block. Guard does not stack; a later Guard refreshes the single block.

Priest exclusive skills:
- **聖療** — 治癒波 becomes a board-wide allied heal for 1 HP.
- **復甦** — an allied hero that dies in the surrounding 8 cells of a living Priest can revive once in place with 1 HP.
- **懲戒** — when Guard granted by a Priest blocks damage, that Priest deals 1 skill damage to the enemy that caused the blocked hit, if that Priest is still alive.

### Universal class rewards (5)
1. **躍升** — if both participants of a merge are Special, the merged result advances two numeric tiers total (example: Special 2 + Special 2 -> Special 8).
2. **連奏** — every Special-unit entry base ability automatically casts one additional time.
3. **連攜** — when a new Special unit enters, every other Special unit already on the board triggers its own entry base ability once. Entry abilities triggered by 連攜 still benefit from 連奏, but 連攜 cannot trigger another 連攜 chain.
4. **覺醒** — once all living allied units on the board are Special, the state permanently activates for the rest of the run; all future hero spawns are Special even if the board later changes.
5. **轉生** — when an eligible Special unit dies for the first time, the next hero that would otherwise be Normal is converted to Special. A Special unit created by 轉生 is not eligible to create another 轉生 chain.

### General Skill activation changes in v0.4
- `突變` and `危機感知` are now active and selectable.
- Existing General Skill behavior otherwise remains based on v0.3.
- Class skill damage participates in normal General Skill damage modifiers such as `孤軍`, `殺意` and Boss bonus `強襲` where applicable.

### Animation / source-tile rule
- Special-unit ranged attacks should visually originate from the triggering Special unit tile when the shared animation library supports a source/target animation.
- Existing move -> merge -> attack/HP -> death sequencing and Death Wave safety remain the baseline.

## Shared architecture
Keep shared infrastructure separate from version-specific gameplay.
- `shared/core.js`: timing, random/array/cell helpers, HP markup, input binding, run-history renderer.
- `shared/rpg-ui.css`: common board/unit/HP/result presentation.
- `shared/animations.js` + `shared/animations.css`: reusable damage/heal/buff/slash/burst/arrow/magic/board animations.
- `shared/game-help.js` + CSS: reusable mobile-first stat help overlay.

## Regression / CI
`tests/refactor.test.js` covers shared helpers, archived-version expectations, v0.3 General Skill registry and v0.4 Special Class rules.

`.github/workflows/refactor-tests.yml` runs regression assertions and JavaScript syntax checks through v0.4.

## Cross-conversation handoff rules
1. Read this file first.
2. Fetch the current target version from GitHub before modifying it.
3. Never overwrite archived playable versions.
4. Preserve v0.2 Death Wave/animation/UI behavior unless explicitly changed.
5. Version 1 remains gameplay-frozen.
6. Keep General Skills and class-specific gameplay conceptually separate.
7. Update tests/CI and this history after meaningful gameplay milestones.

## Current milestone — 2026-09-14
- Version 1 v1.0: FINAL.
- Version 2 v0.2: STABILIZED BASELINE / archived playable.
- Version 2 v0.3: ARCHIVED PLAYABLE / General Skill Pool rework.
- Version 2 v0.4: PLAYABLE TEST / Special Classes + Special Units.
