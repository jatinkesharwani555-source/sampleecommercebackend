const express = require("express");
const profileEditRouter = express.Router();
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");
const multerOptions = require("../../config/multer");

profileEditRouter.post("/api/edit-profile", verifyToken, multerOptions.single("profileImage"), routerController.profileEditRouterController);

module.exports = profileEditRouter;