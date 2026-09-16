(()=>{'use strict';
class V07CommonClassSkills{
 constructor(runtime,trace=()=>{}){this.r=runtime;this.trace=trace;this.bind()}
 has(id){return this.r.state.hasClassSkill(id)}
 bind(){this.r.events.on('MERGE',e=>this.onMerge(e));this.r.events.on('UNIT_DEATH',e=>this.onDeath(e));this.r.events.on('UNIT_SPAWNED',()=>this.checkAwakening());this.r.events.on('AFTER_PLAYER_MOVE',()=>this.checkAwakening());this.r.events.on('BEFORE_SPAWN',e=>this.onBeforeSpawn(e));return this}
 async onMerge(e){if(this.has('ascend')&&e.merge.specialPair){const h=this.r.state.units.find(x=>x.id===e.merge.targetId);if(h){const hp=this.r.units.remainingHP(h),nextMax=this.r.units.heroMax(h.tier*2);h.tier*=2;h.hits=Math.max(0,nextMax-Math.min(nextMax,hp));await this.r.events.emit('ASCEND',{hero:h,merge:e.merge})}}await this.checkAwakening()}
 async onDeath(e){const h=e.unit;if(this.has('reincarnate')&&h?.type==='hero'&&h.special&&h.reincarnateEligible){h.reincarnateEligible=false;this.r.state.reincarnateQueue=(this.r.state.reincarnateQueue||0)+1;await this.r.events.emit('REINCARNATE_QUEUED',{hero:h})}}
 async onBeforeSpawn(e){if(e.spec.type!=='hero'||!this.r.state.profession)return;if(this.has('awakening')&&this.r.state.awakened){e.spec.special=true;e.spec.profession=this.r.state.profession;return}if((this.r.state.reincarnateQueue||0)>0&&!e.spec.special){this.r.state.reincarnateQueue--;e.spec.special=true;e.spec.profession=this.r.state.profession;e.spec.reincarnateEligible=false;e.spec.reincarnated=true}}
 async checkAwakening(){if(!this.has('awakening')||this.r.state.awakened||!this.r.state.profession)return false;const hs=this.r.state.living('hero');if(hs.length&&hs.every(h=>h.special)){this.r.state.awakened=true;this.trace('AWAKENING',{});await this.r.events.emit('AWAKENING',{});return true}return false}
}
window.V07CommonClassSkills=V07CommonClassSkills;
})();