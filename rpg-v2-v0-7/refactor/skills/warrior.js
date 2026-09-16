(()=>{'use strict';
class V07WarriorSkills{
 constructor(runtime){this.r=runtime}
 bind(){this.r.events.on('PROFESSION_MERGE',e=>this.onMerge(e));return this}
 async onMerge(e){if(e.profession!=='warrior')return;const merge=e.event.merge,hero=this.r.state.units.find(u=>u.id===merge.targetId);if(!hero)return;const targets=V07CombatTargeting.around8(hero,V07CombatTargeting.enemies(this.r.state));const target=V07CombatTargeting.nearest(hero,targets,1)[0];if(target)await this.r.damage.apply(target,1,{source:hero,kind:'warrior-merge-strike'});await this.r.deaths.settle()}
}
window.V07WarriorSkills=V07WarriorSkills;
})();