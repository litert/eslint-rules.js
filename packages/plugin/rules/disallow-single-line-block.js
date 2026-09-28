/**
 * @fileoverview Disallow single-line block bodies except configured cases.
 * @author Angus Fenying
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const EXCEPTION_NAMES = [
  'if',
  'for',
  'while',
  'case',
  'do-while',
  'arrow-callback',
  'function-callback',
  'function',
];

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Disallow single-line block bodies except configured cases',
      category: 'style',
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        anyOf: [
          {
            enum: ['all'],
          },
          {
            type: 'object',
            properties: {
              exception: {
                type: 'object',
                properties: {
                  'if': { type: 'boolean' },
                  'for': { type: 'boolean' },
                  'while': { type: 'boolean' },
                  'case': { type: 'boolean' },
                  'do-while': { type: 'boolean' },
                  'arrow-callback': { type: 'boolean' },
                  'function-callback': { type: 'boolean' },
                  'function': { type: 'boolean' },
                },
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
    messages: {
      unexpectedSingleLineBlock:
        'Single-line block bodies are not allowed for {{kind}} blocks.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;
    const rawOptions = context.options[0];
    const exceptions = (
      rawOptions === undefined || rawOptions === 'all'
    )
      ? {}
      : (rawOptions.exception ?? {});

    function getOpeningCurly(node) {
      return sourceCode.getTokens(node).find((token) => token.value === '{') ?? null;
    }

    function isSingleLineCurlyBlock(node) {
      const openingCurly = getOpeningCurly(node);
      const closingCurly = sourceCode.getLastToken(node);

      if (
        !openingCurly ||
        !closingCurly ||
        openingCurly.value !== '{' ||
        closingCurly.value !== '}'
      ) {
        return false;
      }

      const tokenAfterOpeningCurly = sourceCode.getTokenAfter(openingCurly);
      const tokenBeforeClosingCurly = sourceCode.getTokenBefore(closingCurly);

      if (
        !tokenAfterOpeningCurly ||
        !tokenBeforeClosingCurly ||
        tokenAfterOpeningCurly === closingCurly ||
        tokenBeforeClosingCurly === openingCurly
      ) {
        return false;
      }

      return openingCurly.loc.start.line === closingCurly.loc.end.line;
    }

    function isCallbackFunction(functionNode) {
      const functionOwner = functionNode.parent;

      if (
        functionOwner?.type !== 'CallExpression' &&
        functionOwner?.type !== 'NewExpression'
      ) {
        return false;
      }

      return functionOwner.arguments.includes(functionNode);
    }

    function getAllowedKind(node) {
      const parent = node.parent;

      switch (parent?.type) {
        case 'IfStatement':
          return exceptions.if ? 'if' : null;

        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
          return exceptions.for ? 'for' : null;

        case 'WhileStatement':
          return exceptions.while ? 'while' : null;

        case 'DoWhileStatement':
          return exceptions['do-while'] ? 'do-while' : null;

        case 'SwitchCase':
          return exceptions.case ? 'case' : null;

        case 'FunctionDeclaration':
          return exceptions.function ? 'function' : null;

        case 'FunctionExpression':
          if (isCallbackFunction(parent)) {
            return exceptions['function-callback']
              ? 'function-callback'
              : null;
          }

          return exceptions.function ? 'function' : null;

        case 'ArrowFunctionExpression':
          if (isCallbackFunction(parent)) {
            return exceptions['arrow-callback']
              ? 'arrow-callback'
              : null;
          }

          return exceptions.function ? 'function' : null;

        default:
          return null;
      }
    }

    function report(node, kind) {
      context.report({
        node,
        messageId: 'unexpectedSingleLineBlock',
        data: {
          kind,
        },
      });
    }

    function validateSingleLineBlock(node, defaultKind) {
      if (!isSingleLineCurlyBlock(node)) {
        return;
      }

      const allowedKind = getAllowedKind(node);

      if (allowedKind !== null) {
        return;
      }

      report(node, defaultKind);
    }

    return {
      BlockStatement(node) {
        validateSingleLineBlock(node, 'statement');
      },
      ClassBody(node) {
        validateSingleLineBlock(node, 'class');
      },
      StaticBlock(node) {
        validateSingleLineBlock(node, 'static');
      },
      SwitchStatement(node) {
        validateSingleLineBlock(node, 'switch');
      },
    };
  },
};