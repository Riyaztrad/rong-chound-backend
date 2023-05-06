const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema(
  {
    mobile: "string",
    message: "string",
    userId: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const SMS = mongoose.model("sms", smsSchema);

module.exports = {
  SMS,
};
