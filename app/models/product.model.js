const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    color: { type: String },
    price: { type: Number, required: true },
})

const Product = mongoose.model('products', productSchema)
module.exports = Product;

