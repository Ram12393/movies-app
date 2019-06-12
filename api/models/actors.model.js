const mongoose = require('mongoose');

const ActorsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
    },
    biography:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('Actors',ActorsSchema)