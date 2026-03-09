const express = require("express");
const authCheckRouter = express.Router();
const routerController = require("../controller/routerController");
const verifyToken = require("./verifyToken");

authCheckRouter.get("/api/auth-check", verifyToken, routerController.authCheckRouterController);

module.exports = authCheckRouter;