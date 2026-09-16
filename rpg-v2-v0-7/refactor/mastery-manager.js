(()=>{'use strict';
class V07MasteryManager{
 constructor({adapter=null}){this.adapter=adapter}
 rank(id){if(this.adapter?.skillRank)return this.adapter.skillRank(id);if(window.RPGSave?.rankFromUses&&window.RPGSave?.uses)return RPGSave.rankFromUses(RPGSave.uses(id));return'LV1'}
 level(id){const r=this.rank(id);return r==='MAX'?4:Math.max(1,Math.min(3,Number(String(r).replace('LV',''))||1))}
}
window.V07MasteryManager=V07MasteryManager;
})();