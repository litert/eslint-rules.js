'use strict';

const TypeScriptParser = require('@typescript-eslint/parser');
const LiteRtPlugin = require('../../plugin');

function createPluginRuleConfig(ruleId, ruleOptions = []) {

    return {
        files: ['**/*.ts'],
        plugins: {
            '@litert': LiteRtPlugin,
        },
        languageOptions: {
            parser: TypeScriptParser,
        },
        rules: {
            [ruleId]: ['error', ...ruleOptions],
        },
    };
}

module.exports = createPluginRuleConfig;