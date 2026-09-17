# 1024 RPG — Type 02 Design Notes

## Status
**VERSION 1 · POC TESTING — NOT FINAL**

Type 02 is a new city / management 1024 game type. Its current core hypothesis is:

> **4×4 board = short-term planning / progression engine**  
> **LIVE CITY = long-term management / visible results**

## Version 1 · v0.1 — archived POC
Path: `type-02-v1-v0-1/`

v0.1 tested four building families directly on the 4×4 board: Residential, Industry, Energy and Public. Only same-family + same-level tiles could merge. It successfully demonstrated the board + LIVE CITY presentation, but playtesting exposed a structural problem: too many incompatible tile types fill a 16-cell board quickly and cause premature board lock.

v0.1 is retained as a playable design archive and should not be overwritten by v0.2 development.

## Version 1 · v0.2 — current POC
Path: `type-02-v1-v0-2/`

Status: **PLAYABLE / CURRENT TEST BUILD**

v0.2 changes the core loop instead of merely tuning v0.1 spawn rates.

### 1. Single merge chain
The 4×4 planning board no longer contains four building categories. Board tiles only represent development level. Equal levels can merge regardless of the future city investment category.

This keeps the spatial / merge puzzle close to classic 1024 and prevents category fragmentation from being the main source of board lock.

### 2. Quarterly planning limit
A quarter contains **12 valid planning moves** in the current POC.

- Invalid swipes do not consume a move.
- Each valid move spawns a new development tile.
- The board does not continue until it naturally locks.
- After the 12th valid move, planning stops and the quarterly investment phase begins.
- 12 is a test value, not a final rule.

The purpose is to avoid requiring a long traditional 1024 session for a small amount of city progression.

### 3. Every merge produces a development right
Successful merges are recorded during the quarter. The resulting merge level determines the level of the development right.

Example:
- LV1 + LV1 → LV2 development right
- LV2 + LV2 → LV3 development right
- Higher merges create correspondingly stronger development rights

The player therefore receives value throughout the short 1024 planning phase instead of only being rewarded for the single highest tile at the end.

### 4. Quarterly investment phase
At the end of the 12 moves, accumulated development rights can be assigned to:
- 🏠 Residential
- 🏭 Industry / Commerce
- ⚡ Energy / Infrastructure
- 🌳 Public / Environment

Higher-level development rights contribute more development capacity.

This separates the two decisions:

> **1024 board: How much development capacity can I create?**  
> **City management: Where should I invest that capacity?**

### 5. Board resets; city persists
After quarterly investment and simulation settlement:
- the 4×4 board resets;
- the next quarter begins with a fresh planning puzzle;
- accumulated city development persists;
- Population, Finance, Energy and Happiness continue across quarters.

The intended rhythm is:

> **12-move planning → development allocation → city simulation → event → next quarter**

Four quarters advance the year counter.

### 6. City simulation
The current POC continues to track:
- Population
- Finance
- Energy
- Happiness
- Residential development
- Industry / Commerce development
- Energy development
- Public development

The LIVE CITY visualization persists across quarters and changes as the accumulated city grows.

### 7. Events
A lightweight city event occurs after quarterly settlement. Current events are placeholders intended to test pacing between planning rounds.

### 8. Vehicle animation correction
v0.1's traffic emoji orientation could make vehicles appear to reverse. v0.2 gives opposing traffic its own direction animation and mirrors the vehicle travelling in the opposite direction so its front matches its movement.

## Current v0.2 design goal
The main question is no longer whether a city can be represented by different tile categories on the board. v0.2 tests whether this loop is enjoyable:

> **short 1024 puzzle → meaningful development rewards → management allocation → visible city consequence → repeat**

## Deliberately provisional values
The following are NOT final:
- 12 moves per quarter
- development-right power scaling
- starting cash
- population / job / energy formulas
- income and maintenance formulas
- event frequency and effects
- victory / failure conditions
- total run length

## Design principles
1. Type 02 must remain fundamentally different from Type 01.
2. The 1024 board should be fun as a short planning puzzle, not become a long mandatory grind.
3. Every meaningful merge should contribute to city development.
4. City management choices should happen frequently enough to provide feedback.
5. Board and city should affect one another over time.
6. LIVE CITY should visibly communicate the results of player decisions.
7. Keep POCs small until the core loop is proven.

## Next questions after v0.2 testing
- Are 12 valid moves too few, too many or appropriate?
- Does resetting the board every quarter feel refreshing or wasteful?
- Is assigning each development right individually too slow?
- Should unused development rights carry over?
- Should city conditions modify the next quarter's board or move count?
- Should higher development rights unlock special buildings rather than only provide larger numerical growth?
- What should create failure pressure: finance, energy, happiness, population, time, or scenarios?
- How long should one complete city run last?

## Current working label
**TYPE 02 — 1024 CITY / MANAGEMENT SIMULATION**

No final game title has been selected.
