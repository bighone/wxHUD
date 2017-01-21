

var stringHelp = require("./string.js");
var objectHelp = require("./object.js");
var dateHelp = require("./date.js");
var arrayHelp = require("./array.js");

var site = require("./site.js");

var run = function () {
    stringHelp.init();
    arrayHelp.init();
    objectHelp.init();
    dateHelp.init();
}

var util = {
    stringHelp: stringHelp,
    arrayHelp: arrayHelp,
    objectHelp: objectHelp,
    dateHelp: dateHelp,
    
    site: site,
    run: run
}

module.exports = util;