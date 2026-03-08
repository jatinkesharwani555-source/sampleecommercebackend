const express = require("express");
const fetchUserRouter = express.Router();
const routerController = require("../controller/routerController");
const verifyToken = require("./verifyToken");

fetchUserRouter.get("/api/fetch-user",verifyToken, routerController.fetchUserRouterController)

module.exports = fetchUserRouter;