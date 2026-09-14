(function(){'use strict';
const $=id=>document.getElementById(id),menu=$('titleScreen'),history=$('historyScreen'),game=$('gameScreen'),confirm=$('clearConfirm');
function show(el){[menu,history,game].forEach(x=>x.classList.remove('active'));el.classList.add('active');window.scrollTo(0,0)}
function catalog(){let t=window.__V2_TEST__;if(!t)return[];let general=t.getSkills(),cs=t.getClassSkills(),groups=[];groups.push({name:'戰士',items:cs.CLASS_SKILLS.warrior});groups.push({name:'遊俠',items:cs.CLASS_SKILLS.ranger});groups.push({name:'祭司',items:cs.CLASS_SKILLS.priest});groups.push({name:'特殊共用',items:cs.COMMON_SKILLS});groups.push({name:'一般技能',items:general});return groups}
function levelText(id){return RPGSave.rankFromUses(RPGSave.uses(id))}
function renderHistory(){let s=RPGSave.load(),st=s.stats;$('historyStats').innerHTML=[['遊戲場次',st.gamesPlayed],['總移動',st.totalMoves],['總合併',st.totalMerges],['擊殺敵人',st.totalEnemiesKilled],['擊敗 Boss',st.totalBossKills],['英雄死亡',st.totalHeroesLost],['最高英雄',st.bestHero],['最高分數',st.bestScore]].map(x=>'<div><span>'+x[0]+'</span><b>'+x[1]+'</b></div>').join('');$('historySkills').innerHTML=catalog().map(g=>'<section class="historyGroup"><h3>'+g.name+'</h3><div class="historyGrid">'+g.items.map(sk=>{let u=RPGSave.uses(sk.id),p=RPGSave.progress(u),pct=p.rank==='MAX'?100:Math.round(p.current/30*100);return '<article class="historySkill"><div class="hsTop"><span class="hsIcon">'+sk.icon+'</span><div><b>'+sk.name+'</b><em>'+p.rank+'</em></div></div><div class="meter"><i style="width:'+pct+'%"></i></div><div class="hsMeta"><span>'+(p.rank==='MAX'?'MAX':'本級 '+p.current+' / 30')+'</span><span>使用 '+u+' 次</span></div></article>'}).join('')+'</div></section>').join('')}
$('startGame').onclick=()=>show(game);
$('openHistory').onclick=()=>{renderHistory();show(history)};
$('historyBack').onclick=()=>show(menu);
$('menuBtn').onclick=()=>show(menu);
$('clearData').onclick=()=>{confirm.classList.add('show');confirm.dataset.step='1';$('clearText').textContent='將刪除所有遊戲歷程、技能等級與統計資料。';$('clearYes').textContent='繼續'};
$('clearNo').onclick=()=>confirm.classList.remove('show');
$('clearYes').onclick=()=>{if(confirm.dataset.step==='1'){confirm.dataset.step='2';$('clearText').textContent='永久刪除後無法復原。確定清除所有記錄？';$('clearYes').textContent='永久刪除'}else{RPGSave.clear();confirm.classList.remove('show');renderHistory()}};
window.RPGMenu={showMenu:()=>show(menu),showHistory:()=>{renderHistory();show(history)},levelText};
show(menu);
})();