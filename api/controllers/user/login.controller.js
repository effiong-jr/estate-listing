import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateAccessToken from "../../utils/accessToken.js";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const User = mongoose.model("User");

  // Verify user input
  if (!email) throw Error("Email is required");
  if (!password) throw Error("Password is required");

  const isEmail = validator.isEmail(String(email), { allow_underscores: true });

  if (!isEmail)
    throw Error(
      "Email should be in a valid email format. e.g: email@example.com"
    );

  const user = await User.findOne({ email });

  if (!user) throw Error("User not found");

  // Validate Password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw Error("Email or password incorrect");

  // Remove sensitive data from response eg. hashed password
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;

  // Generate Access token
  const accessToken = await generateAccessToken(sanitizedUser);

  res.status(200).json({
    message: "Login successful",
    data: { userUserDetails: sanitizedUser, accessToken },
  });
};

export default handleLogin;
