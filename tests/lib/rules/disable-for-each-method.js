/**
 * @fileoverview Disable Array.prototype.forEach method
 * @author Angus Fenying
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/disable-for-each-method"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    languageOptions: {

        parserOptions: {
            tsconfigRootDir: __dirname,
        },
        parser: require('@typescript-eslint/parser'),
    },
});
ruleTester.run("disable-for-each-method", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: 'for (const i of [121]) {}'
    },
    {
      code: 'for (const {k, v} of Object.entries({ a: 123, b: 345 })) {}'
    },
  ],

  invalid: [
    {
      code: "[123].forEach(() => {})",
      errors: [{ message: 'Use "for of" syntax instead.', type: "CallExpression" }],
    },
    {
      code: "[{ a: 123, b: 345 }, { a: 123, b: 111 }].forEach(() => {})",
      errors: [{ message: 'Use "for of" syntax instead.', type: "CallExpression" }],
    },
  ],
});
