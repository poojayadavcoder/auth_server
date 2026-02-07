import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminsRoutes from "./routes/admins.routes.js";
import adminRolesRoutes from "./routes/adminRoles.routes.js";
import societiesRoutes from "./routes/societies.routes.js";
import usersRoutes from "./routes/users.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import servicePersonnelRoutes from "./routes/servicePersonnel.routes.js";

const app = express();

app.use(cors());
app.use(express.json());



app.use("/auth", authRoutes);
app.use("/admins", adminsRoutes);
app.use("/adminRoles", adminRolesRoutes);
app.use("/societies", societiesRoutes);
app.use("/users", usersRoutes);
app.use("/staff", staffRoutes);
app.use("/service-personnel", servicePersonnelRoutes);

export default app;
