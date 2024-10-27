# @litert/eslint-plugin-rules

The customized ESLint rules insides LiteRT ORG.

## Installation

```sh
npm i --save-dev @litert/eslint-plugin-rules
```

## Usage

Put these configuration in your `eslint.config.js`:

```js
// eslint.config.js
const LitertEslintRules = require('@litert/eslint-plugin-rules');

module.exports = [
    ...LitertEslintRules.configs.typescript,
    {
        plugins: {
            '@litert/rules': require('@litert/eslint-plugin-rules'),
        },
        files: [
            'src/**/*.ts',
        ],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            // add other customized rules here.
        },
    }
];
```

## Customized rules

- `@litert/general/disable-for-each-method`

    Disabling the method `Array.prototype.forEach`.

Click [here](./lib/configs/typescript.js) to read the default rules.
