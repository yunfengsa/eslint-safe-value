/**
 * @fileoverview dxy-mom plugin
 * @author liujialong@dxy.cn
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = {
    "safe-value": require("./rules/safe-value")
};

module.exports.configs = {
    recommended: {
        rules: {
            'dxymom/safe-value': "warn", // 可以省略 eslint-plugin 前缀
        },
    },
};

// import processors
module.exports.processors = {

    // add your processors here
};

