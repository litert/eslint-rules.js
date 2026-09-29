'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const testDirectory = __dirname;
const casesDirectory = path.join(testDirectory, 'cases');
const defaultEslintConcurrency = 3;
const eslintCli = path.join(
    testDirectory,
    '../../node_modules/eslint/bin/eslint.js',
);
const requiredCaseFiles = [
    'good.ts',
    'bad.ts',
    'eslint.config.js',
    'validation.test.js',
];

function getEslintConcurrency() {

    const configuredConcurrency = process.env.TEST_ESLINT_CONCURRENCY;

    if (configuredConcurrency === undefined || configuredConcurrency === '') {
        return defaultEslintConcurrency;
    }

    const concurrency = Number(configuredConcurrency);

    if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
        throw new Error(
            'TEST_ESLINT_CONCURRENCY must be a positive integer.',
        );
    }

    return concurrency;
}

function runEslint(caseDirectory, filename) {

    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [
            eslintCli,
            '--config',
            path.join(caseDirectory, 'eslint.config.js'),
            '--format',
            'json',
            '--max-warnings',
            '0',
            filename,
        ], {
            cwd: caseDirectory,
        });
        const stdoutChunks = [];
        const stderrChunks = [];

        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');
        child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));
        child.stderr.on('data', (chunk) => stderrChunks.push(chunk));
        child.once('error', reject);
        child.once('close', (exitCode) => {
            const stderr = stderrChunks.join('');
            let reports;

            try {
                reports = JSON.parse(stdoutChunks.join(''));
            }
            catch (error) {
                reject(new Error(
                    `Failed to parse ESLint output for ${filename}: ${stderr}`,
                    { cause: error },
                ));

                return;
            }

            resolve({
                exitCode,
                diagnostics: reports[0]?.messages ?? [],
                stderr,
            });
        });
    });
}

async function runCases(caseDirectories, concurrency) {

    const jobs = [];
    const resultsByCase = new Map();

    for (const caseDirectory of caseDirectories) {
        for (const filename of requiredCaseFiles) {
            if (!fs.existsSync(path.join(caseDirectory, filename))) {
                throw new Error(
                    `Missing ${filename} in ${path.basename(caseDirectory)}`,
                );
            }
        }

        resultsByCase.set(caseDirectory, {});
        jobs.push({ caseDirectory, filename: 'good.ts', resultKey: 'good' });
        jobs.push({ caseDirectory, filename: 'bad.ts', resultKey: 'bad' });
    }

    let nextJobIndex = 0;
    const workerCount = Math.min(concurrency, jobs.length);
    const workers = Array.from({ length: workerCount }, async () => {

        while (nextJobIndex < jobs.length) {
            const job = jobs[nextJobIndex];

            console.log(
                `Running case [${nextJobIndex + 1}/${jobs.length}]: ` +
                path.basename(job.caseDirectory) +
                ` (${job.resultKey})`,
            );
            nextJobIndex += 1;
            resultsByCase.get(job.caseDirectory)[job.resultKey] = await runEslint(
                job.caseDirectory,
                job.filename,
            );
        }
    });

    const workerResults = await Promise.allSettled(workers);
    const failedWorker = workerResults.find(
        (result) => result.status === 'rejected',
    );

    if (failedWorker) {
        throw failedWorker.reason;
    }

    for (const caseDirectory of caseDirectories) {
        const resultLog = path.join(caseDirectory, 'result.log');

        fs.writeFileSync(
            resultLog,
            `${JSON.stringify(resultsByCase.get(caseDirectory), null, 2)}\n`,
        );
    }
}

const caseDirectories = fs.readdirSync(casesDirectory, {
    withFileTypes: true,
}).filter((entry) => entry.isDirectory()).map((entry) => (
    path.join(casesDirectory, entry.name)
)).sort();

runCases(caseDirectories, getEslintConcurrency()).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
