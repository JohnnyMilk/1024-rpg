(function(){'use strict';
/* B33 formal Boss integration helper.
 * This file is intentionally a source-layer helper: v07-bootstrap.js calls
 * window.V07B33.patch(src, replaceBlock) while `src` is the final game source.
 * No DOM lifecycle simulation and no nested HTML injection are used here.
 */
function patch(src,replaceBlock){
  const must=(from,to,label)=>{if(!src.includes(from))throw new Error('B33 '+label+' anchor missing');src=src.replace(from,to)};

  // One formal engine instance, bound to the final runtime's E/ROWS/HP state.
  const anchor="const anim=RPGAnimations.createAnimator({effects,step});";
  const integration=`const anim=RPGAnimations.createAnimator({effects,step});
let v07BossEngine=null,v07BossUnitId=null,bossWarningRow=-1;
const v07BossAnim=window.V07BossAnimations?V07BossAnimations.create({pieces,effects,step}):null;
function v07BossUnit(){return E.find(e=>e.id===v07BossUnitId&&e.type==='boss'&&rem(e)>0)||null}
function v07At(r,c,skip=null){return E.find(u=>u.id!==skip&&rem(u)>0&&u.r===r&&u.c===c)}
function v07BossNear(a,b){return Math.abs(a.r-b.r)<=1&&Math.abs(a.c-b.c)<=1&&(a.r!==b.r||a.c!==b.c)}
function v07FindChargeTarget(){let boss=v07BossUnit();if(!boss)return null;let out=[];for(let h of livingHeroes().filter(h=>h.r===boss.r||h.c===boss.c)){let dr=Math.sign(h.r-boss.r),dc=Math.sign(h.c-boss.c),dist=Math.abs(h.r-boss.r)+Math.abs(h.c-boss.c),clear=true;for(let k=1;k<dist;k++)if(v07At(boss.r+dr*k,boss.c+dc*k,boss.id)){clear=false;break}if(clear)out.push({h,dr,dc,dist})}return out.sort((a,b)=>a.dist-b.dist||a.h.id-b.h.id)[0]||null}
async function v07BossCharge(t){let boss=v07BossUnit();if(!boss||!t)return;let from={r:boss.r,c:boss.c},steps=Math.min(2,Math.max(0,t.dist-1)),to={r:boss.r+t.dr*steps,c:boss.c+t.dc*steps},pushed=[];boss.r=to.r;boss.c=to.c;if(rem(t.h)>0&&Math.abs(t.h.r-boss.r)+Math.abs(t.h.c-boss.c)===1){let chain=[],r=t.h.r,c=t.h.c;while(true){let u=v07At(r,c,boss.id);if(!u)break;chain.push(u);r+=t.dr;c+=t.dc}for(let i=chain.length-1;i>=0;i--){let u=chain[i],fr={r:u.r,c:u.c},nr=u.r+t.dr,nc=u.c+t.dc,to2={r:nr,c:nc};pushed.push({unit:u,from:fr,to:to2});if(nr<0||nr>=ROWS||nc<0||nc>=COLS){u.hits=max(u);u.noReviveFromCollapse=true}else{u.r=nr;u.c=nc}}let ev=[];if(rem(t.h)>0)hitHero(t.h,1,boss,ev);if(v07BossAnim)await v07BossAnim.charge(boss,from,to,t.h,pushed);if(ev.length)await settle(ev);else render()}
async function v07BossQuake(){let boss=v07BossUnit();if(!boss)return;let targets=livingHeroes().filter(h=>v07BossNear(boss,h));if(v07BossAnim)await v07BossAnim.quake(boss,targets);let ev=[];for(let h of targets)hitHero(h,1,boss,ev);if(ev.length)await settle(ev);else render()}
async function v07BossStomp(){let boss=v07BossUnit();if(!boss)return;let hs=livingHeroes().slice().sort((a,b)=>(Math.abs(a.r-boss.r)+Math.abs(a.c-boss.c))-(Math.abs(b.r-boss.r)+Math.abs(b.c-boss.c))||a.id-b.id);let h=hs[0];if(!h)return;let dr=Math.sign(h.r-boss.r),dc=Math.sign(h.c-boss.c);if(Math.abs(h.r-boss.r)>=Math.abs(h.c-boss.c))dc=0;else dr=0;let nr=boss.r+dr,nc=boss.c+dc,o=(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS)?v07At(nr,nc,boss.id):null;if(o&&o.type==='hero'){if(v07BossAnim)await v07BossAnim.stomp(boss,o);let ev=[];hitHero(o,2,boss,ev);if(ev.length)await settle(ev)}else if(!o&&nr>=0&&nr<ROWS&&nc>=0&&nc<COLS){let from={r:boss.r,c:boss.c},to={r:nr,c:nc};boss.r=nr;boss.c=nc;if(v07BossAnim)await v07BossAnim.moveUnit(boss,from,to,430);render()}}
async function v07BossNotice(text,ms=3000){let tag=anim.play('skill-tag',{text,duration:ms});if(tag)tag.style.animationDuration=ms+'ms';await wait(ms)}
async function v07CollapseBottomRow(){let row=ROWS-1,cells=[...grid.children].filter(x=>+x.dataset.r===row),doomed=E.filter(x=>x.r===row&&rem(x)>0),s=step();anim.play('skill-tag',{text:'⬇️ COLLAPSE · 警告格正在墜落'});for(let i=0;i<cells.length;i++){let x=cells[i];x.classList.remove('v07-warning');if(x.animate)x.animate([{opacity:1,transform:'none'},{opacity:.85,transform:'perspective(500px) rotateX(20deg) scale(.92)',offset:.35},{opacity:0,transform:'perspective(500px) translateY(90px) rotateX(72deg) rotateZ(18deg) scale(.18)'}],{duration:760,easing:'ease-in',fill:'forwards'});let u=doomed.find(e=>e.c===i);if(u){let pe=pieces.querySelector('[data-id='+u.id+']');if(pe&&pe.animate)pe.animate([{opacity:1,transform:pe.style.transform},{opacity:0,transform:'translate('+(u.c*s)+'px,'+((u.r+1.2)*s)+'px) rotate(18deg) scale(.2)'}],{duration:760,easing:'ease-in',fill:'forwards'})}await wait(120)}await wait(820);for(let e of doomed){e.hits=max(e);e.noReviveFromCollapse=true}if(doomed.length)await settle([]);E=E.filter(x=>x.r!==row);ROWS--;bossWarningRow=-1;rebuildGrid();render()}
function v07CreateBossEngine(boss){v07BossUnitId=boss.id;v07BossEngine=new GiantElephantGuard({bossAlive:()=>!!v07BossUnit(),findChargeTarget:v07FindChargeTarget,hasAdjacentHero:()=>{let b=v07BossUnit();return !!b&&livingHeroes().some(h=>v07BossNear(b,h))},charge:v07BossCharge,quake:v07BossQuake,stomp:v07BossStomp,notice:v07BossNotice,getRows:()=>ROWS,setWarningRow:r=>{bossWarningRow=r;rebuildGrid()},render,collapseBottomRow:v07CollapseBottomRow});v07BossEngine.name='巨像守衛';v07BossEngine.activate()}`;
  must(anchor,integration,'engine scope');

  // Grid warning is visual only; lifecycle lives in GiantElephantGuard.state.
  must("d.className='cell'+(r===bossWarningRow?' v07-warning':'');","d.className='cell'+(r===bossWarningRow?' v07-warning':'');",'warning grid');

  // Formal spawn: activate the same engine instance that owns skills/CD/defeat/collapse.
  const spawn="if(b){bactive=true;render();spawnFx(b);";
  must(spawn,"if(b){bactive=true;v07CreateBossEngine(b);render();spawnFx(b);",'Boss spawn');

  // Formal Boss queue: ordinary enemies stay on enemyAct; Boss uses takeTurn.
  const bossAct="let e=E.find(x=>x.id===eid);if(e&&rem(e)>0)await enemyAct(e);if(!livingHeroes().length)return}}";
  must(bossAct,"let e=E.find(x=>x.id===eid);if(e&&rem(e)>0){if(v07BossEngine&&v07BossUnitId===e.id)await v07BossEngine.takeTurn();else await enemyAct(e)}if(!livingHeroes().length)return}}",'Boss enemy phase');

  // Collapse is a real Enemy Phase owned by the engine.
  const phaseStart="async function enemyPhase(){let phase=await spawnEnemyPhase()";
  must(phaseStart,"async function enemyPhase(){if(v07BossEngine&&v07BossEngine.state==='PLAYER_WARNING'){await v07BossEngine.enemyPhase();return}let phase=await spawnEnemyPhase()",'collapse enemy phase');

  // Reward remains native. beginDefeat runs only after chooseClassSkill has closed.
  const reward="for(let i=0;i<bossKills;i++)if(profession)await chooseClassSkill();maybeAwaken();return true";
  must(reward,"for(let i=0;i<bossKills;i++)if(profession)await chooseClassSkill();if(bossKills&&v07BossEngine)await v07BossEngine.beginDefeat();maybeAwaken();return true",'Boss reward/defeat');

  // One normal usable player move while WARNING, then mark PLAYER_WARNING before Enemy Phase.
  const turnPhase="turn++;render();await enemyPhase();";
  must(turnPhase,"turn++;render();if(v07BossEngine&&v07BossEngine.state==='WARNING')await v07BossEngine.afterPlayerPhase();await enemyPhase();",'warning player phase');

  // Reset all Boss state without touching normal game systems.
  const reset="function reset(){ROWS=4;bossCollapseStage=0;bossWarningRow=-1;bossCollapseFresh=false;rebuildGrid();E=[];turn=0;";
  if(src.includes(reset))src=src.replace(reset,"function reset(){if(v07BossEngine)v07BossEngine.reset();v07BossEngine=null;v07BossUnitId=null;ROWS=4;bossCollapseStage=0;bossWarningRow=-1;bossCollapseFresh=false;rebuildGrid();E=[];turn=0;");

  return src;
}
window.V07B33={patch};
})();