import bcrypt from "bcrypt";

const handleHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
};

export default handleHashPassword;
