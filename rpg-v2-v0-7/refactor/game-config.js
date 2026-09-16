(()=>{'use strict';
const BASE={mode:'normal',rows:4,cols:4,boss:null,profession:null,preloadSkills:[],preloadClassSkills:[],preloadHeroes:null};
const CONFIGS={
 normal:{...BASE},
 bossTest:{...BASE,mode:'boss-test',rows:6,boss:'giant-elephant-guard',profession:'ranger',preloadSkills:['swift','wind','momentum','resonance','overload','luck','deathBlast','legacy','blood','firstStrike','reinforce','mutation','risk','assault','backup'],preloadClassSkills:['rangerSnipe','rangerQuickShot','rangerRain','ascend','awakening','reincarnate']}
};
window.V07GameConfig={get(mode='normal',overrides={}){return {...(CONFIGS[mode]||CONFIGS.normal),...overrides}},CONFIGS};
})();