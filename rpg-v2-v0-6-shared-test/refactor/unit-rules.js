(()=>{'use strict';
const V07UnitRules={
 heroMax(tier){return 1+Math.log2(Math.max(2,tier||2))},
 maxHP(unit){if(unit.type==='hero')return this.heroMax(unit.tier);return unit.maxHits||1},
 remainingHP(unit){return Math.max(0,this.maxHP(unit)-(unit.hits||0))},
 alive(unit){return !!unit&&!unit.dead&&this.remainingHP(unit)>0},
 damage(unit,amount=1){if(!this.alive(unit))return 0;const n=Math.max(0,Number(amount)||0);const before=this.remainingHP(unit);unit.hits=(unit.hits||0)+n;return Math.min(before,n)},
 heal(unit,amount=1){if(!unit||unit.dead)return 0;const n=Math.max(0,Number(amount)||0),before=this.remainingHP(unit);unit.hits=Math.max(0,(unit.hits||0)-n);return this.remainingHP(unit)-before},
 canMerge(a,b){return !!a&&!!b&&!a.dead&&!b.dead&&a.type==='hero'&&b.type==='hero'&&a.tier===b.tier},
 mergeInto(target,source){if(!this.canMerge(target,source))return false;const hp=this.remainingHP(target)+this.remainingHP(source),nextTier=target.tier*2,nextMax=this.heroMax(nextTier),special=!!target.special||!!source.special,profession=target.profession||source.profession||null,reincarnated=!!target.reincarnated||!!source.reincarnated;target.tier=nextTier;target.hits=Math.max(0,nextMax-Math.min(nextMax,hp));target.special=special;target.profession=special?profession:null;target.reincarnated=reincarnated;target.reincarnateEligible=special&&!reincarnated&&(target.reincarnateEligible!==false||source.reincarnateEligible!==false);source.dead=true;return target}
};
window.V07UnitRules=V07UnitRules;
})();