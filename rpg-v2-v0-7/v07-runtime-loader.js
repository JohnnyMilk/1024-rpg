(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915f').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  (0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/v07-bootstrap-fixed.js');
}).catch(e=>fail(e.message));
})();
