const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    movie_name: {
        required: true,
        unique: true,
        type: String
    },
    movie_poster: {
        required: true,
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
            ref: 'Actors'
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
        ref: 'Crew'
    }],
    movie_review: [{
        total_reviews: {
            type: Number,
            default: {}
        },
        rating: {
            type: Number,
            default: {}
        }

    }]
})

module.exports = mongoose.model('Movie', MoviesSchema)