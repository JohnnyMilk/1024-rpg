(()=>{'use strict';
class V07DamageManager{
 constructor({units,eventBus,trace=()=>{}}){this.units=units;this.events=eventBus;this.trace=trace}
 async apply(target,amount,{source=null,kind='damage',meta={}}={}){if(!this.units.alive(target))return{applied:0,killed:false,cancelled:true};const before=this.units.remainingHP(target),ctx={target,source,amount:Math.max(0,Number(amount)||0),kind,meta,cancelled:false};await this.events.emit('BEFORE_DAMAGE',{context:ctx,target,source,kind,meta});ctx.amount=Math.max(0,Number(ctx.amount)||0);const applied=ctx.cancelled||ctx.amount<=0?0:this.units.damage(target,ctx.amount),after=this.units.remainingHP(target),killed=before>0&&after===0;const result={target,source,amount:ctx.amount,applied,before,after,killed,cancelled:ctx.cancelled,kind,meta};this.trace('DAMAGE',result);await this.events.emit('AFTER_DAMAGE',result);if(killed)await this.events.emit('UNIT_LETHAL',result);return result}
}
window.V07DamageManager=V07DamageManager;
})();