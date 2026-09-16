'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
global.window=global;global.CustomEvent=class CustomEvent{constructor(type,init={}){this.type=type;this.detail=init.detail}};global.dispatchEvent=()=>true;
const base=__dirname;
function run(file){const src=fs.readFileSync(path.join(base,file),'utf8');new vm.Script(src,{filename:file}).runInThisContext()}
run('module-manifest.js');
(async()=>{for(const file of global.V07ModuleManifest)run(file);if(typeof global.V07RunSmokeTests!=='function')throw new Error('V07RunSmokeTests missing');await global.V07RunSmokeTests();console.log('[V07 NODE] SELF-CHECK PASS')})().catch(err=>{console.error(err);process.exitCode=1});