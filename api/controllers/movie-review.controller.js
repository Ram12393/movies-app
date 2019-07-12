const {
    MovieReview,
    ValidateReview
} = require('../models/movie-review.model');
const HTTP = require('http-status');
const mongoose = require('mongoose');


exports.createReview = async (req, res, next) => {
    try {
        const {
            error
        } = ValidateReview(req.body);
        if (error) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: error.details[0].message
            });
        }
        const movie = mongoose.Types.ObjectId.isValid(req.body.movie_id);
        if (!movie) {
            return res.status(HTTP.NOT_FOUND).send({
                error: `Oops ! we didn't find the movie `
            })
        }
        const review = new MovieReview(req.body);
        await review.save();
        res.status(HTTP.OK).send({
            message: 'Movie Review successfully posted'
        })
    } catch (e) {
        return next(e);
    }
}

exports.reviewsByMovieID = async (req, res, next) => {

    try {

        const movie = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!movie) {
            return res.status(HTTP.NOT_FOUND).send({
                error: `Oops ! we didn't find any movie reviews `
            })
        }
        let movieReview = await MovieReview.find();
        movieReview = movieReview.filter(el => {
            return el.movie_id == req.params.id
        })
        res.status(HTTP.OK).send({
            title: 'Movie Reviews',
            data: movieReview
        });
    } catch (e) {
        return next(e);
    }
}