const express = require("express");
const bestSellerProductRouter = express.Router();
const productController = require("../../controller/product.controller");

bestSellerProductRouter.get("/api/best-seller-products", productController.getBestSellerProductRouterController);

module.exports = bestSellerProductRouter;