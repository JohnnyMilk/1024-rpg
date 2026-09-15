# 1024 RPG — Version 2 v0.7 Boss Design

Status: DESIGN / PROTOTYPE

## v0.7 Theme
v0.7 focuses on Boss encounters. v0.6 remains the frozen gameplay/skill baseline and must not be overwritten.

A Boss encounter is treated as:

Boss + Map + Attack Pattern + Special Mechanic + Counterplay + Animation / Telegraph

## Boss Encounter Principles
Every Boss should have a recognizable identity, attack pattern, special rule, readable warning, intended counterplay and battlefield idea. Difficulty should not come only from higher HP or ATK.

## Battlefield Experiments
v0.7 supports research into 4×6 battlefields, moving/changing battlefields, and irregular maps containing inactive cells, missing corners, narrow passages or separated regions.

## Shared Battlefield Mechanic — Cell Collapse
Cell Collapse is a reusable v0.7 battlefield mechanic, not a mechanic exclusive to one Boss.

Cell lifecycle:

ACTIVE → WARNING → COLLAPSING → INACTIVE

Rules:
- A cell caused to collapse by an encounter must be visibly warned at least one Player Phase before it disappears.
- Warning cells remain usable during that Player Phase.
- Warning should use a strong battlefield-language cue such as changed floor material/color plus visible cracks. Cracks are the primary cue so collapse is distinguishable from attack-target colors.
- After the player's move, collapse resolves during the following Enemy Phase.
- Collapse animation language: cell rotates, shrinks, falls downward and fades out.
- A unit still standing on a collapsing cell falls with the cell and dies.
- Collapse does not push a unit to another cell.
- This mechanic can later remove arbitrary cells, allowing missing corners, broken lanes, separated areas and other irregular Boss maps.

## Boss 01 — 巨像守門者 / Colossus Gatekeeper
Status: FIRST PLAYABLE BATTLEFIELD PROTOTYPE. Attack Pattern is not final.

### Encounter identity
The encounter theme is spatial pressure. The Boss changes the usable battlefield rather than behaving like a normal high-HP enemy.

### Entry / battlefield expansion
- Normal play begins on the v0.6 4×4 battlefield.
- Boss Encounter expands the battlefield vertically to 4×6.
- The Boss enters from the top of the battlefield.
- Its arrival pushes existing battlefield contents downward.
- Push propagates through occupied cells.
- Any unit pushed beyond the bottom battlefield boundary dies through the normal death concept rather than being silently deleted.
- Boss-entry Push and Cell Collapse are intentionally different mechanics: Push displaces units; Collapse destroys the floor and drops units.

### Boss defeat / battlefield restoration
The battlefield does not instantly return from 4×6 to 4×4.

1. Boss is defeated.
2. The outermost removable row enters WARNING state.
3. Player receives one normal Player Phase to move away.
4. On the following Enemy Phase, the four warned cells collapse together using rotate + shrink + downward fall + fade.
5. Battlefield becomes 4×5.
6. The next outer row immediately enters WARNING state.
7. Player receives another Player Phase.
8. On the following Enemy Phase, that row collapses.
9. Battlefield returns to 4×4 and the Boss Encounter ends.

Any unit remaining on a collapsing row falls and dies.

### Current prototype scope
The first v0.7 playable page tests only the encounter feel of:
- 4×4 → 4×6 expansion;
- Colossus entry from above;
- downward battlefield Push and boundary death;
- Boss defeat trigger;
- one-Player-Phase collapse telegraph;
- two-stage 4×6 → 4×5 → 4×4 Cell Collapse;
- reusable crack / collapse visual language.

The prototype intentionally does not finalize Boss attack patterns, Break/Weak Point values, HP balance, spawn balance, or the final multi-cell Boss representation.

## Architecture Direction
The eventual integrated v0.7 runtime should extend the v0.6 gameplay baseline while separating logical battlefield cells from the old fixed 4×4 visual assumption. A battlefield should be able to define dimensions, active/inactive cells, warning/collapse state and transitions.

## Next Work
1. Test Boss 01 battlefield expansion, Push and Collapse feel on mobile.
2. Adjust timing/readability based on testing.
3. Integrate the approved battlefield model with the complete v0.6 runtime rather than changing archived v0.6.
4. Design Boss 01 Attack Pattern and telegraphs.
5. Verify interactions with heroes, Special units, enemies, death reactions and v0.6 skills.
