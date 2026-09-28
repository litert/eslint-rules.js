/**
 * @fileoverview Disallow single-line block bodies except configured cases.
 * @author Angus Fenying
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const DEFAULT_EXCEPTIONS = {
  getter: true,
  setter: true,
  object: true,
};

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
                  'catch': { type: 'boolean' },
                  'finally': { type: 'boolean' },
                  'arrow-callback': { type: 'boolean' },
                  'arrow-function': { type: 'boolean' },
                  'function-callback': { type: 'boolean' },
                  'function': { type: 'boolean' },
                  'getter': { type: 'boolean' },
                  'setter': { type: 'boolean' },
                  'object': { type: 'boolean' },
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
    const exceptions = rawOptions === 'all'
      ? {}
      : { ...DEFAULT_EXCEPTIONS, ...(rawOptions?.exception ?? {}) };

    function getOpeningCurly(node) {
      return sourceCode.getTokens(node).find((token) => token.value === '{') ?? null;
    }

    function isSingleLineCurlyBlock(node) {
      const openingCurly = getOpeningCurly(node);

      return openingCurly !== null &&
        openingCurly.loc.start.line === sourceCode.getLastToken(node).loc.end.line;
    }

    function isEmptyCurlyBlock(node) {
      const openingCurly = getOpeningCurly(node);

      return openingCurly !== null &&
        sourceCode.getTokenAfter(openingCurly) === sourceCode.getLastToken(node);
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

    function getAccessorKind(functionNode) {
      switch (functionNode.parent?.kind) {
        case 'get':
          return 'getter';

        case 'set':
          return 'setter';

        default:
          return null;
      }
    }

    function getAllowedKind(node) {
      if (node.type === 'ObjectExpression') {
        return exceptions.object ? 'object' : null;
      }

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

        case 'CatchClause':
          return exceptions.catch ? 'catch' : null;

        case 'TryStatement':
          return parent.finalizer === node && exceptions.finally
            ? 'finally'
            : null;

        case 'SwitchCase':
          return exceptions.case ? 'case' : null;

        case 'FunctionDeclaration':
          return exceptions.function ? 'function' : null;

        case 'FunctionExpression':
          const accessorKind = getAccessorKind(parent);

          if (accessorKind !== null) {
            return exceptions[accessorKind] ? accessorKind : null;
          }

          if (isCallbackFunction(parent)) {
            return exceptions['function-callback']
              ? 'function-callback'
              : (exceptions.function ? 'function' : null);
          }

          return exceptions.function ? 'function' : null;

        case 'ArrowFunctionExpression':
          if (isCallbackFunction(parent)) {
            if (exceptions['arrow-callback']) {
              return 'arrow-callback';
            }

            return exceptions.function ? 'function' : null;
          }

          if (exceptions['arrow-function']) {
            return 'arrow-function';
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
      if (
        !isSingleLineCurlyBlock(node) ||
        isEmptyCurlyBlock(node)
      ) {
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
      StaticBlock(node) {
        validateSingleLineBlock(node, 'static');
      },
      SwitchStatement(node) {
        validateSingleLineBlock(node, 'switch');
      },
      ObjectExpression(node) {
        validateSingleLineBlock(node, 'object');
      },
    };
  },
};
