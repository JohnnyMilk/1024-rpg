(()=>{'use strict';
class V07RangerSkills{
 constructor(runtime,random=Math.random){this.r=runtime;this.random=random}
 bind(){this.r.events.on('PROFESSION_MOVE',e=>this.onMove(e));this.r.events.on('PROFESSION_MERGE',e=>this.onMerge(e));return this}
 has(id){return this.r.state.hasClassSkill(id)}
 level(id){return this.r.mastery.level(id)}
 opposite(dir){return({left:'right',right:'left',up:'down',down:'up'})[dir]}
 async hit(target,source,kind){if(!target)return false;await this.r.damage.apply(target,1,{source,kind});return true}
 randomTargets(list,n){const a=[...list],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(this.random()*a.length),1)[0]);return out}
 farshotPool(hero,ignoreRange=false){const all=V07CombatTargeting.enemies(this.r.state);return ignoreRange?all:all.filter(e=>Math.abs(e.r-hero.r)>1||Math.abs(e.c-hero.c)>1)}
 async farshot(hero){if(this.random()>=.50)return false;let targets;if(this.has('rangerSnipe')){const lv=this.level('rangerSnipe'),pool=this.farshotPool(hero,lv===4);targets=lv===4?this.randomTargets(pool,3):V07CombatTargeting.farthest(hero,pool,lv+1)}else targets=V07CombatTargeting.farthest(hero,this.farshotPool(hero),1);for(const t of targets)await this.hit(t,hero,'ranger-farshot');return targets.length>0}
 async onMove(e){if(e.profession!=='ranger')return;const hero=e.hero,m=e.movement,dir=e.transaction.dir;await this.farshot(hero);const back=V07CombatTargeting.line(hero,V07CombatTargeting.enemies(this.r.state),this.opposite(dir))[0];await this.hit(back,hero,'ranger-backshot');if(this.has('rangerQuickShot')){const lv=this.level('rangerQuickShot'),allowed=lv===4||m.distance>=2;if(allowed)for(let i=0;i<(lv===4?3:lv);i++)await this.farshot(hero)}await this.r.deaths.settle()}
 async onMerge(e){if(e.profession!=='ranger'||!this.has('rangerRain'))return;const merge=e.event.merge,hero=this.r.state.units.find(u=>u.id===merge.targetId);if(!hero?.special||hero.profession!=='ranger')return;const lv=this.level('rangerRain'),all=V07CombatTargeting.enemies(this.r.state),pool=lv===4?all:all.filter(x=>Math.abs(x.r-hero.r)>1||Math.abs(x.c-hero.c)>1),targets=lv===4?pool:this.randomTargets(pool,lv+1);for(const t of targets)await this.hit(t,hero,'ranger-rain');await this.r.deaths.settle()}
}
window.V07RangerSkills=V07RangerSkills;
})();