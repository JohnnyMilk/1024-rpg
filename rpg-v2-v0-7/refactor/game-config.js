(()=>{'use strict';
const BASE={mode:'normal',rows:4,cols:4,boss:null,profession:null,preloadSkills:[],preloadClassSkills:[],preloadHeroes:null,features:{boss:true,mapEvents:true,priestGuardV07:true}};
const CONFIGS={
 normal:{...BASE},
 'v0.6':{...BASE,mode:'v0.6',features:{boss:false,mapEvents:false,priestGuardV07:false}},
 'boss-test':{...BASE,mode:'boss-test',rows:6,boss:'giant-elephant-guard',profession:'ranger',preloadSkills:['swift','wind','momentum','resonance','overload','luck','deathBlast','legacy','blood','firstStrike','reinforce','mutation','risk','assault','precision','backup'],preloadClassSkills:['rangerSnipe','rangerQuickShot','rangerRain','ascend','encore','linkage','awakening','reincarnate']}
};
window.V07GameConfig={get(mode='normal',overrides={}){const key=mode==='bossTest'?'boss-test':mode;return {...(CONFIGS[key]||CONFIGS.normal),...overrides,mode:key in CONFIGS?key:'normal'}},CONFIGS};
})();