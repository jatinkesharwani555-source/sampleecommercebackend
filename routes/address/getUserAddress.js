const express = require("express");
const getUserAddress = express.Router();
const addressController = require("../../controller/address.controller")
const verifyToken = require("../verifyToken");

getUserAddress.get("/api/fetch-addresses",verifyToken, addressController.getUserAddressController)

module.exports = getUserAddress;