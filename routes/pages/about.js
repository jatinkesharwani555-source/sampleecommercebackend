const express = require("express");
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");
const aboutPageRouter = express.Router();

aboutPageRouter.get("/api/aboutPage", verifyToken, routerController.aboutPageRouterController);

module.exports = aboutPageRouter;
