import express from "express";
import handleCreateListing from "../controllers/listings/createListing.controller.js";
import auth from "../middlewares/auth.js";

const listingRouter = express.Router();

listingRouter.use(auth);

listingRouter.post("/create", handleCreateListing);

export default listingRouter;
