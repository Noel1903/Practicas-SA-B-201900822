const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    quantity:{
        type: Number,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('Product',productSchema)