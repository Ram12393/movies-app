const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    city_name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    city_id: {
        type: Number,
        required: false,
        unique: true,
        default: 151
    }
})

module.exports = mongoose.model('City', CitySchema);