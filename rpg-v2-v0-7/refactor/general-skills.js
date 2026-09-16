(()=>{'use strict';
const enemies=r=>V07CombatTargeting.enemies(r.state);
const pick=(list,n=1)=>{const a=[...list],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out};
const lv=(r,id)=>r.skills.level(id);
async function hitMany(r,targets,kind,amount=1){for(const t of targets)await r.damage.apply(t,amount,{kind});await r.deaths.settle()}
function guardAll(r){for(const h of r.state.living('hero'))h.guard=true}
window.V07GeneralSkills=[
 {id:'swift',events:{
  AFTER_PLAYER_MOVE:async(e,r)=>{r.state.swiftMoves++;const level=lv(r,'swift'),need=[5,4,3,3][level-1];if(r.state.swiftMoves%need===0){r.state.skipNextEnemySpawn=true;if(level===4)r.state.skipNextNormalEnemyActions=true}},
  BEFORE_SPAWN:async(e,r)=>{if(e.spec.type==='enemy'&&r.state.skipNextEnemySpawn){e.context.cancelled=true;r.state.skipNextEnemySpawn=false}}
 }},
 {id:'wind',events:{AFTER_PLAYER_MOVE:async(e,r)=>{const level=lv(r,'wind'),moved=(e.transaction.actualMoves||e.transaction.moved).length,need=level>=3?3:4,count=level===1?1:level===4?999:2;if(moved>=need){const t=level===4?enemies(r):pick(enemies(r),count);if(t.length)await hitMany(r,t,'skill-wind')}}}},
 {id:'momentum',events:{AFTER_PLAYER_MOVE:async(e,r)=>{r.state.noMergeTurns=e.transaction.mergeCount?0:r.state.noMergeTurns+1;if(r.state.noMergeTurns===3){const level=lv(r,'momentum'),amount=[1,2,3,3][level-1],hs=r.state.living('hero');for(const h of hs)r.units.heal(h,amount);if(level===4)guardAll(r);r.state.noMergeTurns=0;await r.events.emit('SKILL_HEAL',{id:'momentum',heroes:hs,amount})}}}},
 {id:'resonance',events:{MERGE:async(e,r)=>{if(e.number%5!==0)return;const level=lv(r,'resonance'),t=level===4?enemies(r):pick(enemies(r),[3,4,5][level-1]);if(t.length)await hitMany(r,t,'skill-resonance')}}},
 {id:'overload',events:{AFTER_PLAYER_MOVE:async(e,r)=>{if(e.transaction.mergeCount<2)return;const level=lv(r,'overload'),amount=level===4?e.transaction.mergeCount:level;await hitMany(r,enemies(r),'skill-overload',amount);if(level===4)guardAll(r)}}},
 {id:'luck',events:{
  AFTER_PLAYER_MOVE:async(e,r)=>{r.state.luckMoves++;if(r.state.luckMoves%10===0)r.state.luckReady=true},
  BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero'||e.spec.special||!r.state.luckReady)return;r.state.luckReady=false;const chance=[.25,.5,.75,1][lv(r,'luck')-1];if(Math.random()<chance)e.spec.tier=(e.spec.tier||2)*2}
 }},
 {id:'deathBlast',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type!=='hero')return;const level=lv(r,'deathBlast'),near=V07CombatTargeting.around8(e.unit,enemies(r)),t=level===4?near:pick(near,level);if(t.length)await hitMany(r,t,'skill-death-blast')}}},
 {id:'legacy',events:{
  UNIT_DEATH:async(e,r)=>{if(e.unit.type==='hero')r.state.legacyReady=true},
  MERGE:async(e,r)=>{if(!r.state.legacyReady)return;r.state.legacyReady=false;const level=lv(r,'legacy'),t=level===4?enemies(r):pick(enemies(r),level);if(t.length)await hitMany(r,t,'skill-legacy')}
 }},
 {id:'blood',events:{
  UNIT_DEATH:async(e,r)=>{if(e.unit.type!=='hero')return;r.state.bloodDeaths++;if(r.state.bloodDeaths>=3)r.state.bloodReady=true},
  BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero'||!r.state.bloodReady)return;const level=lv(r,'blood'),raise=Math.min(level,3);e.spec.tier=(e.spec.tier||2)*(2**raise);if(level===4&&r.state.profession){e.spec.special=true;e.spec.profession=r.state.profession}r.state.bloodReady=false;r.state.bloodDeaths=0}
 }},
 {id:'firstStrike',events:{UNIT_SPAWNED:async(e,r)=>{if(e.unit.type!=='boss')return;const level=lv(r,'firstStrike');await r.damage.apply(e.unit,[2,3,4,5][level-1],{kind:'skill-first-strike'});if(level===4)e.unit.skipNextBossAction=true;await r.deaths.settle()}}},
 {id:'reinforce',events:{BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero')return;r.state.heroSpawnCount++;if(r.state.heroSpawnCount%10!==0)return;const level=lv(r,'reinforce');e.spec.tier=[4,8,16,16][level-1];if(level===4&&r.state.profession){e.spec.special=true;e.spec.profession=r.state.profession}}}},
 {id:'mutation',events:{BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero'||e.spec.special||!r.state.profession)return;const chance=[.10,.20,.30,.40][lv(r,'mutation')-1];if(Math.random()<chance){e.spec.special=true;e.spec.profession=r.state.profession}}}},
 {id:'risk',events:{UNIT_DEATH:async(e,r)=>{if(r.adapter?.applyRiskScore)await r.adapter.applyRiskScore(e.unit,lv(r,'risk'),r.state,r)}}},
 {id:'assault',events:{BEFORE_DAMAGE:async(e,r)=>{if(e.target?.type==='boss'&&e.context?.amount>0)e.context.amount+=lv(r,'assault')}}},
 {id:'precision',events:{MERGE:async(e,r)=>{if(e.number%15!==0)return;const level=lv(r,'precision'),t=pick(enemies(r),level===4?5:[3,4,5][level-1]);if(t.length)await hitMany(r,t,'skill-precision',level===4?2:1)}}},
 {id:'backup',events:{BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero'||e.spec.noBackup)return;const chance=[.05,.10,.15,.20][lv(r,'backup')-1];if(Math.random()<chance)e.context.extras.push({...e.spec,noBackup:true})}}}
];
})();