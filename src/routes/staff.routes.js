import express from "express";
import * as staffController from "../controllers/staff.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp", staffController.sendOtp);
router.post("/login", staffController.loginStaff);

// New route for admin or superadmin to create staff/guards
router.post("/", authMiddleware, (req, res, next) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin or Superadmin privileges required." });
    }
    next();
}, staffController.createStaff);

// New route for admin or superadmin to get all staff
router.get("/", authMiddleware, (req, res, next) => {
    // Allow admin or staff (to see colleagues)
    if (req.userType !== 'admin' && req.userType !== 'staff') {
        return res.status(403).json({ message: "Access denied. Admin or Staff privileges required." });
    }
    next();
}, staffController.getAllStaff);


// Update preferences (Self)
router.patch("/preferences", authMiddleware, staffController.updateMyPreferences);

// Specific staff operations (Admin only)
router.get("/:staffId", authMiddleware, (req, res, next) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
}, staffController.getStaffById);

router.put("/:staffId", authMiddleware, (req, res, next) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
}, staffController.updateStaff);

router.delete("/:staffId", authMiddleware, (req, res, next) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
}, staffController.deleteStaff);

// Update notification token
router.post("/:staffId/token", authMiddleware, staffController.registerNotificationToken);

export default router;
