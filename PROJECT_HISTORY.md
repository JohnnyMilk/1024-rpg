# 1024 RPG Project History

## Site hierarchy

The root `index.html` is the project-level entrance. It explains the difference between Type and Version, then links to each major Version page inside the current Type.

Current structure:

- `index.html` — project index; explains Type vs Version and shows Version 1 / Version 2 entrances.
- `classic/index.html` — Standard 1024 baseline.
- `type-01/index.html` — Type 01 Version 1 dedicated page; completed Version 1 release and development log.
- `rpg-v1-0/index.html` — playable Version 1 v1.0 FINAL release.
- `type-01-v2/index.html` — Type 01 Version 2 dedicated page; design direction and development log.
- `PROJECT_HISTORY.md` — persistent project memory and cross-conversation handoff.

Important: do not put Version 2 planning content into the Version 1 page. Version 1 is closed/completed. Version 2 has its own dedicated page.

## Naming rules

### Type = core gameplay

Create a new Type only when the main interaction, board rules, or combat structure fundamentally changes.

Type 01 core identity:
- 1024-style four-direction swipe.
- hero movement and same-Tier merge.
- enemies/Bosses share the same board with heroes.
- RPG combat is driven by board interaction and merges.

Changing board size or board shape alone does not automatically create a new Type. A 6x4 board or irregular board can remain Type 01 if the swipe/merge/shared-board combat core remains intact.

### Version = major generation inside the same Type

A Version represents a major design generation within one Type. Each Version may have its own internal development history starting from v0.1 and ending at v1.0 when finalized.

Current model:

- Type 01 / Version 1: v0.1 -> ... -> v0.7 -> v1.0 FINAL.
- Type 01 / Version 2: starts at v0.1 DEVELOPMENT and evolves independently until its own future v1.0 FINAL.

## Type 01 Version 1 - completed

Status: v1.0 FINAL.

Version 1 established the first complete Board Party Combat ruleset:
- 4x4 board.
- same-Tier hero merging.
- enemies and Bosses live directly on the board.
- merge-driven Warrior / Archer / Mage skills.
- HP / ATK combat.
- endless Boss progression.
- complete animation pipeline.
- scoring system.
- Chinese Game Over history.
- skill-kill statistics.

### Version 1 development history

- v0.1 Merge Combat: first 1024 x RPG prototype; merge triggers attacks.
- v0.2 Movement Combat: movement participates in combat; Warrior, Archer, Mage and turn-20 Boss concept.
- v0.3 Pressure Spawn: enemy spawned on every valid move to test board pressure.
- v0.4 Balanced Spawn: enemy spawn changed to every 2 valid turns; skills use global merge count.
- v0.5 HIT Count Combat: durability and damage relationships revised.
- v0.6 Unified Hero: same-Tier hero merge, 1/3/5 merge triggers, plus collision damage.
- v0.7 Endless Boss: move -> merge -> attack/damage -> death pipeline, shadow enemies, Boss cycle and HP/ATK rebalance.
- v1.0 Official Release: formal score, Game Over history, skill-kill statistics and mobile result layout. Version 1 finalized here.

Version 1 should now be treated as a preserved baseline. New gameplay evolution belongs to Version 2 unless fixing a clear defect in the preserved Version 1 release is explicitly requested.

## Version 1 v1.0 reference rules

Hero display values: 1=T2=2 HP, 2=T4=4 HP, 4=T8=8 HP, 8=T16=16 HP, continuing by doubling. Merged HP equals the sum of source remaining HP capped at the new maximum.

Each valid turn adds 1 hero. Every 2 valid turns adds 1 normal enemy. Boss interval is 20 turns. Boss defeat does not end the run. Game Over occurs on party wipe or when no direction can produce a valid action.

When a hero swipes into an enemy, the hero stops before it, does not push it, does not directly damage it by collision, the move still counts as valid, and the hero takes that enemy's current ATK damage.

Enemy phase: if an enemy begins adjacent to a hero, it attacks one adjacent hero and does not move. Otherwise it moves one cell toward the nearest hero. An enemy that moved does not attack in the same action.

Normal enemy: Shadow Assassin, max HP always 1. Spawned enemies retain their spawn-stage ATK.

Boss cycle: Shadow Blade -> Night Lord -> Eye of the Abyss -> Shadow of Death -> Shadow King. Later cycles use II, III, and so on.

Boss HP: 10, 15, 20, 25, 30, 35...

Enemy/Boss ATK: `ceil(Stage / 2)` = 1, 1, 2, 2, 3, 3...

Skills use global mergeCount:
- Warrior: every merge; attacks orthogonal adjacent enemies.
- Archer: every 3 merges; attacks one random enemy.
- Mage: every 5 merges; attacks all enemies.
- Triggers may overlap.
- Each skill hit deals 1 HP.

Score:
- valid move +1.
- merge adds resulting hero display value.
- normal enemy kill +20.
- Boss kill +100.
- hero death subtracts hero display value.
- score floor = 0.

Skill kills are assigned to the final lethal skill. Total enemies killed includes Bosses, so:

Warrior kills + Archer kills + Mage kills = total enemies killed.

Animation reference:
- move 0.25 s.
- merge 0.25 s.
- Warrior 0.36 s.
- Archer 0.42 s.
- Mage 0.62 s.
- damage number 0.75 s.
- death 0.25 s.

## Type 01 Version 2 - development

Status: v0.1 DEVELOPMENT / PLANNING.

Version 2 starts from the completed Version 1 design foundation, but it is not finalized. Its first state is therefore v0.1.

Current candidate directions:

1. Board size variation — expand beyond fixed 4x4, including a taller 6x4 board.
2. Irregular board shapes — missing cells, blocked cells, or shaped maps while retaining four-direction swipe behavior.
3. Hero-number abilities — higher merged hero values may gain meaningful abilities beyond HP.
4. Skill Builds — Boss rewards can modify Warrior, Archer or Mage skills and create different run builds.
5. Boss Mechanics — Bosses should influence board decisions, not merely gain HP/ATK.
6. Relics — strategic run modifiers with meaningful benefits, tradeoffs, or build interactions.
7. Combo / Chain — reward multiple merges or overlapping skill chains created by one swipe.
8. Enemy Types — add a small number of behaviorally distinct enemies that change board decisions.
9. Meta Progression — consider persistent unlocks only after the single-run systems prove fun.

Version 2 design principle: new systems should support the central Type 01 question: "Which direction should I swipe next?"

### Version 2 development history

- v0.1 Planning: dedicated Version 2 page created. Version 1 is preserved as completed; Version 2 records candidate directions separately. No candidate feature is considered final yet.

## Cross-conversation handoff rules

When continuing development in a new ChatGPT conversation:

1. Read `PROJECT_HISTORY.md` first.
2. Read root `index.html` to confirm the current site hierarchy.
3. Read the relevant Version page (`type-01/` for Version 1, `type-01-v2/` for Version 2).
4. Fetch the actual playable/development HTML before modifying code.
5. Never reconstruct the game only from chat memory.
6. Do not change unspecified gameplay rules, timing, spawning, or values.
7. Every meaningful gameplay change, Version milestone, rule decision, or important bug fix must be synchronized into `PROJECT_HISTORY.md`.

## Current milestone

- Type 01 / Version 1 / v1.0: FINAL / COMPLETED.
- Type 01 / Version 2 / v0.1: DEVELOPMENT / PLANNING.
