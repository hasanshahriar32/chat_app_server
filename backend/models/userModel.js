const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    profilePic: {
      type: String,
      trim: true,
      default:
        "https://e1.pngegg.com/pngimages/444/382/png-clipart-frost-pro-for-os-x-icon-set-now-free-contacts-male-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
