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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDistPath));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectDB();
});
