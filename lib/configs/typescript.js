// eslint.config.js
const TsEslint = require('@typescript-eslint/eslint-plugin');
const Stylistic = require('@stylistic/eslint-plugin');

module.exports = [
    {

        ignores: [
            // '**/node_modules/**',?
            '**/*.js',
            '**/*.mjs',
            '**/*.cjs',
            '**/*.d.ts',
            '**/*.test.ts',
        ],
    },
    {
        plugins: {
            '@typescript-eslint': TsEslint,
            '@stylistic': Stylistic,
        },
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
        },
        rules: {

            /* eslint core rules start */
            '@litert/rules/disable-for-each-method': ['error'],
            'brace-style': 'off',
            'no-console': ['warn'],
            'no-irregular-whitespace': ['error'],
            'camelcase': 'off',
            'max-len': ['error', 120, {
                'ignoreStrings': true,
                'ignoreTemplateLiterals': true,
                'ignoreComments': true
            }],
            'no-extra-semi': 'off',
            'no-loss-of-precision': 'off',
            'keyword-spacing': 'off',

            'max-lines': ['off', 500],
            'no-magic-numbers': 'off',
            'lines-between-class-members': 'off',
            'no-invalid-this': 'off',
            'no-redeclare': 'off',
            'no-duplicate-imports': 'error',
            'func-call-spacing': 'off',
            'no-unused-vars': 'off',
            'no-unused-expressions': 'off',
            'no-useless-constructor': 'off',
            'no-constant-condition': 'off',
            'comma-spacing': 'off',
            'require-await': 'off',
            'semi': 'off',
            'space-before-function-paren': 'off',
            'space-unary-ops': ['error', {
                'words': true,
                'nonwords': false
            }],
            'no-debugger': ['error'],
            'space-infix-ops': ['error'],
            'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single',
                { 'avoidEscape': true, 'allowTemplateLiterals': true }
            ],

            /* eslint core rules ends */

            /* typescript rules start */

            '@typescript-eslint/restrict-template-expressions': ['error', {
                'allowNumber': true,
                'allowBoolean': true,
                'allowAny': true,
                'allowNullish': false,
                'allowNever': false
            }],
            '@typescript-eslint/return-await': ['error', 'in-try-catch'],

            '@typescript-eslint/require-await': ['error'],
            '@typescript-eslint/restrict-plus-operands': ['error', {
                'skipCompoundAssignments': false,
                'allowAny': true
            }],
            '@typescript-eslint/unified-signatures': ['error'],
            '@typescript-eslint/no-use-before-define': ['error', {
                'enums': true,
                'functions': false,
                'classes': false,
                'variables': true
            }],
            '@typescript-eslint/no-restricted-types': ['error', {
                'types': {

                    'String': {
                        'message': 'Use string instead',
                        'fixWith': 'string'
                    },
                    'Number': {
                        'message': 'Use number instead',
                        'fixWith': 'number'
                    },
                    'Boolean': {
                        'message': 'Use number instead',
                        'fixWith': 'boolean'
                    },
                    'Object': {
                        'message': 'Use {} instead',
                        'fixWith': '{}'
                    },
                    '{}': {
                        'message': 'Use unknown instead',
                        'fixWith': '_.IEmptyObject'
                    }
                }
            }],
            '@typescript-eslint/no-base-to-string': ['warn'],
            '@typescript-eslint/await-thenable': ['error'],
            '@typescript-eslint/array-type': ['error', { 'default': 'array-simple' }],
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-floating-promises': ['error', { 'ignoreVoid': false }],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-literal-enum-member': ['error', {
                'allowBitwiseExpressions': true
            }],
            '@typescript-eslint/prefer-function-type': 'error',
            '@typescript-eslint/prefer-reduce-type-parameter': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/prefer-return-this-type': 'error',
            '@typescript-eslint/prefer-regexp-exec': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-extra-parens': 'off',
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/default-param-last': 'error',
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/no-loss-of-precision': ['error'],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/explicit-function-return-type': ['error', {
                'allowExpressions': true
            }],
            '@typescript-eslint/no-magic-numbers': [
                'off',
                {
                    'ignoreEnums': true,
                    'ignoreNumericLiteralTypes': true
                }
            ],
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-confusing-void-expression': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-require-imports': 'warn',
            '@typescript-eslint/no-invalid-this': ['error'],
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/no-redeclare': ['error'],
            // '@typescript-eslint/no-duplicate-imports': ['error'],
            '@typescript-eslint/no-namespace': ['error', {

                'allowDeclarations': true,
                'allowDefinitionFiles': true
            }],
            '@typescript-eslint/consistent-type-assertions': ['error', {
                'assertionStyle': 'as'
            }],
            '@typescript-eslint/no-unused-expressions': ['error'],
            '@typescript-eslint/no-useless-constructor': ['error'],
            '@typescript-eslint/prefer-ts-expect-error': ['error'],
            '@typescript-eslint/no-unused-vars': ['error', {
                'vars': 'all',
                'args': 'after-used',
                'ignoreRestSiblings': false,
                'caughtErrors': 'all'
            }],
            '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
            '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
            '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
            '@typescript-eslint/no-unnecessary-qualifier': ['error'],
            '@typescript-eslint/unbound-method': ['error'],
            '@typescript-eslint/switch-exhaustiveness-check': ['error'],
            '@typescript-eslint/no-var-requires': ['error'],
            '@typescript-eslint/no-unnecessary-condition': ['off'],
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['warn'],
            '@typescript-eslint/member-ordering': ['off'],
            '@typescript-eslint/no-this-alias': [
                'warn',
                {
                    'allowDestructuring': true,
                    'allowedNames': ['_this']
                }
            ],
            '@typescript-eslint/no-explicit-any': ['off', {
                'fixToUnknown': true,
                'ignoreRestArgs': true
            }],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    'selector': 'default',
                    'format': ['camelCase'],
                    'leadingUnderscore': 'forbid'
                },
                {
                    'selector': 'import',
                    'format': null
                },
                {
                    'selector': 'parameter',
                    'format': ['camelCase'],
                    'modifiers': ['unused'],
                    'leadingUnderscore': 'allow'
                },
                {
                    'selector': 'parameter',
                    'format': ['camelCase']
                },
                {
                    'selector': 'memberLike',
                    'modifiers': ['private'],
                    'format': ['camelCase'],
                    'leadingUnderscore': 'require'
                },
                {
                    'selector': 'memberLike',
                    'modifiers': ['protected'],
                    'format': ['camelCase'],
                    'leadingUnderscore': 'require'
                },
                {
                    'selector': 'memberLike',
                    'modifiers': ['private', 'static'],
                    'format': [],
                    'custom': {
                        'regex': '^_\\$[^_]',
                        'match': true
                    }
                },
                {
                    'selector': 'memberLike',
                    'modifiers': ['protected', 'static'],
                    'format': [],
                    'custom': {
                        'regex': '^_\\$[^_]',
                        'match': true
                    }
                },
                {
                    'selector': 'enumMember',
                    'format': ['UPPER_CASE']
                },
                {
                    'selector': 'objectLiteralProperty',
                    'format': []
                },
                {
                    'selector': 'variable',
                    'format': ['camelCase', 'UPPER_CASE']
                },
                {
                    'selector': 'variable',
                    'modifiers': ['const'],
                    'format': ['UPPER_CASE', 'camelCase']
                },
                {
                    'selector': 'typeParameter',
                    'format': ['PascalCase'],
                    'prefix': ['T']
                },
                {
                    'selector': 'interface',
                    'format': ['PascalCase'],
                    'custom': {
                        'regex': '^I[A-Z]',
                        'match': true
                    }
                },
                {
                    'selector': 'class',
                    'format': ['PascalCase']
                },
                {
                    'selector': 'enum',
                    'format': ['PascalCase'],
                    'custom': {
                        'regex': '^E[A-Z]',
                        'match': true
                    }
                },
                {
                    'selector': 'typeAlias',
                    'format': ['PascalCase']
                }
            ],
            '@typescript-eslint/no-deprecated': 'warn',
            "@typescript-eslint/ban-ts-comment": ["error", { 
                "ts-expect-error": "allow-with-description" 
            }],

            /* typescript rules end */

            /* stylistic rules start */

            '@stylistic/space-before-function-paren': ['error', {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            '@stylistic/member-delimiter-style': ['error', {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'singleline': {
                    'delimiter': 'semi',
                    'requireLast': true
                }
            }],
            '@stylistic/type-annotation-spacing': ['error'],
            '@stylistic/comma-spacing': ['error'],
            '@stylistic/semi': ['error'],
            '@stylistic/new-parens': ['error'],
            '@stylistic/func-call-spacing': ['error', 'never'],
            '@stylistic/keyword-spacing': ['error', {
                'before': true,
                'after': true
            }],
            '@stylistic/lines-between-class-members': ['error'],
            '@stylistic/brace-style': ['error', 'stroustrup', {
                'allowSingleLine': true
            }],
            '@stylistic/no-extra-semi': ['error'],
            '@stylistic/object-curly-spacing': ['error', 'always'],

            '@stylistic/arrow-spacing': ['error'],
            '@stylistic/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/block-spacing': 'error',
            '@stylistic/eol-last': 'error',
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/indent': ['error', 4, {
                'SwitchCase': 1,
                'MemberExpression': 1,
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': true,
                'CallExpression': { 'arguments': 1 },
                'FunctionDeclaration': { 'body': 1, 'parameters': 1 },
                'ignoredNodes': ['TSTypeParameterInstantiation', 'TemplateLiteral *']
            }],

            /* stylistic rules end */
        }
    }
];
