# 1024 RPG v0.7 — Boss Integration Notes (B32)

> Purpose: preserve the verified findings before starting B33 in a new conversation.
> Repository: `JohnnyMilk/1024-rpg`
> Formal build: `rpg-v2-v0-7/`
> Current formal state: B32
> Canonical Boss name: **🗿 巨像守衛** (`像`, not `象`)

## 1. Current symptoms confirmed in formal gameplay

1. Boss defeat reaches `BOSS DEFEATED / 戰場即將崩落` warning.
2. Bottom warning row shows the ⚠️ floor warning state.
3. The actual floor-collapse event/animation does **not** execute afterward.
4. Formal Boss is not using the intended Boss skills, so Charge/Quake cooldown UI cannot yet be meaningfully verified.
5. B29 proved that `v07-boss-ui.js` can observe the real formal `.piece.boss` DOM and safely correct the Boss display identity.
6. B30 only corrected the canonical display name to `🗿 巨像守衛`.
7. B31 failed startup because it searched for the Boss reward anchor at the wrong source-generation layer. B32 removed that bad anchor and restored startup.

## 2. Formal runtime architecture

The formal game is not directly running the Boss Lab prototype.

Execution chain:

```text
rpg-v2-v0-7/index.html
  -> v07-runtime-loader.js
  -> fetch/eval v07-bootstrap.js
  -> bootstrap fetches ../rpg-v2-v0-6/hp-loader.js
  -> hp-loader fetches ../rpg-v2-v0-6/game.js
  -> source-string transformations
  -> final runtime eval/blob
```

Therefore, changing a visible v0.7 UI file does not automatically change the real formal Boss combat lifecycle.

## 3. Verified root cause — Boss skills

The intended Boss AI exists in:

`rpg-v2-v0-7/v07-boss-engine.js`

Class:

```js
GiantElephantGuard
```

The real skill decision is in:

```js
async takeTurn()
```

Its intended priority is:

```text
Charge available + valid straight-line target
  -> charge()
  -> Charge CD = 3
else Quake available + adjacent hero
  -> quake()
  -> Quake CD = 4
else
  -> stomp()
```

Cooldown state belongs to this engine:

```js
chargeCD
quakeCD
```

The engine emits real state through:

```js
v07-boss-state
```

### Critical finding

The formal runtime has **not actually connected its Enemy Phase to `GiantElephantGuard.takeTurn()`**.

The Boss Lab REUSE-06 does connect it. In `boss-prototype.js`, after a valid player move:

```js
if(engine.state==='ACTIVE') await engine.takeTurn()
```

That is why the Boss Lab Boss uses Charge / Quake / Stomp while the formal Boss currently does not.

The formal Boss display bridge from B29 is only a DOM/UI bridge. It does not mean the formal Boss is controlled by `GiantElephantGuard`.

## 4. Verified root cause — floor collapse

The intended collapse state machine also exists in `GiantElephantGuard`.

Expected sequence:

```text
Boss defeated
  -> beginDefeat()
  -> DEFEAT_NOTICE
  -> WARNING
  -> one usable Player Phase
  -> afterPlayerPhase()
  -> PLAYER_WARNING
  -> Enemy Phase
  -> engine.enemyPhase()
  -> collapseBottomRow()
  -> next WARNING row
  -> one usable Player Phase
  -> second collapseBottomRow()
  -> board returns to 4x4
```

`beginDefeat()` only creates the defeat notice and WARNING state. It does **not** itself perform the collapse.

The actual row removal happens only when this path is reached:

```js
engine.enemyPhase()
  -> adapter.collapseBottomRow()
```

### Critical finding

REUSE-06 loads:

```text
boss-phase-bridge.js
```

This bridge observes phase/turn progression and, once the engine is in `PLAYER_WARNING`, calls:

```js
await engine.enemyPhase()
```

The formal `index.html` does not currently use the Boss Lab phase bridge as part of its real gameplay lifecycle.

This explains the exact formal symptom:

```text
BOSS DEFEATED warning works
-> ⚠️ warning floor works
-> no later call reaches actual collapseBottomRow()
-> floor never falls
```

## 5. Boss reward

The original formal runtime already contains the Boss reward/class-skill selection path (`chooseClassSkill()`).

Do not inject another guessed reward anchor into `v07-runtime-loader.js`.

B31 proved that searching for a final-runtime `chooseClassSkill()` string directly in the outer bootstrap source is the wrong generation layer and can stop the entire game from booting.

