const { connect, disconnect } = require("../config/db.config");
const { Video } = require("../model/video.model");
const logger = require("../logger/api.logger");

class ContentRepository {
  constructor() {
    connect();
  }

  async getContents() {
    const contents = await Video.find({});

    return contents;
  }

  async createContent(video) {
    let data = null;
    try {
      console.log("users:::", video);
      data = await Video.create(video);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteContent(id) {
    let data = null;
    try {
      data = await Video.deleteOne({ _id: id });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new ContentRepository();
