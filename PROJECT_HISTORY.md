# 1024 RPG Project History

## Site hierarchy

- `index.html` — project entrance; Type / Version explanation and Version entrances.
- `classic/index.html` — Standard 1024 baseline.
- `type-01/index.html` — Type 01 Version 1 dedicated page; completed history.
- `rpg-v1-0/index.html` — Version 1 v1.0 FINAL.
- `type-01-v2/index.html` — Type 01 Version 2 dedicated page and development log.
- `rpg-v2-v0-1/index.html` — playable Version 2 v0.1 archive.
- `rpg-v2-v0-2/index.html` — current playable Version 2 v0.2 prototype.
- `PROJECT_HISTORY.md` — persistent handoff.

Version 1 and Version 2 must remain separate. Version 1 is completed/frozen; new gameplay evolution belongs to Version 2.

## Naming rules

Type = core gameplay. Type 01 remains four-direction 1024-style sliding, same-Tier merging, and heroes/enemies sharing the board. Board-size or shape experiments may remain Type 01 if that core interaction remains.

Version = major design generation inside the same Type. Each Version has its own v0.x development sequence and can later reach its own v1.0 FINAL.

- Type 01 / Version 1: v0.1 -> ... -> v0.7 -> v1.0 FINAL.
- Type 01 / Version 2: v0.1 -> v0.2 -> ... DEVELOPMENT.

## Version 1 - completed baseline

Version 1 v1.0 is frozen. It established the 4x4 board, hero merging, enemies/Bosses, HP/ATK combat, endless Boss progression, animation pipeline, scoring and Game Over statistics.

Version 1 used three fixed merge-trigger skills: Warrior every merge, Archer every 3 merges, Mage every 5 merges. These remain part of Version 1 history only and are explicitly removed from Version 2.

Version 1 score baseline: valid move +1; merge adds resulting hero value; normal enemy +20; Boss +100; hero death subtracts hero value; score floor 0.

## Version 2 - development

### v0.1 - Skill Pool Prototype

Version 2 v0.1 replaced the fixed Warrior/Archer/Mage system with a run-wide Skill Pool.

Core progression:
- first new highest hero number 2 -> choose 1 of 3 unowned skills.
- then first 4 -> choose 1 of 3.
- then first 8 -> choose 1 of 3.
- continue for higher records.
- recreating an already reached number does not grant another choice.

Skills are global to the whole run, not attached to a hero and not divided into classes. They may trigger from movement, merge, hero damage, hero death, enemy death, Boss appearance, hero spawning, board state, score/record events and similar game events.

The persistent `本局技能` icon strip shows every selected skill; tapping an icon opens its effect description.

Version 2 does NOT provide:
- Warrior attack on every merge.
- Archer attack every 3 merges.
- Mage attack every 5 merges.

Initial Skill Pool examples: 疾行、風壓、餘勢、共鳴、融合再生、超載、反震、逆境、怒火、遺爆、遺志、血祭、靈魂收割、連殺、殺意、決戰準備、先制、堡壘、優質增援、新生、突變、孤軍、人海、危機感知、突破者、獵王、高風險投資.

### v0.2 - Combat Readability + Run History

Status: CURRENT PLAYABLE DEVELOPMENT PROTOTYPE.

Playable file: `rpg-v2-v0-2/index.html`.

v0.2 preserves the v0.1 Skill Pool and new-high-number three-choice progression, then makes these changes:

1. Enemy melee attack animation returns to the early Version 1-style sword slash. When an enemy or Boss attacks a hero, the visible slash is played on the target tile instead of a generic attack icon.
2. Enemy attack animation and floating `-HP` begin together. Attack visuals must not extend the attack phase beyond the 0.75-second HP-number window.
3. Game Over restores the Version 1-style result history: large total score, score breakdown, run history, and actions.
4. Game Over adds a new `本局取得技能` section containing the icons and names of every skill selected during the run.
5. Score/run tracking includes movement score, merge/record score, normal-enemy score, Boss score, actual hero-death penalty, turns survived, moves, merges, total enemy kills, Boss kills, hero deaths and highest hero number.

#### Formal animation sequence / Death Wave rule

Version 2 uses an ordered visual event pipeline. Future combat and skills must not bypass this sequence.

Normal player-action sequence:
1. movement animation — about 0.25 s;
2. merge animation — about 0.25 s;
3. attack / skill animation and HP number animation start together — maximum visible stage 0.75 s;
4. units reduced to 0 HP play death animation — about 0.25 s.

If a death triggers another attack, use Death Waves:
1. finish the current attack + HP-number stage;
2. play the current wave's death animation;
3. only after that death animation completes, evaluate and play death-trigger effects such as explosion / chain attack;
4. the death-trigger attack animation and its HP-number animation start together and stay within the same maximum 0.75-second stage;
5. if that attack kills other units, play the next death wave;
6. only after that death wave completes may it trigger another attack wave;
7. repeat until there are no new deaths or death-trigger attacks.

Example:
`attack + -HP -> enemy A death -> A death-trigger explosion + target -HP -> enemies B/C death -> B/C death-trigger attack + target -HP -> next death wave ...`

Multiple units killed by the same attack may play their death animations simultaneously as one Death Wave. They do not need to die one-by-one.

Important: do NOT resolve all death-trigger attacks first and postpone all death animations until the end. Death is a visual/event boundary: a unit's death-trigger effect cannot begin until its own death animation has completed.

All damaging attack visuals, including death-trigger explosions, are attack-stage visuals and therefore run concurrently with their corresponding HP damage numbers. No attack FX should make that stage longer than 0.75 s.

Current timing reference:
- movement: 0.25 s.
- merge: 0.25 s.
- attack/skill + HP number: max 0.75 s.
- enemy sword slash itself: about 0.36 s inside that 0.75 s window.
- death: 0.25 s.

## Version 2 future work

Candidate work after v0.2 includes configurable board sizes such as 6x4, irregular boards, distinct Boss mechanics, behaviorally different enemies, Relics, Combo/Chain systems, Score/Run refinement and eventually Meta Progression.

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
- Type 01 / Version 2 / v0.2: CURRENT PLAYABLE DEVELOPMENT PROTOTYPE — Skill Pool + sword-slash enemy attack + restored Game Over history + acquired-skill summary + Death Wave animation sequence.
