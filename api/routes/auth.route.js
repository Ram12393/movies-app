const express = require('express');
const router = express.Router();
const user = require('../controllers/auth.controller')
const auth = require('../middleware/auth');

router.post('/register', user.createUser);
router.post('/login', user.login);
router.post('/update-password', auth, user.changePassword);
router.get('/user-details', auth, user.userDetails)

module.exports = router;