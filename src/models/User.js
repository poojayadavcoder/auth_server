import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_user_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  password: {
    type: String
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: [String],
    enum: ["resident", "tenant"],
    default: ["resident"]
  },
  profile: {
    tower: { type: String },
    flat: { type: String },
    floor: { type: Number },
    alternateMobile: { type: String, trim: true },
    dob: { type: Date }
  },
  status: {
    type: String,
    enum: ["pending", "active", "suspended", "deleted"],
    default: "pending"
  },
  approvedBy: {
    type: String
  },
  approvedAt: {
    type: Date
  },
  meterId: {
    type: String,
    trim: true
  },
  notificationToken: {
    type: String,
    trim: true
  },
  refreshToken: {
    type: String
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const User = peopleConn.model("User", userSchema, "users");

export default User;
