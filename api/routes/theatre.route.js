const theatre = require('../controllers/theatre.controller');
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/admin');
const auth = require('../middleware/auth');

router.post('/create-theatre',[auth,isAdmin],theatre.createTheatre);
router.get('/all-theatres',[auth,isAdmin],theatre.allTheatres);

module.exports = router;