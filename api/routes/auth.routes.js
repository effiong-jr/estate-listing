import express from "express";
import registerUser from "../controllers/user/register.controller.js";
import handleLogin from "../controllers/user/login.controller.js";
import handleAuthWithGoogle from "../controllers/user/authWithGoogle.controllers.js";
import handleLogout from "../controllers/user/logout.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

// User authentication with Google
authRouter.post("/google", handleAuthWithGoogle);

export default authRouter;
