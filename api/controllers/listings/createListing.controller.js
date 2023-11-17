import mongoose from "mongoose";

const handleCreateListing = async (req, res) => {
  const Listing = mongoose.model("Listing");

  const listing = await Listing.create({
    owner_id: req.user._id,
    ...req.body,
  });

  res.status(201).json({
    message: "New listing created successfully",
    data: {
      listing,
    },
  });
};

export default handleCreateListing;
