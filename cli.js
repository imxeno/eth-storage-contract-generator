#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { version } = require('./package.json');
const generate = require('./');

program
    .version(version)
    .arguments('<input file>')
    .action((input) => {
        inputFile = input;
    })
    .parse(process.argv);

if (typeof inputFile === 'undefined') {
    program.outputHelp();
    process.exit(1);
}

const file = fs.readFileSync(inputFile);

console.log(generate(file));