const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: "string",
    url: "string",
    created_at: "date",
    updated_at: "date",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const Video = mongoose.model("contents", videoSchema);

module.exports = {
  Video,
};
