const express = require("express");
const forgotPasswordRouter = express.Router();
const routerController = require("../../controller/routerController");

forgotPasswordRouter.post("/api/forgot-password", routerController.forgotPasswordRouterController)

module.exports = forgotPasswordRouter;