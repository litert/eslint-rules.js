// eslint.config.js
const LitertEslintRules = require('../..');

module.exports = [
    ...LitertEslintRules.configs.typescript,
    {
        plugins: {
            '@litert/rules': LitertEslintRules,
        },
        files: [
            'cases/**/*.ts', // don't add `./` before the path
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        }
    }
];