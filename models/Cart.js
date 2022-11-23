const mongoose = require ("mongoose")

const cartSchema = new mongoose.Schema(
    {
        userID: { type: string, required: true },
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
    },

    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);