/**
 * @fileoverview Verify disallow-single-line-block configuration behavior.
 * @author Angus Fenying
 */
"use strict";

const assert = require('node:assert/strict');
const test = require('node:test');
const { Linter } = require('eslint');
const typescriptParser = require('@typescript-eslint/parser');

const rule = require('@litert/eslint-plugin/rules/disallow-single-line-block');

const RULE_ID = 'local/disallow-single-line-block';
const RULE_MESSAGE =
    'Single-line block bodies are not allowed for {{kind}} blocks.';

function createExceptionOptions(name, enabled) {
    return ['error', {
        exception: {
            [name]: enabled,
        },
    }];
}

function lint(code, ruleOptions = ['error'], parser = null) {
    return new Linter().verify(code, [{
        plugins: {
            local: {
                rules: {
                    'disallow-single-line-block': rule,
                },
            },
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            ...(parser === null ? {} : { parser }),
        },
        rules: {
            [RULE_ID]: ruleOptions,
        },
    }]);
}

function assertViolationKinds(code, ruleOptions, expectedKinds, parser = null) {
    const messages = lint(code, ruleOptions, parser);
    const actualKinds = messages.map((message) => {
        assert.equal(message.messageId, 'unexpectedSingleLineBlock');

        return message.message.match(/for (.+) blocks\.$/)[1];
    });

    assert.deepEqual(actualKinds, expectedKinds, `code: ${code}`);
}

const exceptionCases = [
    {
        name: 'if consequent',
        exception: 'if',
        code: 'if (ready) { work(); }',
    },
    {
        name: 'for statement',
        exception: 'for',
        code: 'for (;;) { break; }',
    },
    {
        name: 'for-in statement',
        exception: 'for',
        code: 'for (const key in object) { work(key); }',
    },
    {
        name: 'for-of statement',
        exception: 'for',
        code: 'for (const item of items) { work(item); }',
    },
    {
        name: 'while statement',
        exception: 'while',
        code: 'while (ready) { break; }',
    },
    {
        name: 'case block',
        exception: 'case',
        code: 'switch (value) {\ncase 1: { break; }\n}',
    },
    {
        name: 'do-while statement',
        exception: 'do-while',
        code: 'do { work(); } while (ready);',
    },
    {
        name: 'catch block',
        exception: 'catch',
        code: 'try {\n    work();\n} catch (error) { recover(error); }',
    },
    {
        name: 'finally block',
        exception: 'finally',
        code: 'try {\n    work();\n} finally { cleanup(); }',
    },
    {
        name: 'arrow callback',
        exception: 'arrow-callback',
        code: 'use(() => { work(); });',
    },
    {
        name: 'ordinary arrow function',
        exception: 'arrow-function',
        code: 'const work = () => { run(); };',
    },
    {
        name: 'function callback',
        exception: 'function-callback',
        code: 'use(function () { work(); });',
    },
    {
        name: 'function declaration',
        exception: 'function',
        code: 'function work() { run(); }',
    },
    {
        name: 'function expression',
        exception: 'function',
        code: 'const work = function () { run(); };',
    },
    {
        name: 'arrow callback with general function exception',
        exception: 'function',
        code: 'use(() => { work(); });',
    },
    {
        name: 'function callback with general function exception',
        exception: 'function',
        code: 'use(function () { work(); });',
    },
    {
        name: 'getter',
        exception: 'getter',
        code: 'const value = { get item() { return 1; } };',
    },
    {
        name: 'setter',
        exception: 'setter',
        code: 'const value = { set item(next) { update(next); } };',
    },
    {
        name: 'object expression',
        exception: 'object',
        code: 'const value = { item: 1 };',
        expectedKind: 'object',
    },
];

for (const [index, testCase] of exceptionCases.entries()) {
    const enabledSequence = String(index + 1).padStart(5, '0');
    const disabledSequence = String(
        index + exceptionCases.length + 1,
    ).padStart(5, '0');

    test(
        `B-M-${enabledSequence}: exception "${testCase.exception}" enabled ` +
        `permits ${testCase.name} (violations: [])`,
        () => {
            assertViolationKinds(
                testCase.code,
                createExceptionOptions(testCase.exception, true),
                [],
            );
        },
    );

    test(
        `B-M-${disabledSequence}: exception "${testCase.exception}" disabled ` +
        `rejects ${testCase.name} ` +
        `(violations: [${testCase.expectedKind ?? 'statement'}])`,
        () => {
            assertViolationKinds(
                testCase.code,
                createExceptionOptions(testCase.exception, false),
                [testCase.expectedKind ?? 'statement'],
            );
        },
    );
}

const scopeCases = [
    {
        name: 'arrow-callback does not permit ordinary arrow functions',
        exception: 'arrow-callback',
        code: 'const work = () => { run(); };',
    },
    {
        name: 'arrow-function does not permit arrow callbacks',
        exception: 'arrow-function',
        code: 'use(() => { work(); });',
    },
    {
        name: 'function-callback does not permit function declarations',
        exception: 'function-callback',
        code: 'function work() { run(); }',
    },
];

