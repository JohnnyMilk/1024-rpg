(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915g').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場擴張'});await wait(460);for(let u of E)u.r+=2;","anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場即將擴張為 4×6'});await wait(1400);rebuildGrid();await wait(600);for(let u of E)u.r+=2;");
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ 戰場崩塌預警 · 裂痕格仍可使用'})","rebuildGrid();anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 最下排將於下一 Enemy Phase 崩塌'});await wait(1200)");
  code=code.replace("anim.play('skill-tag',{text:'⚠️ 下一排龜裂 · 還有一次 Player Phase'})","anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 下一排已龜裂，還有一次 Player Phase'});await wait(1200)");
  code=code.replace("let row=bossWarningRow,cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));anim.play('skill-tag',{text:'⬇️ ENEMY PHASE · 警告格崩塌'});await wait(700);let doomed=E.filter(x=>x.r===row&&rem(x)>0);","let row=bossWarningRow,doomed=E.filter(x=>x.r===row&&rem(x)>0),cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));for(let e of doomed){let pe=pieces.querySelector('[data-id='+e.id+']');if(pe)pe.classList.add('v07-falling')}anim.play('skill-tag',{text:'⬇️ COLLAPSE · 警告格正在墜落'});await wait(900);");
  // Inject directly into the bootstrap patch template, immediately before its tryResurrect source patch.
  const hook="src=src.replace(\"function tryResurrect(hero){if(!hero||hero.noReviveFromCollapse||hero.type!=='hero'||hero.revived||!hasClass('priestRevive'))return null;\"";
  const enemyHook="src=src.replace(\"async function enemyPhase(){let p=enemyPlan();\",\"async function enemyPhase(){if(bossCollapseStage){if(bossCollapseFresh){bossCollapseFresh=false}else{return await v07CollapseStep()}}let p=enemyPlan();\");\n";
  if(!code.includes(hook))throw new Error('找不到 v0.7 tryResurrect 注入點');
  code=code.replace(hook,enemyHook+hook);
  (0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/v07-bootstrap-fixed.js');
}).catch(e=>fail(e.message));
})();