(function(){'use strict';
const bootError=document.getElementById('bootError');
const fail=msg=>{console.error(msg);if(bootError){bootError.style.display='block';bootError.textContent='v0.7 載入失敗：'+msg}};
fetch('v07-bootstrap.js?v=20260915e').then(r=>{if(!r.ok)throw new Error('v07-bootstrap '+r.status);return r.text()}).then(code=>{
  const needle='src=src.replaceAll("nr<0||nr>=N||nc<0||nc>=N","nr<0||nr>=ROWS||nc<0||nc>=COLS");';
  if(!code.includes(needle))throw new Error('找不到矩形戰場邊界注入點');
  const fix=needle+'src=src.replaceAll("nr>=0&&nr<N&&nc>=0&&nc<N","nr>=0&&nr<ROWS&&nc>=0&&nc<COLS");';
  code=code.replace(needle,fix);
  (0,eval)(code+'\n//# sourceURL=rpg-v2-v0-7/v07-bootstrap-fixed.js');
}).catch(e=>fail(e.message));
})();
