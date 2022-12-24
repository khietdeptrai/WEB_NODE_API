const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    color: { type: String },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },    
})

const Product = mongoose.model('products', productSchema)
module.exports = Product;

