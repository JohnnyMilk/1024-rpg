(()=>{'use strict';
class V07MapEventManager{
 constructor(adapter,trace=console.log){this.a=adapter;this.trace=trace;this.queue=[];this.active=null}
 enqueue(event){this.queue.push({...event,state:'QUEUED'});this.trace('[V07 MAP] QUEUED',event)}
 async run(){if(!this.active)this.active=this.queue.shift()||null;if(!this.active)return false;const e=this.active;if(e.type==='collapse')return this.runCollapse(e);throw new Error('Unknown map event: '+e.type)}
 async runCollapse(e){if(e.state==='QUEUED'){e.remaining=e.rows||1;e.state='WARNING';this.a.setWarningRow(this.a.rows()-1);await this.a.notice('⚠️ BOSS DEFEATED · 戰場即將崩落',3000);this.a.render();this.trace('[V07 MAP] WARNING',{row:this.a.rows()-1,remaining:e.remaining});return true}if(e.state==='WARNING'){e.state='COLLAPSING';this.trace('[V07 MAP] COLLAPSING',{row:this.a.rows()-1});await this.a.collapseBottomRow();e.remaining--;if(e.remaining>0&&this.a.rows()>4){e.state='WARNING';this.a.setWarningRow(this.a.rows()-1);this.a.render();this.trace('[V07 MAP] WARNING',{row:this.a.rows()-1,remaining:e.remaining})}else{e.state='DONE';this.a.setWarningRow(-1);this.a.render();this.trace('[V07 MAP] DONE');this.active=null}return true}return false}
}
window.V07MapEventManager=V07MapEventManager;
})();