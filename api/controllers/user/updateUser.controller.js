import mongoose from "mongoose";
import handleHashPassword from "../../utils/hashPassword.js";

const handleUpdateUser = async (req, res) => {
  const User = mongoose.model("User");

  const fieldsWithData = {};

  for (const [k, v] of Object.entries(req.body)) {
    if (!v) continue;

    if (k === "password") {
      fieldsWithData[k] = await handleHashPassword(v);
      continue;
    }

    fieldsWithData[k] = v;
  }

  const user = await User.findByIdAndUpdate(req.user._id, fieldsWithData, {
    runValidators: true,
    new: true,
  }).select("-password");

  res.status(200).json({
    message: "User updated successfully",
    data: { userDetails: user },
  });
};

export default handleUpdateUser;
