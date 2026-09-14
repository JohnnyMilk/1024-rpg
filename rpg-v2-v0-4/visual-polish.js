(function(){'use strict';
const ICONS={crowd:'👥',killingIntent:'😈',warSweep:'🪃',warImpact:'💫',rangerSnipe:'🔭',priestPunish:'⚖️',ascend:'⏫',encore:'🎼',awakening:'🌅'};
function patchSkillIcons(){const api=window.__V2_TEST__;if(!api)return;for(const s of api.getSkills())if(ICONS[s.id])s.icon=ICONS[s.id];const pools=api.getClassSkills();for(const s of [...Object.values(pools.CLASS_SKILLS).flat(),...pools.COMMON_SKILLS])if(ICONS[s.id])s.icon=ICONS[s.id];const prof=api.getProfessions();if(prof){prof.warrior.icon='⚔️';prof.ranger.icon='🏹';prof.priest.icon='✝️'}
}
function patchVisibleLabels(){document.querySelectorAll('.animSkillTag').forEach(el=>{el.textContent=el.textContent.replace(/^👑 覺醒/,'🌅 覺醒').replace(/^🌟 躍升/,'⏫ 躍升').replace(/^🎯 狙擊/,'🔭 狙擊').replace(/^🗡️ 橫掃/,'🪃 橫掃').replace(/^💢 衝擊/,'💫 衝擊').replace(/^✨ 懲戒/,'⚖️ 懲戒').replace(/^🔁 連奏/,'🎼 連奏').replace(/^🧱 人海/,'👥 人海').replace(/^🔴 殺意/,'😈 殺意')})}
patchSkillIcons();patchVisibleLabels();
new MutationObserver(patchVisibleLabels).observe(document.body,{childList:true,subtree:true});
window.__V04_VISUAL__={icons:ICONS};
})();