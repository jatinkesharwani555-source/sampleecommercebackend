const express = require("express");
const getCartItemsRouter = express.Router();
const cartController = require('../../controller/cartController');
const verifyToken = require("../verifyToken");

getCartItemsRouter.get("/api/cart/get", verifyToken, cartController.getCartItemsRouterController);

module.exports = getCartItemsRouter;