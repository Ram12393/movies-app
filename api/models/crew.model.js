const mongoose = require('mongoose');

const CrewShema = new mongoose.Schema({
    crew_name: {
        type: String,
        required: true,
        unique: true
    },
    role: [{
        role: {
            type: String,
            required: true
        }
    }],
    biography: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model('Crew', CrewShema)