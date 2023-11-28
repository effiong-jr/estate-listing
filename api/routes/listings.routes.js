import express from "express";
import handleCreateListing from "../controllers/listings/createListing.controller.js";
import auth from "../middlewares/auth.js";
import handleGetUserListings from "../controllers/listings/getUserListings.controller.js";

const listingRouter = express.Router();

listingRouter.use(auth);

listingRouter.get("/", handleGetUserListings);

listingRouter.post("/create", handleCreateListing);

export default listingRouter;
