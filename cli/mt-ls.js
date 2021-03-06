#!/usr/bin/env node

const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const request = require('request-promise');
const tto = require('terminal-table-output').create();
const moment = require('moment');

program
    .usage('[options]')
    .parse(process.argv);

co(function *() {
    let requestOpt = {
        uri: `http://${process.env.MT_HOST || 'localhost:3000'}/api1/track/list`
    };
    request(requestOpt).then((res) => {
        let tracks = JSON.parse(res).data;
        tto.line('-');
        tto.pushrow(['time', 'money', 'tags', 'note']);
        tto.line('-');
        tracks.forEach((track) => {
            tto.pushrow([moment(track.time).format('MM-DD-YYYY'), track.money, track.tags, track.note]);
        });
        tto.line('-');
        tto.print(true);
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
