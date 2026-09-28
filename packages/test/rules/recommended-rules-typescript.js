/**
 * @fileoverview Validate the published TypeScript recommended config with the ESLint CLI.
 */
"use strict";

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const repoRoot = path.resolve(__dirname, '../../..');
const eslintCli = path.join(repoRoot, 'node_modules', 'eslint', 'bin', 'eslint.js');
const testRoot = path.join(repoRoot, 'packages', 'test', 'ts');
const configPath = 'recommended-eslint.config.js';
const targetFile = 'cases/recommended-rules.ts';

function runRecommendedRulesLint(target = targetFile) {
    return spawnSync(process.execPath, [
        eslintCli,
        '-c',
        configPath,
        '-f',
        'json',
        target,
    ], {
        cwd: testRoot,
        encoding: 'utf8',
    });
}

test('B-M-00001: recommended TypeScript config is accepted by ESLint CLI', () => {
    const result = runRecommendedRulesLint();

    assert.equal(result.status, 1, `${result.stderr}\n${result.stdout}`);
    assert.equal(result.stderr, '');

    const output = JSON.parse(result.stdout);

    assert.equal(output.length, 1);
    assert.equal(output[0].filePath, path.join(testRoot, targetFile));
    assert.ok(output[0].messages.length > 0);
    assert.ok(output[0].messages.every((message) => !message.fatal));
});

test('B-M-00002: recommended TypeScript config wires custom plugin rules', () => {
    const result = runRecommendedRulesLint();
    const output = JSON.parse(result.stdout);
    const ruleIds = output[0].messages.map((message) => message.ruleId);

    assert.ok(ruleIds.includes('@litert/disallow-single-line-block'));
    assert.ok(ruleIds.includes('@litert/disable-for-each-method'));
});

test('B-M-00003: recommended TypeScript config allows returned arrow functions', () => {
    const result = runRecommendedRulesLint('cases/arrow-function.ts');

    assert.equal(result.status, 0, `${result.stderr}\n${result.stdout}`);
    assert.equal(result.stderr, '');

    const output = JSON.parse(result.stdout);

    assert.equal(output.length, 1);
    assert.equal(output[0].filePath, path.join(testRoot, 'cases/arrow-function.ts'));
    assert.deepEqual(output[0].messages, []);
});
