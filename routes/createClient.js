const express = require("express");
const routerController = require("../controller/routerController");
const createClientRouter = express.Router();

createClientRouter.post("/api/create-client", routerController.createClientRouterController);

module.exports = createClientRouter;
