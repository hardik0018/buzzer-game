import dbconnect from "./lib/db.js";
import express from "express";
import cors from "cors";
import roomCreateRoutes from "./routes/roomCreateRoutes.js";
import { app, server } from "./lib/socket.js";
import dotenv from "dotenv";
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/room", roomCreateRoutes);

server.listen(3000, () => {
  console.log("Server running on port 3000");
  dbconnect();
});
