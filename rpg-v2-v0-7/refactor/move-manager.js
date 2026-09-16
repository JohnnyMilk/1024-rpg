(()=>{'use strict';
const DIR={left:[0,-1],right:[0,1],up:[-1,0],down:[1,0]};
class V07MoveManager{
 constructor({state,board,units,trace=()=>{}}){this.state=state;this.board=board;this.units=units;this.trace=trace}
 orderedHeroes(dir){const hs=this.state.units.filter(u=>this.units.alive(u)&&u.type==='hero');if(dir==='left')return hs.sort((a,b)=>a.c-b.c);if(dir==='right')return hs.sort((a,b)=>b.c-a.c);if(dir==='up')return hs.sort((a,b)=>a.r-b.r);return hs.sort((a,b)=>b.r-a.r)}
 execute(dir){const delta=DIR[dir];if(!delta)throw new Error('Unknown move direction: '+dir);const [dr,dc]=delta,moved=[],merges=[],mergedIds=new Set();for(const hero of this.orderedHeroes(dir)){let distance=0;while(true){const nr=hero.r+dr,nc=hero.c+dc;if(!this.board.inBounds(nr,nc))break;const target=this.board.at(nr,nc,hero.id);if(!target){hero.r=nr;hero.c=nc;distance++;continue}if(target.type==='hero'&&!mergedIds.has(target.id)&&this.units.canMerge(target,hero)){const from={r:hero.r,c:hero.c},sourceId=hero.id;this.units.mergeInto(target,hero);mergedIds.add(target.id);merges.push({sourceId,targetId:target.id,from,to:{r:target.r,c:target.c},tier:target.tier,specialPair:!!hero.special&&!!target.special});distance++;break}break}if(distance&&!hero.dead)moved.push({id:hero.id,distance,to:{r:hero.r,c:hero.c}})}this.board.compactDead();const tx={dir,changed:moved.length>0||merges.length>0,moved,merges,mergeCount:merges.length};this.trace('MOVE_TRANSACTION',tx);return tx}
}
window.V07MoveManager=V07MoveManager;
})();