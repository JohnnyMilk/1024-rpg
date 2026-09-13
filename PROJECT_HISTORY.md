# 1024 RPG Project History

## Site hierarchy

- `index.html` — project entrance; Type / Version explanation and Version entrances.
- `classic/index.html` — Standard 1024 baseline.
- `type-01/index.html` — Type 01 Version 1 dedicated page; completed history.
- `rpg-v1-0/index.html` — Version 1 v1.0 FINAL.
- `type-01-v2/index.html` — Type 01 Version 2 dedicated page and development log.
- `rpg-v2-v0-1/index.html` — playable Version 2 v0.1 archive.
- `rpg-v2-v0-2/index.html` — stabilized playable Version 2 v0.2 baseline.
- `shared/core.js` — cross-version reusable helpers and common UI render functions.
- `shared/rpg-ui.css` — shared RPG board, HP, result and common layout styles.
- `shared/animations.js` — reusable animation registry/API.
- `shared/animations.css` — reusable animation visuals and keyframes.
- `shared/game-help.js` — reusable clickable-stat help modal/controller.
- `shared/game-help.css` — reusable help-card/modal presentation.
- `rpg-v1-0/help-data.js` / `rpg-v2-v0-2/help-data.js` — version-specific rule text consumed by the shared help UI.
- `tests/refactor.test.js` — regression suite.
- `.github/workflows/refactor-tests.yml` — automatic regression and syntax checks.
- `PROJECT_HISTORY.md` — persistent handoff and architecture history.

Version 1 and Version 2 remain separate gameplay generations. Version 1 is completed/frozen except approved shared UI/engine maintenance; new gameplay evolution belongs to Version 2.

## Naming rules

Type = core gameplay. Type 01 remains four-direction 1024-style sliding, same-Tier merging, and heroes/enemies sharing the board. Board-size or shape experiments may remain Type 01 if that core interaction remains.

Version = major design generation inside the same Type. Each Version has its own v0.x development sequence and can later reach its own v1.0 FINAL.

- Type 01 / Version 1: v0.1 -> ... -> v0.7 -> v1.0 FINAL.
- Type 01 / Version 2: v0.1 -> v0.2 -> v0.3 -> ... DEVELOPMENT.

## Version 1 — completed baseline

Version 1 v1.0 established the 4x4 board, hero merging, enemies/Bosses, HP/ATK combat, endless Boss progression, animation pipeline, scoring and Game Over statistics.

Version 1 fixed skills:
- Warrior attacks on every merge.
- Archer attacks every 3 merges.
- Mage attacks every 5 merges.

Version 1 score baseline:
- valid move +1;
- merge adds resulting hero value;
- normal enemy +20;
- Boss +100;
- hero death subtracts hero value;
- score floor 0.

Approved post-final UI/engine maintenance:
- normal Shadow Assassins no longer show redundant `1 HP` text;
- heroes use proportional HP bars plus compact `current / max HP` text;
- Bosses use a contrasting HP bar plus ATK;
- V1 consumes the shared animation library and shared statistic-help component;
- the old activity log strip was removed to reduce vertical UI space;
- shared Game Info uses the mobile-first viewport overlay;
- shared sword-slash visual is vertically centered in the tile;
- gameplay rules remain unchanged.

## Version 2 — development

### v0.1 — Skill Pool Prototype

Version 2 replaced Version 1's fixed Warrior/Archer/Mage merge skills with a run-wide Skill Pool.

Progression rule:
- first new highest hero number 2 -> choose 1 of 3 unowned skills;
- then first 4 -> choose 1 of 3;
- then first 8 -> choose 1 of 3;
- continue for later records;
- recreating an already reached number does not grant another choice.

Skills are global to the run, not attached to individual heroes/classes. The persistent `本局技能` strip shows every selected skill and can expose details.

Initial 27-skill pool includes: 疾行、風壓、餘勢、共鳴、融合再生、超載、反震、逆境、怒火、遺爆、遺志、血祭、靈魂收割、連殺、殺意、決戰準備、先制、堡壘、優質增援、新生、突變、孤軍、人海、危機感知、突破者、獵王、高風險投資.

### v0.2 — Combat Readability + Run History

Status: STABILIZED PLAYABLE BASELINE FOR v0.3.

Playable file: `rpg-v2-v0-2/index.html`.

