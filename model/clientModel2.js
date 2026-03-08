const mongoose = require("../config/mongoose");

const clientSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true,
        unique: true
    },
    clientMobile: {
        type: String,
        required: true
    },
    clientPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Client2", clientSchema);