import express from "express";
import { io } from "../lib/socket.js";
import Room from "../models/room.js";
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { roomName, owner } = req.body;
    let insert = await Room.create({ name: roomName, owner });
    insert.save();

    res.status(201).json({ success: 1, data: insert });
  } catch (error) {
    res.status(400).json({ message: error.message, success: 0 });
  }
});

router.post("/join/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, userId } = req.body;
    let room = await Room.findById(roomId);

    if (!room) {
      return res.status(200).json({ message: "Room not found", success: 0 });
    }

    if (room.owner == userId) {
      return res
        .status(200)
        .json({ message: "You are the owner of this room", success: 0 });
    }

    if (room.start) {
      return res
        .status(200)
        .json({ message: "Game already started", success: 0 });
    }
    room.users.push({ name, userId });

    room.save();
    io.to(room.owner).emit("newUser", { name, userId });
    res.status(200).json({ success: 1, data: room });
  } catch (error) {
    res.status(400).json({ message: error.message, success: 0 });
  }
});

export default router;
