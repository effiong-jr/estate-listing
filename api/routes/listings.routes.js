import express from "express";
import handleCreateListing from "../controllers/listings/createListing.controller.js";
import auth from "../middlewares/auth.js";
import handleGetUserListings from "../controllers/listings/getUserListings.controller.js";
import handleDeleteListing from "../controllers/listings/deleteListing.controller.js";
import handleUpdateListing from "../controllers/listings/updateListing.controller.js";

const listingRouter = express.Router();

listingRouter.use(auth);

listingRouter.get("/", handleGetUserListings);

listingRouter.post("/create", handleCreateListing);

listingRouter.put("/update/:id", handleUpdateListing);

listingRouter.delete("/delete", handleDeleteListing);

export default listingRouter;
