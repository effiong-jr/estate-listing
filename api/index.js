import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./utils/errorHandler.js";
import userRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listings.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());

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
import "./models/listing.model.js";

//Routes
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/listings", listingRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
