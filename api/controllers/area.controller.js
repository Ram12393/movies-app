const Area = require('../models/area.model');
const HTTP = require('http-status');

exports.createArea = async (req, res, next) => {
    try {
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
        const area = await Area.find();
        if (!area.length) {
            return res.status(HTTP.OK).send({
                message: 'Ther is no data'
            });
        }
        res.status(HTTP.OK).send(
            {
                title:'Area List',
                data:area
            }
        );
    } catch (e) {
        return next(e);
    }

}