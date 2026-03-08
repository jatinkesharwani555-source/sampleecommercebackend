const express = require("express");
const routerController = require("../../controller/routerController");
const loginRouter = express.Router();

loginRouter.post("/api/login", routerController.loginRouterController);

module.exports = loginRouter;