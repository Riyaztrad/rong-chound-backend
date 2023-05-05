const express = require('express');
const phoneBookService = require('../../controller/phonebook/phonebook');
let router = express.Router();

router.get('/', phoneBookService.getPhoneBook);

router.get('/:id', phoneBookService.getByUserId);

router.post('/', phoneBookService.createPhoneBook);

module.exports = router;