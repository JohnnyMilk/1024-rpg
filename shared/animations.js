(function(root,factory){const api=factory(root.RPGShared);if(typeof module==='object'&&module.exports)module.exports=api;root.RPGAnimations=api})(typeof globalThis!=='undefined'?globalThis:this,function(shared){'use strict';
const FALLBACK={EFFECT:750,SLASH:360};
const TIMING=(shared&&shared.TIMING)||FALLBACK;
const BUILTIN_TYPES=Object.freeze(['damage','heal','buff','slash','burst','arrow','magic-wave','board-wave','skill-tag','pulse']);
function createAnimator(opts={}){const effects=opts.effects,step=opts.step;if(!effects)throw new Error('RPGAnimations requires an effects element');if(typeof step!=='function')throw new Error('RPGAnimations requires a step() function');const registry=new Map();
function place(el,target){if(!target)return;const s=step();el.style.transform='translate('+(target.c*s)+'px,'+(target.r*s)+'px)'}
function mount(className,target,text,duration=TIMING.EFFECT){const el=document.createElement('div');el.className=className;if(text!==undefined&&text!==null)el.textContent=String(text);place(el,target);effects.appendChild(el);setTimeout(()=>el.remove(),duration);return el}
function register(name,handler){if(typeof handler!=='function')throw new Error('Animation handler must be a function');registry.set(name,handler);return api}
function play(name,payload={}){const handler=registry.get(name);if(!handler)throw new Error('Unknown animation: '+name);return handler(payload)}
const api={play,register,types:()=>Array.from(registry.keys())};
register('damage',p=>mount('animTileText animDamage',p.target,'-'+p.value+' HP',p.duration||TIMING.EFFECT));
register('heal',p=>mount('animTileText animHeal',p.target,'+'+p.value+' HP',p.duration||TIMING.EFFECT));
register('buff',p=>mount('animTileText animBuff',p.target,p.text,p.duration||TIMING.EFFECT));
register('slash',p=>mount('animSlash',p.target,null,p.duration||Math.max(400,TIMING.SLASH)));
register('burst',p=>mount('animBurst',p.target,p.icon||'✨',p.duration||TIMING.EFFECT));
register('arrow',p=>{if(!p.source||!p.target)return null;const s=step(),cell=s-8,x1=p.source.c*s+cell/2,y1=p.source.r*s+cell/2,x2=p.target.c*s+cell/2,y2=p.target.r*s+cell/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI,el=document.createElement('div');el.className='animArrow';el.style.left=x1+'px';el.style.top=y1+'px';el.style.width=len+'px';el.style.transform='rotate('+ang+'deg)';effects.appendChild(el);setTimeout(()=>el.remove(),p.duration||440);return el});
register('magic-wave',p=>mount('animMagicWave',null,null,p.duration||650));
register('board-wave',p=>mount('animBoardWave',null,null,p.duration||TIMING.EFFECT));
register('skill-tag',p=>mount('animSkillTag',null,p.text||'',p.duration||TIMING.EFFECT));
register('pulse',p=>{const el=p.element;if(!el)return null;el.classList.remove('animPulse');void el.offsetWidth;el.classList.add('animPulse');return el});
return api}
return{BUILTIN_TYPES,createAnimator};
});