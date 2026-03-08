const express = require("express");
const updateProductRouter = express.Router();
const verifyToken = require("../verifyToken");
const isAdmin = require("../../middleware/isAdmin");
const adminController = require("../../controller/adminController");
const multerOptions = require("../../config/multer");

updateProductRouter.put("/api/admin/update-product/:id", verifyToken, isAdmin, multerOptions.array("productImage"), adminController.updateProductRouterController);

module.exports = updateProductRouter;