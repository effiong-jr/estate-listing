const handleLogout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 0,
    })
    .status(200)
    .json({
      message: "Signed out successfully",
    });
};

export default handleLogout;
