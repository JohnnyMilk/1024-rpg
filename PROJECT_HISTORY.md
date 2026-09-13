# 1024 RPG Project History

## Naming rules

- Type = core gameplay. Create a new Type only when the main operation, board rules, or combat structure fundamentally changes.
- Version = evolution within the same Type. Features, balance, UI, animation, enemies, bosses, and scoring stay in the same Type unless the core gameplay changes.

Type 01 history: v0.1 -> v0.2 -> v0.3 -> v0.4 -> v0.5 -> v0.6 -> v0.7 -> v1.0.

## Type 01 - 1024 / Slide & Merge

Status: v1.0 core gameplay complete.

Type 01 uses a 4x4 board with 1024/2048-style swipes in four directions. Heroes move with the swipe, same-Tier heroes merge, and enemies/Bosses live directly on the board. Hero merges drive RPG skills and combat.

Core identity: slide + merge + heroes and enemies sharing the same board.

If this core stays the same, future updates remain Type 01. A fundamentally different control/combat model should become Type 02.

## Development history

- v0.1 Merge Combat: first 1024 x RPG prototype; merge triggers attacks.
- v0.2 Movement Combat: movement participates in combat; warrior, archer, mage, and turn-20 Boss concept added.
- v0.3 Pressure Spawn: enemy spawned on every valid move to test board pressure.
- v0.4 Balanced Spawn: enemy spawn changed to every 2 valid turns; skills use global merge count.
- v0.5 HIT Count Combat: durability and damage relationships revised.
- v0.6 Unified Hero: same-Tier hero merge, 1/3/5 merge triggers for warrior/archer/mage, plus collision damage.
- v0.7 Endless Boss: completed loop of move -> merge -> attack/damage -> death, plus shadow enemies, Boss cycle, and HP/ATK rebalance.
- v1.0 Official Release: formal score system, Chinese Game Over summary, skill-kill statistics, and mobile result layout.

## v1.0 gameplay rules

Hero display values map to Tier/max HP as follows: 1 = T2 = 2 HP, 2 = T4 = 4 HP, 4 = T8 = 8 HP, 8 = T16 = 16 HP, continuing by doubling.

Merged HP equals the sum of the two source heroes' remaining HP, capped at the new Tier max HP.

Each valid turn adds 1 hero. Every 2 valid turns adds 1 normal enemy. Boss interval is 20 turns. Defeating a Boss does not end the run. Game Over happens on party wipe or when no direction can produce a valid action.

When a hero swipes into an enemy, the hero stops before the enemy, does not push it, does not directly damage it by contact, the move still counts as valid, and the hero takes that enemy's current ATK damage.

Enemy phase: if an enemy starts adjacent to a hero, it attacks one adjacent hero and does not move. Otherwise it moves one cell toward the nearest hero. An enemy that moved does not attack in the same action.

## Enemies and Bosses

Normal enemy: Shadow Assassin. Max HP is always 1. Its ATK is stored at spawn time.

Boss cycle:
1. Shadow Blade
2. Night Lord
3. Eye of the Abyss
4. Shadow of Death
5. Shadow King

The second cycle uses II, then III, and so on.

Boss HP: 10, 15, 20, 25, 30, 35...

Enemy/Boss ATK curve: ceil(Stage / 2), producing 1, 1, 2, 2, 3, 3...

## Skills

A global mergeCount drives all skill triggers.

- Warrior: every merge; attacks orthogonally adjacent enemies around the merged hero.
- Archer: every 3 merges; attacks one random enemy.
- Mage: every 5 merges; attacks all enemies.

Triggers can overlap. Each skill hit deals 1 HP.

## Score

- Valid move: +1
- Merge: add the resulting displayed hero value
- Normal enemy kill: +20
- Boss kill: +100
- Hero death: subtract that hero's displayed value
- Score cannot go below 0

## Game Over and skill kills

The Game Over screen shows a large total score, score breakdown, and run history.

Run history includes: turns survived, move count, merge count, total enemies killed, Bosses defeated, hero deaths, and highest hero value.

Skill kills are assigned to the skill that deals the final lethal hit.

Total enemies killed includes normal enemies and Bosses. Bosses defeated is a subset of that total.

Therefore:
Warrior kills + Archer kills + Mage kills = total enemies killed.

## Animation timing

- Move: about 0.25 s
- Merge: about 0.25 s
- Warrior slash: about 0.36 s
- Archer arrow: about 0.42 s
- Mage wave: about 0.62 s
- Damage number: 0.75 s
- Death: about 0.25 s

Attack FX and damage-number FX start together. Lethal death animation waits until damage FX finishes. Player input stays locked while animations resolve.

## Repository handoff

Main files:
- PROJECT_HISTORY.md: persistent project history and handoff notes.
- type-01/index.html: Type 01 definition, release entry, and version history.
- rpg-v1-0/index.html: playable Type 01 v1.0 release.

Playable v0.1-v0.7 pages were removed from the current branch; only textual history remains.

When continuing development in a new conversation, read PROJECT_HISTORY.md first, then the relevant type-XX/index.html, then fetch the current playable HTML before editing. Do not reconstruct the file from memory alone, and do not change unspecified rules, timing, spawn logic, or values.

## Current milestone

Type 01 / v1.0: complete.

Type 01 maintenance or non-core additions should continue from v1.1. A truly different core gameplay model should become Type 02.
