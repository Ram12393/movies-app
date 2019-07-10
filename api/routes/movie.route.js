const express = require('express');
const router = express.Router();
const movie = require('../controllers/movie.controller');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');
const moviewReview = require('../controllers/movie-review.controller');

router.post('/create-movie', [auth, isAdmin], movie.createMovie);
router.get('/all-movies', movie.allMovies);
router.post('/movie-review', moviewReview.createReview);
router.get('/movie-review/:id', moviewReview.reviewsByMovieID);

module.exports = router;