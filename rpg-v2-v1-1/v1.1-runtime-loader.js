(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(window.__v1Report)window.__v1Report('Loader · '+msg);else if(bootError){bootError.style.display='block';bootError.textContent='V1.1 載入失敗：'+msg}};
fetch('../rpg-v2-v1-0/v1-runtime-loader.js?v=1.0.0').then(r=>{if(!r.ok)throw new Error('V1.0 runtime-loader '+r.status);return r.text()}).then(code=>{
  code=code.replace("fetch('v1-bootstrap.js?v=1.0.0')","fetch('../rpg-v2-v1-0/v1-bootstrap.js?v=1.0.0')");
  if(!code.includes("../rpg-v2-v1-0/v1-bootstrap.js?v=1.0.0"))throw new Error('V1.1 bootstrap path patch failed');
  (0,eval)(code+'\n//# sourceURL=rpg-v2-v1-1/runtime-loader-v1.1.js');
}).catch(e=>fail(e.message));
})();
