import express from "express";
import registerUser from "../controllers/auth/register.controller.js";
import handleLogin from "../controllers/auth/login.controller.js";
import handleAuthWithGoogle from "../controllers/auth/authWithGoogle.controllers.js";
import handleLogout from "../controllers/auth/logout.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

// User authentication with Google
authRouter.post("/google", handleAuthWithGoogle);

export default authRouter;
