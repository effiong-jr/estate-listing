import jwt from "jsonwebtoken";

const generateAccessToken = async (user) => {
  const { _id, email } = user;

  const accessToken = jwt.sign({ _id, email }, process.env.JWT_SECRET);

  return accessToken;
};

export default generateAccessToken;
