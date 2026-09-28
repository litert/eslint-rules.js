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
            "arrow-callback": true,
            "if": true,
            "for": true,
            "while": true,
            "case": true,
            "do-while": true,
            "function-callback": true,
            "function": true
        }]
    }
    ```

    By default, all block types are disallowed from being single-line unless
    explicitly allowed through the configuration.
