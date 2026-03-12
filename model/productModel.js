const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productMiniDesc: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDiscount: {
        type: Number,
        required: true
    },
    productPriceAfterDiscount: {
        type: Number
    },
    productCategory: {
        type: String,
        enum: ["Category1", "Category2", "Category3", "Category4"],
        required: true,
    },
    sellerType: {
        type: String,
        enum: ["BestSeller", "Normal"],
        required: true
    },
    productImage: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model("Product", productSchema);