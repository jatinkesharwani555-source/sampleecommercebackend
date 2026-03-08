const express = require("express");
const createProductRouter = express.Router();
const verifyToken = require("../verifyToken");
const isAdmin = require("../../middleware/isAdmin");
const adminController = require("../../controller/adminController");
const multerOptions = require("../../config/multer");

createProductRouter.post("/api/admin/create-product", verifyToken, isAdmin, multerOptions.array("productImage"), adminController.createProductRouterController);

module.exports = createProductRouter;