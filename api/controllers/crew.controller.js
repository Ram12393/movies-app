const Crew = require('../models/crew.model');
const HTTP = require('http-status');

exports.createCrew = async (req, res, next) => {
    try {
        const crew = new Crew(req.body);
        await crew.save();
        res.status(HTTP.OK).send({
            message: 'Crew successfully created'
        });
    } catch (e) {
        return next(e);
    }
}