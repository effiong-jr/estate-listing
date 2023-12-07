import mongoose from "mongoose";

const handleDeleteListing = async (req, res) => {
  const { id } = req.body;

  const Listing = mongoose.model("Listing");

  if (!id) throw Error("Listing ID is required");

  await Listing.findByIdAndDelete(id);

  res.status(200).json({
    message: "Listing deleted successfully",
  });
};

export default handleDeleteListing;
