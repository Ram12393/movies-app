const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    area_name: {
        type: String,
        required: true,
        maxlength: 50,
        index: {
            unique: true,
            dropDups: true
        }
    },
    area_id: {
        type: Number,
        required: false,
        unique: true,
        default: 500
    },
    city_id: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Area', AreaSchema);