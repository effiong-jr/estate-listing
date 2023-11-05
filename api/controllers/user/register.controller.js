import mongoose from "mongoose";
import bcrypt from "bcrypt";

import generateAccessToken from "../../utils/accessToken.js";

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

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ email, password: hashedPassword });

  // Remove sensitive fields in response
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;

  // Generate access token
  const token = await generateAccessToken(user);

  res
    .status(201)
    .cookie("accessToken", `Bearer ${token}`, {
      expires: new Date(Date.now() + 60 * 60),
    })
    .json({
      message: "Registration successful",
      data: { user: sanitizedUser },
    });
};

export default registerUser;
