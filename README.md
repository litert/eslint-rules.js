# @litert/eslint-plugin-rules

The customized ESLint rules insides LiteRT ORG.

## Installation

```sh
npm i --save-dev @litert/eslint-plugin-rules
```

## Usage

Put these configuration in your `.eslintrc`:

```js
{
    "extends": [
        "plugin:@litert/rules/typescript"
    ],
    "parserOptions": {
        "project": "./tsconfig.json" // Configure the path to your tsconfig.json file
    },
    "plugins": [
        "@litert/rules"
    ],
    "rules": {
        // Add your cutomized rules here if necessary.
    }
}
```

## Customized rules

- `@litert/general/disable-for-each-method`

    Disabling the method `Array.prototype.forEach`.

Click [here](./lib/configs/typescript.js) to read the default rules.
