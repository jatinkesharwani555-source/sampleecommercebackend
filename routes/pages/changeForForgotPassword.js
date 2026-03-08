const express = require("express");
const changeForForgotPasswordRouter = express.Router();
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");

changeForForgotPasswordRouter.post("/api/change-password-without-login", routerController.changeForForgotPasswordRouterController)

module.exports = changeForForgotPasswordRouter;