import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controller/auth.controller.js";
import {verifyToken} from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/verify-email", verifyToken , verifyEmail);

router.post("/login", login);

router.post("/logout", verifyToken , logout);

router.post("/forgot-password", verifyToken , forgotPassword);

router.post("/reset-password/:token", verifyToken , resetPassword);

export default router;