for (const [index, testCase] of scopeCases.entries()) {
    const sequence = String(index + 1).padStart(5, '0');

    test(
        `B-E-${sequence}: ${testCase.name} (violations: [statement])`,
        () => {
            assertViolationKinds(
                testCase.code,
                createExceptionOptions(testCase.exception, true),
                ['statement'],
            );
        },
    );
}

const defaultConfigForms = [
    ['"error"', 'error'],
    ['["error"]', ['error']],
    ['["error", {}]', ['error', {}]],
    ['["error", "all"]', ['error', 'all']],
];

for (const [index, [name, options]] of defaultConfigForms.entries()) {
    const sequence = String(
        index + exceptionCases.length * 2 + 1,
    ).padStart(5, '0');

    test(
        `B-M-${sequence}: default config ${name} rejects a statement block ` +
        '(violations: [statement])',
        () => {
            assertViolationKinds('if (ready) { work(); }', options, ['statement']);
        },
    );
}

const defaultAllowedCases = [
    ['getter', 'const value = { get item() { return 1; } };'],
    ['setter', 'const value = { set item(next) { update(next); } };'],
    ['object expression', 'const value = { item: 1 };'],
];

for (const [index, [name, code]] of defaultAllowedCases.entries()) {
    const sequence = String(
        index + exceptionCases.length * 2 + defaultConfigForms.length + 1,
    ).padStart(5, '0');

    test(
        `B-M-${sequence}: default config permits a non-empty ${name} ` +
        '(violations: [])',
        () => {
            assertViolationKinds(code, ['error'], []);
        },
    );
}

test('B-M-00046: "all" rejects a non-empty object expression', () => {
    assertViolationKinds('const value = { item: 1 };', ['error', 'all'], ['object']);
});

const defaultRejectedCases = [
    ['static block', 'class Example {\n    static { work(); }\n}', ['static']],
    ['switch body', 'switch (value) { case 1: break; }', ['switch']],
];

for (const [index, [name, code, expectedKinds]] of defaultRejectedCases.entries()) {
    const sequence = String(index + 47).padStart(5, '0');

    test(
        `B-M-${sequence}: default config rejects a non-empty ${name} ` +
        `(violations: [${expectedKinds.join(', ')}])`,
        () => {
            assertViolationKinds(code, ['error'], expectedKinds);
        },
    );
}

const emptyBlockCases = [
    ['statement block', 'if (ready) {}', ['error']],
    ['comment-only statement block', 'if (ready) { /* intentional */ }', ['error']],
    ['arrow function', 'const empty = () => {};', ['error']],
    ['static block', 'class Example {\nstatic {}\n}', ['error']],
    ['switch body', 'switch (value) {}', ['error']],
    ['object expression', 'const value = {};', createExceptionOptions('object', false)],
    [
        'catch block',
        'try {\n    work();\n} catch (error) {}',
        createExceptionOptions('catch', false),
    ],
    [
        'finally block',
        'try {\n    work();\n} finally {}',
        createExceptionOptions('finally', false),
    ],
    [
        'getter',
        'const value = { get item() {} };',
        createExceptionOptions('getter', false),
    ],
    [
        'setter',
        'const value = { set item(next) {} };',
        createExceptionOptions('setter', false),
    ],
    ['class body', 'class Example {}', ['error']],
];

for (const [index, [name, code, options]] of emptyBlockCases.entries()) {
    const sequence = String(index + 4).padStart(5, '0');

    test(`B-E-${sequence}: empty ${name} is allowed (violations: [])`, () => {
        assertViolationKinds(code, options, []);
    });
}

test('B-E-00015: multiline statement block is allowed (violations: [])', () => {
    assertViolationKinds('if (ready) {\n    work();\n}', ['error'], []);
});

const emptyNonArrowFunctionCases = [
    ['function declaration', 'function empty() {}'],
    ['function callback', 'use(function () {})'],
    ['comment-only function', 'function empty() { /* intentional */ }'],
    ['constructor in a single-line class body', 'class Example { constructor() {} }'],
    ['method in a single-line class body', 'class Example { method() {} }'],
    ['object method', 'const example = {\n    method() {}\n};'],
    ['class property in a single-line class body', 'class Example { property; }'],
];

for (const [index, [name, code]] of emptyNonArrowFunctionCases.entries()) {
    const sequence = String(index + 16).padStart(5, '0');

    test(
        `B-E-${sequence}: empty ${name} is allowed (violations: [])`,
        () => {
            assertViolationKinds(code, ['error'], []);
        },
    );
}

const emptyTypeScriptCases = [
    ['interface', 'interface Example {}'],
    ['type literal', 'type Example = {}'],
    ['enum', 'enum Example {}'],
    ['namespace', 'namespace Example {}'],
];

for (const [index, [name, code]] of emptyTypeScriptCases.entries()) {
    const sequence = String(index + 23).padStart(5, '0');

    test(`B-E-${sequence}: empty TypeScript ${name} is allowed (violations: [])`, () => {
        assertViolationKinds(code, ['error', 'all'], [], typescriptParser);
    });
}

test('B-U-00001: preserves the public diagnostic message template', () => {
    assert.equal(
        rule.meta.messages.unexpectedSingleLineBlock,
        RULE_MESSAGE,
    );
});
