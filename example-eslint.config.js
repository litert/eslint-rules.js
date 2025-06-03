// eslint.config.js
const rules = require('@litert/eslint-plugin-recommended-rules');

module.exports = [
    ...rules.typescript,
    {
        files: [
            'src/**/*.ts', // don't add `./` before the path
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        }
    }
];