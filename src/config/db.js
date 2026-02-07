import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const options = {
  serverSelectionTimeoutMS: 5000
};

export const peopleConn = mongoose.createConnection(process.env.PEOPLE_DB_URI, options);

peopleConn.on("connected", () => {
  console.log(`People Database Connected: ${peopleConn.host}`);
});

peopleConn.on("error", (err) => {
  console.error(`Database Connection Error: ${err.message}`);
});

const connectDB = async () => {
  try {
    if (!process.env.PEOPLE_DB_URI) {
      throw new Error("PEOPLE_DB_URI is not defined in environment variables");
    }
    await peopleConn.asPromise();
    console.log("People Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

export default connectDB;
