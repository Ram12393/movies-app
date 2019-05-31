const area = require('../controllers/area.controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.post('/create-area', [auth, isAdmin], area.createArea);
router.get('/areas-list/:id', [auth, isAdmin], area.allAreaList); // area list by city ID
router.put('/update-area/:id', [auth, isAdmin], area.updateArea)
router.delete('/delete-area/:id', [auth, isAdmin], area.delAreaArea)
module.exports = router;