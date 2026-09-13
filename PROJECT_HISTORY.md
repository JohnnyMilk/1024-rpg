# 1024 RPG Project History

## Site hierarchy

- `index.html` — project entrance; Type / Version explanation and Version entrances.
- `classic/index.html` — Standard 1024 baseline.
- `type-01/index.html` — Type 01 Version 1 dedicated page; completed history.
- `rpg-v1-0/index.html` — Version 1 v1.0 FINAL.
- `type-01-v2/index.html` — Type 01 Version 2 dedicated page and development log.
- `rpg-v2-v0-1/index.html` — playable Version 2 v0.1 prototype.
- `PROJECT_HISTORY.md` — persistent handoff.

Version 1 and Version 2 must remain separate. Version 1 is completed/frozen; new gameplay evolution belongs to Version 2.

## Naming rules

Type = core gameplay. Type 01 remains four-direction 1024-style sliding, same-Tier merging, and heroes/enemies sharing the board. Board-size or shape experiments may remain Type 01 if that core interaction remains.

Version = major design generation inside the same Type. Each Version has its own v0.x development sequence and can later reach its own v1.0 FINAL.

- Type 01 / Version 1: v0.1 -> ... -> v0.7 -> v1.0 FINAL.
- Type 01 / Version 2: v0.1 DEVELOPMENT onward.

## Version 1 - completed baseline

Version 1 v1.0 is frozen. It established the 4x4 board, hero merging, enemies/Bosses, HP/ATK combat, endless Boss progression, animation pipeline, scoring and Game Over statistics.

Version 1 also used three fixed merge-trigger skills: Warrior every merge, Archer every 3 merges, Mage every 5 merges. These remain part of Version 1 history only and are explicitly removed from Version 2 v0.1.

Version 1 score baseline: valid move +1; merge adds resulting hero value; normal enemy +20; Boss +100; hero death subtracts hero value; score floor 0.

## Version 2 - development

### v0.1 - Skill Pool Prototype

Status: PLAYABLE DEVELOPMENT PROTOTYPE.

Playable file: `rpg-v2-v0-1/index.html`.

Version 2 v0.1 keeps the Version 1 board/combat foundation but replaces its fixed Warrior/Archer/Mage merge skills with a run-wide Skill Pool system.

#### Core progression rule

The hero number is the Run level-up milestone.

When a merge creates a hero number that is greater than the highest hero number previously achieved in the current run, the game pauses and presents three randomly selected unowned skills. The player chooses one.

Examples:
- first 2 -> choose 1 of 3 skills.
- first 4 -> choose 1 of 3 skills.
- first 8 -> choose 1 of 3 skills.
- first 16 -> choose 1 of 3 skills.
- continue for higher new records.

Recreating a number already reached earlier in the run does NOT grant another choice, even if the previous high-value hero died.

#### Skill ownership

Skills do not belong to individual heroes and do not use Warrior/Archer/Mage classes. Every chosen skill becomes a global ability for the remainder of that run.

Skills may trigger from many game events, including valid movement, merge, hero damage, hero death, enemy death, Boss appearance, hero spawning, board state and scoring/record events.

#### Skill UI

Version 2 v0.1 adds a persistent `本局技能` icon strip above the board.

Every chosen skill adds one icon. Tapping an owned skill icon opens a detail panel showing the skill name and effect. This strip is intended to let the player understand the current Run Build without placing extra information on individual hero tiles.

#### Removed Version 1 skills

Version 2 v0.1 does NOT provide:
- Warrior attack on every merge.
- Archer attack every 3 merges.
- Mage attack every 5 merges.

The global merge counter remains useful for statistics and Skill Pool effects, but it no longer automatically fires those three Version 1 abilities.

#### Animation sequence rule

Version 2 keeps a strict ordered animation pipeline. This is a gameplay readability rule and should not be bypassed by future skills.

For a player action, the visible sequence is:
1. movement animation;
2. merge animation;
3. attack / skill-effect animation and HP damage numbers begin together;
4. only after all damage/effect presentation is complete, units at 0 HP play the death animation.

Skill-trigger chains caused by a lethal event are resolved into the effect/damage stage before the final death presentation whenever possible, so damage numbers do not appear after the unit has already visually disappeared.

The same principle applies to enemy actions: enemy movement first, then attacks/effects plus HP numbers, then death.

All Skill Pool abilities must have visible feedback when they actually trigger. Version 2 v0.1 therefore uses:
- target attack/effect FX plus floating `-HP` for damaging skills;
- floating `+HP` for healing skills;
- buff/status text and owned-skill icon pulse for passive mitigation or damage boosts;
- board-wide flash/tag for global, score, death-trigger, Boss or state-based effects;
- spawn pulse for spawn-changing skills;
- standard death fade only after the effect/damage phase.

Animation timing reference in v0.1: movement 0.25 s, merge 0.25 s, skill/effect and HP-number stage 0.75 s, death 0.25 s.

#### Initial Skill Pool

The prototype contains skills based on these trigger families: movement, merge, hero damage, hero death, enemy death, Boss appearance, hero spawning, board state and Score/record events. The trigger-family labels are primarily an internal design taxonomy; the player receives a mixed three-choice pool rather than choosing a class.

Initial examples include 疾行、風壓、餘勢、共鳴、融合再生、超載、反震、逆境、怒火、遺爆、遺志、血祭、靈魂收割、連殺、殺意、決戰準備、先制、堡壘、優質增援、新生、突變、孤軍、人海、危機感知、突破者、獵王、高風險投資.

Numbers/effects in the v0.1 Skill Pool are prototype balance values and may be adjusted after playtesting without changing the fundamental Skill Pool rule.

## Version 2 future work

Candidate work after v0.1 includes configurable board sizes such as 6x4, irregular boards, distinct Boss mechanics, behaviorally different enemies, Relics, Combo/Chain systems, Score/Run refinement and eventually Meta Progression.

Version 2 design principle: new systems should support the central Type 01 question, "Which direction should I swipe next?"

## Cross-conversation handoff rules

When continuing development:
1. Read `PROJECT_HISTORY.md` first.
2. Read root `index.html` to confirm hierarchy.
3. Read the relevant Version page.
4. Fetch the actual playable HTML before modifying code.
5. Never reconstruct current game code from memory alone.
6. Do not change unspecified gameplay rules, timing, spawning or values.
7. Every meaningful gameplay change, Version milestone, rule decision or important bug fix must be synchronized into `PROJECT_HISTORY.md`.

## Current milestone

- Type 01 / Version 1 / v1.0: FINAL / COMPLETED.
- Type 01 / Version 2 / v0.1: PLAYABLE DEVELOPMENT PROTOTYPE — Skill Pool + new-high-number three-choice progression + ordered skill animation pipeline.
