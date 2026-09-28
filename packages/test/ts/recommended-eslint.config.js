// eslint.config.js
const rules = require('../../recommended-rules');

module.exports = [
    ...rules.typescript,
    {
        files: [
            'cases/**/*.ts',
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
    },
];