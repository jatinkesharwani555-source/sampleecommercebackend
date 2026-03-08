const express = require("express");
const detailedProduct = express.Router();
const productController = require("../../controller/product.controller");

detailedProduct.get("/api/product/:id", productController.getDetailedProductController);

module.exports = detailedProduct;