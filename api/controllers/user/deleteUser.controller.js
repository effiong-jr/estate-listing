import mongoose from "mongoose";

const handleDeleteUser = async (req, res) => {
  const User = mongoose.model("User");

  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    message: "User deleted successfully",
  });
};

export default handleDeleteUser;
