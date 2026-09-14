# 1024 RPG — v0.5 Persistence / Mastery Planning Notes

> Status: planning only. Do not modify frozen `rpg-v2-v0-4/` for these features.

## Version intent

Proposed next version: `rpg-v2-v0-5/`

Primary goal: validate persistent skill mastery and a formal game title screen before introducing additional combat-system changes.

Core validation flow:

`Play game -> trigger skill -> mastery increases -> close/reopen page -> progress remains`

## Storage decision

Use `localStorage` for the first implementation instead of cookies.

### Why localStorage

- Skill mastery is game-save data, not authentication/session data.
- Cookies have very limited capacity and are sent with HTTP requests unnecessarily.
- `localStorage` supports simple JSON persistence and is sufficient for dozens or hundreds of skills.
- GitHub Pages does not require a backend for this approach.
- IndexedDB is unnecessary at the current scale and can be considered later if save data becomes significantly larger or more structured.

Recommended main save key:

`1024RPG.save`

Do not create one localStorage key per skill.

## Proposed save structure

```json
{
  "saveVersion": 1,
  "gameVersion": "v0.5",
  "createdAt": "ISO_DATE",
  "updatedAt": "ISO_DATE",
  "mastery": {
    "rangerSnipe": {
      "level": 1,
      "xp": 4,
      "uses": 4
    },
    "rangerQuickShot": {
      "level": 2,
      "xp": 17,
      "uses": 17
    }
  },
  "stats": {
    "gamesPlayed": 0,
    "totalMoves": 0,
    "totalMerges": 0,
    "totalEnemiesKilled": 0
  },
  "settings": {}
}
```

## Skill definitions vs save data

Skill definitions should remain in game code and should not be duplicated into the save file.

Example skill definition:

```js
const SKILLS = {
  rangerQuickShot: {
    name: "迅捷射擊",
    maxLevel: 3,
    mastery: {
      level2: 10,
      level3: 30
    }
  }
};
```

The save should contain only player progress:

```json
{
  "level": 2,
  "xp": 17,
  "uses": 17
}
```

This avoids stale skill names, descriptions, balance values, or thresholds being permanently copied into older saves.

## Mastery data model

Each skill should reserve at least these fields:

- `level`: current mastery level.
- `xp`: progression value used for leveling.
- `uses`: lifetime successful trigger count for statistics.

Initial test model can use:

- Lv.1: 0 XP
- Lv.2: 10 XP
- Lv.3: 30 XP

These thresholds are provisional and can be rebalanced later.

### What counts as mastery usage

Mastery should increase only when the skill actually triggers or completes its relevant condition.

Examples:

- 遠射: a special Ranger actually moves and successfully performs the ranged-shot trigger.
- 迅捷射擊: the Ranger moves at least two cells and the extra ranged shot is actually triggered.
- 箭雨: the Ranger participates in a merge and Arrow Rain actually resolves.
- 復甦: mastery should be tied to an actual successful revive rather than merely owning the skill.

`uses` and `xp` are separate intentionally. Initially one successful trigger may equal `+1 XP`, but future skills may award different XP based on impact or difficulty.

## Save versioning and migration

Always include:

```json
{
  "saveVersion": 1
}
```

Game code should define a current save version and migrate older saves forward instead of deleting them.

Conceptual flow:

`v1 -> migrateSaveV1ToV2() -> v2 -> migrateSaveV2ToV3() -> v3`

Reserve a centralized migration function such as:

```js
migrateSave(save)
```

## Stable skill IDs

Once mastery persistence begins, skill IDs become persistent database keys and should not be renamed casually.

Examples already in use include:

- `rangerSnipe`
- `rangerQuickShot`
- `rangerRain`
- `priestHolyHeal`
- `warSmash`
- `awakening`
- `reincarnate`

Display names may change later, but the underlying ID should remain stable whenever possible.

## Proposed title screen

The next version should open on a proper game-style title screen instead of directly entering the board.

Main options:

1. 開始遊戲
2. 技能熟練度
3. 清除所有記錄

Visual direction:

- dark game-title background
- prominent `1024 RPG` logo/title
- `VERSION 2` subtitle
- vertically arranged menu entries with large mobile touch targets
- game-menu presentation rather than ordinary webpage buttons

## Skill Mastery screen

Present mastery as a game collection / codex screen rather than a plain data table.

Suggested grouping:

- 戰士
- 遊俠
- 祭司
- 通用技能
- 一般技能

Example display:

```text
🏹 遊俠

🏹 遠射
LV. 2
████████░░ 18 / 30
使用次數 18

↩️ 回身射擊
LV. 1
████░░░░░░ 4 / 10
使用次數 4

🔭 狙擊
LV. 3
MASTERED
使用次數 53
```

Unused / undiscovered skills may optionally appear as `??? / 尚未使用` later.

## Clear-save flow

Do not use the browser's native `confirm()` UI if possible. Use game-styled confirmation modals.

Recommended two-stage confirmation:

### First confirmation

Explain that the following will be deleted:

- skill mastery
- skill levels
- game statistics
- local game settings

Buttons:

- 取消
- 繼續

### Second confirmation

Final warning with buttons:

- 返回
- 永久刪除

Implementation should remove only the game's own save key:

```js
localStorage.removeItem("1024RPG.save");
```

Avoid `localStorage.clear()` so unrelated data on the same origin is not accidentally removed.

## v0.5 scope limit

The first mastery version should test persistence only.

Recommended v0.5 scope:

- title screen
- localStorage save
- `saveVersion`
- per-skill XP
- per-skill Lv.1–Lv.3
- mastery screen
- clear-save flow
- migration framework

Do **not** make Lv.2 / Lv.3 alter combat effects yet.

This isolates persistence bugs from skill-balance and combat-logic bugs.

## Proposed later version

After persistence is stable, a later version can introduce mastery gameplay effects:

- Lv.2 skill effects
- Lv.3 skill effects
- mastery level-up presentation
- additional mastery feedback

## Version-development rule

`rpg-v2-v0-4/` remains the current frozen test version. New persistence/mastery work must live in a new version directory and must not overwrite or destabilize v0.4.
