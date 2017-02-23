

var objectHelp = require("./object.js");

var run = function () {
    objectHelp.init();
}

var util = {
    objectHelp: objectHelp,

    run: run
}

module.exports = util;