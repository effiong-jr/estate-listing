import mongoose from "mongoose";

const handleUpdateListing = async (req, res) => {
  const Listing = mongoose.model("Listing");

  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) throw Error("Listing not found");

  if (String(listing.owner_id) !== String(req.user._id))
    throw Error("You can only update your own listing");

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    message: "Updated listing successfully",
    data: {
      updatedListing,
    },
  });
};

export default handleUpdateListing;
