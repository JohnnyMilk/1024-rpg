(function(){'use strict';
const KEY='1024RPG.save',CURRENT=1;
function blank(){let now=new Date().toISOString();return{saveVersion:CURRENT,gameVersion:'v0.5',createdAt:now,updatedAt:now,skills:{},stats:{gamesPlayed:0,totalMoves:0,totalMerges:0,totalEnemiesKilled:0,totalBossKills:0,totalHeroesLost:0,bestHero:1,bestScore:0}}}
function migrate(s){if(!s||typeof s!=='object')return blank();if(!s.saveVersion)s.saveVersion=1;s.skills=s.skills||{};s.stats=Object.assign(blank().stats,s.stats||{});s.gameVersion='v0.5';return s}
function load(){try{let raw=localStorage.getItem(KEY);return raw?migrate(JSON.parse(raw)):blank()}catch(e){return blank()}}
function save(s){s.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(s));return s}
function uses(id){let s=load();return Math.max(0,Number(s.skills[id]?.uses||0))}
function rankFromUses(n){n=Math.max(0,Number(n)||0);return n>=90?'MAX':n>=60?'LV3':n>=30?'LV2':'LV1'}
function progress(n){n=Math.max(0,Number(n)||0);if(n>=90)return{rank:'MAX',current:30,target:30,next:null,total:n};let base=n>=60?60:n>=30?30:0;return{rank:rankFromUses(n),current:n-base,target:30,next:base+30,total:n}}
function recordSkillUse(id,count=1){if(!id||count<=0)return;let s=load(),rec=s.skills[id]||(s.skills[id]={uses:0});rec.uses=Math.max(0,Number(rec.uses||0))+count;save(s);window.dispatchEvent(new CustomEvent('rpg-save-updated',{detail:{type:'skill',id,uses:rec.uses}}))}
function recordRun(r){let s=load(),st=s.stats;st.gamesPlayed++;st.totalMoves+=r.moves||0;st.totalMerges+=r.merges||0;st.totalEnemiesKilled+=r.enemyDefeated||0;st.totalBossKills+=r.bossKills||0;st.totalHeroesLost+=r.heroesLost||0;st.bestHero=Math.max(st.bestHero||1,r.bestHero||1);st.bestScore=Math.max(st.bestScore||0,r.score||0);save(s);window.dispatchEvent(new CustomEvent('rpg-save-updated',{detail:{type:'run'}}))}
function clear(){let fresh=blank();save(fresh);window.dispatchEvent(new CustomEvent('rpg-save-updated',{detail:{type:'clear'}}));return fresh}
window.RPGSave={KEY,CURRENT,load,save,uses,rankFromUses,progress,recordSkillUse,recordRun,clear};
})();