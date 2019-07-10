const mongoose = require('mongoose');

const MovieReviewSchema = new mongoose.Schema({

    review: {
        type: String,
        required: true,
    },
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    rating: {
        type: Number,
        required: true,
        max: 5
    }
})

module.exports = mongoose.model('MoviewReview', MovieReviewSchema);