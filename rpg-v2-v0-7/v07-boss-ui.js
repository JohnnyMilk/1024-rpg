(()=>{'use strict';
const board=document.getElementById('board'),modal=document.getElementById('modal'),panel=document.getElementById('panel');
if(!board||!modal||!panel)return;
let state={active:false,charge:0,quake:0,name:'巨像守衛',state:'IDLE'};
const hud=document.createElement('button');hud.id='v07BossHud';hud.className='v07BossHud';hud.type='button';hud.hidden=true;hud.innerHTML='<span class="v07BossHudIcon">🗿</span><span><b>巨像守衛</b><small>BOSS INFO</small></span>';board.parentNode.insertBefore(hud,board);
const skillHud=document.getElementById('bossSkillHud'),chargeIcon=document.getElementById('bossChargeIcon'),quakeIcon=document.getElementById('bossQuakeIcon');
const cd=n=>n<=0?'READY':'CD '+n;
const details={stomp:['🗿 踐踏　無 CD','沒有其他可發動技能時的普通行動。朝最近英雄逼近；接觸攻擊造成 2 點傷害。'],charge:['🐘 衝陣　CD 1','同一直行或直列且路徑可衝撞時，最多衝 2 格；撞擊造成 1 點傷害並強制推動。被推出棋盤的單位直接淡出並移除。'],quake:['💥 震地　CD 4','周圍 8 格存在英雄時發動；範圍內所有英雄受到 2 點傷害。']};
function closeButton(){const b=panel.querySelector('#v07BossInfoClose');if(b)b.onclick=()=>modal.classList.remove('show')}
function showSkill(key){const d=details[key];if(!d)return;panel.innerHTML='<h2>'+d[0]+'</h2><p class="v07BossRole">🗿 巨像守衛 · BOSS SKILL</p><div class="v07BossAbility"><p>'+d[1]+'</p></div><button id="v07BossInfoClose">關閉</button>';modal.classList.add('show');closeButton()}
function showInfo(){panel.innerHTML='<h2>🗿 巨像守衛</h2><p class="v07BossRole">BOSS · 守門型</p><div class="v07BossAbility"><b>🗿 踐踏　無 CD</b><p>'+details.stomp[1]+'</p></div><div class="v07BossAbility"><b>🐘 衝陣　'+cd(state.charge)+'</b><p>'+details.charge[1]+'</p></div><div class="v07BossAbility"><b>💥 震地　'+cd(state.quake)+'</b><p>'+details.quake[1]+'</p></div><div class="v07BossAbility"><b>🏛️ 戰場擴張</b><p>進場時戰場由 4×4 擴張為 4×6。</p></div><div class="v07BossAbility"><b>⚠️ 戰場崩落</b><p>Boss 被擊敗後逐排警告並崩落，最後回到 4×4。</p></div><button id="v07BossInfoClose">關閉</button>';modal.classList.add('show');closeButton()}
hud.onclick=showInfo;document.querySelectorAll('[data-boss-detail]').forEach(b=>b.onclick=()=>showSkill(b.dataset.bossDetail));
function setCd(el,n){if(!el)return;const shade=el.querySelector('.bossCdShade');el.classList.toggle('cooling',n>0);el.classList.toggle('ready',n<=0);if(shade)shade.textContent=n>0?'CD '+n:''}
function paint(){const active=state.state==='ACTIVE';hud.hidden=!active;if(skillHud)skillHud.hidden=!active;setCd(chargeIcon,Number(state.charge)||0);setCd(quakeIcon,Number(state.quake)||0)}
window.addEventListener('v07-boss-state',e=>{state={...state,...e.detail};paint()});
const eng=window.__v07BossEngine;if(eng){state={...state,active:eng.state==='ACTIVE',state:eng.state,name:eng.name,charge:eng.chargeCD,quake:eng.quakeCD};paint()}
})();