const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    city_name:{
        type:String,
        required:true,
        maxlength:50,
    },
    id:{
        type: Schema.Types.ObjectId,
        required:false,
        unique : true,
        // default:151,
        auto: true,
    }
})

module.exports = mongoose.model('City',CitySchema);