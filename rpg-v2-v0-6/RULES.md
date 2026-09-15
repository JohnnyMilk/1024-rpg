# 1024 RPG — Version 2 v0.6 Final Rules

Status: **COMPLETE / STABLE**. User gameplay testing is complete with no remaining known issues as of 2026-09-15.

## Type 01 innate merge abilities
These are baseline Type 01 rules, not selectable skills and not mastery skills. Normal heroes and Special units both trigger them.

### Every merge — Melee Slash
- Origin: the merged-result hero tile.
- Search the surrounding 8 cells.
- Randomly choose 1 enemy in range.
- Deal 1 damage.
- Use close-range slash animation language.

### Every 3 cumulative merges — Arrow Attack
- Trigger at cumulative merge 3, 6, 9, 12, and so on.
- Randomly choose up to 2 distinct enemies anywhere on the board.
- Deal 1 damage to each.
- Use arrow animation from the merged-result hero to each target.
- This occurs in addition to that merge's Melee Slash.

### Five-merge ability
Removed. There is no innate every-5-merges attack in v0.6.

## Special Common Skills — final v0.6 pool
Special Common Skills are fixed abilities and do **not** use mastery levels or appear in Game History mastery tracking.

- **🌟 躍升 / Ascend:** when two Special units merge, the result gains two numeric tiers at once.
- **👑 覺醒 / Awakening:** when every living friendly unit on the board is Special, all future hero spawns in that run are Special.
- **♻️ 轉生 / Reincarnate:** the first eligible Special-unit death makes the next normal hero spawn Special; a reincarnated Special cannot trigger Reincarnate again.

Removed from v0.6:
- **🔁 連奏 / Encore** — removed because not every Special unit has a meaningful entry ability to repeat.
- **🔗 連攜 / Linkage** — removed from the final Special Common Skill pool.

## General Skill — 波動共鳴
`resonance` is no longer a merge-count skill. It triggers when an enemy dies, using the defeated enemy tile as the center.

- **LV1:** random 1 enemy in the surrounding 8 cells takes 1 damage. No chain.
- **LV2:** random 2 distinct enemies in the surrounding 8 cells each take 1 damage. No chain.
- **LV3:** every enemy in the surrounding 8 cells takes 1 damage. No chain.
- **MAX:** every enemy in the surrounding 8 cells takes 1 damage. An enemy defeated by this wave triggers another Wave Resonance from its own tile, allowing the reaction to continue until no further enemy is defeated.

Each enemy death can originate only one Resonance wave.

## General Skill removed — 精準
`precision` / 精準 is removed from the v0.6 General Skill pool and has no active v0.6 gameplay effect.

## Mastery display rule
Skill details reveal only the effect of the player's currently unlocked level. Future mastery effects are intentionally hidden so players discover them through progression.

## Animation requirements
- Merge melee uses slash / close-range visual language.
- Every-third-merge ranged attack uses source-to-target arrow visuals.
- Wave Resonance visually originates from the defeated enemy tile.
- MAX Wave Resonance resolves chain reactions wave by wave so the sequence remains readable.

## v0.6 completion state
Turn Engine, HP scaling, enemy scaling, profession rules, profession mastery, General Skill mastery, Type 01 merge attacks, Wave Resonance and the final three-skill Special Common pool are complete. v0.6 is now the stable completed baseline for subsequent Version 2 development.