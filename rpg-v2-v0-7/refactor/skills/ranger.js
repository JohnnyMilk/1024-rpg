(()=>{'use strict';
class V07RangerSkills{
 constructor(runtime){this.r=runtime}
 bind(){this.r.events.on('PROFESSION_MOVE',e=>this.onMove(e));return this}
 has(id){return (this.r.config.preloadClassSkills||[]).includes(id)||(this.r.state.classSkills||[]).includes(id)}
 opposite(dir){return({left:'right',right:'left',up:'down',down:'up'})[dir]}
 async hit(target,source,kind){if(!target)return false;await this.r.damage.apply(target,1,{source,kind});return true}
 async farshot(hero,count=1){const enemies=V07CombatTargeting.enemies(this.r.state);for(const t of V07CombatTargeting.farthest(hero,enemies,count))await this.hit(t,hero,'ranger-farshot')}
 async onMove(e){if(e.profession!=='ranger')return;const hero=e.hero,m=e.movement,dir=e.transaction.dir;await this.farshot(hero,this.has('rangerSnipe')?2:1);const back=V07CombatTargeting.line(hero,V07CombatTargeting.enemies(this.r.state),this.opposite(dir))[0];await this.hit(back,hero,'ranger-backshot');if(this.has('rangerQuickShot')&&m.distance>=2)await this.farshot(hero,this.has('rangerSnipe')?2:1);await this.r.deaths.settle()}
}
window.V07RangerSkills=V07RangerSkills;
})();