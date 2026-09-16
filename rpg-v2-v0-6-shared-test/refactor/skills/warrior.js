(()=>{'use strict';
class V07WarriorSkills{
 constructor(runtime){this.r=runtime}
 bind(){this.r.events.on('PROFESSION_MOVE',e=>this.onMove(e));this.r.events.on('PROFESSION_MERGE',e=>this.onMerge(e));return this}
 has(id){return this.r.state.hasClassSkill(id)}
 level(id){return this.r.mastery.level(id)}
 enemies(){return V07CombatTargeting.enemies(this.r.state)}
 pick(list,n){const a=[...list],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out}
 async hit(targets,kind){for(const t of targets)await this.r.damage.apply(t,1,{kind});await this.r.deaths.settle()}
 async onMove(e){if(e.profession!=='warrior')return;const hero=e.hero,dir=e.transaction.dir,targets=this.enemies(),contact=V07CombatTargeting.line(hero,targets,dir)[0];if(contact&&V07CombatTargeting.distance(hero,contact)===1)await this.hit([contact],'warrior-contact');if(this.has('warSweep'))await this.sweep(hero);if(this.has('warImpact')&&e.movement.distance>=2)await this.impact(hero)}
 async sweep(hero){const level=this.level('warSweep'),dirs=[[-1,0],[1,0],[0,-1],[0,1]],chosen=level===4?dirs:this.pick(dirs,level),targets=this.enemies(),hit=new Map();for(const[dR,dC]of chosen){for(const t of targets){const rr=t.r-hero.r,cc=t.c-hero.c;if(dR&&rr===dR&&Math.abs(cc)<=1)hit.set(t.id,t);if(dC&&cc===dC&&Math.abs(rr)<=1)hit.set(t.id,t)}}if(hit.size)await this.hit([...hit.values()],'warrior-sweep')}
 async impact(hero){const level=this.level('warImpact'),near=V07CombatTargeting.around8(hero,this.enemies()),count=[1,2,3,4][level-1],targets=this.pick(near,count);if(targets.length)await this.hit(targets,'warrior-impact')}
 async onMerge(e){if(e.profession!=='warrior'||!this.has('warSmash'))return;const merge=e.event.merge,hero=this.r.state.units.find(x=>x.id===merge.targetId);if(!hero||!hero.special||hero.profession!=='warrior')return;const level=this.level('warSmash'),targets=this.enemies();let chosen=[];if(level===4)chosen=targets;else{const ids=new Set();for(const t of targets){const dr=Math.abs(t.r-hero.r),dc=Math.abs(t.c-hero.c);if(level===1&&dr+dc===1)ids.add(t.id);if(level>=2&&((dr===0&&dc>0)||(dc===0&&dr>0)))ids.add(t.id);if(level>=3&&dr===1&&dc===1)ids.add(t.id)}chosen=targets.filter(t=>ids.has(t.id))}if(chosen.length)await this.hit(chosen,'warrior-smash')}
}
window.V07WarriorSkills=V07WarriorSkills;
})();