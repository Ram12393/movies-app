const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.post('/create-movie', [auth, isAdmin], movie.createMovie);
router.get('/all-movies', movie.allMovies);

module.exports = router;