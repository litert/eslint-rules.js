'use strict';

const path = require('node:path');
const TypeScriptParser = require('@typescript-eslint/parser');
const TypeScriptPlugin = require('@typescript-eslint/eslint-plugin');
const StylisticPlugin = require('@stylistic/eslint-plugin');
const LiteRtPlugin = require('../../plugin');
const RecommendedRules = require('../../recommended-rules').typescript;

const recommendedRuleMap = RecommendedRules.find(
    (configuration) => configuration.rules,
).rules;

function createRecommendedRuleConfig(ruleId) {

    const ruleConfig = recommendedRuleMap[ruleId];

    if (ruleConfig === undefined) {
        throw new Error(`Rule "${ruleId}" is not in the TypeScript preset.`);
    }

    return {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': TypeScriptPlugin,
            '@stylistic': StylisticPlugin,
            '@litert': LiteRtPlugin,
        },
        languageOptions: {
            parser: TypeScriptParser,
            parserOptions: {
                project: path.resolve(__dirname, '../tsconfig.json'),
                tsconfigRootDir: path.resolve(__dirname, '..'),
            },
        },
        rules: {
            [ruleId]: ruleConfig,
        },
    };
}

module.exports = createRecommendedRuleConfig;