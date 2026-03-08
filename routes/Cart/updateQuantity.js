const express = require("express");
const updateQuantityRouter = express.Router();
const cartController = require('../../controller/cartController');
const verifyToken = require("../verifyToken");

updateQuantityRouter.put("/api/cart/update", verifyToken, cartController.updateQuantityRouterController);

module.exports = updateQuantityRouter;