const express = require('express');
const Service = require('../../controller/sms/sms');
let router = express.Router();

router.get('/', Service.getsms);

router.post('/', Service.createSms);

module.exports = router;