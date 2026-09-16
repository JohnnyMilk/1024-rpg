(()=>{'use strict';
const enemies=r=>V07CombatTargeting.enemies(r.state);
const pick=(list,n=1)=>{const a=[...list],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out};
async function hitMany(r,targets,kind,amount=1){for(const t of targets)await r.damage.apply(t,amount,{kind});await r.deaths.settle()}
window.V07GeneralSkills=[
 {id:'swift',events:{AFTER_PLAYER_MOVE:async(e,r)=>{r.state.swiftMoves=(r.state.swiftMoves||0)+1;if(r.state.swiftMoves%5===0)r.state.skipNextEnemySpawn=true},BEFORE_SPAWN:async(e,r)=>{if(e.spec.type==='enemy'&&r.state.skipNextEnemySpawn){e.context.cancelled=true;r.state.skipNextEnemySpawn=false}}}},
 {id:'wind',events:{AFTER_PLAYER_MOVE:async(e,r)=>{const moved=(e.transaction.actualMoves||e.transaction.moved).length;if(moved>=4){const t=pick(enemies(r),1);if(t.length)await hitMany(r,t,'skill-wind')}}}},
 {id:'momentum',events:{AFTER_PLAYER_MOVE:async(e,r)=>{r.state.noMergeTurns=e.transaction.mergeCount?0:(r.state.noMergeTurns||0)+1;if(r.state.noMergeTurns===3){for(const h of r.state.living('hero'))r.units.heal(h,1);r.state.noMergeTurns=0;await r.events.emit('SKILL_HEAL',{id:'momentum',heroes:r.state.living('hero')})}}},
 {id:'resonance',events:{MERGE:async(e,r)=>{if(e.number%5===0)await hitMany(r,enemies(r),'skill-resonance')}}},
 {id:'overload',events:{AFTER_PLAYER_MOVE:async(e,r)=>{if(e.transaction.mergeCount>=2)await hitMany(r,enemies(r),'skill-overload')}}},
 {id:'luck',events:{AFTER_PLAYER_MOVE:async(e,r)=>{r.state.luckMoves=(r.state.luckMoves||0)+1;if(r.state.luckMoves%10===0)r.state.luckReady=true},BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero'||e.spec.special||!r.state.luckReady)return;r.state.luckReady=false;if(Math.random()<.25)e.spec.tier=(e.spec.tier||2)*2}}},
 {id:'deathBlast',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type!=='hero')return;const t=pick(V07CombatTargeting.around8(e.unit,enemies(r)),1);if(t.length)await hitMany(r,t,'skill-death-blast')}}},
 {id:'legacy',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type==='hero')r.state.legacyReady=true},MERGE:async(e,r)=>{if(!r.state.legacyReady)return;r.state.legacyReady=false;const t=pick(enemies(r),1);if(t.length)await hitMany(r,t,'skill-legacy')}}},
 {id:'blood',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type!=='hero')return;r.state.bloodDeaths=(r.state.bloodDeaths||0)+1;if(r.state.bloodDeaths>=3){r.state.bloodReady=true;r.state.bloodDeaths=0}},BEFORE_SPAWN:async(e,r)=>{if(e.spec.type==='hero'&&r.state.bloodReady){e.spec.tier=(e.spec.tier||2)*2;r.state.bloodReady=false}}}},
 {id:'reinforce',events:{BEFORE_SPAWN:async(e,r)=>{if(e.spec.type!=='hero')return;r.state.heroSpawnCount=(r.state.heroSpawnCount||0)+1;if(r.state.heroSpawnCount%10===0)e.spec.tier=4}}},
 {id:'mutation',events:{BEFORE_SPAWN:async(e,r)=>{if(e.spec.type==='hero'&&!e.spec.special&&r.state.profession&&Math.random()<.10){e.spec.special=true;e.spec.profession=r.state.profession}}}},
 {id:'assault',events:{BEFORE_DAMAGE:async(e)=>{if(e.target?.type==='boss'&&e.context?.amount>0)e.context.amount+=1}}},
 {id:'precision',events:{MERGE:async(e,r)=>{if(e.number%15===0){const t=pick(enemies(r),3);if(t.length)await hitMany(r,t,'skill-precision')}}}},
 {id:'backup',events:{BEFORE_SPAWN:async(e)=>{if(e.spec.type==='hero'&&!e.spec.noBackup&&Math.random()<.05)e.context.extras.push({...e.spec,noBackup:true})}}}
];
})();