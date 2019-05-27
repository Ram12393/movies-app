const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    area_name:{
        type:String,
        required:true,
        maxlength:50
    },
    city_ID:{
        type:Number,
        required:true,
        maxlength:50
    }
})

module.exports = mongoose.model('Area',AreaSchema);