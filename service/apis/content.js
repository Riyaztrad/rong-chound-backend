const express = require('express');
const contentService = require('../../controller/content/content');
let router = express.Router();

router.get('/', contentService.getContents);

router.get('/:id', contentService.getContentsById);

router.post('/', contentService.createContent);

router.put('/:id', contentService.updateContent);

router.delete('/:id', contentService.deleteContent);

module.exports = router;