const Actors = require('../models/actors.model');
const HTTP = require('http-status');


exports.createActors = async (req, res, next) => {
    try {
        const actors = new Actors(req.body);
        await actors.save();
        res.status(HTTP.OK).send({
            message:'Actor(s) are created successfully'
        })
    } catch (e) {
        return next(e);
    }
}