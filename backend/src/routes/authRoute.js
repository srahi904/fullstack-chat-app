/** @format */

import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth); //check user is authenticated or not if authenticated call the next middleware

export default router;
