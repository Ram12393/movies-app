const mongoose = require('mongoose');
const Joi = require('joi');

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
    }

});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        mobile_number: Joi.number().required(),
        password: Joi.string().min(6).max(1024).required()
    }
    return Joi.validate(user,schema);
}

exports.ValidateUser = validateUser;
exports.User = mongoose.model('User', User);


