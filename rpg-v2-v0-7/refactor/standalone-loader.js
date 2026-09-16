(()=>{'use strict';
async function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>resolve(src);s.onerror=()=>reject(new Error('V07 module load failed: '+src));document.head.appendChild(s)})}
window.V07StandaloneLoader={
 async load({base='./refactor/',runSmoke=false}={}){if(!window.V07ModuleManifest)await loadScript(base+'module-manifest.js');for(const file of window.V07ModuleManifest)await loadScript(base+file);if(runSmoke&&window.V07RunSmokeTests)await window.V07RunSmokeTests();return true},
 async start(options={}){if(!window.V07GameRuntime)await this.load(options);const runtime=new V07GameRuntime(options);runtime.registerSkills([...(window.V07GeneralSkills||[]),...(options.skillDefinitions||[])]);await runtime.boot();window.__V07_RUNTIME__=runtime;return runtime}
};
})();