Desired order remains:

```text
Boss defeated
-> Boss reward skill selection
-> selection closes
-> BOSS DEFEATED warning
-> collapse lifecycle begins
```

Before changing this ordering in B33, inspect the **final generated runtime source/function** and patch the actual function/layer, not an assumed outer string.

## 6. Correct B33 integration target

B33 should be an integration fix, not another cosmetic/DOM simulation.

The same `GiantElephantGuard` instance must become the single source of truth for:

1. Boss actions.
2. Charge cooldown.
3. Quake cooldown.
4. Boss defeat state.
5. Warning / Player-warning phase.
6. Collapse phase.
7. Boss CD UI state events.

Required formal lifecycle integration:

```text
FORMAL ENEMY PHASE
  ordinary enemy -> preserve existing enemy behavior
  Boss -> GiantElephantGuard.takeTurn()
```

and:

```text
FORMAL BOSS DEATH / REWARD
  -> preserve existing Boss reward selection
  -> GiantElephantGuard.beginDefeat()
```

and:

```text
FORMAL PLAYER PHASE while WARNING
  -> normal player move remains usable
  -> GiantElephantGuard.afterPlayerPhase()
```

and:

```text
FORMAL ENEMY PHASE while PLAYER_WARNING
  -> GiantElephantGuard.enemyPhase()
  -> collapseBottomRow()
```

## 7. Adapter functions required by GiantElephantGuard

The formal runtime needs a real adapter equivalent to the already-working REUSE-06 adapter, connected to formal game state:

```js
{
  bossAlive,
  findChargeTarget,
  hasAdjacentHero,
  charge,
  quake,
  stomp,
  notice,
  getRows,
  setWarningRow,
  render,
  collapseBottomRow
}
```

Do not fake these through DOM state if the formal runtime already owns the corresponding unit/grid state.

## 8. Boss CD UI rule

Do not infer cooldown from animation text or DOM effects.

Once formal gameplay really uses `GiantElephantGuard.takeTurn()`, `v07-boss-ui.js` should display the actual engine state emitted by:

```js
v07-boss-state
```

using:

```js
detail.charge
detail.quake
```

Only then is the CD UI test meaningful.

## 9. What must NOT be changed in B33

Do not refactor or rewrite unrelated stable gameplay.

Preserve:

- normal movement / merge behavior
- starting hero count
- profession selection
- ordinary enemy spawn timing
- normal Enemy Phase behavior
- HP system
- Ranger / Warrior / Priest established rules
- Priest Guard v0.7 correction
- animation system outside Boss integration
- B29/B30 safe Boss display bridge unless the real runtime identity makes part of it redundant
- stacked red DEBUG diagnostics

Do not return to the abandoned shared-runtime refactor.

Do not use nested HTML/string injection similar to B25/B26; that previously broke generated runtime syntax.

Do not guess source anchors. Inspect exact current files and exact generated-source layer first.

## 10. Boss values currently to preserve

For this integration step, preserve the currently validated Boss Lab behavior/values. Do not rebalance yet.

```text
Stomp: 2 damage
Quake: 1 damage
Charge: 1 damage + push
Charge CD: 3 Boss Turns
Quake CD: 4 Boss Turns
```

Future desired damage changes are out of scope for B33.

## 11. Canonical naming

Always use:

```text
🗿 巨像守衛
```

Never use:

```text
巨象守衛
巨象守門者
```

Old source strings may still contain old names for historical/bootstrap matching. Do not blindly replace runtime source unless required for the integration; visible/formal canonical UI must remain `巨像守衛`.

## 12. Verification order for B33

Before asking for a full Boss test:

1. Verify normal game boots with no DEBUG error.
2. Verify starting heroes / profession / normal enemy lifecycle are unchanged.
3. Verify formal Boss creation activates one real `GiantElephantGuard` instance.
4. Verify a formal Boss turn actually reaches `engine.takeTurn()`.
5. Verify `v07-boss-state` emits actual Charge/Quake CD changes.
6. Verify Boss death still opens the existing skill reward.
7. Verify after reward the engine enters defeat WARNING.
8. Verify one usable Player Phase occurs on warning row.
9. Verify next Enemy Phase reaches `engine.enemyPhase()` and `collapseBottomRow()`.
10. Verify the sequence repeats for the second row and returns to 4x4.

Only publish a B33 test build after the exact call chain is connected and static/source checks pass.
