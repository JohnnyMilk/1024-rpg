(()=>{'use strict';
class V07SpawnSettlement{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace;this.queue=[]}
 enqueue(spec){this.queue.push({...spec});return spec}
 async settle(){const spawned=[];while(this.queue.length){const spec=this.queue.shift();let unit=null;if(spec.type==='hero')unit=this.r.spawn.hero(spec);else if(spec.type==='enemy')unit=this.r.spawn.enemy({...spec,spawnedThisEnemyPhase:this.r.state.phase==='ENEMY'});else if(spec.type==='boss')unit=this.r.spawn.boss(spec);if(!unit)continue;spawned.push(unit);await this.r.events.emit('UNIT_SPAWNED',{unit,spec})}if(spawned.length)this.trace('SPAWN_SETTLED',{ids:spawned.map(x=>x.id)});return spawned}
}
window.V07SpawnSettlement=V07SpawnSettlement;
})();