const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    material:{
        type:String,
        enum:["Arabic","English","Math","Bio","Chemistry"],
        required:[true ,'must input the material name'],
    },
    numHours:{
        type:Number,
        max:[50,"max number hours number = 50"],
        min:[0, "min number hours number = 0"],
        required:[true , "must input number of hours per week"],
    },
    semester:{
        type:String,
        enum:["first","second","both"],
        default:"both"
    },
    active:{
        type:Boolean,
        default:true ,
    },
});

const material = mongoose.model('material',materialSchema);

module.exports = material;