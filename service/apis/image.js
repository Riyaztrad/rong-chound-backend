const express = require('express');
const Service = require('../../controller/image/image');
let router = express.Router();

router.get('/', Service.getimage);

router.post('/', Service.createImage);

module.exports = router;