const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateReview(review) {
    const schema = {
        review: Joi.string().required(),
        rating: Joi.number().required().max(5),
    }
    return Joi.validate(review, schema);
}

exports.ValidateReview = validateReview;
exports.MovieReviewSchema = mongoose.model('MoviewReview', MovieReviewSchema);