const Theatre = require('../models/theatre.model');
const HTTP = require('http-status');


exports.createTheatre = async (req, res, next) => {
    try {
        const theatre = new Theatre(req.body);
        await theatre.save()
        res.status(HTTP.OK).send({
            message: 'thatre successfully saved'
        })
    } catch (e) {
        return next(e);
    }
}

exports.allTheatres = async (req, res, next) => {
    try {
        const theatres = await Theatre.find().populate([{
            path: 'city_name'
        }, {
            path: 'area_name'   
        }]);
        res.status(HTTP.OK).send({
            title: 'All Theatres ',
            data: theatres
        })
    } catch (e) {
        return next(e)
    }
}