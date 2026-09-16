(()=>{'use strict';
class V07SkillSystem{
 constructor({runtime,trace=()=>{}}){this.r=runtime;this.trace=trace;this.definitions=new Map();this.unsub=[]}
 register(skill){if(!skill?.id)throw new Error('Skill requires id');this.definitions.set(skill.id,skill);return skill}
 has(id){return this.r.state.skills.has(id)}
 grant(id){if(!this.definitions.has(id))throw new Error('Unknown skill: '+id);if(this.has(id))return false;this.r.state.skills.add(id);this.bindOne(this.definitions.get(id));this.trace('SKILL_GRANTED',{id});return true}
 bindOne(skill){for(const [type,handler] of Object.entries(skill.events||{}))this.unsub.push(this.r.events.on(type,e=>handler(e,this.r,skill)))}
 load(ids=[]){for(const id of ids)if(this.definitions.has(id))this.grant(id);return this}
 destroy(){for(const off of this.unsub)off();this.unsub=[]}
}
window.V07SkillSystem=V07SkillSystem;
})();