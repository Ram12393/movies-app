const city = require('../controllers/city.controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.post('/create-city',[auth,isAdmin],city.createCity);
router.get('/cities-list',[auth,isAdmin],city.allCities);
router.put('/update-city/:id',[auth,isAdmin],city.updateCity);
router.delete('/delete-city/:id',[auth,isAdmin],city.deleteCity);
module.exports = router;