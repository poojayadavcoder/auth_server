import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const approvalSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_approval_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  guardId: {
    type: String,
    required: true
  },
  visitorId: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied", "revoked"],
    default: "pending"
  },
  actionedAt: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Approval = peopleConn.model("Approval", approvalSchema, "approvals");

export default Approval;
