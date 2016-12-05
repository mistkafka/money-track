let Track = require('../models/track');

let trackCtr = module.exports;

trackCtr.add = function(req, res) {
    let newTrack = new Track(req.body);

    newTrack.save().then((data) => {
        return res.json({
            status: true,
            data: data,
        });
    }).catch(function(err) {
        return res.json({
            status: false,
            message: err.toString(),
        });
    });
};

trackCtr.list = function(req, res) {
    Track.find({}).exec().then((tracks) => {
        return res.json({
            status: true,
            data: tracks,
        });
    }).catch((err) => {
        return res.json({
            status: false,
            message: err.toString(),
        });
    });
};
