(()=>{'use strict';
class V07InnateMergeCombat{
 constructor(runtime,random=Math.random){this.r=runtime;this.random=random}
 bind(){this.r.events.on('MERGE',e=>this.onMerge(e));this.r.events.on('MERGE_3',e=>this.onThird(e));return this}
 async onMerge(e){const hero=this.r.state.units.find(u=>u.id===e.merge.targetId);if(!hero)return;const nearby=V07CombatTargeting.around8(hero,V07CombatTargeting.enemies(this.r.state));if(nearby.length){const target=nearby[Math.floor(this.random()*nearby.length)];await this.r.damage.apply(target,1,{source:hero,kind:'innate-merge-melee'})}await this.r.deaths.settle()}
 async onThird(){const pool=[...V07CombatTargeting.enemies(this.r.state)],targets=[];while(pool.length&&targets.length<2)targets.push(pool.splice(Math.floor(this.random()*pool.length),1)[0]);for(const target of targets)await this.r.damage.apply(target,1,{kind:'innate-merge-ranged'});await this.r.deaths.settle()}
}
window.V07InnateMergeCombat=V07InnateMergeCombat;
})();