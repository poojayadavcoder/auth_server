import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const adminRoleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_role_${randomUUID()}`
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  permissions: {
    type: [String],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const AdminRole = peopleConn.model("AdminRole", adminRoleSchema, "adminRoles");

export default AdminRole;
