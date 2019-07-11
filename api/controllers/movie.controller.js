const {
    Movie,
    ValidateMovie
} = require('../models/movie.model');
const HTTP = require('http-status');

exports.createMovie = async (req, res, next) => {
    try {
        const {
            error
        } = ValidateMovie(req.body)
        if (error) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: error.details[0].message
            })
        }
        const movie = new Movie(req.body);
        await movie.save();

        res.status(HTTP.OK).send({
            title: 'Movie',
            message: 'Movie Successfully created'
        })
    } catch (e) {
        //  next(e => {
        res.send({
            error: e.errmsg
        })
        // })
        // return next(e)
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