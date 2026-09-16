(()=>{'use strict';
class V07EnemyManager{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace}
 async run(){const enemies=this.r.state.living('enemy').filter(e=>!e.spawnedThisEnemyPhase);for(const enemy of enemies){if(!this.r.units.alive(enemy))continue;await this.takeTurn(enemy)}for(const e of this.r.state.living('enemy'))delete e.spawnedThisEnemyPhase;return true}
 async takeTurn(enemy){const heroes=this.r.state.living('hero');if(!heroes.length)return false;const target=V07CombatTargeting.nearest(enemy,heroes,1)[0];if(!target)return false;const dist=V07CombatTargeting.distance(enemy,target);if(dist===1){await this.attack(enemy,target);return true}const dr=Math.sign(target.r-enemy.r),dc=Math.sign(target.c-enemy.c),steps=Math.abs(target.r-enemy.r)>=Math.abs(target.c-enemy.c)?[[dr,0],[0,dc]]:[[0,dc],[dr,0]];for(const [rr,cc] of steps){if(!rr&&!cc)continue;const nr=enemy.r+rr,nc=enemy.c+cc;if(this.r.board.inBounds(nr,nc)&&!this.r.board.at(nr,nc,enemy.id)){enemy.r=nr;enemy.c=nc;this.trace('ENEMY_MOVE',{id:enemy.id,r:nr,c:nc});await this.r.events.emit('ENEMY_MOVE',{enemy});return true}}return false}
 async attack(enemy,hero){const result=await this.r.damage.apply(hero,enemy.damage||1,{source:enemy,kind:'enemy-contact'});await this.r.events.emit('ENEMY_ATTACK',{enemy,hero,damage:result.applied,result});return true}
}
window.V07EnemyManager=V07EnemyManager;
})();