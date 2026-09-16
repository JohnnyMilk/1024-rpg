(()=>{'use strict';
async function start(mode='normal'){
 if(!window.V07GameRuntime)await V07StandaloneLoader.load({base:'./refactor/'});
 const adapter=new V07BrowserAdapter();
 const runtime=await V07StandaloneLoader.start({base:'./refactor/',mode,adapter});
 adapter.attach(runtime);window.__V07_TEST__={getPhase:()=>runtime.state.phase,getRows:()=>runtime.state.rows,getMapEvents:()=>({active:runtime.mapEvents.active,queue:[...runtime.mapEvents.queue]}),getState:()=>runtime.state.snapshot(),runtime};return runtime
}
window.V07StartGame=start;
})();