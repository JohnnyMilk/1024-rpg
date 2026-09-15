(function(){
  'use strict';
  // v0.6 final rules are applied by the main runtime loader.
  window.RPG_V06_FINAL_RULES = {
    mergeMelee: { every: 1, targets: 1, damage: 1, range: 'near8', animation: 'slash', includesSpecial: true },
    mergeArrow: { every: 3, targets: 2, damage: 1, range: 'board', animation: 'arrow', includesSpecial: true },
    resonance: {
      name: '波動共鳴',
      levels: [
        { targets: 1, damage: 1, range: 'near8', chain: false },
        { targets: 2, damage: 1, range: 'near8', chain: false },
        { targets: 'all', damage: 1, range: 'near8', chain: false },
        { targets: 'all', damage: 1, range: 'near8', chain: true }
      ]
    },
    removedSkills: ['precision']
  };
})();