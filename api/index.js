import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import registerUser from "./controllers/user/register.controller.js";

dotenv.config();

const app = express();
app.use(express.json());

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

// Model Initialization
import "./models/user.model.js";

app.use("/api/v1/users/register", registerUser);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
