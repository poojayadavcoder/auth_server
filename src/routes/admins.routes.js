import express from "express";
import * as adminsController from "../controllers/admins.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminsController.createAdmin);
router.get("/", authMiddleware, adminsController.getAllAdmins);
router.get("/:adminId", authMiddleware, adminsController.getAdminById);
router.put("/:adminId", authMiddleware, adminsController.updateAdmin);
router.post("/:adminId/token", authMiddleware, adminsController.registerNotificationToken);

export default router;