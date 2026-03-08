const express = require("express");
const adminDashboardRouter = express.Router();
const verifyToken = require("../verifyToken");
const isAdmin = require("../../middleware/isAdmin");
const adminController = require("../../controller/adminController");

adminDashboardRouter.get("/api/admin/dashboard", verifyToken, isAdmin, adminController.adminDashboardRouterController );

module.exports = adminDashboardRouter;