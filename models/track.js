let db = require('./db');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    tags: String,
    money: {type: Number, default: 1},
    time: {type: Date, default: Date.now},
    note: String
});

let Track = db.model('track', schema);

module.exports = Track;
