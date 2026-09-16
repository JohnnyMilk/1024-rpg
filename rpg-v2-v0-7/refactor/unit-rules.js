(()=>{'use strict';
const V07UnitRules={
 maxHP(unit){if(unit.type==='hero')return unit.tier||2;return unit.maxHits||1},
 remainingHP(unit){return Math.max(0,this.maxHP(unit)-(unit.hits||0))},
 alive(unit){return !!unit&&!unit.dead&&this.remainingHP(unit)>0},
 damage(unit,amount=1){if(!this.alive(unit))return 0;const n=Math.max(0,Number(amount)||0);const before=this.remainingHP(unit);unit.hits=(unit.hits||0)+n;if(this.remainingHP(unit)<=0)unit.dead=true;return Math.min(before,n)},
 heal(unit,amount=1){if(!unit||unit.dead)return 0;const n=Math.max(0,Number(amount)||0),before=this.remainingHP(unit);unit.hits=Math.max(0,(unit.hits||0)-n);return this.remainingHP(unit)-before},
 canMerge(a,b){return !!a&&!!b&&!a.dead&&!b.dead&&a.type==='hero'&&b.type==='hero'&&a.tier===b.tier},
 mergeInto(target,source){if(!this.canMerge(target,source))return false;target.tier*=2;target.hits=0;source.dead=true;return target}
};
window.V07UnitRules=V07UnitRules;
})();