Main v0.2 changes:
1. Enemy/Boss melee attack uses the sword-slash visual.
2. Attack visuals and floating HP numbers begin together and never extend the attack stage beyond 0.75 s.
3. Game Over restores the detailed Version 1-style score/run history.
4. Game Over adds `本局取得技能` for all selected Skill Pool abilities.
5. Score/run tracking includes movement score, merge/record score, normal-enemy score, Boss score, hero-death penalty, turns, moves, merges, kills, Boss kills, hero deaths and highest hero number.
6. Normal Shadow Assassins omit redundant 1 HP text.
7. Heroes and Bosses use visual HP bars.

### Formal animation sequence / Death Wave rule

Normal action pipeline:
1. movement — about 0.25 s;
2. merge — about 0.25 s;
3. attack/skill animation + HP number simultaneously — max 0.75 s;
4. units reduced to 0 HP play death animation — about 0.25 s.

Death-trigger chains use waves:
`attack + HP -> death -> death-trigger attack + HP -> next death -> next death-trigger ...`

A death-trigger attack can start only after the death animation that caused it has completed. Multiple units killed by the same effect may die simultaneously as one Death Wave. All damaging death-trigger visuals still share the same max 0.75 s attack/HP stage.

### v0.2 skill-animation direction correction — 2026-09-13

Targeted Skill Pool attack visuals use an inward impact convention:
- attacks aimed at a specific target tile visually travel **from outside toward the target tile**;
- they must not appear to originate from the target tile and fly outward;
- `遺爆` is the reference case: the bomb looks thrown into the affected enemy tile;
- sword slash, source-to-target arrow, magic-wave and board-wide status effects retain their own semantic animation types.

### v0.2 stabilization before v0.3 — 2026-09-13

Five maintenance fixes were completed before beginning any v0.3 gameplay work:

1. **Animation system repaired.** V2 had still been calling legacy local CSS class names (`attackfx`, `damagefx`, etc.) after the shared animation refactor, while those visuals had moved to the shared library. V2 now calls `RPGAnimations.createAnimator()` directly, the same reusable API used by V1. Damage/heal text visibly floats and fades; slash travels across the tile; targeted skill icons move from outside into the target and finish with an impact ring; arrows visibly travel source-to-target; magic/board waves use expanding gradient/ring motion.
2. **Activity log removed.** The dedicated log strip and its writes were removed from V1 and V2 to reduce vertical UI length. Important persistent state remains visible through stats, skill icons, HP bars, animations and help.
3. **Clickable stat explanations implemented.** Existing top statistic cards now use the shared `game-help.js` component. V1 provides explanations for SCORE, TURN, MERGES, BOSS and WAVE. V2 provides explanations for SCORE, TURN, MERGE and BEST HERO. The shared component supports click/tap, keyboard Enter/Space and Escape-to-close; each Version owns only its help-data text.
4. **Mobile Game Info overlay fixed.** The shared statistic-help presentation is a true viewport overlay rather than participating in the page's flex layout. On phones the panel opens at the top of the screen, uses the available viewport width, respects safe-area insets, scrolls internally when needed, and keeps an obvious close control accessible. This is shared UI maintenance only; no V1 or V2 gameplay rule changed.
5. **Sword-slash visual centered vertically.** The shared enemy/Boss melee slash was shifted downward within its tile so the visible strike crosses the visual center of the grid cell rather than appearing too high. Timing, damage, direction and gameplay behavior were unchanged.

These are v0.2 stabilization/UI-engine changes, not Version 2 v0.3 gameplay changes.

## Shared architecture refactor — 2026-09-13

The project follows a shared-infrastructure / version-specific-rules architecture.

### `shared/core.js`

Centralizes:
- animation timing contract (`MOVE`, `MERGE`, `EFFECT`, `DEATH`, `SPAWN`, `SLASH`);
- array equality;
- random selection helper;
- empty-cell discovery;
- HP percentage + health-bar markup;
- keyboard/swipe input binding;
- reusable Game Over/run-history renderer.

### `shared/rpg-ui.css`

Centralizes common RPG presentation:
- board / cells / pieces;
- hero, enemy and Boss tiles;
- HP bars;
- common movement / merge / death presentation;
- result/history cards and actions.

### Shared animation library

Attack/skill animations are not owned by a specific Version. They live under:
- `shared/animations.js` — animation registry and callable API;
- `shared/animations.css` — reusable animation visuals/keyframes.

The library includes reusable animation types such as damage, heal, buff, slash, burst/targeted skill impact, arrow, magic-wave, board-wave, skill-tag and pulse. The shared slash visual is positioned through `shared/animations.css`, so its centered placement is inherited by every Version that calls the shared slash animation.

Design rule: whether V1 or V2 uses an animation is determined only by whether that version calls it. The animation implementation itself is not duplicated inside a Version folder.

