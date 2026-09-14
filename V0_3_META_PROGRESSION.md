# Version 2 v0.3 — Design Draft

Status: design confirmed in principle; v0.3 playable implementation has not started.

## Out-of-run skill upgrades

Version 2 v0.3 will add a progression layer outside the active game run.

- Every skill can be upgraded outside the active run.
- Each skill has its base state plus 3 out-of-run upgrade levels.
- The upgrade interface belongs outside the turn-by-turn game, such as a post-run or between-runs screen.
- The purpose is survivor/roguelike-style meta progression: repeated play can gradually improve skills for later runs.
- The method used to earn upgrades is intentionally undecided for now.
- Upgrade effects and values are skill-specific and will be designed during the skill review.

### Example: 幸運

Base effect: every 10 valid moves, the next normal Hero spawn has a 25% chance to increase by one tier.

Proposed progression:
- Base: 25%
- Upgrade 1: 50%
- Upgrade 2: 75%
- Upgrade 3: 100%

## v0.3 global spawn-order rule

Whenever a turn reaches the unit-generation stage, generation priority is fixed:

1. Generate the player's Hero unit first.
2. Generate the enemy unit second.

If the Hero generation consumes the final empty cell, the enemy does not spawn. The enemy may never take the final cell before the player's Hero generation.

This is a global v0.3 gameplay rule, not a rule belonging only to one skill.

### 危機感知 interaction

Current v0.3 design:
- 危機感知: when the board has 1 or fewer empty cells, the next generated Hero is guaranteed to become a special unit of the run's selected class.

Therefore, with exactly one empty cell at the generation stage:
- 危機感知 becomes active;
- the Hero receives generation priority;
- that Hero becomes the selected class's special unit;
- the board becomes full;
- the enemy generation is skipped.

## Confirmed first-merge ordering

When the first merge simultaneously causes class selection and the first General Skill reward, resolve them in this order:

1. Choose and lock the run's class.
2. Then show the General Skill choice.

Therefore a player cannot obtain a General Skill such as 突變 before a class has been selected.

## Current reviewed General Skill changes

### Movement / Merge
- 疾行 👣: every 5 valid moves, the next valid move does not generate an enemy.
- 風壓 🌪️: if one swipe moves at least 4 Heroes, deal 1 damage to 1 random enemy.
- 餘勢 ⚡: after 3 consecutive turns without a merge, all Heroes recover 1 HP on the third turn.
- 共鳴 💥: every 5 merges, all enemies take 1 damage.
- 融合再生 🌱: after a merge, the resulting Hero restores to full HP.
- 超載 ✨: if one swipe causes at least 2 merges, all enemies take 1 damage.

### Survival / General
- 求生 ❤️‍🩹: every 10 valid moves, all Heroes recover 1 HP.
- 幸運 🍀: every 10 valid moves, the next normal Hero spawn has a 25% chance to increase by one tier.
- 反震、逆境、怒火 are removed from the General Skill Pool and reserved for later class-skill consideration.

### Death / Kill triggers
- 遺爆 💣: when a Hero dies, deal 1 damage to 1 random enemy among the surrounding 8 cells.
- 遺志 👻: after a Hero dies, the next merge additionally attacks 1 random enemy.
- 血祭 🩸: after every 3 allied-unit deaths, the next allied unit generated increases by one tier. The ready effect does not stack.
- 靈魂收割 🌑: every 3 enemy kills, 1 random Hero recovers 1 HP.

### Kill / Combat growth
- 連殺 ⚔️: after killing 3 enemies within the same turn, additionally attack 1 random enemy.
- 殺意 🔴: every 5 accumulated enemy kills, the next skill damage +1.
- 決戰準備 is removed.
- 先制 ⚡: when a Boss appears, it immediately takes 2 damage.

### Spawn / Hero enhancement
- 堡壘 🏰: for the first 2 turns after a Boss appears, damage received by Heroes -1.
- 優質增援 🌟: every 10 Heroes generated, the 10th Hero appears as value 2.
- 新生 is removed.
- 突變 🎲: a newly generated Hero has a 10% chance to become a special unit of the run's selected class; its numeric value does not change.

### Board state / Hero count
- 孤軍 🐺: while there are 3 or fewer Heroes on the board, skill damage +1.
- 人海 🧱: while there are 6 or more Heroes on the board, every 5 turns 1 random Hero recovers 1 HP.
- 危機感知 🚨: when the board has 1 or fewer empty cells, the next generated Hero is guaranteed to become a special unit.
- 突破者 👑: whenever a new highest Hero number is created, gain additional Score equal to that number ×2.

## Implementation boundary

These are v0.3 design decisions only. Do not overwrite the stabilized v0.2 playable. Actual v0.3 gameplay implementation will be created separately after the remaining skill and class design is confirmed.
