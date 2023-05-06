const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: "string",
    mobile: "string",
    otp: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const User = mongoose.model("users", userSchema);

module.exports = {
    User,
};
