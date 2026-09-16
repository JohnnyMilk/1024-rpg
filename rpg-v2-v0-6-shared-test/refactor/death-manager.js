(()=>{'use strict';
class V07DeathManager{
 constructor({state,board,units,eventBus,rewardBoss=async()=>{},onBossDefeated=async()=>{},trace=()=>{}}){this.state=state;this.board=board;this.units=units;this.events=eventBus;this.rewardBoss=rewardBoss;this.onBossDefeated=onBossDefeated;this.trace=trace;this.pending=new Set()}
 queue(unit){if(unit)this.pending.add(unit.id)}
 async settle(){const deaths=this.state.units.filter(u=>this.pending.has(u.id)||(!u.dead&&this.units.remainingHP(u)<=0));this.pending.clear();if(!deaths.length)return[];const settled=[];for(const unit of deaths){await this.events.emit('BEFORE_DEATH',{unit});if(this.units.remainingHP(unit)>0){unit.dead=false;await this.events.emit('DEATH_CANCELLED',{unit});continue}unit.dead=true;await this.events.emit('UNIT_DEATH',{unit});settled.push(unit);this.trace('DEATH',{id:unit.id,type:unit.type});if(unit.type==='boss'){await this.events.emit('BOSS_REWARD_START',{unit});await this.rewardBoss(unit);await this.events.emit('BOSS_REWARD_END',{unit});await this.onBossDefeated(unit);await this.events.emit('BOSS_DEFEATED_SETTLED',{unit})}}
 this.board.compactDead();return settled}
}
window.V07DeathManager=V07DeathManager;
})();