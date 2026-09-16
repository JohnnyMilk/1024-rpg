(()=>{'use strict';
class V07BaseBoss{
 constructor(context={},definition={}){
  if(!context.game)throw new Error('Boss requires game context');
  this.game=context.game;this.mapEvents=context.mapEvents;this.animations=context.animations;this.trace=context.trace||(()=>{});
  this.id=definition.id||'boss';this.name=definition.name||'Boss';this.icon=definition.icon||'👑';
  this.cooldowns=Object.create(null);this.defeated=false;this.definition=definition;this.spawnedUnit=null;
 }
 unit(){return this.spawnedUnit||this.game.bossUnit?.()||null}
 isAlive(){return !this.defeated&&!!this.game.bossAlive?.()}
 getCooldown(key){return this.cooldowns[key]||0}
 setCooldown(key,turns){this.cooldowns[key]=Math.max(0,Number(turns)||0)}
 tickCooldowns(except=[]){const keep=new Set(Array.isArray(except)?except:[except]);for(const key of Object.keys(this.cooldowns))if(!keep.has(key))this.cooldowns[key]=Math.max(0,this.cooldowns[key]-1)}
 async takeTurn(){if(!this.isAlive())return false;const action=await this.chooseAction();if(!action)return false;await this.executeAction(action);return true}
 async chooseAction(){return null}
 async executeAction(action){if(!action||typeof action.run!=='function')return false;await action.run();if(action.cooldownKey&&action.cooldownTurns)this.setCooldown(action.cooldownKey,action.cooldownTurns);this.tickCooldowns(action.cooldownKey?[action.cooldownKey]:[]);this.trace('BOSS_ACTION',{boss:this.id,action:action.id||'unknown',cooldowns:{...this.cooldowns}});return true}
 async onSpawn(){this.spawnedUnit=await this.game.spawnBossUnit?.(this.definition);this.trace('BOSS_SPAWN',{boss:this.id,unitId:this.spawnedUnit?.id||null});return this.spawnedUnit||true}
 async onDefeated(){if(this.defeated)return false;this.defeated=true;this.trace('BOSS_DEFEATED',{boss:this.id});return true}
 queueMapEvent(event){if(!this.mapEvents)throw new Error('Boss map event manager missing');return this.mapEvents.enqueue({...event,source:event.source||this.id})}
}
window.V07BaseBoss=V07BaseBoss;
})();