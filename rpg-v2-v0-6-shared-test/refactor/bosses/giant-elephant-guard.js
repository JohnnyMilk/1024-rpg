(()=>{'use strict';
if(!window.V07BaseBoss)throw new Error('V07BaseBoss must load before GiantElephantGuard');
class GiantElephantGuard extends V07BaseBoss{
 constructor(context={}){
  super(context,{id:'giant-elephant-guard',name:'巨象守衛',icon:'🗿'});
  this.setCooldown('charge',0);this.setCooldown('quake',0);
 }
 async chooseAction(){
  const line=this.game.findChargeTarget?.();
  if(this.getCooldown('charge')===0&&line)return{id:'charge',cooldownKey:'charge',cooldownTurns:3,run:()=>this.game.charge(line)};
  if(this.getCooldown('quake')===0&&this.game.hasAdjacentHero?.())return{id:'quake',cooldownKey:'quake',cooldownTurns:4,run:()=>this.game.quake()};
  return{id:'stomp',run:()=>this.game.stomp()};
 }
 async onDefeated(){
  if(!await super.onDefeated())return false;
  const rows=Math.max(0,(this.game.rows?.()||4)-4);
  if(rows>0)this.queueMapEvent({type:'collapse',rows});
  return true;
 }
}
window.GiantElephantGuard=GiantElephantGuard;
window.V07Bosses.register('giant-elephant-guard',GiantElephantGuard);
})();