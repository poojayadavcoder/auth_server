import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Staff from "../models/Staff.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    let user;
    if (decoded.type === "admin") {
      user = await Admin.findById(decoded.id);
    } else if (decoded.type === "user") {
      user = await User.findById(decoded.id);
    } else if (decoded.type === "staff") {
      user = await Staff.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: "User not found (or invalid token)" });
    }

    req.user = user;
    req.userType = decoded.type; // Attach type for easier RBAC checks
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
