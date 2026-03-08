const express = require("express");
const routerController = require("../controller/routerController");
const readUser = express.Router();

readUser.get("/api/read-user", routerController.readUserRouterController);

module.exports = readUser;
