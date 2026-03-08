const express = require("express");
const authCheckRouter = express.Router();
const routerController = require("../controller/routerController");
const verifyToken = require("./verifyToken");

authCheckRouter.get("/auth-check", verifyToken, routerController.authCheckRouterController);

module.exports = authCheckRouter;