(()=>{'use strict';
class V07ProfessionManager{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace;this.profession=runtime.config.profession||null;this.bind()}
 bind(){const e=this.r.events;e.on('AFTER_PLAYER_MOVE',x=>this.onMove(x));e.on('MERGE',x=>this.onMerge(x));e.on('MERGE_3',x=>this.onThirdMerge(x))}
 specials(){return this.r.state.living('hero').filter(h=>h.special&&(!this.profession||h.profession===this.profession))}
 async onMove(event){if(!this.profession)return;for(const h of this.specials()){const m=event.transaction.moved.find(x=>x.id===h.id);if(!m)continue;if(this.profession==='priest')await this.priestGuard(h);await this.r.events.emit('PROFESSION_MOVE',{profession:this.profession,hero:h,movement:m,transaction:event.transaction})}}
 async onMerge(event){await this.r.events.emit('PROFESSION_MERGE',{profession:this.profession,event})}
 async onThirdMerge(event){await this.r.events.emit('PROFESSION_MERGE_3',{profession:this.profession,event})}
 async priestGuard(priest){const heroes=this.r.state.living('hero');const targets=V07PriestRules.chooseGuardTargets(priest,heroes,(list,n)=>this.randomTargets(list,n));for(const h of targets){h.guard=true;h.guardBy=priest.id}if(targets.length){this.trace('PRIEST_GUARD',{priest:priest.id,targets:targets.map(x=>x.id)});await this.r.events.emit('PRIEST_GUARD',{priest,targets})}return targets}
 randomTargets(list,n){const a=[...list],out=[];while(a.length&&out.length<n){out.push(a.splice(Math.floor(Math.random()*a.length),1)[0])}return out}
}
window.V07ProfessionManager=V07ProfessionManager;
})();