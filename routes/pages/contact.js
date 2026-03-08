const express = require("express");
const contactPageRouter = express.Router();
const routerController = require("../../controller/routerController");
const verifyToken = require("../verifyToken");

contactPageRouter.post("/api/contact", routerController.contactPageRouterController);

module.exports = contactPageRouter;