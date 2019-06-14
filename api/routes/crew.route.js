const crew = require('../controllers/crew.controller');
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/admin');
const auth = require('../middleware/auth');



router.post('/create-crew', [auth, isAdmin], crew.createCrew);

module.exports = router