(()=>{'use strict';
const P='[V07 DIAG]';
const state={errors:[],checks:[],events:[]};
window.__v07Diagnostics=state;
const log=(type,msg,data)=>{const row={time:new Date().toISOString(),type,msg,data:data??null};state.events.push(row);(type==='error'?console.error:type==='warn'?console.warn:console.log)(P,msg,data??'');return row};
const check=(ok,msg,data)=>{state.checks.push({ok:!!ok,msg,data:data??null});log(ok?'info':'error',(ok?'PASS ':'FAIL ')+msg,data);return !!ok};
window.addEventListener('error',e=>{state.errors.push(String(e.message||e.error||'error'));log('error','window.error',e.message)});
window.addEventListener('unhandledrejection',e=>{state.errors.push(String(e.reason||'rejection'));log('error','unhandledrejection',e.reason)});
async function sourceChecks(){
 try{
  const [runtime,bootstrap]=await Promise.all([fetch('v07-runtime-loader.js?v=20260916-b29').then(r=>r.text()),fetch('v07-bootstrap.js?v=20260915g').then(r=>r.text())]);
  check(runtime.includes("v07MapState='IDLE'"),'collapse state machine declared');
  check(runtime.includes("v07MapState='WARNING'"),'WARNING state exists');
  check(runtime.includes("v07MapState='PLAYER_WARNING'"),'PLAYER_WARNING transition exists');
  check(runtime.includes("v07MapState='COLLAPSING'"),'COLLAPSING state exists');
  check(runtime.includes('v07AfterPlayerPhase();await enemyPhase()'),'Player → Enemy handoff patched');
  check(runtime.includes('await v07MapEventPhase()'),'Map Event call exists after Enemy phase');
  check(runtime.includes("text:'⬇️ MAP EVENT · 警告格正在崩落'"),'collapse execution marker exists');
  check(runtime.includes('await wait(120)')&&runtime.includes('await wait(820)'),'REUSE-06 collapse cadence present');
  check(bootstrap.includes('async function v07CollapseStep()'),'bootstrap collapse function source exists');
  check(bootstrap.includes('turn++;render();await enemyPhase()'),'baseline phase anchor exists');
  try{new Function(runtime);check(true,'runtime-loader JavaScript syntax')}catch(e){check(false,'runtime-loader JavaScript syntax',e.message)}
  try{new Function(bootstrap);check(true,'bootstrap JavaScript syntax')}catch(e){check(false,'bootstrap JavaScript syntax',e.message)}
 }catch(e){check(false,'source self-check fetch',e.message)}
}
function runtimeChecks(){
 const grid=document.getElementById('grid'),pieces=document.getElementById('pieces'),turn=document.getElementById('turn'),boot=document.getElementById('bootError');
 check(!!grid,'grid DOM exists');check(!!pieces,'pieces DOM exists');check(!!turn,'turn DOM exists');
 setTimeout(()=>{check(!boot||boot.style.display==='none'||!boot.textContent.trim(),'no bootError after startup',boot?.textContent||'');check(grid&&grid.children.length>=16,'grid runtime initialized',grid?.children.length||0)},1800);
 if(grid)new MutationObserver(()=>{const n=grid.querySelectorAll('.v07-warning').length,c=grid.querySelectorAll('.v07-collapsing').length;if(n)log('info','WARNING cells visible',{count:n});if(c)log('info','COLLAPSING cells visible',{count:c})}).observe(grid,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
 if(turn){let old=turn.textContent;new MutationObserver(()=>{if(turn.textContent!==old){log('info','TURN changed',{from:old,to:turn.textContent});old=turn.textContent}}).observe(turn,{childList:true,subtree:true,characterData:true})}
 const effects=document.getElementById('effects');if(effects)new MutationObserver(()=>{const t=effects.textContent||'';if(t.includes('BOSS DEFEATED'))log('info','Boss defeat warning rendered');if(t.includes('MAP EVENT'))log('info','Map Event collapse marker rendered')}).observe(effects,{childList:true,subtree:true,characterData:true});
}
sourceChecks();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',runtimeChecks,{once:true});else runtimeChecks();
})();