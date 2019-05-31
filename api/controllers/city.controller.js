const City = require('../models/city.model');
const HTTP = require('http-status');

exports.createCity = async (req, res, next) => {
    try {
        let lastInserRecord = await City.find({}).sort('-1');
        if (!lastInserRecord.length) {
            lastInserRecord = [{
                id: 151
            }]
        }
        req.body.id = lastInserRecord[0].id + 1;
        const city = new City(req.body);
        await city.save()
        res.status(HTTP.OK).send({
            message: 'City successfully saved'
        })
    } catch (e) {
        return next(e);
    }
}

exports.allCities = async (req, res, next) => {
    try {
        const cities = await City.find();
        if (!cities.length) {
            return res.status(HTTP.OK).send({
                message: 'Ther is no data'
            });
        }
        res.status(HTTP.OK).send({
            title: 'City List',
            data: cities
        });
    } catch (e) {
        return next(e);
    }

}