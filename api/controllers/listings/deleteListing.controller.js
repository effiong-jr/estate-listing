import mongoose from "mongoose";

const handleDeleteListing = async (req, res) => {
  const { id } = req.body;

  const Listing = mongoose.model("Listing");

  if (!id) throw Error("Listing ID is required");

  const listingDetails = await Listing.findById(id);

  if (!listing) throw Error("Listing does not exist");

  //Check if listing belongs to current logged in user
  if (listingDetails.owner_id !== req.user._id)
    throw Error("You can only delete your own listings");

  const listing = await Listing.findByIdAndDelete(id);

  res.status(200).json({
    message: "Listing deleted successfully",
  });
};

export default handleDeleteListing;
