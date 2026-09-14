(function(){'use strict';
const $=id=>document.getElementById(id),menu=$('titleScreen'),history=$('historyScreen'),game=$('gameScreen'),confirm=$('clearConfirm');
let historyTab='overview';
function show(el){[menu,history,game].forEach(x=>x.classList.remove('active'));el.classList.add('active');window.scrollTo(0,0)}
function refreshGameLayout(){requestAnimationFrame(()=>requestAnimationFrame(()=>window.dispatchEvent(new Event('resize'))))}
function catalog(){let t=window.__V2_TEST__;if(!t)return[];let general=t.getSkills(),cs=t.getClassSkills();return[{id:'warrior',name:'戰士',items:cs.CLASS_SKILLS.warrior},{id:'ranger',name:'遊俠',items:cs.CLASS_SKILLS.ranger},{id:'priest',name:'祭司',items:cs.CLASS_SKILLS.priest},{id:'common',name:'特殊共用',items:cs.COMMON_SKILLS},{id:'general',name:'一般技能',items:general}]}
function levelText(id){return RPGSave.rankFromUses(RPGSave.uses(id))}
function skillCard(sk){let u=RPGSave.uses(sk.id),p=RPGSave.progress(u),pct=p.rank==='MAX'?100:Math.round(p.current/p.target*100);return '<article class="historySkill"><div class="hsTop"><span class="hsIcon">'+sk.icon+'</span><div><b>'+sk.name+'</b><em>'+p.rank+'</em></div></div><p class="hsDesc">'+sk.desc+'</p><div class="meter"><i style="width:'+pct+'%"></i></div><div class="hsMeta"><span>'+(p.rank==='MAX'?'最高等級 MAX':'本級進度 '+p.current+' / '+p.target)+'</span><span>累積使用 '+p.total+' 次</span></div></article>'}
function statsHtml(st){return [['遊戲場次',st.gamesPlayed],['總移動',st.totalMoves],['總合併',st.totalMerges],['擊殺敵人',st.totalEnemiesKilled],['擊敗 Boss',st.totalBossKills],['英雄死亡',st.totalHeroesLost],['最高英雄',st.bestHero||0],['最高分數',st.bestScore]].map(x=>'<div><span>'+x[0]+'</span><b>'+x[1]+'</b></div>').join('')}
function renderTabs(groups){let tabs=[{id:'overview',name:'總覽'},...groups.map(g=>({id:g.id,name:g.name}))];return '<nav class="historyTabs" aria-label="遊戲歷程分類">'+tabs.map(t=>'<button class="historyTab'+(historyTab===t.id?' active':'')+'" data-tab="'+t.id+'">'+t.name+'</button>').join('')+'</nav>'}
function renderHistory(){let s=RPGSave.load(),st=s.stats,groups=catalog();$('historyStats').innerHTML=statsHtml(st);$('historyStats').classList.toggle('compactHidden',historyTab!=='overview');let body='';if(historyTab==='overview'){let totalUses=groups.flatMap(g=>g.items).reduce((sum,sk)=>sum+RPGSave.uses(sk.id),0),maxed=groups.flatMap(g=>g.items).filter(sk=>RPGSave.progress(RPGSave.uses(sk.id)).rank==='MAX').length;body='<section class="historyOverview"><div class="overviewCard"><span>技能累積使用</span><b>'+totalUses+'</b><small>所有可升級技能的有效觸發總次數</small></div><div class="overviewCard"><span>MAX 技能</span><b>'+maxed+'</b><small>累積使用達 90 次的技能數量</small></div></section><div class="historyHint">等級規則：0–29 次為 LV1、30–59 次為 LV2、60–89 次為 LV3、90 次以上為 MAX。選擇上方分類查看技能說明與真實累積使用次數。</div>'}else{let g=groups.find(x=>x.id===historyTab);body=g?'<section class="historyGroup paged"><div class="historyGroupTitle"><h3>'+g.name+'</h3><span>'+g.items.length+' 個技能</span></div><div class="historyGrid">'+g.items.map(skillCard).join('')+'</div></section>':''}$('historySkills').innerHTML=renderTabs(groups)+body;$('historySkills').querySelectorAll('.historyTab').forEach(b=>b.onclick=()=>{historyTab=b.dataset.tab;renderHistory();window.scrollTo({top:0,behavior:'smooth'})})}
$('startGame').onclick=()=>{show(game);refreshGameLayout()};
$('openHistory').onclick=()=>{historyTab='overview';renderHistory();show(history)};
$('historyBack').onclick=()=>show(menu);
$('menuBtn').onclick=()=>show(menu);
$('restart').onclick=()=>show(menu);
$('clearData').onclick=()=>{confirm.classList.add('show');confirm.dataset.step='1';$('clearText').textContent='將刪除所有遊戲歷程、技能等級與統計資料。';$('clearYes').textContent='繼續'};
$('clearNo').onclick=()=>confirm.classList.remove('show');
$('clearYes').onclick=()=>{if(confirm.dataset.step==='1'){confirm.dataset.step='2';$('clearText').textContent='永久刪除後無法復原。確定清除所有記錄？';$('clearYes').textContent='永久刪除'}else{RPGSave.clear();confirm.classList.remove('show');historyTab='overview';renderHistory()}};
window.RPGMenu={showMenu:()=>show(menu),showHistory:()=>{historyTab='overview';renderHistory();show(history)},levelText};
show(menu);
})();