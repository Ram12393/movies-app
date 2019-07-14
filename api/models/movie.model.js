const mongoose = require('mongoose');
const Joi = require('joi');

const MoviesSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
        unique: true,
    },
    movie_poster: {
        required: true,
        type: String
    },
    slug: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true
    },
    movie_type: [{
        type: {
            type: String,
            required: true
        }
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actors',
    }],
    release_date: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    about_movie: {
        type: String,
        required: true
    },
    caste: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crew',
    }],
    movie_review: {
        no_of_reviews: {
            type: Number,
            default: null
        },
        overall_rating: {
            type: Number,
            default: null
        }

    }
})

function validateMovie(review) {
    const schema = {
        movie_name: Joi.string().required(),
        movie_poster: Joi.string().required(),
        language: Joi.string().required(),
        certificate: Joi.string().required(),
        movie_type: Joi.required(),
        actors: Joi.required(),
        caste: Joi.array().required(),
        release_date: Joi.date().required(),
        duration: Joi.string().required(),
        about_movie: Joi.string().required(),
    }
    return Joi.validate(review, schema);
}

exports.ValidateMovie = validateMovie;
exports.Movie = mongoose.model('Movie', MoviesSchema)