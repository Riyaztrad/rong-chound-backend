const mongoose = require("mongoose");

const phoneBookSchema = new mongoose.Schema(
  {
    name: "string",
    mobile: "string",
    userId: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const PhoneBook = mongoose.model("phonebook", phoneBookSchema);

module.exports = {
  PhoneBook,
};
