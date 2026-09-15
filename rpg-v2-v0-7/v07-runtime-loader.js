(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915g').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場擴張'});await wait(460);for(let u of E)u.r+=2;","anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場即將擴張為 4×6'});await wait(3000);rebuildGrid();await wait(600);for(let u of E)u.r+=2;");
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ 戰場崩塌預警 · 裂痕格仍可使用'})","anim.play('skill-tag',{text:'⚠️ BOSS DEFEATED · 戰場即將開始崩落'});await wait(3000);rebuildGrid();anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 最下排將於下一 Enemy Phase 崩塌'});await wait(1200)");
  code=code.replace("anim.play('skill-tag',{text:'⚠️ 下一排龜裂 · 還有一次 Player Phase'})","anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 下一排已龜裂，還有一次 Player Phase'});await wait(1200)");
  code=code.replace("let row=bossWarningRow,cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));anim.play('skill-tag',{text:'⬇️ ENEMY PHASE · 警告格崩塌'});await wait(700);let doomed=E.filter(x=>x.r===row&&rem(x)>0);","let row=bossWarningRow,doomed=E.filter(x=>x.r===row&&rem(x)>0),cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));for(let e of doomed){let pe=pieces.querySelector('[data-id='+e.id+']');if(pe)pe.classList.add('v07-falling')}anim.play('skill-tag',{text:'⬇️ COLLAPSE · 警告格正在墜落'});await wait(900);");
  code=code.replace("bossCollapseStage++;bossCollapseFresh=true;bossWarningRow=ROWS-1;","bossCollapseStage++;bossCollapseFresh=false;bossWarningRow=ROWS-1;");

  const oldGuardRule="let grant=ally=>{let was=!!ally.guard;ally.guard=true;ally.guardBy=h.id;if(!was)ev.push({t:'buff',e:ally,text:'🛡️ 守護'})};grant(h);for(let ally of targets)grant(ally)";
  const newGuardRule="let grant=ally=>{let was=!!ally.guard;ally.guard=true;ally.guardBy=h.id;if(!was)ev.push({t:'buff',e:ally,text:'🛡️ 守護'})};for(let ally of targets)grant(ally)";
  if(!code.includes(oldGuardRule))throw new Error('找不到祭司守護實際效果片段');
  code=code.replace(oldGuardRule,newGuardRule);
  const oldGuardText="祭司實際移動後，自己獲得守護，並從周圍 8 格內友方隨機選擇最多 3 名獲得守護；優先選擇目前沒有守護的友方。下一次受到傷害時傷害 -1，之後消耗。";
  const newGuardText="祭司實際移動後，從自己周圍 8 格內的友方單位中隨機選擇最多 3 名獲得守護，不包含祭司自己；優先選擇目前沒有守護的友方。下一次受到傷害時傷害 -1，之後消耗。";
  if(!code.includes(oldGuardText))throw new Error('找不到祭司守護 UI 說明片段');
  code=code.replace(oldGuardText,newGuardText);

  // Keep the bootstrap's proven move-level collapse gate. No generated enemyPhase source hook is used.
  // Initial Boss defeat uses bossCollapseFresh=true to allow the next full Player Phase.
  // After the first collapse, the next warning is already visible, so bossCollapseFresh=false makes
  // the following Enemy Phase perform the second collapse after exactly one Player Phase.

  (0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/v07-bootstrap-fixed.js');
}).catch(e=>fail(e.message));
})();