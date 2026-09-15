(()=>{'use strict';
class GiantElephantGuard{
 constructor(adapter={}){this.a=adapter;this.name='巨象守衛';this.icon='🗿';this.chargeCD=0;this.quakeCD=0;this.state='IDLE';this.defeatNoticeShown=false;this.collapseRows=0}
 emit(){window.dispatchEvent(new CustomEvent('v07-boss-state',{detail:{active:this.state==='ACTIVE',name:this.name,charge:this.chargeCD,quake:this.quakeCD,state:this.state}}))}
 reset(){this.chargeCD=0;this.quakeCD=0;this.state='IDLE';this.defeatNoticeShown=false;this.collapseRows=0;this.emit()}
 activate(){this.state='ACTIVE';this.chargeCD=0;this.quakeCD=0;this.defeatNoticeShown=false;this.emit()}
 tickCooldowns(except=''){if(except!=='charge')this.chargeCD=Math.max(0,this.chargeCD-1);if(except!=='quake')this.quakeCD=Math.max(0,this.quakeCD-1);this.emit()}
 async takeTurn(){if(this.state!=='ACTIVE'||!this.a.bossAlive?.())return false;const line=this.a.findChargeTarget?.();if(this.chargeCD===0&&line){await this.a.charge?.(line);this.chargeCD=3;this.tickCooldowns('charge');return true}if(this.quakeCD===0&&this.a.hasAdjacentHero?.()){await this.a.quake?.();this.quakeCD=4;this.tickCooldowns('quake');return true}await this.a.stomp?.();this.tickCooldowns();return true}
 async beginDefeat(){if(this.state!=='ACTIVE'&&this.state!=='DEFEAT_NOTICE')return false;this.state='DEFEAT_NOTICE';this.emit();if(!this.defeatNoticeShown){this.defeatNoticeShown=true;await this.a.notice?.('⚠️ BOSS DEFEATED · 戰場即將崩落',3000)}this.collapseRows=Math.max(0,(this.a.getRows?.()||4)-4);if(this.collapseRows>0){this.state='WARNING';this.a.setWarningRow?.((this.a.getRows?.()||4)-1);this.a.render?.()}else this.state='DONE';this.emit();return true}
 playerPhaseAllowed(){return this.state==='WARNING'}
 async afterPlayerPhase(){if(this.state!=='WARNING')return false;this.state='COLLAPSING';this.emit();await this.a.collapseBottomRow?.();this.collapseRows--;if(this.collapseRows>0){this.state='WARNING';this.a.setWarningRow?.((this.a.getRows?.()||4)-1);this.a.render?.()}else{this.state='DONE';this.a.setWarningRow?.(-1);this.a.render?.();await this.a.notice?.('✓ 戰場外框已恢復 4×4',1200)}this.emit();return true}
}
window.GiantElephantGuard=GiantElephantGuard;
})();