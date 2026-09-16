# v0.7 Refactor Architecture

## Non-negotiable rules
- v0.6 is frozen and must not be modified.
- v0.7 final runtime must not fetch or eval v0.6 game.js or hp-loader.js.
- Normal Game and Boss Test use the same v0.7 runtime. They differ only by initial configuration.
- Boss Test has no artificial damage/collapse buttons. It starts with configured heroes, profession, skills, and Boss.
- Turn order is Player -> Enemy -> Map Event.
- Boss implementations do not own the turn loop and do not directly patch game source.
- Map changes are queued through MapEventManager.
- Priest Guard v0.7 rule: after actual movement, select up to 3 allies in surrounding 8 cells, exclude the priest, prioritize unguarded allies.

## Modules
- refactor/game-config.js: normal vs boss-test initialization only.
- refactor/turn-manager.js: sole owner of Player/Enemy/Map Event phase order.
- refactor/map-event-manager.js: reusable map event queue and collapse lifecycle.
- refactor/boss-registry.js: Boss registration/creation.
- refactor/bosses/*.js: individual Boss behavior modules.
- refactor/skills/*.js: version-specific skill rules.
- refactor/smoke-tests.js: architecture regression checks.

## Migration gate
The refactor branch must not replace main until the standalone v0.7 game runtime has been migrated and passes: startup, 4x4 move/merge, enemy phase, profession/skills, corrected Priest Guard, Boss spawn/combat/reward, and 6->5->4 collapse lifecycle. Until then main remains the stable rollback build.