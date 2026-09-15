# 1024 RPG — Version 2 v0.7 Boss Design

Status: DESIGN / PROTOTYPE

## v0.7 Theme
v0.7 focuses on Boss encounters.

The goal is that every Boss should feel distinct and memorable. A Boss should not be defined only by higher HP or ATK. Each Boss should combine a recognizable attack pattern, special combat rules, visual/animation tells, and a battlefield idea that changes how the player approaches the encounter.

## Boss Encounter Principles
Each Boss should eventually define:
- identity / theme;
- attack pattern;
- movement or action behavior;
- special mechanic or trick;
- player-readable warning / animation;
- intended counterplay or puzzle;
- battlefield shape / terrain interaction;
- interaction with existing v0.6 heroes, Special Classes and skills.

## Battlefield Experiments
v0.7 will prototype Boss-specific battlefield changes instead of assuming every encounter uses the standard 4x4 board.

### 1. 4 wide x 6 high battlefield
A Boss encounter may use a board that is 4 cells wide and 6 cells high. This can change movement distance, merge space, melee pressure and ranged combat value.

### 2. Moving battlefield
The battlefield itself may change during combat. Terrain, usable cells, obstacles or sections of the board may move or shift according to turns or Boss mechanics.

### 3. Irregular battlefield
Boss maps may contain unusable cells, missing corners, narrow passages, separated regions or other non-rectangular layouts. The shape should support the Boss mechanic rather than exist only as decoration.

## Architecture Direction
v0.6 remains the gameplay and skill-system baseline. v0.7 should extend it without modifying the archived v0.6 rules.

The map system should eventually separate logical cells from a fixed 4x4 visual assumption so a Boss encounter can define dimensions, active/inactive cells, terrain state and map transitions.

A Boss should be treated as a complete encounter composed of:

Boss + Map + Attack Pattern + Special Mechanic + Counterplay + Animation / Telegraph

## Current Decisions
- v0.7 is the Boss-focused version.
- Every Boss should have a memorable mechanic and attack style.
- Boss maps may differ from the normal map.
- 4x6 maps will be explored.
- moving maps will be explored.
- irregular maps will be explored.
- No individual Boss design is final yet.

## Next Work
1. Define the v0.7 battlefield/map data model.
2. Decide how normal 4x4 gameplay transitions into a Boss battlefield.
3. Design the first Boss encounter as the reference implementation.
4. Prototype animation/telegraph rules for Boss attacks.
5. Test compatibility with v0.6 merge combat, Special Classes and skill effects.
