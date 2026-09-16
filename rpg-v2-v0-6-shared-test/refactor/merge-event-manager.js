(()=>{'use strict';
class V07MergeEventManager{
 constructor({state,trace=()=>{},handlers={}}){this.state=state;this.trace=trace;this.handlers=handlers}
 async resolve(tx){if(!tx?.mergeCount)return[];const events=[];for(const merge of tx.merges){this.state.merges++;const n=this.state.merges;const e={type:'MERGE',number:n,merge};events.push(e);await this.handlers.onEveryMerge?.(e);if(n%3===0){const ranged={type:'MERGE_3',number:n,merge};events.push(ranged);await this.handlers.onEveryThirdMerge?.(ranged)}}this.trace('MERGE_EVENTS',events);return events}
}
window.V07MergeEventManager=V07MergeEventManager;
})();