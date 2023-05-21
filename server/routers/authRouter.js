const express = require("express");
const {
  userSignUp,
  userSignIn,
  userLogout,
  isAuthenticated,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.route("/signup").post(userSignUp);
authRouter.route("/signin").post(userSignIn);
authRouter.route("/logout").get(userLogout);
authRouter.route("/isAuth").get(isAuthenticated);
authRouter.route("/logout").get(userLogout);

module.exports = authRouter;
