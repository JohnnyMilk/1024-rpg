# 1024 RPG — Type 02 Design Notes

## Status
**CONCEPT / NOT FINAL**

Type 02 is the next major 1024 game type after Type 01 completion. Nothing in this document should be treated as locked gameplay unless explicitly marked as decided later.

## Current direction
The first concept direction is a **city / management simulation built around 1024-style merging**.

The important distinction from Type 01 is that the 4×4 board would no longer be the entire game world. It may become the player's **planning / construction / decision area**, while another part of the screen shows the simulated city or operation as a visible result of those decisions.

Working design idea:

> **4×4 board = decisions**  
> **Simulation view = results**

This is intentionally exploratory. The final Type 02 may change the board size, controls, resources, simulation model or theme.

## Concept: merge a city instead of heroes
Instead of merging hero numbers, the player could merge buildings or facilities.

Example residential chain:

| Level | Example | Possible effect |
|---|---|---|
| 1 | 🏠 Small House | small population capacity |
| 2 | 🏘️ Residence | more population capacity |
| 3 | 🏢 Apartment | larger population capacity |
| 4 | 🌆 High-rise | major population capacity |

Two matching buildings merge into the next level, preserving the familiar 1024 progression while giving the merged object a simulation meaning.

## Possible building families
These are examples only and are **not finalized**.

### Residential
Supports population and housing capacity.

### Industry / Commerce
Creates jobs, production or income, but may create costs or negative externalities.

### Energy / Infrastructure
Provides power or other capacity needed for the city to function.

### Public / Environment
Improves happiness, quality of life or city stability, but may consume money without directly generating revenue.

Different families could have separate merge chains so the player must decide what kind of city to build rather than simply chase the largest number.

## Simulation layer
Type 02 should explore a visible simulation area outside the 4×4 board. This area could show the city growing and changing as the player's board decisions take effect.

Possible visual results:
- buildings appearing or upgrading;
- population/activity increasing;
- traffic or citizens moving;
- industrial activity;
- lights / power state;
- parks and public spaces;
- visual signs of prosperity, congestion or failure.

The purpose is to make the player feel that the 1024 board is **causing something to happen**, rather than being the complete presentation by itself.

## Possible turn / time model
One possible structure is:

> **Swipe / Build → Simulate → Resolve resources → Event → Next day**

A valid 1024 action could advance the simulation by one day or one time unit. This would give every swipe an economic consequence.

A possible run structure could be a finite city-management challenge, for example around 100 simulation days, but **run length is not decided**.

## Management meters
Simulation gameplay should include a small number of important meters that pull against each other. Initial candidates:

### Population
Needs housing, jobs and services. Population growth may increase both opportunity and demand.

### Finance
Income funds construction and maintenance. A city can grow quickly but become financially unstable.

### Energy
Buildings consume power. Insufficient capacity can reduce efficiency or shut systems down.

### Happiness
Affected by housing, jobs, environment, public facilities, pollution, events and shortages.

These four are a starting point, not a final list. The goal is to create **trade-offs**, not a dashboard full of independent numbers.

## Example management tensions
- Too much housing → population rises faster than jobs or infrastructure.
- More industry → better income / employment but potentially lower happiness or higher energy demand.
- More parks / public facilities → higher happiness but additional financial cost.
- Insufficient energy → city efficiency drops or buildings stop operating.

The interesting decision should be **what to merge and develop now**, based on the current condition of the simulation.

## Events
Type 02 could include city or management events between simulation steps.

Example:

**Spring Festival**
- Hold festival → Happiness +10 / Finance -200
- Cancel → preserve money / Happiness -5

Events can create short-term decisions that interact with the long-term city build.

## Possible overall format
A promising early format is a **short-session city-management roguelite / simulation run** rather than an endless full SimCity clone.

Possible loop:

> **Build → Simulate → Adapt → Event → Build again**

A run could eventually be evaluated using population, finance, happiness, city development or other objectives.

This is only a prototype direction. Victory conditions, failure conditions and meta-progression are still open questions.

## Design principles for Type 02
1. It must feel fundamentally different from Type 01.
2. 1024 merging should remain meaningful, not merely decorative.
3. The board should create consequences in a larger simulation.
4. Players should be able to **see the result** of their management decisions.
5. Meters should interact and create trade-offs.
6. Do not build a full city simulator before proving the core loop.
7. Start with an MVP prototype and expand only after the loop is fun.

## Open questions
- Is 4×4 still the best planning-board size?
- Does every valid swipe advance one day?
- How are new building tiles generated?
- Can different building categories merge only with their own category?
- Is the simulation city spatially meaningful or mainly a visual representation of accumulated results?
- Is Type 02 a city simulator specifically, or should the same system support other management themes later?
- What causes a run to end?
- Is there a win condition, score target, survival target or scenario objective?
- How much randomness should come from events versus tile generation?
- Should the player be able to directly intervene in the simulation view, or only through the 1024 board?

## Current working label
**TYPE 02 — CITY / MANAGEMENT SIMULATION PROTOTYPE**

No final game title has been selected.
