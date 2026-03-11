const express = require("express");
const routerController = require("../../controller/routerController");
const multerOptions = require("../../config/multer");
const signUpRouter = express.Router();

signUpRouter.post("/api/signup", multerOptions.single("userImage"), routerController.signUpRouterController);

module.exports = signUpRouter;
