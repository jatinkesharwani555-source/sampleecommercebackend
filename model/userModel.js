const mongoose = require("../config/mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userMobileNo: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true,
        select: false
    },
    userImage: {
        type: String,
        required: true,
        default: "default.jpg"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ]
})

module.exports = mongoose.model("User", userSchema);