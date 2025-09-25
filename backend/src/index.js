/** @format */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;

// Correctly determine directory paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS (allow dev client)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production static files and SPA catch-all
if (process.env.NODE_ENV === "production") {
  // Construct the correct path to the frontend's dist directory
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

  // Serve static files (JS, CSS, images) from the frontend build
  app.use(express.static(frontendDistPath));

  // ❗❗❗ **THIS IS THE FIXED LINE** ❗❗❗
  // For any other request, send the index.html file. Notice there is NO COLON before the star.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
