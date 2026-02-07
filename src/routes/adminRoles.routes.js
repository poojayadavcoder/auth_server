import express from "express";
import * as adminRolesController from "../controllers/adminRoles.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminRolesController.createAdminRole);
router.get("/", authMiddleware, adminRolesController.getAllAdminRoles);
router.put("/:roleId", authMiddleware, adminRolesController.updateAdminRole);

export default router;
