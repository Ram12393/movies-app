const express = require('express');
const router = express.Router();
const files   = require('../controllers/file-upload.controller');

router.post('/file-upload',files.fileUpload)

module.exports = router;