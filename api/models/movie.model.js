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
        movie_type: {
            type: String,
            required: true
        }
    }],
    actors: [{
        actors: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Actors'
        }
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
        caste: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Caste'
        }
    }]
})