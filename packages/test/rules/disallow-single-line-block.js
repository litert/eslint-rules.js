/**
 * @fileoverview Disallow single-line block bodies except configured cases
 * @author Angus Fenying
 */
"use strict";

const assert = require('node:assert/strict');
const test = require('node:test');
const { Linter, RuleTester } = require('eslint');

const rule = require('@litert/eslint-plugin/rules/disallow-single-line-block');

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

function createExceptionOptions(name, enabled) {
    return [{
        exception: {
            [name]: enabled,
        },
    }];
}

const toggleCases = [
    {
        name: 'if',
        code: 'if (foo) { bar(); }',
    },
    {
        name: 'for',
        code: 'for (;;) { break; }',
    },
    {
        name: 'while',
        code: 'while (foo) { break; }',
    },
    {
        name: 'case',
        code: 'switch (foo) {\ncase 1: { break; }\n}',
    },
    {
        name: 'do-while',
        code: 'do { bar(); } while (foo);',
    },
    {
        name: 'arrow-callback',
        code: 'fn(() => { bar(); });',
    },
    {
        name: 'function-callback',
        code: 'fn(function () { bar(); });',
    },
    {
        name: 'function',
        code: 'function foo() { bar(); }',
    },
    {
        name: 'function',
        code: 'const foo = function () { bar(); };',
    },
    {
        name: 'function',
        code: 'const foo = () => { bar(); };',
    },
];

ruleTester.run('disallow-single-line-block', rule, {
    valid: toggleCases.map((item) => ({
        code: item.code,
        options: createExceptionOptions(item.name, true),
    })),
    invalid: [
        ...toggleCases.map((item) => ({
            code: item.code,
            options: createExceptionOptions(item.name, false),
            errors: [{
                messageId: 'unexpectedSingleLineBlock',
                data: {
                    kind: 'statement',
                },
            }],
        })),
        {
            code: 'switch (foo) { case 1: break; }',
            errors: [{
                messageId: 'unexpectedSingleLineBlock',
                data: {
                    kind: 'switch',
                },
            }],
        },
        {
            code: 'class Foo { foo; }',
            errors: [{
                messageId: 'unexpectedSingleLineBlock',
                data: {
                    kind: 'class',
                },
            }],
        },
        {
            code: 'class Foo {\nstatic { bar(); }\n}',
            errors: [{
                messageId: 'unexpectedSingleLineBlock',
                data: {
                    kind: 'static',
                },
            }],
        },
    ],
});

const defaultConfigForms = [
    {
        name: '"error"',
        value: 'error',
    },
    {
        name: '["error"]',
        value: ['error'],
    },
    {
        name: '["error", {}]',
        value: ['error', {}],
    },
    {
        name: '["error", "all"]',
        value: ['error', 'all'],
    },
];

const defaultConfigCases = [
    {
        name: 'if block',
        code: 'if (foo) { bar(); }',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'for block',
        code: 'for (;;) { break; }',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'while block',
        code: 'while (foo) { break; }',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'case block',
        code: 'switch (foo) {\ncase 1: { break; }\n}',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'do-while block',
        code: 'do { bar(); } while (foo);',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'arrow callback block',
        code: 'fn(() => { bar(); });',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'function callback block',
        code: 'fn(function () { bar(); });',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'function declaration block',
        code: 'function foo() { bar(); }',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'function expression block',
        code: 'const foo = function () { bar(); };',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'arrow function block',
        code: 'const foo = () => { bar(); };',
        message: 'Single-line block bodies are not allowed for statement blocks.',
    },
    {
        name: 'switch block',
        code: 'switch (foo) { case 1: break; }',
        message: 'Single-line block bodies are not allowed for switch blocks.',
    },
    {
        name: 'class block',
        code: 'class Foo { foo; }',
        message: 'Single-line block bodies are not allowed for class blocks.',
    },
    {
        name: 'static block',
        code: 'class Foo {\nstatic { bar(); }\n}',
        message: 'Single-line block bodies are not allowed for static blocks.',
    },
];

for (const configForm of defaultConfigForms) {
    for (const testCase of defaultConfigCases) {
        test(`default config ${configForm.name} rejects ${testCase.name}`, () => {
            const linter = new Linter({ configType: 'eslintrc' });

            linter.defineRule('disallow-single-line-block', rule);

            const messages = linter.verify(testCase.code, {
                parserOptions: {
                    ecmaVersion: 2022,
                    sourceType: 'module',
                },
                rules: {
                    'disallow-single-line-block': configForm.value,
                },
            });

            assert.equal(messages.length, 1);
            assert.equal(messages[0].message, testCase.message);
        });
    }
}