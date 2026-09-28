// eslint.config.js
const TsEslint = require('@typescript-eslint/eslint-plugin');

module.exports = [
    {
        plugins: {
            '@typescript-eslint': TsEslint,
        },
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
        },
        rules: {
            'no-console': ['warn'],
            'max-lines': ['warn', 500],
            '@typescript-eslint/no-explicit-any': ['warn', {
                'fixToUnknown': true,
                'ignoreRestArgs': true,
            }],
        },
    },
    {
        files: [
            'cases/**/*.ts', // don't add `./` before the path
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
    },
];