const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userProfileSchema = new Schema(
  {
    theme: {
      type: String,
      enum: ["system", "dark", "light"],
      default: "system",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User profile must belong to a User!"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
