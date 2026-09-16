# 1024 RPG v0.7 — Boss Development & Refactor Guide

> Purpose: this document is the cross-chat source of truth for future Boss design and implementation. Read it before creating or modifying any Boss.

## 1. Why v0.7 was refactored

The original v0.7 Boss integration stacked runtime source patches:

`v07-runtime-loader -> v07-bootstrap -> v0.6 hp-loader -> v0.6 game.js`

Each layer depended on exact source strings and `replace()` anchors. B29E failed with `final game phase anchor missing`. This showed that the project was blocked by source-patching architecture rather than Boss game design.

### Lessons

- Do not build new Bosses by patching generated source strings.
- Do not make v0.7 fetch/eval v0.6 runtime files.
- Do not modify frozen v0.6 while refactoring v0.7.
- Prefer explicit modules, stable APIs, inheritance, registries and tests.
- When a feature will have many variants, design the extension point before adding the variants.

## 2. One runtime, two initialization modes

Normal Game and Boss Test are NOT separate games. They must run the same v0.7 runtime, Boss classes, skills, animations, Turn Manager and Map Event Manager.

The only intended difference is initialization configuration.

### Normal Game

- normal starting heroes
- normal profession acquisition
- normal skill acquisition
- Boss appears through normal progression

### Boss Test

- predetermined starting heroes
- predetermined special profession
- most required skills already unlocked
- selected Boss already prepared/entered

Boss Test must not contain special gameplay buttons such as `Boss -1 HP`, `Force Collapse`, `Next Phase`, etc. If a Boss only works through test-only controls, it is not considered integrated.

## 3. Core phase architecture

The authoritative turn order is:

`Player Phase -> Enemy Phase -> Map Event Phase -> next Player Phase`

Map Event Phase automatically skips when no event exists.

Boss code must never rewrite or own the main turn loop.

## 4. Boss inheritance architecture

All Boss classes inherit `V07BaseBoss`.

```text
V07BaseBoss
├── GiantElephantGuard
│   ├── temporary Boss variants
│   └── Bosses intentionally derived from Giant Elephant behavior
├── Boss02
├── Boss03
└── ...
```

`V07BaseBoss` owns common lifecycle concerns:

- game/context references
- cooldown storage/ticking
- `takeTurn()`
- `chooseAction()` extension point
- `executeAction()`
- `onSpawn()`
- `onDefeated()`
- trace hooks
- queueing Map Events

A concrete Boss owns only its unique behavior and parameters.

## 5. Current baseline Boss

Until a new Boss receives its own design, it may inherit `GiantElephantGuard` and therefore behave exactly like the current Giant Elephant Guard.

Current Giant Elephant Guard behavior is the reference baseline:

- Charge: cooldown 3 Boss Turns; straight-line target with clear path; up to 2 cells; current test damage 1 plus push.
- Quake: cooldown 4 Boss Turns; triggered by adjacent hero; Boss does not move; current test damage 1.
- Stomp: fallback action; approaches nearest hero; current test contact damage 2.
- Boss death queues the map collapse event instead of directly controlling the board/turn loop.

Do not change these numbers merely because architecture is being refactored. Balance changes are separate work.

## 6. Boss death and Map Events

A Boss may REQUEST a map event, but must not IMPLEMENT the map event lifecycle.

Example:

```js
async onDefeated() {
  await super.onDefeated();
  this.queueMapEvent({ type: 'collapse', rows: 2 });
}
```

`MapEventManager` owns warning, timing, board mutation and completion.

Approved collapse sequence:

```text
Boss defeated / reward resolved
-> Map Event creates Warning row
-> Player Phase (warning cells remain usable)
-> Enemy Phase
-> Map Event collapses warned row
-> if rows > 4, create next Warning row
-> Player Phase
-> Enemy Phase
-> Map Event collapses warned row
-> return to 4x4
```

Approved visual behavior from REUSE-06 must be preserved unless explicitly redesigned: four cells fall sequentially, 120 ms stagger, 760 ms cell/unit fall animation, then 820 ms settle. Units on the collapsed row fall/die with the row.

## 7. Boss Registry

Bosses are registered by ID and instantiated by the shared Boss Registry.

```js
V07Bosses.register('giant-elephant-guard', GiantElephantGuard);
const boss = V07Bosses.create(id, context);
```

The registry rejects classes that do not inherit `V07BaseBoss`.

Normal Game and Boss Test must create Bosses through this same registry.

## 8. How to create a new Boss

1. Start in the Boss Test configuration, but use the shared production runtime.
2. If the Boss is not designed yet, inherit `GiantElephantGuard` unchanged.
3. When design begins, decide whether it is a Giant Elephant variant or a new direct `V07BaseBoss` subclass.
4. Override only necessary extension points (`chooseAction`, `onSpawn`, `onDefeated`, etc.).
5. Put board changes into Map Events, not Boss code.
6. Put reusable animation behavior into shared animation modules, not the test page.
7. Register the Boss in `V07Bosses`.
8. Add smoke/regression tests.
9. Test through the same gameplay path used by the formal game.
10. When Boss Test passes, formal integration should mainly be configuration/pool registration, not code transplantation.

## 9. Regression rules that must survive refactors

### v0.6

v0.6 is the frozen rollback baseline. Do not modify it as part of v0.7 work.

### v0.7 Priest Guard difference

Do NOT accidentally restore the v0.6 Priest Guard behavior.

Authoritative v0.7 Guard rule:

- trigger: Special Priest actually moves
- range: surrounding 8 cells
- targets: friendly units only
- exclude the Priest itself
- maximum 3 targets
- prioritize allies that do not already have Guard

This rule requires regression tests because copying old v0.6 behavior can silently reintroduce self-Guard.

## 10. Diagnostics and self-check requirements

Before asking for manual device testing:

- run syntax/boot checks
- run smoke tests for module loading
- assert `Player -> Enemy -> Map Event` order
- assert Boss inheritance/registration
- assert Boss cooldown behavior
- assert Boss death queues the expected Map Event
- assert Priest Guard v0.7 regression rules
- trace lifecycle checkpoints rather than infer execution from visual symptoms

Useful trace categories:

```text
BOOT
PLAYER_START / PLAYER_END
ENEMY_START / ENEMY_END
MAP_EVENT_START / MAP_EVENT_END
BOSS_SPAWN / BOSS_ACTION / BOSS_DEFEATED
COLLAPSE_WARNING / COLLAPSE_START / COLLAPSE_END
```

A user should test game behavior, not act as the debugger for whether a function was called.

## 11. Reuse rules

Prefer reuse in this order:

1. same runtime + different configuration
2. shared manager/module
3. inheritance/composition
4. explicit stable adapter/interface
5. duplication only as a temporary migration step

Avoid reuse by runtime source surgery (`fetch text -> replace -> eval`).

## 12. Definition of Done for a Boss

A Boss is not complete merely because its standalone prototype works. It is complete when:

- it inherits the Boss architecture correctly
- it is registered in the shared registry
- Boss Test uses the same production runtime
- no test-only gameplay control is required
- Player/Enemy/Map Event phases remain correct
- Boss death/reward/map events resolve correctly
- relevant animations match the approved design
- smoke/regression tests pass
- the formal game can use the same Boss class without copying its implementation

## 13. Current refactor principle

**One v0.7 Runtime, one Boss implementation, one skill system. Normal Game and Boss Test differ only by Initial Game Config.**

This principle should guide future conversations and prevent the project from returning to separate prototype/formal implementations.