import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// Connect DB

try {
  const connect_db = async () => {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection successful!");
  };

  connect_db();
} catch (error) {
  console.log("MongoDB connection failed");
}

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
