import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const societySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_soc_${randomUUID()}`
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true }
  },
  timezone: {
    type: String,
    default: "UTC"
  },
  contactNumbers: {
    type: [String],
    default: []
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  branding: {
    logoUrl: { type: String },
    accentColor: { type: String }
  },
  config: [{
    type: { type: String, enum: ["email", "sms"] },
    id: { type: String }
  }],
  status: {
    type: String,
    enum: ["active", "suspended", "closed"],
    default: "active"
  },
  builderName: {
    type: String,
    trim: true
  },
  structure: [{
    block: { type: String },
    blockName: { type: String },
    flats: [{ 
        flatNumber: { type: String },
        floor: { type: String }
    }]
  }]
}, { 
  timestamps: true,
  versionKey: false 
});

const Society = peopleConn.model("Society", societySchema, "societies");

export default Society;
