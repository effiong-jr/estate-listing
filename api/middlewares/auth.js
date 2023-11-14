import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get accessToken from req header
    // const token = req.headers.authorization.replace("Bearer ", "");
    const token = req.cookies.accessToken.replace("Bearer ", "");

    //Decrypt token
    const jwt_payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = jwt_payload;
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  next();
};

export default auth;
