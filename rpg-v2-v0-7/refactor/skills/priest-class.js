(()=>{'use strict';
class V07PriestClassSkills{
 constructor(runtime,random=Math.random){this.r=runtime;this.random=random;this.bind()}
 has(id){return this.r.state.hasClassSkill(id)}
 level(id){return this.r.mastery.level(id)}
 priests(){return this.r.state.living('hero').filter(h=>h.special&&h.profession==='priest')}
 bind(){this.r.events.on('REVIVAL_CHECK',e=>this.onRevivalCheck(e));this.r.events.on('GUARD_BLOCK',e=>this.onGuardBlock(e));return this}
 async onRevivalCheck(e){if(!this.has('priestRevive')||e.unit?.type!=='hero'||e.unit.revived)return;const priest=this.priests().find(p=>V07CombatTargeting.around8(p,[e.unit]).length);if(!priest)return;const lv=this.level('priestRevive');e.revive=true;e.hp=lv===1?1:lv===2?2:3;e.priest=priest}
 sideTargets(hero,source){if(!source)return[];const dr=Math.sign(source.r-hero.r),dc=Math.sign(source.c-hero.c),all=V07CombatTargeting.enemies(this.r.state);if(Math.abs(dr)>=Math.abs(dc)){const row=hero.r+dr;return all.filter(x=>x.r===row&&Math.abs(x.c-hero.c)<=1)}const col=hero.c+dc;return all.filter(x=>x.c===col&&Math.abs(x.r-hero.r)<=1)}
 async onGuardBlock(e){if(!this.has('priestPunish'))return;const lv=this.level('priestPunish'),hero=e.hero,source=e.source;if(lv===2&&this.random()<.20)hero.guard=true;let targets=[];if(lv===1||lv===2){if(source&&V07CombatTargeting.enemies(this.r.state).some(x=>x.id===source.id))targets=[source]}else if(lv===3)targets=this.sideTargets(hero,source);else targets=V07CombatTargeting.around8(hero,V07CombatTargeting.enemies(this.r.state));const seen=new Set();for(const t of targets){if(seen.has(t.id))continue;seen.add(t.id);await this.r.damage.apply(t,1,{source:hero,kind:'priest-punish'})}await this.r.deaths.settle()}
}
window.V07PriestClassSkills=V07PriestClassSkills;
})();