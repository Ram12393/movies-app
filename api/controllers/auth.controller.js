const {
    User,
    ValidateUser
} = require('../models/auth.model');
const HTTP = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    } catch (e) {
        return next(e);
    }
}

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(HTTP.BAD_REQUEST).send({
                message: "Invalid Email or Password!"
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(HTTP.BAD_REQUEST).send({
                message: "Invalid Email or Password!"
            })
        }
        let userObj = user;
        user = new User();
        const token = user.generateAuthToken(userObj._id, userObj.email);
        res.header('x-auth-token', token).status(HTTP.OK).send({
            message: 'Login Successfully',
            token: token
        });
        next();
    } catch (e) {
        return next()
    }
}

exports.changePassword = async (req, res, next) => {
    const user = await User.findOne({
        email: req.user.email
    });

    const validPassword = await bcrypt.compare(req.body.old_password, user.password);
    if (!validPassword) {
        return res.status(HTTP.BAD_REQUEST).send({
            message: "Invalid Email or Password!"
        })
    }
    const salt = await bcrypt.genSalt(10);
    let changePassword = await bcrypt.hash(req.body.new_password, salt);
    changePassword = await User.findByIdAndUpdate(user._id, {
        $set: {
            password: changePassword
        }
    }, {
        new: true
    }).exec();
    res.status(HTTP.OK).send({
        message: 'password successfully chaanged'
    });
    next()
}