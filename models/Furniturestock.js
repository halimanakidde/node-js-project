const mongoose = require('mongoose');

const furniturestockSchema = new mongoose.Schema({
    furniturename:{
        type: String,
    },
    furnitureimage:{
        type: String,
    },
    category:{
        type: String,
    },
    material:{
        type: String,
    },
    quantity:{
        type: Number,
    },
     date:{
        type: Date,
    },
    unitprice:{
        type: Number
    },
});

module.exports=mongoose.model('furnitureStock', furniturestockSchema)