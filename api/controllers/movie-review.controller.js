const {
    MovieReview,
    ValidateReview
} = require('../models/movie-review.model');

const {
    Movie
} = require('../models/movie.model');
const HTTP = require('http-status');
const mongoose = require('mongoose');
const _ = require('lodash');




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

        const existingReviews = await MovieReview.find({
            movie_id: req.body.movie_id
        });

        const totalReviewCount = _.reduce(existingReviews, function (sum, n) {
            return sum + n.rating;
        }, 0);

        await Movie.findByIdAndUpdate(
            req.body.movie_id, {
                $set: {
                    movie_review: {
                        no_of_reviews: existingReviews.length,
                        overall_rating: (totalReviewCount / existingReviews.length).toFixed(1)
                    }
                }
            }
        )
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