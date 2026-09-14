const assert=require('assert'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const game=read('rpg-v2-v0-4/game.js'),polish=read('rpg-v2-v0-4/visual-polish.js'),anim=read('rpg-v2-v0-4/visual-animations.js'),html=read('rpg-v2-v0-4/index.html');
const replacements={warSweep:'🌀',rangerSnipe:'🔭',priestPunish:'☀️',ascend:'⏫',awakening:'🔱'};
const ids=['swift','wind','momentum','resonance','fusionHeal','overload','survive','luck','deathBlast','legacy','blood','harvest','chainKill','killingIntent','firstStrike','fortress','reinforce','mutation','lone','crowd','crisis','breaker','bossHunter','risk','assault','precision','backup','warSweep','warImpact','warSmash','rangerSnipe','rangerPierce','rangerRain','priestHolyHeal','priestRevive','priestPunish','ascend','encore','linkage','awakening','reincarnate'];
const icons=[];for(const id of ids){const re=new RegExp("(?:\\['"+id+"'|'"+id+"'|id:'"+id+"')[^\\n]{0,80}?icon:'([^']+)'|\\['"+id+"','([^']+)'"),m=game.match(re);let icon=replacements[id]||(m&&(m[1]||m[2]));assert(icon,'missing icon '+id);icons.push([id,icon])}
const seen=new Map();for(const [id,icon] of icons){assert(!seen.has(icon),'duplicate skill icon '+icon+': '+seen.get(icon)+' / '+id);seen.set(icon,id)}
for(const [id,icon] of Object.entries(replacements))assert(polish.includes(id+":'"+icon+"'"));
['melee-swipe','holy-wave','shock-wave','link-line','ascend-flash','rebirth'].forEach(x=>assert(anim.includes("register('"+x+"'")));
assert(html.includes('visual-animations.js')&&html.includes('visual-polish.js')&&html.includes('visual-polish.css'));
console.log('PASS v0.4 visual polish: '+icons.length+' unique skill icons and animation primitives present');