const express = require("express");
const routerController = require("../../controller/routerController");
const signUpRouter = express.Router();

signUpRouter.post("/api/signup", routerController.signUpRouterController);

module.exports = signUpRouter;
