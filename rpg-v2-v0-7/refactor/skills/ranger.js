(()=>{'use strict';
class V07RangerSkills{
 constructor(runtime,random=Math.random){this.r=runtime;this.random=random}
 bind(){this.r.events.on('PROFESSION_MOVE',e=>this.onMove(e));return this}
 has(id){return this.r.state.hasClassSkill(id)}
 opposite(dir){return({left:'right',right:'left',up:'down',down:'up'})[dir]}
 async hit(target,source,kind){if(!target)return false;await this.r.damage.apply(target,1,{source,kind});return true}
 farshotTargets(hero,count=1){const enemies=V07CombatTargeting.enemies(this.r.state).filter(e=>Math.abs(e.r-hero.r)>1||Math.abs(e.c-hero.c)>1);return V07CombatTargeting.farthest(hero,enemies,count)}
 async farshot(hero,count=1){if(this.random()>=.50)return false;for(const t of this.farshotTargets(hero,count))await this.hit(t,hero,'ranger-farshot');return true}
 async onMove(e){if(e.profession!=='ranger')return;const hero=e.hero,m=e.movement,dir=e.transaction.dir,count=this.has('rangerSnipe')?2:1;await this.farshot(hero,count);const back=V07CombatTargeting.line(hero,V07CombatTargeting.enemies(this.r.state),this.opposite(dir))[0];await this.hit(back,hero,'ranger-backshot');if(this.has('rangerQuickShot')&&m.distance>=2)await this.farshot(hero,count);await this.r.deaths.settle()}
}
window.V07RangerSkills=V07RangerSkills;
})();