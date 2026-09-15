(function(){'use strict';
const bootError=document.getElementById('bootError');
function fail(msg){if(bootError){bootError.style.display='block';bootError.textContent='v0.6 最終規則載入失敗：'+msg}console.error(msg)}
fetch('hp-loader.js?v=20260915f').then(r=>{if(!r.ok)throw new Error('hp-loader.js '+r.status);return r.text()}).then(code=>{
const marker="(0,eval)(src+'\\n//# sourceURL=rpg-v2-v0-6/game-v06-runtime.js');";
if(!code.includes(marker))throw new Error('找不到 runtime 注入點');
const patch=`
// v0.6 final merge-combat rules
src=src.replace(/\\['precision','📐','精準','[^']*'\\],?/, '');
src=src.replace(/\\['resonance','💥','共鳴','[^']*'\\]/, "['resonance','💥','波動共鳴','敵人死亡時，以死亡位置為中心向周圍 8 格產生波動傷害。']");
replaceBlock('function deathTriggerEvents(wave){','function tryResurrect(hero)', \`function deathTriggerEvents(wave){let ev=[];for(let e of wave){if(e.type==='hero'){if(has('deathBlast')){let es=livingEnemies().filter(x=>Math.abs(x.r-e.r)<=1&&Math.abs(x.c-e.c)<=1),lvl=rankLevel('deathBlast'),targets=lvl>=4?es:randomTargets(es,lvl);if(targets.length){for(let x of targets)hitEnemy(x,sdmg(),ev,'deathBlast','💣');useSkill('deathBlast')}}if(has('legacy')){if(!legacy)useSkill('legacy');legacy=true;ev.push({t:'board',icon:'👻 遺志已準備'})}continue}if(has('resonance')&&!e.resonanceNoChain){let lvl=rankLevel('resonance'),es=livingEnemies().filter(x=>Math.abs(x.r-e.r)<=1&&Math.abs(x.c-e.c)<=1),targets=lvl>=3?es:randomTargets(es,lvl);if(targets.length){for(let x of targets){if(lvl<4&&rem(x)<=1)x.resonanceNoChain=true;hitEnemy(x,1,ev,'resonance','💥',e,false)}useSkill('resonance')}}}return ev}\`);
// Preserve the v0.6 Turn Engine. enemyAct is the first function immediately after mergeEvents
// in hp-loader's transformed game source; replacing through async move would delete enemyPhase,
// spawnEnemyPhase and playerPhaseStart and leave the game permanently busy after the first merge.
replaceBlock('function mergeEvents(ids,moved){','async function enemyAct(e){', \`function mergeEvents(ids,moved){let ev=[],records=[];for(let mid of ids){let h=E.find(x=>x.id===mid);if(!h)continue;merges++;let v=hv(h);score+=v;mergeScore+=v;let near=livingEnemies().filter(x=>near8(h,x)),slash=randomTargets(near,1);for(let e of slash)hitEnemy(e,1,ev,'mergeMelee','⚔️',h,false);if(merges%3===0){let arrows=randomTargets(livingEnemies(),2);for(let e of arrows)hitEnemy(e,1,ev,'mergeArrow','🏹',h,true)}if(legacy){let lvl=rankLevel('legacy'),es=livingEnemies(),targets=lvl>=4?es:randomTargets(es,lvl);for(let e of targets)hitEnemy(e,1,ev,'legacy','👻');legacy=false}if(v>best){best=v;RPGSave.recordBestHero(v);records.push(v)}}if(has('overload')&&ids.length>=2){let lvl=rankLevel('overload'),d=lvl>=4?ids.length:lvl,targets=livingEnemies();for(let e of targets)hitEnemy(e,d,ev,'overload','🔥');if(lvl>=4){for(let h of livingHeroes()){h.guard=true;h.guardBy=null;ev.push({t:'buff',e:h,text:'🛡️ 守護'})}}if(targets.length||lvl>=4)useSkill('overload')}if(has('wind')){let lvl=rankLevel('wind'),threshold=lvl>=3?3:4;if(moved>=threshold){let es=livingEnemies(),targets=lvl>=4?es:randomTargets(es,lvl===1?1:2);for(let e of targets)hitEnemy(e,1,ev,'wind','🌪️');if(targets.length)useSkill('wind')}}return{ev,records}}\`);
`;
code=code.replace(marker,patch+'\n'+marker);
const blob=new Blob([code],{type:'text/javascript'}),url=URL.createObjectURL(blob),s=document.createElement('script');s.src=url;s.onload=()=>URL.revokeObjectURL(url);s.onerror=()=>fail('runtime script 啟動失敗');document.head.appendChild(s);
}).catch(e=>fail(e.message));
})();