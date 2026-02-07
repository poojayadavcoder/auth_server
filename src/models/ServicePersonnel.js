import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const servicePersonnelSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_sp_${randomUUID()}`
  },
  type: {
    type: String,
    enum: ["maid", "plumber", "electrician", "contractor"],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  idProofs: [{
    type: { type: String, enum: ["aadhaar", "passport", "voterId"] },
    url: { type: String },
    uploadedAt: { type: Date, default: Date.now }
  }],
  societyIds: {
    type: [String],
    default: []
  },
  assignedFlats: {
    type: [String],
    default: []
  },
  gateCardId: {
    type: String,
    trim: true
  },
  qrCodeUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active"
  },
  lastCheckin: {
    type: Date
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const ServicePersonnel = peopleConn.model("ServicePersonnel", servicePersonnelSchema, "servicePersonnel");

export default ServicePersonnel;
