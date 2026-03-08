const express = require("express");
const deleteProductRouter = express.Router();
const verifyToken = require("../verifyToken");
const isAdmin = require("../../middleware/isAdmin");
const adminController = require("../../controller/adminController");
const multerOptions = require("../../config/multer");

deleteProductRouter.delete("/api/admin/delete-product/:id", verifyToken, isAdmin, multerOptions.array("productImage"), adminController.deleteProductRouterController);

module.exports = deleteProductRouter;