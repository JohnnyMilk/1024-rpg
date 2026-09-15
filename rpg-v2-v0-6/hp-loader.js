(function(){'use strict';
const bootError=document.getElementById('bootError');
function fail(msg){if(bootError){bootError.style.display='block';bootError.textContent='v0.6 HP 模組載入失敗：'+msg}console.error(msg)}
fetch('game.js?v=20260915b').then(r=>{if(!r.ok)throw new Error('game.js '+r.status);return r.text()}).then(src=>{
const patches=[
["hv=e=>(e.tier||2)/2,max=e=>e.type==='hero'?e.tier:e.maxHits,rem=e=>Math.max(0,max(e)-(e.hits||0))","hv=e=>(e.tier||2)/2,heroMax=tier=>1+Math.log2(Math.max(2,tier||2)),max=e=>e.type==='hero'?heroMax(e.tier):e.maxHits,rem=e=>Math.max(0,max(e)-(e.hits||0))"],
["healthBar(rem(e),e.tier,'hero')","healthBar(rem(e),max(e),'hero')"],
["let r=Math.min(nt,rem(o)+rem(h));ms.push(rec(h,sr,sc,o.r,o.c));o.tier=nt;o.hits=Math.max(0,nt-r);","let r=Math.min(heroMax(nt),rem(o)+rem(h));ms.push(rec(h,sr,sc,o.r,o.c));o.tier=nt;o.hits=Math.max(0,heroMax(nt)-r);"],
["tier:16,r:c.r,c:c.c,hits:13,special:false","tier:16,r:c.r,c:c.c,hits:2,special:false"],
["window.__V2_TEST__={hv,max,rem,plan","window.__V2_TEST__={hv,heroMax,max,rem,plan"]
];
for(const [from,to] of patches){if(!src.includes(from))throw new Error('找不到預期的 HP 程式片段');src=src.replace(from,to)}
(0,eval)(src+'\n//# sourceURL=rpg-v2-v0-6/game-hp-runtime.js');
}).catch(e=>fail(e.message));
})();