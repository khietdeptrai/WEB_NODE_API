const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true },
        products: [
            {
                productID: {
                    type: String
                },
                quantiry: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        address: {type: String, default: "pending"},
    },

    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);