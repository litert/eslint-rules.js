/**
 * @fileoverview Disable Array.prototype.forEach method
 * @author Angus Fenying
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Disable Array.prototype.forEach method",
      category: "method",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      CallExpression: function reportUnwantedName(node) {

        if (node.callee?.property?.name === "forEach") {
          context.report({
            node: node,
            message: [
              'Use "for of" syntax instead.'].join('')
          });
        }
      }
    };
  },
};
