(function(){'use strict';
const KEY='1024RPG.save',CURRENT=1;
function blank(){let now=new Date().toISOString();return{saveVersion:CURRENT,gameVersion:'V1.0',createdAt:now,updatedAt:now,skills:{},stats:{gamesPlayed:0,totalMoves:0,totalMerges:0,totalEnemiesKilled:0,totalBossKills:0,totalHeroesLost:0,bestHero:0,bestScore:0}}}
function migrate(s){if(!s||typeof s!=='object')return blank();if(!s.saveVersion)s.saveVersion=1;s.skills=s.skills||{};s.stats=Object.assign(blank().stats,s.stats||{});if((s.stats.gamesPlayed||0)===0&&(s.stats.totalMoves||0)===0&&(s.stats.totalMerges||0)===0&&(s.stats.bestScore||0)===0&&s.stats.bestHero===1)s.stats.bestHero=0;s.gameVersion='V1.0';return s}
function load(){try{let raw=localStorage.getItem(KEY);return raw?migrate(JSON.parse(raw)):blank()}catch(e){return blank()}}
function save(s){s.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(s));return s}
function emit(type,detail={}){window.dispatchEvent(new CustomEvent('rpg-save-updated',{detail:{type,...detail}}))}
function uses(id){let s=load();return Math.max(0,Number(s.skills[id]?.uses||0))}
function rankFromUses(n){n=Math.max(0,Number(n)||0);return n>=90?'MAX':n>=60?'LV3':n>=30?'LV2':'LV1'}
function progress(n){n=Math.max(0,Number(n)||0);if(n>=90)return{rank:'MAX',current:30,target:30,next:null,total:n};let base=n>=60?60:n>=30?30:0;return{rank:rankFromUses(n),current:n-base,target:30,next:base+30,total:n}}
function recordSkillUse(id,count=1){if(!id||count<=0)return;let s=load(),rec=s.skills[id]||(s.skills[id]={uses:0});rec.uses=Math.max(0,Number(rec.uses||0))+count;save(s);emit('skill',{id,uses:rec.uses})}
function recordBestHero(value){value=Math.max(0,Number(value)||0);if(!value)return;let s=load();if(value>(s.stats.bestHero||0)){s.stats.bestHero=value;save(s);emit('bestHero',{value})}}
function addStat(key,count=1){count=Math.max(0,Number(count)||0);if(!count)return;let s=load();if(!(key in s.stats))return;s.stats[key]=Math.max(0,Number(s.stats[key]||0))+count;save(s);emit('stat',{key,value:s.stats[key]})}
function recordBestScore(value){value=Math.max(0,Number(value)||0);let s=load();if(value>(s.stats.bestScore||0)){s.stats.bestScore=value;save(s);emit('bestScore',{value})}}
function recordRun(r){let s=load(),st=s.stats;st.gamesPlayed++;st.totalMoves+=r.moves||0;st.totalMerges+=r.merges||0;st.totalEnemiesKilled+=r.enemyDefeated||0;st.totalBossKills+=r.bossKills||0;st.totalHeroesLost+=r.heroesLost||0;st.bestHero=Math.max(st.bestHero||0,r.bestHero||0);st.bestScore=Math.max(st.bestScore||0,r.score||0);save(s);emit('run')}
function clear(){let fresh=blank();save(fresh);emit('clear');return fresh}
window.RPGSave={KEY,CURRENT,load,save,uses,rankFromUses,progress,recordSkillUse,recordBestHero,addStat,recordBestScore,recordRun,clear};
})();