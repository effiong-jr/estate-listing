import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import registerUser from "./controllers/user/register.controller.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

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
import errorHandler from "./utils/errorHandler.js";

app.use("/api/v1/users/register", registerUser);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
