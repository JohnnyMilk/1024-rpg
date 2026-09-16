(()=>{'use strict';
class V07RevivalManager{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace;this.bind()}
 bind(){this.r.events.on('BEFORE_DEATH',e=>this.tryRevive(e.unit));return this}
 async tryRevive(unit){if(!unit||unit.type!=='hero'||this.r.units.remainingHP(unit)>0)return false;const eligible=await this.r.events.emit('REVIVAL_CHECK',{unit});if(!eligible.revive)return false;const hp=Math.max(1,Number(eligible.hp)||1),max=this.r.units.maxHP(unit);unit.hits=Math.max(0,max-Math.min(max,hp));unit.revived=true;this.trace('HERO_REVIVED',{id:unit.id,hp:this.r.units.remainingHP(unit)});await this.r.events.emit('HERO_REVIVED',{unit,hp:this.r.units.remainingHP(unit)});return true}
}
window.V07RevivalManager=V07RevivalManager;
})();