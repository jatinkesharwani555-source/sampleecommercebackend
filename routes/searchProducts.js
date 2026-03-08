const express = require("express");
const routerController = require("../controller/product.controller");
const searchProducts = express.Router();

searchProducts.get(`/api/search-products`, routerController.getSearchProductsRouterController);

module.exports = searchProducts;
