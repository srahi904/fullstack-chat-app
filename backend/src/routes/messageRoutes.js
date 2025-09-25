/** @format */

import express from "express";
import { protectRoute } from "../middleware/AuthMiddleware.js";
import {
  getMessages,
  getUserForSidebar,
  sendMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessages);

export default router;
