const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userAddressSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Address must have at least one name!"],
    },
    description: {
      type: String,
      required: [true, "Address must have description!"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User address must belong to a User!"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.UserAddress ||
  mongoose.model("UserAddress", userAddressSchema);
