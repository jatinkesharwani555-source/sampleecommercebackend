const express = require("express");
const getProductsByCategoryRouter = express.Router();
const productController = require("../../controller/product.controller");

getProductsByCategoryRouter.get("/api/get-products-by-category", productController.getProductsByCategoryRouterController)

module.exports = getProductsByCategoryRouter;