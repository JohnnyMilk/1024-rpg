(function(){'use strict';
if(!window.RPGAnimations)return;
const base=RPGAnimations.createAnimator;
RPGAnimations.createAnimator=function(opts){const a=base(opts),effects=opts.effects,step=opts.step,raw=a.play.bind(a);
function anchor(target,cls){if(!target)return null;const s=step(),el=document.createElement('div');el.className='v04fx '+cls;el.style.transform='translate('+(target.c*s)+'px,'+(target.r*s)+'px)';effects.appendChild(el);setTimeout(()=>el.remove(),620);return el}
function trail(source,target,cls){if(!source||!target)return null;const s=step(),cell=s-8,x1=source.c*s+cell/2,y1=source.r*s+cell/2,x2=target.c*s+cell/2,y2=target.r*s+cell/2,dx=x2-x1,dy=y2-y1,el=document.createElement('div');el.className='v04trail '+cls;el.style.left=x1+'px';el.style.top=y1+'px';el.style.width=Math.hypot(dx,dy)+'px';el.style.transform='rotate('+Math.atan2(dy,dx)+'rad)';effects.appendChild(el);setTimeout(()=>el.remove(),520);return el}
a.register('melee-swipe',p=>{if(p.source&&p.target)trail(p.source,p.target,'v04MeleeTrail');return anchor(p.target,'v04MeleeImpact')});
a.register('holy-wave',p=>anchor(p.source||p.target,'v04HolyWave'));
a.register('shock-wave',p=>anchor(p.source||p.target,'v04ShockWave'));
a.register('link-line',p=>trail(p.source,p.target,'v04LinkLine'));
a.register('ascend-flash',p=>anchor(p.target,'v04AscendFlash'));
a.register('rebirth',p=>anchor(p.target,'v04Rebirth'));
a.play=function(name,p={}){if(name==='burst'&&['⚔️','💢'].includes(p.icon)){anchor(p.target,'v04MeleeImpact')}else if(name==='burst'&&p.icon==='🔨'){anchor(p.target,'v04ShockWave')}else if(name==='heal'){anchor(p.target,'v04HolyPulse')}else if(name==='buff'&&(p.text==='🛡️'||p.text==='BLOCK')){anchor(p.target,'v04Shield')}else if(name==='arrow'){trail(p.source,p.target,'v04ArrowTrail')}return raw(name,p)};
return a};
})();