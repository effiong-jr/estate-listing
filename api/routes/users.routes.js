import express from "express";
import auth from "../middlewares/auth.js";
import handleUpdateUser from "../controllers/user/updateUser.controller.js";
import handleDeleteUser from "../controllers/user/deleteUser.controller.js";

const userRouter = express.Router();

//Protected routes
userRouter.use(auth);

userRouter.get("/dashboard", (req, res) => {
  res.status(200).json({
    message: "Dashboard fetched successfully",
    data: {},
  });
});

userRouter.post("/update", handleUpdateUser);
userRouter.delete("/delete", handleDeleteUser);

export default userRouter;
