(()=>{'use strict';
class V07ProfessionManager{
 constructor({runtime,trace=()=>{},random=Math.random}){this.r=runtime;this.trace=trace;this.random=random;this.profession=runtime.config.profession||null;this.r.state.profession=this.profession;this.bind()}
 setProfession(id){this.profession=id||null;this.r.state.profession=this.profession;return this.profession}
 bind(){const e=this.r.events;e.on('AFTER_PLAYER_MOVE',x=>this.onMove(x));e.on('MERGE',x=>this.onMerge(x));e.on('MERGE_3',x=>this.onThirdMerge(x));e.on('BEFORE_DAMAGE',x=>this.onBeforeDamage(x))}
 specials(){return this.r.state.living('hero').filter(h=>h.special&&(!this.profession||h.profession===this.profession))}
 async onMove(event){if(!this.profession)return;const moves=event.transaction.actualMoves||event.transaction.moved;for(const m of moves){const id=m.heroId||m.mergedInto||m.id,h=this.r.state.units.find(x=>x.id===id);if(!h||!h.special||h.profession!==this.profession)continue;if(this.profession==='priest')await this.priestGuard(h);await this.r.events.emit('PROFESSION_MOVE',{profession:this.profession,hero:h,movement:m,transaction:event.transaction})}}
 async onMerge(event){await this.r.events.emit('PROFESSION_MERGE',{profession:this.profession,event})}
 async onThirdMerge(event){await this.r.events.emit('PROFESSION_MERGE_3',{profession:this.profession,event})}
 async onBeforeDamage(event){const ctx=event.context,h=event.target;if(!ctx||!h||h.type!=='hero'||!h.guard||ctx.amount<=0)return;ctx.amount=Math.max(0,ctx.amount-1);h.guard=false;delete h.guardBy;this.trace('GUARD_BLOCK',{hero:h.id,remainingDamage:ctx.amount});await this.r.events.emit('GUARD_BLOCK',{hero:h,source:event.source,remainingDamage:ctx.amount})}
 async priestGuard(priest){const heroes=this.r.state.living('hero');const targets=V07PriestRules.chooseGuardTargets(priest,heroes,(list,n)=>this.randomTargets(list,n));for(const h of targets){h.guard=true;h.guardBy=priest.id}if(targets.length){this.trace('PRIEST_GUARD',{priest:priest.id,targets:targets.map(x=>x.id)});await this.r.events.emit('PRIEST_GUARD',{priest,targets})}return targets}
 randomTargets(list,n){const a=[...list],out=[];while(a.length&&out.length<n){out.push(a.splice(Math.floor(this.random()*a.length),1)[0])}return out}
}
window.V07ProfessionManager=V07ProfessionManager;
})();