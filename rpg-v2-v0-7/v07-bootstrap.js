(function(){'use strict';
const bootError=document.getElementById('bootError');
function fail(msg){if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}console.error(msg)}
fetch('../rpg-v2-v0-6/final-bootstrap.js?v=20260915h').then(r=>{if(!r.ok)throw new Error('v0.6 baseline bootstrap '+r.status);return r.text()}).then(code=>{
code=code.replace("fetch('hp-loader.js?v=20260915f')","fetch('../rpg-v2-v0-6/hp-loader.js?v=20260915f')");
const marker="(0,eval)(src+'\\n//# sourceURL=rpg-v2-v0-6/game-v06-runtime.js');";
const v07Patch=`
// v0.7 live fixes. v0.6 source remains frozen.
src=src.replace("祭司實際移動後，自己與周圍 8 格內友方獲得守護；下一次受到傷害時傷害 -1，之後消耗。","祭司實際移動後，自己獲得守護，並從周圍 8 格內友方隨機選擇最多 3 名獲得守護；優先選擇目前沒有守護的友方。下一次受到傷害時傷害 -1，之後消耗。");
const oldGuard="else if(h.profession==='priest'){for(let ally of livingHeroes().filter(x=>Math.abs(x.r-h.r)<=1&&Math.abs(x.c-h.c)<=1)){ally.guard=true;ally.guardBy=h.id;ev.push({t:'buff',e:ally,text:'🛡️ -1'})}}";
const newGuard="else if(h.profession==='priest'){let nearby=livingHeroes().filter(x=>x.id!==h.id&&near8(h,x)),fresh=nearby.filter(x=>!x.guard),guarded=nearby.filter(x=>x.guard),targets=randomTargets(fresh,Math.min(3,fresh.length));if(targets.length<3)targets.push(...randomTargets(guarded,Math.min(3-targets.length,guarded.length)));let grant=ally=>{let was=!!ally.guard;ally.guard=true;ally.guardBy=h.id;if(!was)ev.push({t:'buff',e:ally,text:'🛡️ 守護'})};grant(h);for(let ally of targets)grant(ally)}";
if(!src.includes(oldGuard))throw new Error('找不到祭司守護基礎技能片段');
src=src.replace(oldGuard,newGuard);
`;
if(!code.includes(marker))throw new Error('找不到 v0.6 runtime 注入點');
code=code.replace(marker,v07Patch+'\n'+marker.replace('rpg-v2-v0-6/game-v06-runtime.js','rpg-v2-v0-7/game-v07-runtime.js'));
(0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/final-bootstrap-v07.js');
}).catch(e=>fail(e.message));
})();