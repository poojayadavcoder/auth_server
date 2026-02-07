import express from "express";
import * as societiesController from "../controllers/societies.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/search", societiesController.searchSocieties);
router.get("/:societyId/structure", societiesController.getSocietyStructure);
router.post("/", authMiddleware, societiesController.createSociety);
router.get("/", authMiddleware, societiesController.getAllSocieties);
router.get("/:societyId", authMiddleware, societiesController.getSocietyById);
router.put("/:societyId", authMiddleware, societiesController.updateSociety);
router.delete("/:societyId", authMiddleware, societiesController.deleteSociety);


export default router;
