const handleLogout = async (req, res) => {
  res
    .clearCookie("accessToken", { expires: new Date(1), secure: true })
    .status(200)
    .json({
      message: "Signed out successfully",
    });
};

export default handleLogout;
