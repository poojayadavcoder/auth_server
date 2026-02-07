import express from "express";
import * as servicePersonnelController from "../controllers/servicePersonnel.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post("/", servicePersonnelController.createServicePersonnel);
router.get("/", servicePersonnelController.getAllServicePersonnel);
router.put("/:id", servicePersonnelController.updateServicePersonnel);
router.delete("/:id", servicePersonnelController.deleteServicePersonnel);

export default router;
