const area = require('../controllers/area.controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.post('/create-area',[auth,isAdmin],area.createArea);
router.get('/areas-list',[auth,isAdmin],area.allAreaList);
module.exports = router;