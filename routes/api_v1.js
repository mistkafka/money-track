let express = require('express');
let router = express.Router();

let track = require('../controllers/track');

router.post('/track/add', track.add);
router.get(`/track/list`, track.list);

module.exports = router;
