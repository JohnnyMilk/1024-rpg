const assert=require('assert');const fs=require('fs');const path=require('path');const R=require('../shared/core.js');let passed=0;function test(name,fn){try{fn();passed++;console.log('PASS',name)}catch(e){console.error('FAIL',name);throw e}}
function read(p){return fs.readFileSync(path.join(__dirname,'..',p),'utf8')}
test('timing contract',()=>assert.deepStrictEqual(R.TIMING,{MOVE:250,MERGE:250,EFFECT:750,DEATH:250,SPAWN:450,SLASH:360}));
test('clamp lower bound',()=>assert.strictEqual(R.clamp(-2,0,10),0));
test('clamp upper bound',()=>assert.strictEqual(R.clamp(12,0,10),10));
test('randomItem deterministic first item',()=>assert.strictEqual(R.randomItem(['a','b'],()=>0),'a'));
test('arraysEqual true',()=>assert.strictEqual(R.arraysEqual([1,2],[1,2]),true));
test('arraysEqual false',()=>assert.strictEqual(R.arraysEqual([1,2],[2,1]),false));
test('emptyCells returns 14 cells for two occupied',()=>assert.strictEqual(R.emptyCells([{r:0,c:0},{r:3,c:3}],4).length,14));
test('emptyCells excludes occupied positions',()=>assert.strictEqual(R.emptyCells([{r:0,c:0}],4).some(x=>x[0]===0&&x[1]===0),false));
test('hpPercent normal ratio',()=>assert.strictEqual(R.hpPercent(3,8),37.5));
test('hpPercent clamps over-heal',()=>assert.strictEqual(R.hpPercent(20,8),100));
test('healthBar hero markup',()=>{const s=R.healthBar(3,8,'hero');assert(s.includes('heroHp'));assert(s.includes('3 / 8 HP'));assert(s.includes('37.5%'))});
test('healthBar boss markup and meta',()=>{const s=R.healthBar(7,10,'boss','ATK 2');assert(s.includes('bossHp'));assert(s.includes('ATK 2'));assert(s.includes('70%'))});
test('run history renderer preserves score and rows',()=>{const s=R.renderRunHistory({title:'結束',score:1234,scoreRows:[{label:'移動',value:'+5'}],historyRows:[{label:'回合',value:9}],backHtml:'<a>返回</a>'});assert(s.includes('1,234'));assert(s.includes('移動'));assert(s.includes('回合'));assert(s.includes('again'))});
test('classic page imports shared core and external game',()=>{const s=read('classic/index.html');assert(s.includes('../shared/core.js'));assert(s.includes('game.js'));assert(!s.includes('<script>(function'))});
test('version1 page imports shared core and external game',()=>{const s=read('rpg-v1-0/index.html');assert(s.includes('../shared/core.js'));assert(s.includes('style.css'));assert(s.includes('game.js'));assert(!s.includes('<style>'))});
test('version2 page imports shared core and external game',()=>{const s=read('rpg-v2-v0-2/index.html');assert(s.includes('../shared/core.js'));assert(s.includes('style.css'));assert(s.includes('game.js'));assert(!s.includes('<style>'))});
test('classic reuses shared input and equality helpers',()=>{const s=read('classic/game.js');assert(s.includes('bindDirectionalInput'));assert(s.includes('arraysEqual'));assert(s.includes('randomItem'))});
test('version1 reuses shared HP/history/input/empty-cell helpers',()=>{const s=read('rpg-v1-0/game.js');['healthBar','renderRunHistory','bindDirectionalInput','emptyCells'].forEach(x=>assert(s.includes(x)))});
test('version2 reuses shared HP/history/input/empty-cell helpers',()=>{const s=read('rpg-v2-v0-2/game.js');['healthBar','renderRunHistory','bindDirectionalInput','emptyCells'].forEach(x=>assert(s.includes(x)))});
test('version2 keeps death-wave boundary before triggers',()=>{const s=read('rpg-v2-v0-2/game.js'),i=s.indexOf('async function processDeathWave'),j=s.indexOf('await wait(DM)',i),k=s.indexOf('deathTriggerEvents(wave)',i);assert(i>=0&&j>i&&k>j)});
test('version1 keeps final rules and fixed 1/3/5 skills',()=>{const s=read('rpg-v1-0/game.js');assert(s.includes("mergeCount%3===0"));assert(s.includes("mergeCount%5===0"));assert(s.includes("events=[],f=['戰士']"))});
test('version2 keeps 27-skill pool',()=>{const s=read('rpg-v2-v0-2/game.js');const names=['swift','wind','momentum','resonance','fusionHeal','overload','thorns','adversity','rage','deathBlast','legacy','blood','harvest','chainKill','killingIntent','prepare','firstStrike','fortress','reinforce','newborn','mutation','lone','crowd','crisis','breaker','bossHunter','risk'];names.forEach(x=>assert(s.includes("['"+x+"'"))});
console.log(`\n${passed} regression assertions passed.`);