const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: 120,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      lowercase: true,
      unique: true,
      trim: true,
      maxLength: 120,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
