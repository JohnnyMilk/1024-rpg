(()=>{'use strict';
class V07DamageManager{
 constructor({units,eventBus,trace=()=>{}}){this.units=units;this.events=eventBus;this.trace=trace}
 async apply(target,amount,{source=null,kind='damage',meta={}}={}){if(!this.units.alive(target))return{applied:0,killed:false};const before=this.units.remainingHP(target);await this.events.emit('BEFORE_DAMAGE',{target,source,amount,kind,meta});const applied=this.units.damage(target,amount),after=this.units.remainingHP(target),killed=before>0&&after===0;const result={target,source,amount,applied,before,after,killed,kind,meta};this.trace('DAMAGE',result);await this.events.emit('AFTER_DAMAGE',result);if(killed)await this.events.emit('UNIT_LETHAL',result);return result}
}
window.V07DamageManager=V07DamageManager;
})();