# 1024 RPG — Type 02 Design Notes

## Status
**CONCEPT / POC TESTING — NOT FINAL**

Type 02 is the next major 1024 game type after Type 01 completion. The current city / management direction is now being tested through a first playable POC. Nothing in this document should be treated as locked gameplay unless explicitly marked as decided later.

## Current direction
The first concept direction is a **city / management simulation built around 1024-style merging**.

The important distinction from Type 01 is that the 4×4 board is no longer the entire game world. It is being tested as the player's **planning / construction / decision area**, while another part of the screen shows the simulated city as a visible result of those decisions.

Working design idea:

> **4×4 board = decisions**  
> **Simulation view = results**

## Version 1 · v0.1 POC — 2026-09-17
Status: **PLAYABLE PROOF OF CONCEPT / TESTING**

Path: `type-02-v1-v0-1/`

The purpose of v0.1 is not balance or final rules. It tests whether a 1024 planning board and a visible management simulation can feel like one coherent game.

Implemented in the POC:
- 4×4 swipe board with touch and keyboard controls.
- Four building families: Residential, Industry / Commerce, Energy / Infrastructure, Public / Environment.
- Only buildings of the same family and same level merge.
- A valid board movement advances the simulation by one day.
- A new Level 1 building is generated after each valid movement.
- Population, Finance, Energy and Happiness are live management meters.
- The meters are linked: housing creates population and demand; industry creates jobs/income; energy creates supply; public development improves happiness but adds cost.
- A separate LIVE CITY panel visualizes the accumulated city using buildings, traffic and pedestrians.
- The city classification changes as population grows.
- City log gives lightweight feedback on merges, energy pressure, employment pressure and satisfaction.
- A management event appears every 7 days and presents two choices with economic / happiness consequences.
- Board lock ends the POC run.
- Reset is available for repeated testing.

### v0.1 deliberate simplifications
- No save system yet.
- No formal victory condition.
- No fixed run length.
- No meta-progression.
- The LIVE CITY is a visual representation of the board totals, not a second spatial simulation grid.
- Building balance, spawn probabilities and formulas are provisional.
- Events are deliberately few and simple.

These limitations are intentional: v0.1 exists to test the core feeling before expanding systems.

## Concept: merge a city instead of heroes
Instead of merging hero numbers, the player merges buildings or facilities.

Example residential chain:

| Level | Example | Possible effect |
|---|---|---|
| 1 | 🏠 Small House | small population capacity |
| 2 | 🏘️ Residence | more population capacity |
| 3 | 🏢 Apartment | larger population capacity |
| 4 | 🌆 High-rise | major population capacity |

Two matching buildings merge into the next level, preserving the familiar 1024 progression while giving the merged object a simulation meaning.

## Building families under test
### Residential
Supports population and housing capacity.

### Industry / Commerce
Creates jobs and income, with higher infrastructure demand.

### Energy / Infrastructure
Provides power capacity needed for the city to function.

### Public / Environment
Improves happiness and quality of life, with maintenance cost.

## Simulation layer
Type 02 explores a visible simulation area outside the 4×4 board. In v0.1 it shows buildings, population activity and traffic as a visual result of the current planning board.

The purpose is to make the player feel that the 1024 board is **causing something to happen**, rather than being the complete presentation by itself.

## Turn / time model under test
v0.1 currently uses:

> **Valid Swipe / Build → Simulate → Resolve resources → Event when due → Next day**

An invalid swipe does not advance time.

## Management meters under test
### Population
Driven mainly by residential capacity and supported by employment.

### Finance
Industry and population generate income; developed city systems create costs.

### Energy
Energy buildings provide supply while residential, industry and public buildings create demand.

### Happiness
Affected by public development, industry pressure, employment and energy conditions.

The goal is to create **trade-offs**, not a dashboard full of independent numbers.

## Events
v0.1 includes lightweight city events every seven days. Current examples include a weekend market, power-grid maintenance and urban greening proposals. Event content and timing are provisional.

## Possible overall format
A promising direction remains a **short-session city-management roguelite / simulation run** rather than a full SimCity clone.

Possible loop:

> **Build → Simulate → Adapt → Event → Build again**

Victory conditions, failure conditions, scenario objectives and meta-progression remain open.

## Design principles for Type 02
1. It must feel fundamentally different from Type 01.
2. 1024 merging should remain meaningful, not merely decorative.
3. The board should create consequences in a larger simulation.
4. Players should be able to **see the result** of their management decisions.
5. Meters should interact and create trade-offs.
6. Do not build a full city simulator before proving the core loop.
7. Start with an MVP / POC and expand only after the loop is fun.

## Open questions after v0.1
- Is 4×4 still the best planning-board size?
- Does one valid swipe = one day feel natural in play?
- Are four building families enough, too many or too few?
- Should new building generation remain random or become a management choice?
- Should the LIVE CITY become a spatial simulation rather than a visualization?
- What causes a run to end beyond board lock?
- Is there a win condition, score target, survival target or scenario objective?
- How much randomness should come from events versus tile generation?
- Should the player be able to directly intervene in the simulation view?
- Should Type 02 remain specifically city-themed or eventually support other management scenarios?

## Current working label
**TYPE 02 — CITY / MANAGEMENT SIMULATION**

No final game title has been selected. `1024 CITY` is used only as the v0.1 POC display name.
