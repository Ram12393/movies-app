const Movie = require('../models/movie.model');
const HTTP = require('http-status');

exports.createMovie = async (req, res, next) => {
    try {
        const movie = new Movie(req.body);
        movie.save();
        res.status(HTTP.OK).send({
            title: 'Movie',
            message: 'Movie Successfully created'
        })
    } catch (e) {
        return next(e)
    }
}

exports.allMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find().
        populate([{
            path: 'actors'
        }, {
            path: 'caste'
        }]);
        res.status(HTTP.OK).send({
            title: 'Movie List',
            data: movies
        })
    } catch (e) {
        return next(e);
    }
}