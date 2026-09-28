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

function runRecommendedRulesLint() {
    return spawnSync(process.execPath, [
        eslintCli,
        '-c',
        configPath,
        '-f',
        'json',
        targetFile,
    ], {
        cwd: testRoot,
        encoding: 'utf8',
    });
}

test('recommended typescript config is accepted by eslint cli', () => {
    const result = runRecommendedRulesLint();

    assert.equal(result.status, 1, `${result.stderr}\n${result.stdout}`);
    assert.equal(result.stderr, '');

    const output = JSON.parse(result.stdout);

    assert.equal(output.length, 1);
    assert.equal(output[0].filePath, path.join(testRoot, targetFile));
    assert.ok(output[0].messages.length > 0);
    assert.ok(output[0].messages.every((message) => !message.fatal));
});

test('recommended typescript config wires custom plugin rules', () => {
    const result = runRecommendedRulesLint();
    const output = JSON.parse(result.stdout);
    const ruleIds = output[0].messages.map((message) => message.ruleId);

    assert.ok(ruleIds.includes('@litert/disallow-single-line-block'));
    assert.ok(ruleIds.includes('@litert/disable-for-each-method'));
});