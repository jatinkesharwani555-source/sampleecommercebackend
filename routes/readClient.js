const express = require("express");
const routerController = require("../controller/routerController");
const readClientUser = express.Router();

readClientUser.get("/api/read-client", routerController.readClientRouterController);

module.exports = readClientUser;
