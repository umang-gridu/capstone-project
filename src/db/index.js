import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n🚀🚀🚀 MongoDb Connected !!! Db host: ${connectionInstance.connection.host}\n`);
  } catch (error) {
    console.log("🚀 ~ file: index.js:8 ~ connectDB ~ MongoDB Error error:", error);
    process.exit(1);
  }
};

export default connectDB;
