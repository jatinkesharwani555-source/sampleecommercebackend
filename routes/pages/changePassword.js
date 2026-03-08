const express = require("express");
const changePasswordRouter = express.Router();
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");

changePasswordRouter.post("/api/change-password",verifyToken, routerController.changePasswordRouterController)

module.exports = changePasswordRouter;