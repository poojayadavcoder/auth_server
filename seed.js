import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We'll use the URIs from the auth service's .env as they contain all connections
dotenv.config({ path: path.resolve(__dirname, "./src/.env") });


const PEOPLE_DB_URI = process.env.PEOPLE_DB_URI;
const OPERATIONS_DB_URI = process.env.OPERATIONS_DB_URI;
const PAYMENT_DB_URI = process.env.PAYMENT_DB_URI;

const seed = async () => {
  try {
    console.log("Connecting to databases...");
    const peopleConn = await mongoose.createConnection(PEOPLE_DB_URI).asPromise();
    const opsConn = await mongoose.createConnection(OPERATIONS_DB_URI).asPromise();
    const pmtConn = await mongoose.createConnection(PAYMENT_DB_URI).asPromise();

    // Define simple models for seeding
    const User = peopleConn.model("User", new mongoose.Schema({
      _id: String,
      mobile: String,
      displayName: String,
      societyId: String,
      profile: Object
    }), "users");

    const Society = peopleConn.model("Society", new mongoose.Schema({
      _id: String,
      name: String
    }), "societies");

    const Bill = pmtConn.model("Bill", new mongoose.Schema({
      _id: String,
      userId: String,
      societyId: String,
      amount: Number,
      billType: String,
      dueDate: Date,
      status: String,
      description: String
    }), "bills");

    const Visitor = opsConn.model("Visitor", new mongoose.Schema({
      _id: String,
      societyId: String,
      type: String,
      fName: String,
      hostUserId: String,
      status: String
    }), "visitors");

    const Ticket = opsConn.model("Ticket", new mongoose.Schema({
      _id: String,
      societyId: String,
      raisedBy: Object,
      type: String,
      description: String,
      status: String
    }), "tickets");

    // 1. Find the user
    const mobile = "9571291607";
    const user = await User.findOne({ mobile });
    if (!user) {
      console.error("User not found!");
      process.exit(1);
    }
    console.log(`Found User: ${user.displayName} (${user._id})`);

    // 2. Find/Create Society
    let society = await Society.findById(user.societyId);
    if (!society) {
      console.log("Creating society...");
      society = new Society({
        _id: user.societyId || "uuid_soc_123",
        name: "Parkview Heights"
      });
      await society.save();
    }
    console.log(`Using Society: ${society.name} (${society._id})`);

    // 3. Create Sample Bill
    await Bill.deleteMany({ userId: user._id });
    const bill = new Bill({
      _id: `uuid_bill_${Date.now()}`,
      userId: user._id,
      societyId: society._id,
      amount: 3500,
      billType: "postpaid",
      dueDate: new Date("2026-02-15"),
      status: "unpaid",
      description: "Maintenance Bill for Jan 2026"
    });
    await bill.save();
    console.log("Sample bill created.");

    // 4. Create Sample Visitor
    await Visitor.deleteMany({ hostUserId: user._id });
    const visitor = new Visitor({
      _id: `uuid_visitor_${Date.now()}`,
      societyId: society._id,
      type: "guest",
      fName: "Mohan Kumar",
      hostUserId: user._id,
      status: "approved"
    });
    await visitor.save();
    console.log("Sample visitor created.");

    // 5. Create Sample Ticket
    await Ticket.deleteMany({ "raisedBy.id": user._id });
    const ticket = new Ticket({
      _id: `uuid_ticket_${Date.now()}`,
      societyId: society._id,
      raisedBy: { id: user._id, type: "user" },
      type: "Plumbing",
      description: "Leak under kitchen sink causing cabinet damage...",
      status: "open"
    });
    await ticket.save();
    console.log("Sample ticket created.");

    console.log("Seeding complete! Enjoy your dashboard.");
    process.exit(0);

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
