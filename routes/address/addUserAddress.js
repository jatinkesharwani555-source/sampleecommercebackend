const express = require("express");
const addUserAddress = express.Router();
const addressController = require("../../controller/address.controller")
const verifyToken = require("../verifyToken");

addUserAddress.post("/api/add-address",verifyToken, addressController.addUserAddressController)

module.exports = addUserAddress;