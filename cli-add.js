#!/usr/bin/env node

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const request = require('request-promise');

program
    .usage('[options] <money>')
    .option('-t, --tags', 'has track tags')
    .option('-n, --note', 'has track note')
    .action((money) => {
        co(function *() {
            let tags = '';
            let note = '';

            if (program.tags) {
                tags = (yield prompt('tags:')).trim('').replace('，', ',').replace(',$', '');
            }
            if (program.note) {
                note = yield prompt('note:');
            }

            let requestOpt = {
                uri: 'http://localhost:3000/api1/track/add',
                method: 'POST',
                body: {
                    money: money,
                    tags: tags,
                    note: note,
                },
                json: true
            };

            request(requestOpt).then((res) => {
                process.exit(0);
            }).catch((err) => {
                console.error(err);
                process.exit(1);
            });
        }).catch((err) => {
            console.error(err);
            progress.exit(1);
        });
    })
    .parse(process.argv);
