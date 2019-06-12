const express = require('express');
const router = express.Router();
const actors = require('../controllers/actors.controller');
const isAdmin = require('../middleware/admin');
const auth = require('../middleware/auth');

router.post('/actors', [auth,isAdmin],actors.createActors);

module.exports = router;