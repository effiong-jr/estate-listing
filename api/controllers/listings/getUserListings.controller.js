import mongoose from "mongoose";

const handleGetUserListings = async (req, res) => {
  const Listing = mongoose.model("Listing");

  const userListings = await Listing.find({ owner_id: req.user._id });

  res.status(200).json({
    message: "User listings fetched successfully",
    data: { userListings },
  });
};

export default handleGetUserListings;
