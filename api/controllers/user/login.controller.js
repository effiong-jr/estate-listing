import mongoose from "mongoose";
import validator from "validator";

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const User = mongoose.Model("User");

  // Verify user input
  if (!email) throw Error("Email is required");
  if (!password) throw Error("Password is required");

  const isEmail = validator.isEmail(String(email), { allow_underscores: true });

  if (!isEmail)
    throw Error(
      "Email should be in a valid email format. e.g: email@example.com"
    );

  const user = await User.findOne({ email });

  if (!user) throw Error("No not found");

  //   if(user.)
};

export default handleLogin;
