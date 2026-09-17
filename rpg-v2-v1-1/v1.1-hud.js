(()=>{
  const playerTab=document.getElementById('playerHudTab');
  const bossTab=document.getElementById('bossHudTab');
  const playerHud=document.getElementById('playerSkillHud');
  const bossHud=document.getElementById('bossSkillHud');
  if(!playerTab||!bossTab||!playerHud||!bossHud)return;
  let selected='player';
  let bossWasActive=false;
  function bossActive(){return document.getElementById('board')?.classList.contains('v07-expanded')||bossHud.hidden===false}
  function show(which){selected=which;const active=bossActive();bossTab.hidden=!active;playerTab.classList.toggle('active',which==='player');bossTab.classList.toggle('active',which==='boss');playerHud.hidden=which!=='player';bossHud.hidden=!active||which!=='boss'}
  playerTab.addEventListener('click',()=>show('player'));
  bossTab.addEventListener('click',()=>show('boss'));
  const observer=new MutationObserver(()=>{
    const active=bossActive();
    if(active&&!bossWasActive){bossWasActive=true;show('boss');return}
    if(!active&&bossWasActive){bossWasActive=false;show('player');return}
    bossTab.hidden=!active;
    if(active&&selected==='boss')bossHud.hidden=false;
  });
  observer.observe(document.getElementById('board'),{attributes:true,attributeFilter:['class']});
  observer.observe(bossHud,{attributes:true,attributeFilter:['hidden']});
  show('player');
})();
