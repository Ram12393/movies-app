const {
    User,
    ValidateUser
} = require('../models/auth.model');
const HTTP = require('http-status');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    try {

        const {
            error
        } = ValidateUser(req.body);
        if (error) {
            return res.status(HTTP.BAD_REQUEST).send({
                error: error.details[0].message
            });
        }

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            res.status(HTTP.BAD_REQUEST).send({
                message: 'Email already exist'
            })
        }

        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        res.status(HTTP.OK).send({
            message: 'Successfully registered'
        });
        next();
    }catch (e) {
        return next();
    }
} 

exports.login = async (req, res, next) => {

}