const Area = require('../models/area.model');
const City = require('../models/city.model');
const HTTP = require('http-status');

exports.createArea = async (req, res, next) => {
    try {
        let lastInsertRecord = await Area.find({}).sort('-1');
        if (!lastInsertRecord.length) {
            lastInsertRecord.push({
                area_id: 700
            });
        }
        lastInsertRecord.forEach(el => {
            req.body.area_id = el.area_id + 1;
        });
        const cityID = await City.findOne({
            city_id: req.body.city_id
        })
        if (!cityID) {
            return res.status(HTTP.NOT_FOUND).send({
                error: 'There is no city available with this id'
            })
        }
        const area = new Area(req.body);
        await area.save()
        res.status(HTTP.OK).send({
            message: 'Area successfully saved'
        })
    } catch (e) {
        return next(e);
    }
}

exports.allAreaList = async (req, res, next) => {
    try {
        let area = await Area.find();
        area = area.filter(el => {
            return el.city_id == req.params.id
        })
        if (!area.length) {
            return res.status(HTTP.NOT_FOUND).send({
                message: 'There is no data'
            });
        }
        res.status(HTTP.OK).send({
            title: 'Area List',
            data: area
        });
    } catch (e) {
        return next(e);
    }
}

exports.updateArea = async (req, res, next) => {
    try {
        console.log(req.params);
        const area = await Area.findOne({
            area_id: req.params.id
        })
        if (!area) {
            return res.status(HTTP.NOT_FOUND).send({
                error: "No area found to update"
            });
        }
        await Area.findByIdAndUpdate(area._id, {
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
exports.delAreaArea = async (req, res, next) => {
    try {
        console.log(req.params);
        const area = await Area.findOne({
            area_id: req.params.id
        })
        if (!area) {
            return res.status(HTTP.NOT_FOUND).send({
                error: "No area found to update"
            });
        }
        await Area.findByIdAndDelete(area._id).exec();
        res.status(HTTP.OK).send({
            message: 'Area Deleted'
        })
    } catch (e) {
        return next(e);
    }
}