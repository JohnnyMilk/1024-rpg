(()=>{'use strict';
class V07BoardCore{
 constructor(state){this.state=state;this.nextId=1}
 inBounds(r,c){return r>=0&&c>=0&&r<this.state.rows&&c<this.state.cols}
 at(r,c,skipId=null){return this.state.units.find(u=>!u.dead&&u.id!==skipId&&u.r===r&&u.c===c)||null}
 emptyCells(){const out=[];for(let r=0;r<this.state.rows;r++)for(let c=0;c<this.state.cols;c++)if(!this.at(r,c))out.push([r,c]);return out}
 add(spec){const unit={id:spec.id||this.nextId++,...spec,dead:!!spec.dead};this.state.addUnit(unit);return unit}
 remove(id){return this.state.removeUnit(id)}
 move(unit,r,c){if(!unit||unit.dead||!this.inBounds(r,c))return false;const hit=this.at(r,c,unit.id);if(hit)return false;unit.r=r;unit.c=c;return true}
 unitsOnRow(row){return this.state.units.filter(u=>!u.dead&&u.r===row)}
 killRow(row){const killed=this.unitsOnRow(row);for(const u of killed)u.dead=true;return killed}
 compactDead(){this.state.units=this.state.units.filter(u=>!u.dead);return this.state.units}
 snapshot(){return this.state.units.map(u=>({...u}))}
}
window.V07BoardCore=V07BoardCore;
})();