(()=>{'use strict';
class V07BossRegistry{
 constructor(){this.types=new Map()}
 register(id,BossClass){if(!id||typeof BossClass!=='function')throw new Error('Boss registration requires id and Boss class');if(window.V07BaseBoss&&!(BossClass.prototype instanceof V07BaseBoss)&&BossClass!==V07BaseBoss)throw new Error('Boss must inherit V07BaseBoss: '+id);this.types.set(id,BossClass);return BossClass}
 create(id,context){const BossClass=this.types.get(id);if(!BossClass)throw new Error('Unknown Boss: '+id);return new BossClass(context)}
 has(id){return this.types.has(id)}
 get(id){return this.types.get(id)||null}
 ids(){return[...this.types.keys()]}
}
window.V07Bosses=new V07BossRegistry();
})();