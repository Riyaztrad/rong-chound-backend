const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: "string",
    userId: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const Image = mongoose.model("images", imageSchema);

module.exports = {
  Image,
};
