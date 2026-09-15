(()=>{'use strict';
/* B21 bridge: formal runtime owns combat state; this bridge makes Boss death/collapse
   detection deterministic and independent of the old Lab damage button. */
let lastBossPresent=false,lastRows=4;
const pieces=document.getElementById('pieces'),board=document.getElementById('board');
function bossPresent(){return !!pieces?.querySelector('.piece.boss')}
function rows(){let v=parseInt(getComputedStyle(board).getPropertyValue('--v07-rows'),10);return Number.isFinite(v)?v:4}
function emit(active,state='ACTIVE'){window.dispatchEvent(new CustomEvent('v07-boss-state',{detail:{active,state,charge:window.__v07BossEngine?.chargeCD||0,quake:window.__v07BossEngine?.quakeCD||0,name:'巨象守衛'}}))}
function scan(){const now=bossPresent(),r=rows();if(now&&!lastBossPresent)emit(true,'ACTIVE');if(!now&&lastBossPresent&&r>4){window.dispatchEvent(new CustomEvent('v07-formal-boss-defeated',{detail:{rows:r}}));emit(false,'DEFEAT_NOTICE')}lastBossPresent=now;lastRows=r}
window.addEventListener('v07-formal-render',scan);window.addEventListener('v07-formal-boss-spawn',()=>{lastBossPresent=true;emit(true,'ACTIVE')});window.addEventListener('v07-formal-boss-defeated',()=>{lastBossPresent=false});
/* Observer is notification-only; it never mutates the observed subtree, avoiding the old loop bug. */
if(pieces)new MutationObserver(scan).observe(pieces,{childList:true});
scan();
window.V07B21Bridge={scan,bossPresent,rows,get lastRows(){return lastRows}};
})();