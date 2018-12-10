#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { version } = require('./package.json');
const generator = require('./');

program
    .version(version)
    .arguments('<input>')
    .action((input) => {
        inputFile = input;
    })
    .parse(process.argv);

if (typeof inputFile === 'undefined') {
    console.error('no input file given');
    process.exit(1);
}

const file = fs.readFileSync(inputFile);

console.log(generator(file));