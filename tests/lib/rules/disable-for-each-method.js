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
  parserOptions: {
    ecmaVersion: 2020
  }
});
ruleTester.run("disable-for-each-method", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: 'for (const i of [121]) {}'
    }
  ],

  invalid: [
    {
      code: "[123].forEach(() => {})",
      errors: [{ message: 'Use "for of" syntax instead.', type: "CallExpression" }],
    },
  ],
});
