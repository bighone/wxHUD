//app.js

import hudClass from "./hud/hud";

let util = require("./utils/util.js");

App({
  onLaunch: function () {
    util.run();
    this.util = util;
  },

  hudClass: (s) => new hudClass(s),
  
})