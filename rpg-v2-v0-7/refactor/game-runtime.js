(()=>{'use strict';
class V07GameRuntime{
 constructor({mode='normal',config={},adapter,trace}={}){
  if(!adapter)throw new Error('V07GameRuntime requires adapter');
  this.trace=trace||((event,data)=>console.log('[V07]',event,data||''));this.config=V07GameConfig.get(mode,config);this.state=new V07RuntimeState(this.config);this.adapter=adapter;
  this.board=new V07BoardCore(this.state);this.units=V07UnitRules;this.spawn=new V07SpawnManager({board:this.board});
  this.mapEvents=new V07MapEventManager({rows:()=>this.state.rows,setWarningRow:r=>{this.state.setWarningRow(r);this.adapter.setWarningRow?.(r)},notice:(...a)=>this.adapter.notice?.(...a),render:()=>this.adapter.render?.(this.state),collapseBottomRow:async()=>{const row=this.state.rows-1,killed=this.board.killRow(row);await this.adapter.collapseBottomRow?.(this.state,killed);this.board.compactDead();this.state.setRows(this.state.rows-1)}},(...a)=>this.trace('MAP',a));
  this.turnManager=new V07TurnManager({playerPhase:a=>this.playerPhase(a),enemyPhase:()=>this.enemyPhase(),mapEventPhase:()=>this.mapEventPhase(),trace:(...a)=>this.trace('TURN',a)});
 }
 async boot(){this.trace('BOOT',this.state.snapshot());await this.adapter.boot?.(this.state,this.config,this);if(this.config.boss)await this.spawnBoss(this.config.boss);this.adapter.render?.(this.state);return this}
 bossContext(){return{game:this.adapter.bossGameAdapter?.(this.state,this)||this.adapter,mapEvents:this.mapEvents,animations:this.adapter.animations,trace:(e,d)=>this.trace(e,d)}}
 async spawnBoss(id){const boss=V07Bosses.create(id,this.bossContext());this.state.activeBoss=boss;await boss.onSpawn();this.trace('BOSS_READY',{id});return boss}
 async playerPhase(action){this.state.setPhase('PLAYER');const result=await this.adapter.playerPhase?.(action,this.state,this);if(result===false)return false;this.state.nextTurn();return result}
 async enemyPhase(){this.state.setPhase('ENEMY');await this.adapter.enemyPhase?.(this.state,this);if(this.state.activeBoss?.isAlive())await this.state.activeBoss.takeTurn();return true}
 async mapEventPhase(){this.state.setPhase('MAP_EVENT');return this.mapEvents.run()}
 async playerAction(action){if(this.state.ended||this.state.busy)return false;this.state.busy=true;try{return await this.turnManager.runPlayerAction(action)}finally{this.state.busy=false;this.state.setPhase('IDLE');this.adapter.render?.(this.state)}}
 async bossDefeated(){const boss=this.state.activeBoss;if(!boss)return false;const result=await boss.onDefeated();this.trace('BOSS_DEFEATED_SETTLED',{id:boss.id});return result}
}
window.V07GameRuntime=V07GameRuntime;
})();