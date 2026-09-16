(()=>{'use strict';
class V07RuntimeState{
 constructor(config={}){this.reset(config)}
 reset(config={}){this.config={...config};this.rows=config.rows||4;this.cols=config.cols||4;this.turn=0;this.merges=0;this.moves=0;this.phase='IDLE';this.units=[];this.skills=new Set();this.classSkills=new Set(config.preloadClassSkills||[]);this.warningRow=-1;this.activeBoss=null;this.ended=false;this.busy=false;return this}
 setPhase(phase){this.phase=phase;window.dispatchEvent(new CustomEvent('v07-phase',{detail:{phase,turn:this.turn}}));return phase}
 nextTurn(){this.turn++;return this.turn}
 setRows(rows){this.rows=Math.max(4,Number(rows)||4);return this.rows}
 setWarningRow(row){this.warningRow=Number.isInteger(row)?row:-1;return this.warningRow}
 addUnit(unit){this.units.push(unit);return unit}
 removeUnit(id){const i=this.units.findIndex(u=>u.id===id);return i>=0?this.units.splice(i,1)[0]:null}
 living(type=null){return this.units.filter(u=>(!type||u.type===type)&&!u.dead)}
 hasSkill(id){return this.skills.has(id)}
 hasClassSkill(id){return this.classSkills.has(id)}
 snapshot(){return{mode:this.config.mode,rows:this.rows,cols:this.cols,turn:this.turn,moves:this.moves,merges:this.merges,phase:this.phase,warningRow:this.warningRow,boss:this.activeBoss?.id||null,skills:[...this.skills],classSkills:[...this.classSkills],units:this.units.length}}
}
window.V07RuntimeState=V07RuntimeState;
})();