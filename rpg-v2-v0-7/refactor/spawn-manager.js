(()=>{'use strict';
class V07SpawnManager{
 constructor({board,random=Math.random}){this.board=board;this.random=random}
 pickEmpty(filter=null){let cells=this.board.emptyCells();if(filter)cells=cells.filter(([r,c])=>filter(r,c));if(!cells.length)return null;return cells[Math.floor(this.random()*cells.length)]}
 hero({tier=2,special=false,profession=null,...extra}={}){const p=this.pickEmpty();if(!p)return null;return this.board.add({type:'hero',tier,r:p[0],c:p[1],hits:0,special:!!special,profession:special?profession:null,guard:false,revived:false,...extra})}
 enemy({damage=1,maxHits=1,...extra}={}){const p=this.pickEmpty();if(!p)return null;return this.board.add({type:'enemy',r:p[0],c:p[1],hits:0,maxHits,damage,...extra})}
 boss({maxHits=10,damage=1,topRows=2,...extra}={}){const p=this.pickEmpty((r)=>r<topRows)||this.pickEmpty();if(!p)return null;return this.board.add({type:'boss',r:p[0],c:p[1],hits:0,maxHits,damage,...extra})}
}
window.V07SpawnManager=V07SpawnManager;
})();