(function(){'use strict';
const ICONS={crowd:'👥',killingIntent:'😈',warSweep:'🪃',warImpact:'💫',rangerSnipe:'🔭',priestPunish:'⚖️',ascend:'⏫',encore:'🎼',awakening:'🌅'};
const BASIC={
warrior:{entry:'迎戰：特殊戰士進場時，隨機攻擊周圍 8 格內最多 2 名敵人，各造成 1 技能傷害。',move:'突進：戰士實際移動後若被前方敵人阻擋，對該敵人造成 1 技能傷害。'},
ranger:{entry:'遠射：特殊遊俠進場時，隨機攻擊周圍 8 格以外最多 2 名敵人，各造成 1 技能傷害。',move:'回身射擊：遊俠實際移動後，向移動反方向射擊，命中直線上最近的敵人並造成 1 技能傷害。'},
priest:{entry:'治癒波：特殊祭司進場時，使周圍 8 格內受傷的友方各恢復 1 HP。',move:'守護：祭司實際移動後，自己與周圍 8 格內友方獲得 1 次完全抵銷傷害的守護；再次施放會刷新，不疊加。'}
};
function patchSkillIcons(){const api=window.__V2_TEST__;if(!api)return;for(const s of api.getSkills())if(ICONS[s.id])s.icon=ICONS[s.id];const pools=api.getClassSkills();for(const s of [...Object.values(pools.CLASS_SKILLS).flat(),...pools.COMMON_SKILLS])if(ICONS[s.id])s.icon=ICONS[s.id];const prof=api.getProfessions();if(prof){prof.warrior.icon='⚔️';prof.ranger.icon='🏹';prof.priest.icon='✝️'}
}
function patchProfessionChoices(){const title=document.querySelector('#panel h2');if(!title||title.textContent.trim()!=='選擇特殊職業')return;document.querySelectorAll('#panel .choice[data-id]').forEach(btn=>{const id=btn.dataset.id,b=BASIC[id];if(!b||btn.dataset.basicPatched)return;const span=btn.querySelector('span:last-child');if(span){const p=window.__V2_TEST__&&window.__V2_TEST__.getProfessions()[id];span.innerHTML=(p?p.desc+'<br>':'')+'<b>基本技能 1</b>｜'+b.entry+'<br><b>基本技能 2</b>｜'+b.move;btn.dataset.basicPatched='1'}})}
function patchVisibleLabels(){document.querySelectorAll('.animSkillTag').forEach(el=>{el.textContent=el.textContent.replace(/^👑 覺醒/,'🌅 覺醒').replace(/^🌟 躍升/,'⏫ 躍升').replace(/^🎯 狙擊/,'🔭 狙擊').replace(/^🗡️ 橫掃/,'🪃 橫掃').replace(/^💢 衝擊/,'💫 衝擊').replace(/^✨ 懲戒/,'⚖️ 懲戒').replace(/^🔁 連奏/,'🎼 連奏').replace(/^🧱 人海/,'👥 人海').replace(/^🔴 殺意/,'😈 殺意')})}
function patchAll(){patchSkillIcons();patchVisibleLabels();patchProfessionChoices()}
patchAll();
new MutationObserver(patchAll).observe(document.body,{childList:true,subtree:true});
window.__V04_VISUAL__={icons:ICONS,basic:BASIC};
})();