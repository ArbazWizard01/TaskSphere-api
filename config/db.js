import { MongoClient } from "mongodb";

let db;

export const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    db = client.db("TaskSphere-Primetrade");
    console.log(" MongoDB connected...");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error(" Database not initialized. Call connectDB first.");
  }
  return db;
};
