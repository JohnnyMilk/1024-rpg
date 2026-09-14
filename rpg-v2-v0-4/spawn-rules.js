(function(){'use strict';
if(!window.RPGShared||typeof RPGShared.emptyCells!=='function')return;
const baseEmpty=RPGShared.emptyCells;
let heroBlocked=null,enemyBlocked=null;
function rememberDeath(el){
  if(!el||!el.classList||!el.classList.contains('deathfx'))return;
  const m=(el.style.transform||'').match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  const pieces=document.getElementById('pieces');
  if(!m||!pieces)return;
  const step=(pieces.clientWidth-24)/4+8;
  const c=Math.round(parseFloat(m[1])/step),r=Math.round(parseFloat(m[2])/step);
  if(el.classList.contains('heroUnit'))heroBlocked={r,c};
  else if(el.classList.contains('enemy')||el.classList.contains('boss'))enemyBlocked={r,c};
}
const effects=document.getElementById('effects');
if(effects)new MutationObserver(ms=>{for(const mu of ms)for(const n of mu.addedNodes){if(n.nodeType!==1)continue;rememberDeath(n);n.querySelectorAll&&n.querySelectorAll('.deathfx').forEach(rememberDeath)}}).observe(effects,{childList:true,subtree:true});
RPGShared.emptyCells=function(entities,n){
  let cells=baseEmpty(entities,n),kind=null,blocked=null,stack='';
  try{stack=(new Error()).stack||''}catch(_){stack=''}
  if(stack.includes('makeHero')){kind='hero';blocked=heroBlocked}
  else if(stack.includes('addEnemy')){kind='enemy';blocked=enemyBlocked}
  if(!blocked)return cells;
  const filtered=cells.filter(([r,c])=>r!==blocked.r||c!==blocked.c);
  if(!filtered.length)return [];
  if(kind==='hero')heroBlocked=null;else enemyBlocked=null;
  return filtered;
};
window.__V04_SPAWN_RULES__={getBlocked:()=>({hero:heroBlocked,enemy:enemyBlocked})};
})();