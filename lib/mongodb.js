import mongoose from "mongoose";

export const connectMongoDB = async () => {
  let result = "";
  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URI);
    result = "Connected to MongoDB";
  } catch (error) {
    result = `Error connecting to MongoDB: ", ${error}`;
  }
  return result;
};
