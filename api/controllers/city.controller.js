const City = require('../models/city.model');
const HTTP = require('http-status');

exports.createCity = async (req, res, next) => {
    try {
        let lastInsertRecord = await City.find({}).sort('-1');
        if (!lastInsertRecord.length) {
            lastInsertRecord.push({
                city_id: 151
            });
        }
        lastInsertRecord.forEach(el => {
            req.body.city_id = el.city_id + 1;
        });
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
exports.updateCity = async (req, res, next) => {
    try {
        console.log(req.params);
        const city = await City.findOne({
            city_id: req.params.id
        })
        if (!city) {
            return res.status(HTTP.NOT_FOUND).send({
                error: "No City found to update"
            });
        }
        await City.findByIdAndUpdate(city._id, {
            $set: req.body
        }, {
            new: true
        }).exec();
        res.status(HTTP.OK).send({
            message: 'Area updated'
        })
    } catch (e) {
        return next(e);
    }
}
exports.deleteCity = async (req, res, next) => {
    try {
        const city = await City.findOne({
            city_id: req.params.id
        })
        if (!city) {
            return res.status(HTTP.NOT_FOUND).send({
                error: "No area found to update"
            });
        }
        await City.findByIdAndDelete(city._id).exec();
        res.status(HTTP.OK).send({
            message: 'City Deleted'
        })
    } catch (e) {
        return next(e);
    }
}