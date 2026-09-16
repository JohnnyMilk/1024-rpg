(()=>{'use strict';
class V07EventBus{
 constructor(trace=()=>{}){this.listeners=new Map();this.trace=trace}
 on(type,handler){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(handler);return()=>this.off(type,handler)}
 off(type,handler){const list=this.listeners.get(type)||[],i=list.indexOf(handler);if(i>=0)list.splice(i,1)}
 async emit(type,payload={}){const event={type,...payload};this.trace('EVENT',{type});for(const fn of [...(this.listeners.get(type)||[])])await fn(event);for(const fn of [...(this.listeners.get('*')||[])])await fn(event);return event}
}
window.V07EventBus=V07EventBus;
})();