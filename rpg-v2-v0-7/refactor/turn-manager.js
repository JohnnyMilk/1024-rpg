(()=>{'use strict';
class V07TurnManager{
 constructor({playerPhase,enemyPhase,mapEventPhase,getTurn=()=>0,trace=console.log}){this.handlers={playerPhase,enemyPhase,mapEventPhase};this.phase='IDLE';this.getTurn=getTurn;this.trace=trace}
 async runPlayerAction(action){if(this.phase!=='IDLE')return false;const playerResult=await this.run('PLAYER',()=>this.handlers.playerPhase(action));if(playerResult===false){this.phase='IDLE';this.trace('[V07 TURN] INVALID',{turn:this.getTurn()});return false}await this.run('ENEMY',()=>this.handlers.enemyPhase());await this.run('MAP_EVENT',()=>this.handlers.mapEventPhase());this.phase='IDLE';this.trace('[V07 TURN] COMPLETE',{turn:this.getTurn()});return playerResult}
 async run(name,fn){this.phase=name;this.trace('[V07 TURN] '+name,{turn:this.getTurn()});return await fn()}
}
window.V07TurnManager=V07TurnManager;
})();