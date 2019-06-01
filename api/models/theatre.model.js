const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    theatre_name: {
        type: String,
        required: true,
        unique: true
    },
    city_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    area_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area'
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback'
    },
    address: {
        type: String,
        required: true
    },
    theatre_photo: {
        type: String,
        required: true
    },
    schedule: [{
        time: {
            type: String,
            required: true
        }
    }]
})