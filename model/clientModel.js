const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  clientMobileNo: {
    type: Number,
    required: true
  },
  clientEmail: {
    type: String,
    required: true
  },
  clientDescription: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Client", clientSchema);