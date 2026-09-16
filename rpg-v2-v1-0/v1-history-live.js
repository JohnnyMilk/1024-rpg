(function(){'use strict';
const start=document.getElementById('startGame');
if(!start||!window.RPGSave)return;
const original=start.onclick;
start.onclick=function(e){RPGSave.addStat('gamesPlayed',1);if(typeof original==='function')return original.call(this,e)};
})();