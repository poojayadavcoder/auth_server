import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const redisConfig = {
  host: process.env.REDIS_HOST || "redis-19980.c61.us-east-1-3.ec2.cloud.redislabs.com",
  port: process.env.REDIS_PORT || 19980,
  password: process.env.REDIS_PASSWORD || "pooja@YADAV123",
  username: process.env.REDIS_USERNAME || "pooja", // Support for ACLs
  maxRetriesPerRequest: null,
};

const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log("Redis Connected Successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis Connection Error:", err);
});

export default redisClient;
