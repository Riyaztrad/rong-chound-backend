const userController = require('../../service/apis/user');
const contentController = require('../../service/apis/content');
const phonebookController = require('../../service/apis/phonebook');
const imageController = require('../../service/apis/image');
const smsController = require('../../service/apis/sms');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
router.use('/contents', contentController);
router.use('/phonebook', phonebookController);
router.use('/images', imageController);
router.use('/sms', smsController);

module.exports = router;
