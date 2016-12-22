#!/usr/bin/env node

let program = require('commander');

program
    .version('0.0.1')
    .command('add', 'add track record')
    .command('ls', 'list the track record')
    .parse(process.argv);
