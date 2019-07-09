const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const jwtPrivateKey = require('../../config/config');


const User = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile_number: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        mobile_number: Joi.number().required(),
        password: Joi.string().min(6).max(1024).required(),
        isAdmin: Joi.boolean().optional()
    }
    return Joi.validate(user, schema);
}

User.methods.generateAuthToken = function (id, email) {
    const token = jwt.sign({
        _id: id,
        email: email,
        exp: Math.floor(Date.now() / 1000) + (1200 * 1200)
    }, jwtPrivateKey.JWT_SECRET);
    return token;
}

exports.ValidateUser = validateUser;
exports.User = mongoose.model('User', User);