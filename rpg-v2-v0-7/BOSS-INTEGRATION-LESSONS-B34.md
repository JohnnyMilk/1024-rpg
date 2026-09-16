# 1024 RPG v0.7 — Boss Integration Lessons (B33 → B34)

Repository: `JohnnyMilk/1024-rpg`  
Formal runtime: `rpg-v2-v0-7/`  
Validated Boss: **🗿 巨像守衛**

## Purpose

This document records the lessons learned while integrating the first formal Boss so later Boss designs do not repeat the same runtime, lifecycle, DOM, and multi-Boss bugs.

## 1. Find the real runtime layer before changing Boss logic

The formal game is generated through multiple layers:

```text
index.html
→ v07-runtime-loader.js
→ v07-bootstrap.js
→ v0.6 hp-loader.js
→ v0.6 game.js
→ transformed final runtime
```

A function visible in a source file is not automatically the function that finally runs. Boss integration must target the final runtime layer and its real call chain.

**Rule:** never guess a source-string anchor. Verify the exact generated function/layer first.

## 2. One Boss engine must own the whole Boss lifecycle

The working architecture uses one `GiantElephantGuard` instance as the source of truth for:

- Boss action selection
- Charge cooldown
- Quake cooldown
- Boss defeat state
- WARNING state
- Player-warning transition
- floor collapse
- Boss UI cooldown state

Do not maintain a second independent DOM-derived Boss state machine. UI should render engine state, not reconstruct gameplay state.

## 3. Preserve ordinary Enemy Phase behavior

Normal enemies continue using the existing `enemyAct()` pipeline. Only the Boss queue is delegated to `GiantElephantGuard.takeTurn()`.

This prevents Boss work from destabilizing ordinary enemy movement, HP, Guard, death settlement, spawning, and existing class skills.

## 4. Boss death order matters

Validated order:

```text
Boss HP reaches 0
→ existing death settlement / score
→ original Boss three-choice reward
→ GiantElephantGuard.beginDefeat()
→ BOSS DEFEATED notice
→ WARNING row
→ one normal Player Phase
→ collapse Enemy Phase
→ next WARNING row
→ one normal Player Phase
→ second collapse
→ 4×4 board
```

Do not start collapse before the original reward closes.

## 5. WARNING is a real phase, not an animation delay

The warning row must remain playable for one normal Player Phase. Collapse occurs only in the following Enemy Phase.

Do not simulate this by replaying keyboard input, observing the TURN DOM, or using animation timers as game logic.

## 6. Multi-Boss testing is mandatory

A Boss implementation is not considered stable after only one Boss cycle.

B33 passed the first Boss but failed on the second Boss collapse. The failure exposed state/DOM assumptions that were not exercised during the first cycle.

Minimum Boss regression test:

1. first Boss spawn and skills
2. first Boss defeat/reward
3. two collapse rows
4. return to 4×4
5. continue normal gameplay
6. second Boss spawn and skills
7. second Boss defeat/reward
8. second complete collapse cycle
9. preferably repeat with a third Boss

Each new Boss type must be tested in repeated encounters, not only once.

## 7. Do not build CSS selectors from raw runtime IDs

The second-Boss B33 crash came from:

```js
pieces.querySelector('[data-id='+u.id+']')
```

Numeric/raw IDs can produce an invalid CSS selector in Safari. This only surfaced when a later collapse row contained a unit and that branch executed.

Validated safer pattern:

```js
[...pieces.children].find(n => String(n.dataset.id) === String(u.id))
```

General rule: when the code already owns the DOM collection, compare `dataset` values directly. Do not turn arbitrary runtime IDs into selector syntax unless escaped/quoted safely.

## 8. Boss adapters must use formal game state

Adapter methods such as `bossAlive`, `findChargeTarget`, `charge`, `quake`, `stomp`, and `collapseBottomRow` should operate on formal runtime state (`E`, rows, HP/death pipeline, render/settle functions).

Do not infer combat truth from animation text or rendered DOM.

## 9. Damage must go through the normal HP/death pipeline

Boss skills should call the same hero-damage and settlement functions used by normal combat. This preserves Guard, revive, death triggers, score, animations, and other established systems.

Avoid directly deleting units or bypassing settlement unless the mechanic explicitly requires it.

## 10. Cooldown UI must consume engine events

`GiantElephantGuard.emit()` publishes `v07-boss-state` containing real `chargeCD` and `quakeCD` values.

Boss HUD should listen to this event and render those values. It must not estimate cooldowns from TURN changes or search animation/effect text for skill names.

This is especially important when future Bosses have different action rules, skipped turns, extra turns, or phase transitions.

## 11. Separate logic from presentation

Recommended structure for future Bosses:

```text
Boss engine
  = state + decision + cooldown + phase lifecycle

Formal adapter
  = board/HP/movement/damage/collapse operations

Boss animation module
  = visual effects only

Boss UI module
  = read engine events and display state only
```

Animations and UI must never become the authority for combat state.

## 12. Avoid brittle final-runtime text patches

B33 initially failed startup because it searched for exact `move()` text after another runtime layer had already rewritten it.

If a runtime patch is unavoidable:

- patch the smallest verified stable anchor
- do not depend on a long function body string
- fail loudly during development if a required anchor is absent
- once a direct lifecycle entry point exists, prefer that over further source parsing

## 13. Keep previous stable systems frozen

Boss work should not refactor unrelated systems at the same time. Preserve normal movement, merge, spawning, profession selection, normal Enemy Phase, HP, existing class skills, Guard, and general animations unless the requested change explicitly targets them.

## 14. Checklist for every future Boss

Before publishing a Boss build, verify:

- game boots with no DEBUG errors
- Boss identity is correct
- one engine instance controls the current Boss
- every Boss skill uses real game state
- every cooldown is emitted from engine state
- cooldown HUD visibly changes after skill use
- Boss death uses original reward flow
- post-defeat warning allows exactly one normal Player Phase per row
- collapse uses formal board state and settlement
- board returns to the expected dimensions
- normal gameplay resumes
- second Boss completes the same lifecycle
- no raw runtime ID is interpolated into an unsafe CSS selector

## B34 balance update

Starting with B34, the current 巨像守衛 values are:

```text
Stomp: 2 damage
Quake: 2 damage
Charge: 1 damage + push
Charge CD: 3 Boss turns
Quake CD: 4 Boss turns
```
