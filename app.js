//app.js

import hudClass from "./hud/hud";

App({
  onLaunch: function () {
    
  },

  hudClass: (s) => new hudClass(s),
  
})