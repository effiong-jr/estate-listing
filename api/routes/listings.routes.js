import express from "express";
import handleCreateListing from "../controllers/listings/createListing.controller.js";
import auth from "../middlewares/auth.js";
import handleGetUserListings from "../controllers/listings/getUserListings.controller.js";
import handleDeleteListing from "../controllers/listings/deleteListing.controller.js";

const listingRouter = express.Router();

listingRouter.use(auth);

listingRouter.get("/", handleGetUserListings);

listingRouter.post("/create", handleCreateListing);

listingRouter.delete("/delete", handleDeleteListing);

export default listingRouter;
