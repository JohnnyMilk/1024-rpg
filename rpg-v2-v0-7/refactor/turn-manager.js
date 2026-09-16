(()=>{'use strict';
class V07TurnManager{
 constructor({playerPhase,enemyPhase,mapEventPhase,trace=console.log}){this.handlers={playerPhase,enemyPhase,mapEventPhase};this.phase='IDLE';this.turn=0;this.trace=trace}
 async runPlayerAction(action){if(this.phase!=='IDLE')return false;this.turn++;await this.run('PLAYER',()=>this.handlers.playerPhase(action));await this.run('ENEMY',()=>this.handlers.enemyPhase());await this.run('MAP_EVENT',()=>this.handlers.mapEventPhase());this.phase='IDLE';this.trace('[V07 TURN] COMPLETE',{turn:this.turn});return true}
 async run(name,fn){this.phase=name;this.trace('[V07 TURN] '+name,{turn:this.turn});await fn()}
}
window.V07TurnManager=V07TurnManager;
})();