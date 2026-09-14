# Version 2 v0.3 — Meta Progression Draft

Status: design confirmed in principle; implementation and upgrade currency are not yet decided.

## Out-of-run skill upgrades

Version 2 v0.3 will add a progression layer outside the active game run.

- Every skill can be upgraded outside the active run.
- Each skill has its base state plus 3 out-of-run upgrade levels.
- The upgrade interface belongs outside the turn-by-turn game, such as a post-run or between-runs screen.
- The purpose is survivor/roguelike-style meta progression: repeated play can gradually improve skills for later runs.
- The method used to earn upgrades is intentionally undecided for now. It may later use a resource, currency, experience, milestone, or another progression rule.
- Upgrade effects and values are skill-specific and will be designed during the skill review.

## Example: 幸運

Current base effect: every 10 valid moves, the next normal Hero spawn has a 25% chance to increase by one tier.

Proposed out-of-run progression:

- Base: 25%
- Upgrade 1: 50%
- Upgrade 2: 75%
- Upgrade 3: 100%

This establishes the intended structure of Base + 3 upgrades. The same structure applies to every skill, while the actual improvement at each level can differ by skill.

## Implementation boundary

This is a v0.3 design decision only. Do not overwrite the stabilized v0.2 playable. Actual v0.3 gameplay implementation will be created separately after the remaining skill and class design is confirmed.
