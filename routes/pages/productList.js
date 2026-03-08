const express = require("express");
const productListRouter = express.Router();
const productController = require("../../controller/product.controller");

productListRouter.get("/api/product-list", productController.getProductListRouterController);

module.exports = productListRouter;