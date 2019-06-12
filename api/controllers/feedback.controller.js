const Feedback = require('../models/feedback.model');
const Theatre = require('../models/theatre.model');
const HTTP = require('http-status');

exports.createFeedback = async (req, res, next) => {
    try {
        const theatre = await Theatre.findById({
            _id: req.body.theatre_id
        });
        if (!theatre) {
            return res.status(HTTP.NOT_FOUND).send({
                message: 'thare is no theatre with this ID'
            })
        }
        // const updateTheatreModel = await Theatre.findByIdAndUpdate({
        //     _id: req.body.theatre_id
        // }, {
        //     $set: {
        //         feedback: req.body
        //     }
        // }, {
        //     new: true
        // })
        // updateTheatreModel.save();
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(HTTP.OK).send({
            message: 'review successfully posted'
        })
    } catch (e) {
        return next(e);
    }
}

exports.reviewsByTheatreID = async (req, res, next) => {
    try {
        const theatre = await Theatre.findById({
            _id: req.params.id
        });
        if (!theatre) {
            return res.status(HTTP.NOT_FOUND).send({
                message: 'thare is no theatre with this ID'
            })
        }
        let reviews = await Feedback.find()
        reviews = reviews.filter(el => {
            return el.theatre_id == req.params.id
        })
        res.status(HTTP.OK).send({
            title: 'Reviews',
            data: reviews
        })
    } catch (e) {
        return next(e)
    }
}