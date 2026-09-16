(()=>{'use strict';
class V07BossRegistry{
 constructor(){this.types=new Map()}
 register(id,definition){if(!id||!definition)throw new Error('Boss registration requires id and definition');this.types.set(id,definition);return definition}
 create(id,context){const Def=this.types.get(id);if(!Def)throw new Error('Unknown Boss: '+id);return typeof Def==='function'?new Def(context):Object.assign(Object.create(Def),{context})}
 has(id){return this.types.has(id)}
}
window.V07Bosses=new V07BossRegistry();
})();