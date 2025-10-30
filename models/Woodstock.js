const mongoose = require('mongoose');

const woodstockSchema = new mongoose.Schema({
    woodtype:{
        type:String,
    },
    quantity:{
        type:Number,
    },
    unitprice:{
        type:Number,
    },
    supplier:{
        type:String,
    },
    contact:{
        type:Number,
    },
    warehouseLocation:{
        type:String,
    },

});
module.exports=mongoose.model('woodStock', woodstockSchema)