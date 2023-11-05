import jwt from "jsonwebtoken";

const generateAccessToken = async (user) => {
  const { _id, email } = user;

  const token = jwt.sign({ _id, email }, process.env.JWT_SECRET);

  return token;
};

export default generateAccessToken;
