import mongoose from "mongoose";
import passwordGenerator from "generate-password";
import handleHashPassword from "../../utils/hashPassword.js";
import generateAccessToken from "../../utils/accessToken.js";

const handleAuthWithGoogle = async (req, res, next) => {
  const User = mongoose.model("User");

  const { email, photoURL } = req.body;

  // Check if user exist on db
  const isExistingUser = await User.findOne({ email });

  //if user DOES NOT EXIST:
  // Generate random password for user and create user with req email address

  let user = {};

  if (!isExistingUser) {
    // Create new user
    const randomPassword = passwordGenerator.generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
    });
    const hashedRandomPassword = await handleHashPassword(randomPassword);
    user = await User.create({
      email,
      password: hashedRandomPassword,
      avatar: photoURL,
    });
  } else {
    // return existing user
    user = isExistingUser;
  }

  // Exclude sensitive data e.g hashed password
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;

  // Generate accessToken
  const accessToken = await generateAccessToken(user);

  res
    .cookie("accessToken", accessToken)
    .status(200)
    .json({
      message: "User authentication with Google successful",
      data: {
        user: sanitizedUser,
      },
    });
};

export default handleAuthWithGoogle;
