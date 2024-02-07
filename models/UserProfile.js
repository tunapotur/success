const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userProfileSchema = new Schema(
  {
    theme: {
      type: String,
      enum: ["System", "Dark", "Light"],
      default: "System",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User profile must belong to a User!"],
    },
  },
  { timestamps: true },
);

export default mongoose.model.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
