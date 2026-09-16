(()=>{'use strict';
class V07SpawnSettlement{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace;this.queue=[]}
 enqueue(spec){this.queue.push({...spec});return spec}
 async settle(){const spawned=[];while(this.queue.length){const spec=this.queue.shift(),ctx={spec,cancelled:false,extras:[]};await this.r.events.emit('BEFORE_SPAWN',{context:ctx,spec});if(ctx.cancelled)continue;let unit=null;if(spec.type==='hero')unit=this.r.spawn.hero(spec);else if(spec.type==='enemy')unit=this.r.spawn.enemy(spec);else if(spec.type==='boss')unit=this.r.spawn.boss(spec);if(!unit)continue;spawned.push(unit);await this.r.events.emit('UNIT_SPAWNED',{unit,spec});for(const extra of ctx.extras||[])this.queue.push({...extra})}if(spawned.length)this.trace('SPAWN_SETTLED',{ids:spawned.map(x=>x.id)});return spawned}
}
window.V07SpawnSettlement=V07SpawnSettlement;
})();