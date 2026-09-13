# 1024 RPG Project History

## Naming rules

- Type = core gameplay. Create a new Type only when the main operation, board rules, or combat structure fundamentally changes.
- Version = major evolution within the same Type. A completed major version can be preserved while the next major version starts again from an experimental v0.1 line.

Type 01 Version 1 history: v0.1 -> v0.2 -> v0.3 -> v0.4 -> v0.5 -> v0.6 -> v0.7 -> v1.0.

## Type 01 - 1024 / Slide & Merge

Core identity: 1024-style four-direction sliding + merging + heroes and enemies sharing the same board. Version 1 uses a 4x4 board. As long as later experiments preserve this core interaction, they remain Type 01 even if board dimensions or shapes change.

## Version 1 - completed

Status: v1.0 FINAL.

Version 1 established the playable foundation: 4x4 board, same-Tier hero merging, enemies and Bosses on the board, merge-driven warrior/archer/mage skills, HP/ATK combat, endless Boss progression, animation pipeline, scoring, Chinese Game Over summary, and skill-kill statistics.

Development history:
- v0.1 Merge Combat: first prototype; merge triggers attacks.
- v0.2 Movement Combat: movement participates in combat; warrior, archer, mage, and turn-20 Boss concept.
- v0.3 Pressure Spawn: enemy on every valid move to test pressure.
- v0.4 Balanced Spawn: enemy every 2 valid turns; global merge-count skills.
- v0.5 HIT Count Combat: durability and damage revised.
- v0.6 Unified Hero: same-Tier merge, 1/3/5 skill triggers, collision damage.
- v0.7 Endless Boss: move -> merge -> attack/damage -> death animation pipeline; shadow enemy/Boss cycle and balance.
- v1.0 Official Release: formal score, Game Over history, skill-kill statistics, mobile result layout.

Version 1 v1.0 is now the preserved baseline and should not be changed when developing Version 2.

## Version 1 v1.0 reference rules

Hero display: 1=T2=2 HP, 2=T4=4 HP, 4=T8=8 HP, 8=T16=16 HP, continuing by doubling. Merged HP is the sum of source remaining HP capped at the new max.

Each valid turn adds 1 hero. Every 2 valid turns adds 1 normal enemy. Boss interval is 20 turns. Boss defeat does not end the run. Game Over occurs on party wipe or no valid direction.

Normal enemy: Shadow Assassin, max HP 1. Boss cycle: Shadow Blade, Night Lord, Eye of the Abyss, Shadow of Death, Shadow King; later cycles use II, III, etc. Boss HP starts at 10 and increases by 5. Enemy/Boss ATK = ceil(Stage/2).

Skills use global mergeCount: Warrior every merge and attacks orthogonal adjacent enemies; Archer every 3 merges and attacks one random enemy; Mage every 5 merges and attacks all enemies. Each hit deals 1 HP and triggers may overlap.

Score: valid move +1; merge adds resulting hero display value; normal enemy +20; Boss +100; hero death subtracts hero display value; minimum score 0.

Skill kills are assigned by lethal hit. Warrior kills + Archer kills + Mage kills must equal total enemies killed, where total enemies includes Bosses.

Animation reference: move 0.25s, merge 0.25s, warrior 0.36s, archer 0.42s, mage 0.62s, damage number 0.75s, death 0.25s.

## Version 2 - development

### v0.1 - planning baseline

Version 2 starts by inheriting Version 1 v1.0 as its gameplay baseline, but Version 2 itself is NOT finalized. Its first development state is therefore v0.1.

At v0.1, the inherited gameplay should remain unchanged while the following ideas are recorded as candidates for step-by-step experiments:

1. Board size variation: expand beyond fixed 4x4, including a taller 6x4 board.
2. Irregular board shapes: missing cells, blocked cells, or shaped maps while retaining four-direction sliding.
3. Hero-number abilities: higher merged hero values may gain meaningful abilities beyond HP.
4. Skill Builds: Boss rewards can modify Warrior, Archer, or Mage skills and create different run builds.
5. Boss Mechanics: Bosses should eventually alter board decisions rather than only gain HP/ATK.
6. Relics: optional run modifiers or rewards with strategic effects and possible tradeoffs.
7. Combo / Chain: reward multiple merges or skill chains created by a single swipe.
8. Enemy Types: add a small number of enemies whose behavior changes board decisions, not merely their stats.
9. Meta Progression: consider persistent unlocks only after the run-level systems are proven fun.

Version 2 design principle: new systems should support the central Type 01 question, "Which direction should I swipe next?"

Board-size and irregular-map experiments do not automatically create a new Type. If four-direction sliding, merging, and shared-board combat remain the core interaction, they belong to Type 01 Version 2.

## Repository handoff

Main files:
- PROJECT_HISTORY.md: persistent project history and cross-conversation handoff.
- type-01/index.html: Type 01 definition and Version 1 release history.
- rpg-v1-0/index.html: preserved playable Version 1 v1.0 release.
- rpg-v2-0-v0-1/index.html: Version 2 v0.1 development/planning entry.

When continuing in a new ChatGPT conversation: read PROJECT_HISTORY.md first, then the relevant Type index, then fetch the actual current playable/development HTML before editing. Never reconstruct game code from chat memory alone. Do not change unspecified rules, timing, spawning, or values.

Every meaningful gameplay change, version milestone, rule decision, or important bug fix must be synchronized into PROJECT_HISTORY.md.

## Current milestone

Type 01 Version 1 / v1.0: FINAL.
Type 01 Version 2 / v0.1: DEVELOPMENT PLANNING.
