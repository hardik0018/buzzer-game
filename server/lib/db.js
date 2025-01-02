import mongoose from "mongoose";

async function dbconnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
}

export default dbconnect;
