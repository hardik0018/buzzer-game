import mongoose from "mongoose";

async function dbconnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
}

export default dbconnect;
