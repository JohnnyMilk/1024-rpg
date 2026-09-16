(()=>{'use strict';
const PriestRules={
 guard:{trigger:'AFTER_ACTUAL_MOVE',range:'AROUND_8',excludeSelf:true,maxTargets:3,priority:'UNGUARDED'},
 chooseGuardTargets(priest,heroes,randomTargets){const nearby=heroes.filter(x=>x.id!==priest.id&&Math.abs(x.r-priest.r)<=1&&Math.abs(x.c-priest.c)<=1);const fresh=nearby.filter(x=>!x.guard),guarded=nearby.filter(x=>x.guard);const targets=randomTargets(fresh,Math.min(3,fresh.length));if(targets.length<3)targets.push(...randomTargets(guarded,Math.min(3-targets.length,guarded.length)));return targets}
};
window.V07PriestRules=PriestRules;
})();