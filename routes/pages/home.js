const express = require("express");
const verifyToken = require("../verifyToken");
const homeRouter = express.Router();
const productController = require("../../controller/product.controller");


homeRouter.get("/api/home", productController.getAllProductsRouterController);

module.exports = homeRouter;
