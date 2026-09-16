(()=>{'use strict';
const V07CombatTargeting={
 enemies(state){return state.units.filter(u=>!u.dead&&(u.type==='enemy'||u.type==='boss'))},
 distance(a,b){return Math.abs(a.r-b.r)+Math.abs(a.c-b.c)},
 nearest(origin,targets,count=1){return[...targets].sort((a,b)=>this.distance(origin,a)-this.distance(origin,b)||a.id-b.id).slice(0,count)},
 farthest(origin,targets,count=1){return[...targets].sort((a,b)=>this.distance(origin,b)-this.distance(origin,a)||a.id-b.id).slice(0,count)},
 line(origin,targets,dir){const d={left:[0,-1],right:[0,1],up:[-1,0],down:[1,0]}[dir];if(!d)return[];const [dr,dc]=d;return targets.filter(t=>dr===0?t.r===origin.r&&Math.sign(t.c-origin.c)===dc:t.c===origin.c&&Math.sign(t.r-origin.r)===dr).sort((a,b)=>this.distance(origin,a)-this.distance(origin,b))},
 around8(origin,targets){return targets.filter(t=>t.id!==origin.id&&Math.abs(t.r-origin.r)<=1&&Math.abs(t.c-origin.c)<=1)}
};
window.V07CombatTargeting=V07CombatTargeting;
})();