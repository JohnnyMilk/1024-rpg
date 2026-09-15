(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915g').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  // Boss approach: the announcement itself lasts 3 seconds. Then the two new top rows rise in,
  // existing units are shifted down, and the Boss is restricted to the outermost/top row.
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場擴張'});await wait(460);for(let u of E)u.r+=2;","let v07BossTag=anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場即將擴張為 4×6',duration:3000});if(v07BossTag)v07BossTag.style.animationDuration='3000ms';await wait(3000);rebuildGrid();let v07RiseCells=[...grid.children].filter(x=>+x.dataset.r<2);for(let x of v07RiseCells){x.classList.add('v07-rising');if(x.animate)x.animate([{opacity:0,transform:'perspective(500px) rotateX(72deg) rotateZ(-10deg) scale(.28) translateY(45px)'},{opacity:1,transform:'perspective(500px) rotateX(0deg) rotateZ(0deg) scale(1) translateY(0)'}],{duration:900,easing:'cubic-bezier(.18,.82,.25,1)',fill:'both'})}await wait(900);for(let u of E)u.r+=2;");
  code=code.replace("let bp=randomItem(empty().filter(x=>x[0]<2))||randomItem(empty());","let bp=randomItem(empty().filter(x=>x[0]===0))||randomItem(empty().filter(x=>x[0]<2))||randomItem(empty());");

  // Boss defeat state is armed when HP reaches zero, but the 3-second collapse announcement is
  // deliberately deferred until processDeathWave has removed the Boss and rendered the board.
  code=code.replace("src=src.replace(\"bactive=false;next=turn+BI;bossKills++\",\"bactive=false;next=turn+BI;bossKills++;bossCollapseStage=1;bossCollapseFresh=true;bossWarningRow=ROWS-1;rebuildGrid();anim.play('skill-tag',{text:'⚠️ 戰場崩塌預警 · 裂痕格仍可使用'})\");","src=src.replace(\"bactive=false;next=turn+BI;bossKills++\",\"bactive=false;next=turn+BI;bossKills++;bossCollapseStage=1;bossCollapseFresh=true;bossWarningRow=ROWS-1\");src=src.replace(\"render();let ev=deathTriggerEvents(wave);\",\"render();if(bossCollapseStage===1&&bossWarningRow===ROWS-1){let v07DefeatTag=anim.play('skill-tag',{text:'⚠️ BOSS DEFEATED · 戰場即將開始崩落',duration:3000});if(v07DefeatTag)v07DefeatTag.style.animationDuration='3000ms';await wait(3000);rebuildGrid();anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 最下排將於下一 Enemy Phase 崩塌'});await wait(1200)}let ev=deathTriggerEvents(wave);\");");
  code=code.replace("anim.play('skill-tag',{text:'⚠️ 下一排龜裂 · 還有一次 Player Phase'})","anim.play('skill-tag',{text:'⚠️ COLLAPSE WARNING · 下一排已龜裂，還有一次 Player Phase'});await wait(1200)");

  // Collapse uses Web Animations directly so the falling motion cannot be masked by the Warning
  // pulse animation or a stale CSS rule. CSS classes remain as fallback.
  code=code.replace("let row=bossWarningRow,cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));anim.play('skill-tag',{text:'⬇️ ENEMY PHASE · 警告格崩塌'});await wait(700);let doomed=E.filter(x=>x.r===row&&rem(x)>0);","let row=bossWarningRow,doomed=E.filter(x=>x.r===row&&rem(x)>0),cells=[...grid.children].filter(x=>+x.dataset.r===row);for(let x of cells){x.classList.remove('v07-warning');x.classList.add('v07-collapsing');if(x.animate)x.animate([{opacity:1,transform:'perspective(500px) rotateX(0deg) rotateZ(0deg) scale(1) translateY(0)'},{opacity:.82,transform:'perspective(500px) rotateX(28deg) rotateZ(8deg) scale(.9) translateY(14px)',offset:.45},{opacity:0,transform:'perspective(500px) rotateX(78deg) rotateZ(20deg) scale(.25) translateY(95px)'}],{duration:1250,easing:'cubic-bezier(.35,0,.7,1)',fill:'forwards'})}for(let e of doomed){let pe=pieces.querySelector('[data-id='+e.id+']');if(pe){pe.classList.add('v07-falling');if(pe.animate)pe.animate([{opacity:1,transform:pe.style.transform+' scale(1)'},{opacity:.7,transform:pe.style.transform+' rotate(10deg) scale(.82)',offset:.5},{opacity:0,transform:pe.style.transform+' translateY(95px) rotate(22deg) scale(.25)'}],{duration:1250,easing:'cubic-bezier(.35,0,.7,1)',fill:'forwards'})}}anim.play('skill-tag',{text:'⬇️ COLLAPSE · 警告格正在墜落'});await wait(1300);");
  code=code.replace("bossCollapseStage++;bossCollapseFresh=true;bossWarningRow=ROWS-1;","bossCollapseStage++;bossCollapseFresh=false;bossWarningRow=ROWS-1;");

  const oldGuardRule="let grant=ally=>{let was=!!ally.guard;ally.guard=true;ally.guardBy=h.id;if(!was)ev.push({t:'buff',e:ally,text:'🛡️ 守護'})};grant(h);for(let ally of targets)grant(ally)";
  const newGuardRule="let grant=ally=>{let was=!!ally.guard;ally.guard=true;ally.guardBy=h.id;if(!was)ev.push({t:'buff',e:ally,text:'🛡️ 守護'})};for(let ally of targets)grant(ally)";
  if(!code.includes(oldGuardRule))throw new Error('找不到祭司守護實際效果片段');
  code=code.replace(oldGuardRule,newGuardRule);
  const oldGuardText="祭司實際移動後，自己獲得守護，並從周圍 8 格內友方隨機選擇最多 3 名獲得守護；優先選擇目前沒有守護的友方。下一次受到傷害時傷害 -1，之後消耗。";
  const newGuardText="祭司實際移動後，從自己周圍 8 格內的友方單位中隨機選擇最多 3 名獲得守護，不包含祭司自己；優先選擇目前沒有守護的友方。下一次受到傷害時傷害 -1，之後消耗。";
  if(!code.includes(oldGuardText))throw new Error('找不到祭司守護 UI 說明片段');
  code=code.replace(oldGuardText,newGuardText);

  (0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/v07-bootstrap-fixed.js');
}).catch(e=>fail(e.message));
})();