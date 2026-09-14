(function(){'use strict';
if(!window.RPGShared||typeof RPGShared.randomItem!=='function')return;
const baseRandomItem=RPGShared.randomItem;
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
RPGShared.randomItem=function(list){
  if(!Array.isArray(list)||!list.length)return baseRandomItem(list);
  let stack='';
  try{stack=(new Error()).stack||''}catch(_){stack=''}
  let blocked=null,kind=null;
  if(stack.includes('makeHero')){blocked=heroBlocked;kind='hero'}
  else if(stack.includes('addEnemy')){blocked=enemyBlocked;kind='enemy'}
  if(!blocked)return baseRandomItem(list);
  const filtered=list.filter(item=>!Array.isArray(item)||item[0]!==blocked.r||item[1]!==blocked.c);
  if(!filtered.length)return null;
  if(kind==='hero')heroBlocked=null;else enemyBlocked=null;
  return baseRandomItem(filtered);
};
window.__V04_SPAWN_RULES__={getBlocked:()=>({hero:heroBlocked,enemy:enemyBlocked})};
})();