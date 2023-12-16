import mongoose, { mongo } from "mongoose";

const handleGetUserListing = async (req, res) => {
  const Listing = mongoose.model("Listing");

  const listing = await Listing.findOne({ _id: req.params.id }).lean();

  if (!listing) throw Error("No listing this this ID was found");

  if (listing.owner_id.toString() !== req.user._id.toString())
    throw Error("You can only edit your own listing");

  res.status(200).json({
    message: "Listing fetched successfully",
    data: {
      listing,
    },
  });
};

export default handleGetUserListing;
