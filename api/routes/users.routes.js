import express from "express";
import registerUser from "../controllers/user/register.controller.js";
import handleLogin from "../controllers/user/login.controller.js";
import auth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", handleLogin);

//Protected routes
userRouter.use(auth);

userRouter.get("/dashboard", (req, res) => {
  res.status(200).json({
    message: "Dashboard fetched successfully",
    data: {},
  });
});

export default userRouter;
