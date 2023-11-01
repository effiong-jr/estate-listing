import mongoose from "mongoose";

const registerUser = async (req, res) => {
  const User = mongoose.model("User");

  const { email, password, confirmPassword } = req.body;

  const user = await User.create({ email, password });

  res.status(201).json({
    message: "Registration successful",
    data: { user },
  });
};

export default registerUser;
