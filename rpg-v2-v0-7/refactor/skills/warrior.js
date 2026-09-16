(()=>{'use strict';
class V07WarriorSkills{
 constructor(runtime){this.r=runtime}
 bind(){this.r.events.on('PROFESSION_MOVE',e=>this.onMove(e));return this}
 async onMove(e){if(e.profession!=='warrior')return;const hero=e.hero,dir=e.transaction.dir,targets=V07CombatTargeting.enemies(this.r.state);const contact=V07CombatTargeting.line(hero,targets,dir)[0];if(!contact||V07CombatTargeting.distance(hero,contact)!==1)return;await this.r.damage.apply(contact,1,{source:hero,kind:'warrior-contact'});await this.r.deaths.settle()}
}
window.V07WarriorSkills=V07WarriorSkills;
})();