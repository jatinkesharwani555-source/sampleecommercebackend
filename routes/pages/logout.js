const express = require("express");
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");
const logoutRouter = express.Router();

logoutRouter.get("/api/logout", verifyToken, routerController.logoutRouterController);

module.exports = logoutRouter;