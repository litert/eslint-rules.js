'use strict';

const NodeAssert = require('node:assert/strict');
const NodeFS = require('node:fs');
const NodePath = require('node:path');
const NodeTest = require('node:test');

function validateCase(caseDirectory, expectedRuleId, expectations = {}) {

    const {
        diagnosticCount = 1,
        message,
    } = expectations;

    const resultLog = NodePath.join(caseDirectory, 'result.log');
    const results = JSON.parse(NodeFS.readFileSync(resultLog, 'utf8'));

    NodeTest.describe(NodePath.basename(caseDirectory), () => {

        NodeTest('Good case passes ESLint without diagnostics', () => {
            NodeAssert.equal(results.good.exitCode, 0, results.good.stderr);
            NodeAssert.deepEqual(results.good.diagnostics, []);
        });

        NodeTest('Bad case fails ESLint with the expected rule', () => {
            NodeAssert.notEqual(results.bad.exitCode, 0, results.bad.stderr);
            NodeAssert.equal(
                results.bad.diagnostics.length,
                diagnosticCount,
                `Expected ${diagnosticCount} diagnostics`,
            );
            NodeAssert.ok(results.bad.diagnostics.every(
                (diagnostic) => diagnostic.ruleId === expectedRuleId,
            ),
            `Expected diagnostics for ${expectedRuleId}`);

            if (message !== undefined) {
                NodeAssert.ok(
                    results.bad.diagnostics.every(
                        (diagnostic) => diagnostic.message === message,
                    ),
                    `Expected diagnostic message: ${message}`,
                );
            }
        });
    });
}

module.exports = validateCase;