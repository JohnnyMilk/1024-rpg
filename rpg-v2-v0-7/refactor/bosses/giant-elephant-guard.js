(()=>{'use strict';
class GiantElephantGuard{
 constructor({game,mapEvents,animations}){this.game=game;this.mapEvents=mapEvents;this.animations=animations;this.id='giant-elephant-guard';this.name='巨象守衛';this.icon='🗿';this.chargeCD=0;this.quakeCD=0}
 async takeTurn(){if(!this.game.bossAlive())return;const line=this.game.findChargeTarget();if(this.chargeCD===0&&line){await this.game.charge(line);this.chargeCD=3;this.tick('charge');return}if(this.quakeCD===0&&this.game.hasAdjacentHero()){await this.game.quake();this.quakeCD=4;this.tick('quake');return}await this.game.stomp();this.tick()}
 tick(except=''){if(except!=='charge')this.chargeCD=Math.max(0,this.chargeCD-1);if(except!=='quake')this.quakeCD=Math.max(0,this.quakeCD-1)}
 async onDefeated(){this.mapEvents.enqueue({type:'collapse',rows:Math.max(0,this.game.rows()-4),source:this.id})}
}
window.V07Bosses.register('giant-elephant-guard',GiantElephantGuard);
})();