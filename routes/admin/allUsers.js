const express = require("express");
const allUsersRouter = express.Router();
const verifyToken = require("../verifyToken");
const isAdmin = require("../../middleware/isAdmin");
const adminController = require("../../controller/adminController");

allUsersRouter.get("/api/admin/all-users", verifyToken, isAdmin, adminController.allUsersRouterController );

module.exports = allUsersRouter;