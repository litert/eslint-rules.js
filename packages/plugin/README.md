# LiteRT ESLint Plugin

This plugin provides custom ESLint rules for the LiteRT organization.

## Available Rules

- `disable-for-each-method`: Disallows the use of the `forEach` method.

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
