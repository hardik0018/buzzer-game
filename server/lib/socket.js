import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Room from "../models/room.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", async () => {
    const { id } = socket;
    let find = await Room.findOne({ owner: id });
    if (find) {
      find.users.forEach((element) => {
        io.to(element.userId).emit("roomDeleted", { message: "Room deleted" });
      });
      await Room.findByIdAndDelete(find._id);
    }

    let findUser = await Room.find({ users: { $elemMatch: { userId: id } } });
    if (findUser) {
      findUser.forEach(async (element) => {
        let index = element.users.findIndex((x) => x.userId == id);
        element.users.splice(index, 1);
        element.save();
        io.to(element.owner).emit("userLeft", { userId: id });
      });
    }
    console.log("User disconnected", socket.id);
  });

  socket.on("startGame", async (roomId) => {
    let room = await Room.findById(roomId);
    console.log(room);
    room.start = true;
    room.save();
    room.users.forEach((element) => {
      io.to(element.userId).emit("startGame");
    });
  });

  socket.on("stopGame", async (roomId) => {
    let room = await Room.findById(roomId);
    room.start = false;
    room.save();
    room.users.forEach((element) => {
      io.to(element.userId).emit("stopGame");
    });
  });

  socket.on("resetGame", async (roomId) => {
    let room = await Room.findById(roomId);
    room.users.forEach((element) => {
      io.to(element.userId).emit("resetGame");
    });
  });

  socket.on("buzz", async ({ roomId, id, time }) => {
    let room = await Room.findById(roomId);
    io.to(room.owner).emit("buzz", { id, time });
  });
});

export { server, io, app };
