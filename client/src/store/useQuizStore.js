import { create } from "zustand";
import { io } from "socket.io-client";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import Buzz1 from "../assets/buzz1.mp3";

const useQuizStore = create((set, get) => ({
  userId: null,
  socket: null,
  roomId: null,
  isOwner: false,
  roomUser: {},
  createRoom: null,
  isRunning: false,
  winner: null,
  timer: 30,
  onCreateRoom: async ({ roomName, userId }) => {
    const res = await axiosInstance.post("/room/create", {
      roomName,
      owner: userId,
    });
    if (res.data.success) {
      toast.success("Create a Room");
      set({ roomId: res.data.data._id, isOwner: true });
    } else {
      set({ roomId: null });
      toast.error(res.data.message);
    }
  },
  joinRoom: null,
  onJoinRoom: async (roomId, name) => {
    const res = await axiosInstance.post(`/room/join/${roomId}`, {
      name,
      userId: get().userId,
    });

    if (res.data.success) {
      toast.success("Join a Room");
      set({ roomId: res.data.data._id });
    } else {
      set({ roomId: null });
      toast.error(res.data.message);
    }
  },
  connectSocket: () => {
    const { socket } = get();

    if (!socket) {
      let socket = io(import.meta.env.VITE_SERVER_HOST, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        set({ userId: socket.id });
      });

      socket.on("newUser", (msg) => {
        const { roomUser } = get();
        toast.success(`${msg.name} is Join the Game`);
        roomUser[msg.userId] = { name: msg.name, isActive: false, score: 0 };
        set({ roomUser });
      });

      socket.on("userLeft", (msg) => {
        const { roomUser } = get();
        toast.error(`${msg.name} is Left the Game`);
        delete roomUser[msg.userId];

        set({ roomUser });
      });

      socket.on("roomDeleted", () => {
        toast.error("Room are Deleted");

        set({ roomUser: [], roomId: null });
      });

      socket.on("startGame", () => {
        toast.success("Start The Game");
        set({ isRunning: true });
      });

      socket.on("stopGame", () => {
        set({ isRunning: false });
      });

      socket.on("resetGame", () => {
        set({ isRunning: false, timer: 30 });
      });

      socket.on("updateTime", (time) => {
        set({ timer: time });
      });

      socket.on("buzz", (msg) => {
        if (get().winner == null) {
          set({ winner: msg.id });
          toast.success(`Press buzz is:-${msg.id}`);
        }
        get().stopGame();
      });

      set({ socket });
    }
  },
  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
  startGame: () => {
    get().sendMessageRoom("startGame");

    set({ isRunning: true });
  },
  stopGame: () => {
    get().sendMessageRoom("stopGame");
    set({ isRunning: false });
  },

  resetGame: () => {
    get().sendMessageRoom("resetGame");
    set({ isRunning: false, timer: 30, winner: null });
  },
  updateTime: () => {
    const { socket, timer } = get();

    if (timer === 0) {
      socket.emit("stopGame");
      return;
    }

    set({ timer: timer - 1 });
  },
  sendMessageRoom: (msg) => {
    const { socket, roomUser } = get();
    if (roomUser) {
      socket.emit(msg, get().roomId);
    } else {
      toast.error("Not User Join");
    }
  },
  hanldeBuzz: (id) => {
    const audio = new Audio(Buzz1);
    const { socket } = get();
    audio.play();
    // set({winner:id})
    // get().stopGame()
    const date = new Date();
    socket.emit("buzz", {
      roomId: get().roomId,
      id,
      time: date.toTimeString(),
    });
  },
  exit: () => {
    get().disconnectSocket();
    set({ roomId: null });
  },
}));

export default useQuizStore;
