import express from "express";
import * as usersController from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", usersController.registerUser);
router.post("/send-otp", usersController.sendOtp);
router.post("/login", usersController.loginUser);
router.get("/", authMiddleware, usersController.getUsers);
router.get("/:userId", authMiddleware, usersController.getUserById);
router.put("/:userId", authMiddleware, usersController.updateUser);
router.delete("/:userId", authMiddleware, usersController.deleteUser);
router.post("/create-resident", authMiddleware, usersController.createResident);
router.post("/:userId/promote", authMiddleware, usersController.promoteToAdmin);
router.post("/:userId/approve", authMiddleware, usersController.approveUser);
router.post("/:userId/token", authMiddleware, usersController.registerNotificationToken);


export default router;
