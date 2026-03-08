const express = require("express");
const removeItemRouter = express.Router();
const cartController = require('../../controller/cartController');
const verifyToken = require("../verifyToken");

removeItemRouter.delete("/api/cart/remove/:productId", verifyToken, cartController.removeItemRouterController);

module.exports = removeItemRouter;