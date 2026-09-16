(()=>{'use strict';
if(!window.GiantElephantGuard)throw new Error('GiantElephantGuard must load before template Bosses');
/**
 * Temporary inheritance template for upcoming Bosses.
 * Until a Boss receives unique design, it inherits the complete Giant Elephant Guard behavior.
 * Override only the methods that become unique: chooseAction(), onSpawn(), onDefeated(), etc.
 */
class V07GiantElephantTemplateBoss extends GiantElephantGuard{
 constructor(context={},identity={}){
  super(context);
  this.id=identity.id||this.id;
  this.name=identity.name||this.name;
  this.icon=identity.icon||this.icon;
 }
}
window.V07GiantElephantTemplateBoss=V07GiantElephantTemplateBoss;
})();