const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: "string",
    username: "string",
    password: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const AdminUser = mongoose.model("admins", adminUserSchema);

module.exports = {
  AdminUser,
};
