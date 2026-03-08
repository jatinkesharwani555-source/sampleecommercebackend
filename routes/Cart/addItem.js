const express = require("express");
const addItemRouter = express.Router();
const cartController = require('../../controller/cartController');
const verifyToken = require("../verifyToken");

addItemRouter.post("/api/cart/add", verifyToken, cartController.addItemRouterController);

module.exports = addItemRouter;