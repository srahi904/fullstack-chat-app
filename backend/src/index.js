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

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Fallback for all other routes to serve the index.html
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server started on port  http://localhost:${PORT}`);

  connectDB();
});
