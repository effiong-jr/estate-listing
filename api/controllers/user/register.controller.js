import mongoose from "mongoose";

const registerUser = async (req, res) => {
  const User = mongoose.model("User");

  const { email, password, confirmPassword } = req.body;

  // Validate user input
  if (!email) throw Error("Email is required");
  if (!password) throw Error("Password is required");
  if (confirmPassword !== password) throw Error("Passwords do not match");

  // Check if user already exist in DB
  const isExistingUser = await User.findOne({ email });

  if (isExistingUser) throw Error("User with this email already exist");

  const user = await User.create({ email, password });

  res.status(201).json({
    message: "Registration successful",
    data: { user },
  });
};

export default registerUser;
