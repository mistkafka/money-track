#!/usr/bin/env node

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const request = require('request-promise');

program
    .usage('[options] <money>')
    .option('-t, --tags <tags>', 'track tags', /^.+$/i, '')
    .option('-n, --note <note>', 'track note', /^.+$/i, '')
    .action((money) => {
        co(function *() {
            let requestOpt = {
                uri: `http://${process.env.MT_HOST || 'localhost:3000'}/api1/track/add`,
                method: 'POST',
                body: {
                    money: Number.parseFloat(money).toFixed(2, 10),
                    tags: program.tags.replace(/(\s)|(,$)/g, ''),
                    note: program.note,
                },
                json: true
            };

            request(requestOpt).then((res) => {
                if (!process.env.MT_RELEASE) {
                    console.log(res);
                }
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
