const express = require('express');
const userService = require('../../controller/users/user');
let router = express.Router();

router.get('/', userService.getUsers);

router.get('/:id', userService.getUserById);

router.post('/', userService.createUser);

router.put('/:id', userService.updateUser);

router.delete('/:id', userService.deleteUser);
router.post('/', userService.generateOTP);

module.exports = router;