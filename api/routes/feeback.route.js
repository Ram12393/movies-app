const express = require('express');
const router = express.Router();
const feedback = require('../controllers/feedback.controller');

router.post('/feedback',feedback.createFeedback);
router.get('/feedback/:id',feedback.reviewsByTheatreID);

module.exports = router;