### Shared statistic-help system

`shared/game-help.js` + `shared/game-help.css` own the interaction and modal UI. Version folders provide `help-data.js` only. This keeps the interaction reusable while allowing the actual rule text to differ between V1 and V2. The modal presentation is explicitly mobile-first: it is a viewport overlay with a top-aligned panel, safe-area-aware spacing and an accessible close control rather than an extra page column.

### Page/module split

Maintained playables separate page structure, style and rules:
- Standard: `classic/index.html` + `classic/style.css` + `classic/game.js`;
- V1: `rpg-v1-0/index.html` + `rpg-v1-0/style.css` + `rpg-v1-0/game.js`;
- V2: `rpg-v2-v0-2/index.html` + `rpg-v2-v0-2/style.css` + `rpg-v2-v0-2/game.js`.

Important boundary: reuse infrastructure and presentation primitives; do not merge V1 and V2 gameplay rules.

## Regression tests / CI

`tests/refactor.test.js` contains more than 20 regression assertions covering shared helpers, HP UI, history rendering, module wiring, V1 fixed-skill preservation, V2 27-skill preservation, Death Wave ordering, shared animation motion and shared stat-help wiring.

`.github/workflows/refactor-tests.yml` runs the suite and JavaScript syntax checks for shared core, animations, help, Standard, V1, V1 help-data, V2 and V2 help-data on every push / pull request.

## Version 2 future work

Candidate work after v0.2 includes configurable board sizes such as 6x4, irregular boards, distinct Boss mechanics, behaviorally different enemies, Relics, Combo/Chain systems, Score/Run refinement and Meta Progression.

Version 2 design principle: new systems should support the central Type 01 question, "Which direction should I swipe next?"

## v0.3 handoff checkpoint — 2026-09-13

Version 2 v0.2 is now the stabilized baseline. v0.3 may begin from it.

Before changing gameplay:
- read this `PROJECT_HISTORY.md` first;
- fetch the current `rpg-v2-v0-2/index.html`, `style.css`, `game.js`, and `help-data.js` from GitHub;
- fetch `shared/core.js`, `shared/rpg-ui.css`, `shared/animations.js`, `shared/animations.css`, `shared/game-help.js`, and `shared/game-help.css` before duplicating or altering shared behavior;
- preserve the v0.2 animation timing and Death Wave rules unless the user explicitly changes them;
- preserve the repaired shared animation motion, centered slash placement, removed log strip, mobile-first clickable stat-help UI, HP-bar UI, Game Over history, and 27-skill Skill Pool unless explicitly changed;
- Version 1 remains gameplay-frozen; only reusable shared-engine/UI maintenance may be synchronized back to V1;
- create a new `rpg-v2-v0-3/` playable directory rather than overwriting the v0.2 archive once v0.3 implementation starts;
- update `type-01-v2/index.html`, root milestone references if needed, regression tests/CI expectations, and this file whenever the v0.3 milestone changes.

No v0.3 gameplay rule has been committed yet. The next implementation change may now begin in the new v0.3 directory after the desired gameplay rule is specified.

## Cross-conversation handoff rules

When continuing development:
1. Read `PROJECT_HISTORY.md` first.
2. Read root `index.html` to confirm hierarchy.
3. Read the relevant Version page.
4. Fetch the actual playable HTML plus its `game.js` / `style.css` before modifying code.
5. Read shared modules before duplicating helpers, HP UI, history UI, input handling, help UI or animations.
6. Never reconstruct current game code from memory alone.
7. Do not change unspecified gameplay rules, timing, spawning or values.
8. Run the regression suite and syntax checks after meaningful shared-code changes.
9. Every meaningful gameplay change, Version milestone, architecture decision or important bug fix must be synchronized into this file.

## Current milestone

- Type 01 / Version 1 / v1.0: FINAL / COMPLETED — gameplay frozen; approved shared UI/animation/help infrastructure may be reused without altering rules; activity log removed.
- Type 01 / Version 2 / v0.2: STABILIZED PLAYABLE BASELINE — Skill Pool + sword-slash enemy attack + restored Game Over history + acquired-skill summary + Death Wave sequencing + hero/Boss HP bars + repaired reusable motion animations + mobile-first clickable stat explanations + centered shared slash visual; activity log removed.
- Standard, V1 and V2 share reusable infrastructure instead of maintaining duplicate common behavior.
- Next work item: begin Version 2 v0.3 in a new `rpg-v2-v0-3/` directory from the stabilized v0.2 baseline; no v0.3 gameplay changes have been committed yet.
