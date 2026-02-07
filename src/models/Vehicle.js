import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";
import { randomUUID } from "crypto";

const vehicleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_vehicle_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true
  },
  ownerType: {
    type: String,
    enum: ["user", "staff", "servicePersonnel"],
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  carNumber: {
    type: String,
    trim: true
  },
  stickerCode: {
    type: String,
    trim: true
  },
  carPassStatus: {
    type: String,
    enum: ["active", "expired", "revoked", "pending"],
    default: "pending"
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Vehicle = peopleConn.model("Vehicle", vehicleSchema, "vehicles");

export default Vehicle;
