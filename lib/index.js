/**
 * @fileoverview The custom rules insides LiteRT ORG.
 * @author Angus Fenying
 */
"use strict";

// import all rules in lib/rules
module.exports.rules = {
    "disable-for-each-method": require('./rules/disable-for-each-method'),
};

module.exports.configs = {

    'typescript': require('./configs/typescript')
};
 