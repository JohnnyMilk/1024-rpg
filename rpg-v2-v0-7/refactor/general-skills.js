(()=>{'use strict';
const enemies=r=>V07CombatTargeting.enemies(r.state);
const pick=(list,n=1)=>{const a=[...list],out=[];while(a.length&&out.length<n)out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);return out};
async function hitMany(r,targets,kind,amount=1){for(const t of targets)await r.damage.apply(t,amount,{kind});await r.deaths.settle()}
window.V07GeneralSkills=[
 {id:'wind',events:{AFTER_PLAYER_MOVE:async(e,r)=>{const moved=(e.transaction.actualMoves||e.transaction.moved).length;if(moved>=4){const t=pick(enemies(r),1);if(t.length)await hitMany(r,t,'skill-wind')}}}},
 {id:'resonance',events:{MERGE:async(e,r)=>{if(e.number%5===0)await hitMany(r,enemies(r),'skill-resonance')}}},
 {id:'overload',events:{AFTER_PLAYER_MOVE:async(e,r)=>{if(e.transaction.mergeCount>=2)await hitMany(r,enemies(r),'skill-overload')}}},
 {id:'deathBlast',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type!=='hero')return;const t=pick(V07CombatTargeting.around8(e.unit,enemies(r)),1);if(t.length)await hitMany(r,t,'skill-death-blast')}}},
 {id:'legacy',events:{UNIT_DEATH:async(e,r)=>{if(e.unit.type==='hero')r.state.legacyReady=true},MERGE:async(e,r)=>{if(!r.state.legacyReady)return;r.state.legacyReady=false;const t=pick(enemies(r),1);if(t.length)await hitMany(r,t,'skill-legacy')}}},
 {id:'assault',events:{BEFORE_DAMAGE:async(e)=>{if(e.target?.type==='boss'&&e.context?.amount>0)e.context.amount+=1}}},
 {id:'precision',events:{MERGE:async(e,r)=>{if(e.number%15===0){const t=pick(enemies(r),3);if(t.length)await hitMany(r,t,'skill-precision')}}}}
];
})();