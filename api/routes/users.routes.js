import express from "express";
import registerUser from "../controllers/user/register.controller.js";
import handleLogin from "../controllers/user/login.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", handleLogin);

export default userRouter;
