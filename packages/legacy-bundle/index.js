/**
 * @fileoverview The custom rules insides LiteRT ORG.
 * @author Angus Fenying
 */
"use strict";

// import all rules in lib/rules
module.exports.rules = {
    "disable-for-each-method": require('@litert/eslint-plugin').rules,
};

module.exports.configs = {

    'typescript': require('@litert/eslint-plugin-recommended-rules').typescript,
};
 