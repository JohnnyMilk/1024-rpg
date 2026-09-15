(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915g').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  // Approved Boss Lab RISE-04: each added row is committed instantly (board space + units down + blank top row),
  // then only the four top floor cells animate upward. Repeat twice before Boss entry.
  code=code.replace("rebuildGrid();anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場擴張'});await wait(460);for(let u of E)u.r+=2;","let v07BossTag=anim.play('skill-tag',{text:'⚠️ BOSS APPROACH · 戰場即將擴張為 4×6',duration:3000});if(v07BossTag)v07BossTag.style.animationDuration='3000ms';await wait(3000);let v07ExpandOne=async()=>{ROWS++;for(let u of E)u.r++;board.style.transition='none';rebuildGrid();let v07Top=[...grid.children].filter(x=>+x.dataset.r===0);for(let x of v07Top)x.style.opacity='0';render();void board.offsetHeight;board.style.transition='';for(let x of v07Top){x.style.opacity='';if(x.animate)x.animate([{opacity:0,transform:'perspective(500px) translateY(90px) rotateX(72deg) rotateZ(18deg) scale(.18)'},{opacity:.85,transform:'perspective(500px) rotateX(20deg) scale(.92)',offset:.35},{opacity:1,transform:'none'}],{duration:760,easing:'ease-out',fill:'forwards'});await wait(120)}await wait(820)};ROWS=4;await v07ExpandOne();await v07ExpandOne();");
  code=code.replace("let bp=randomItem(empty().filter(x=>x[0]<2))||randomItem(empty());","let bp=randomItem(empty().filter(x=>x[0]===0))||randomItem(empty().filter(x=>x[0]<2))||randomItem(empty());");

  // Boss is removed first; then show only the single defeat warning. Cracked floor itself is the telegraph.
  code=code.replace("src=src.replace(\"bactive=false;next=turn+BI;bossKills++\",\"bactive=false;next=turn+BI;bossKills++;bossCollapseStage=1;bossCollapseFresh=true;bossWarningRow=ROWS-1;rebuildGrid();anim.play('skill-tag',{text:'⚠️ 戰場崩塌預警 · 裂痕格仍可使用'})\");","src=src.replace(\"bactive=false;next=turn+BI;bossKills++\",\"bactive=false;next=turn+BI;bossKills++;bossCollapseStage=1;bossCollapseFresh=true;bossWarningRow=ROWS-1\");src=src.replace(\"render();let ev=deathTriggerEvents(wave);\",\"render();if(bossCollapseStage===1&&bossWarningRow===ROWS-1){let v07DefeatTag=anim.play('skill-tag',{text:'⚠️ BOSS DEFEATED · 戰場即將崩落',duration:3000});if(v07DefeatTag)v07DefeatTag.style.animationDuration='3000ms';await wait(3000);rebuildGrid();render()}let ev=deathTriggerEvents(wave);\");");
  code=code.replace("anim.play('skill-tag',{text:'⚠️ 下一排龜裂 · 還有一次 Player Phase'})","void 0");

  // Approved Boss Lab collapse: four cells fall one by one; after the row is gone the board contracts.
  code=code.replace("let row=bossWarningRow,cells=[...grid.children].filter(x=>+x.dataset.r===row);cells.forEach(x=>x.classList.add('v07-collapsing'));anim.play('skill-tag',{text:'⬇️ ENEMY PHASE · 警告格崩塌'});await wait(700);let doomed=E.filter(x=>x.r===row&&rem(x)>0);","let row=bossWarningRow,cells=[...grid.children].filter(x=>+x.dataset.r===row),doomed=E.filter(x=>x.r===row&&rem(x)>0),v07s=step();anim.play('skill-tag',{text:'⬇️ COLLAPSE · 警告格正在墜落'});for(let i=0;i<cells.length;i++){let x=cells[i];x.classList.remove('v07-warning');if(x.animate)x.animate([{opacity:1,transform:'none'},{opacity:.85,transform:'perspective(500px) rotateX(20deg) scale(.92)',offset:.35},{opacity:0,transform:'perspective(500px) translateY(90px) rotateX(72deg) rotateZ(18deg) scale(.18)'}],{duration:760,easing:'ease-in',fill:'forwards'});let u=doomed.find(e=>e.c===i);if(u){let pe=pieces.querySelector('[data-id='+u.id+']');if(pe&&pe.animate)pe.animate([{opacity:1,transform:pe.style.transform},{opacity:0,transform:'translate('+(u.c*v07s)+'px,'+((u.r+1.2)*v07s)+'px) rotate(18deg) scale(.2)'}],{duration:760,easing:'ease-in',fill:'forwards'})}await wait(120)}await wait(820);");
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