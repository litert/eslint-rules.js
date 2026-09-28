# @litert/eslint-plugin-rules

The customized ESLint rules insides LiteRT ORG.

## Installation

```sh
npm i --save-dev @litert/eslint-plugin-rules
```

## Usage

Just put these configuration file [`eslint.config.js`](./example-eslint.config.js) in the root of your project.

## Customized rules

- `@litert/disable-for-each-method`

    Disabling the method `Array.prototype.forEach`.

    ```js
    {
        "@litert/disable-for-each-method": "error"
    }
    ```

- `disallow-single-line-block`: Disallows single-line blocks.

    ```js
    {
        "@litert/disallow-single-line-block": ["error", {
            "exception": {
                "arrow-callback": true,
                "arrow-function": true,
                "if": true,
                "for": true,
                "while": true,
                "case": true,
                "do-while": true,
                "catch": true,
                "finally": true,
                "function-callback": true,
                "function": true,
                "getter": true,
                "setter": true,
                "object": true
            }
        }]
    }
    ```

    By default, all block types are disallowed from being single-line unless
    explicitly allowed through the configuration. `getter`, `setter`, and
    `object` exceptions default to `true`; every other exception defaults to
    `false`. Every empty block is allowed, including empty classes, functions,
    methods, object expressions, static blocks, and TypeScript structures.

    `arrow-callback` only applies to arrow functions passed as call arguments.
    Use `arrow-function` to allow other arrow-function bodies as well.
    Use the `"all"` option to disable every exception, including defaults.

Click [here](./lib/configs/typescript.js) to read the default rules.
