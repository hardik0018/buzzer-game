import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
    },
    start: { type: Boolean, default: false },
  },
  { thimestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
