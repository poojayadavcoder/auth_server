import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "./src/.env") });

const PEOPLE_DB_URI = process.env.PEOPLE_DB_URI;

const seedStructure = async () => {
  try {
    console.log("Connecting to People DB...");
    const peopleConn = await mongoose.createConnection(PEOPLE_DB_URI).asPromise();

    const Society = peopleConn.model("Society", new mongoose.Schema({
      _id: String,
      name: String,
      status: { type: String, default: "active" },
      address: {
        line1: String,
        city: String,
        state: String,
        pincode: String,
        country: String
      },
      structure: Array
    }), "societies");

    const societyName = "Parkview Heights";
    const society = await Society.findOne({ name: societyName });

    if (!society) {
      console.log("Society not found, creating it...");
      const newSoc = new Society({
        _id: `uuid_soc_${Math.random().toString(36).substr(2, 9)}`,
        name: societyName,
        status: "active",
        address: {
          line1: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          country: "India"
        },
        structure: [


          { block: "Block A", flats: ["A-101", "A-102", "A-103", "A-104", "A-105"] },
          { block: "Block B", flats: ["B-201", "B-202", "B-203", "B-204"] },
          { block: "Block C", flats: ["C-301", "C-302"] }
        ]
      });
      await newSoc.save();
    } else {
      console.log("Updating society structure and address...");
      society.status = "active";
      society.address = {
        line1: "123 Main St",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India"
      };
      society.structure = [


        { block: "Block A", flats: ["A-101", "A-102", "A-103", "A-104", "A-105"] },
        { block: "Block B", flats: ["B-201", "B-202", "B-203", "B-204"] },
        { block: "Block C", flats: ["C-301", "C-302"] }
      ];
      await society.save();
    }

    console.log("Success: Parkview Heights structure seeded.");
    process.exit(0);

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seedStructure();
