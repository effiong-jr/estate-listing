const handleSignOut = async (req, res) => {
  console.log("User", req.user);

  delete req.user;

  console.log("User", req.user);

  res.status(200).json({
    message: "Signed out successfully",
  });
};

export default handleSignOut;
