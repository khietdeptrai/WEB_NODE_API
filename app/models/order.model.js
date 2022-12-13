const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
   productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
   },
   quantity: {
        type:Number,
        default:1
    },
    date: {
        type: Date,
        default: Date.now
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    status: String,
    
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;