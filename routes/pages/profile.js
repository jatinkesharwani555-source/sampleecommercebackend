const express = require("express");
const profilePageRouter = express.Router();
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");

profilePageRouter.get("/api/profile",verifyToken, routerController.profilePageRouterController );

module.exports = profilePageRouter;