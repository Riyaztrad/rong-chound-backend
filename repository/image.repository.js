const { connect, disconnect } = require("../config/db.config");
const { Image } = require("../model/image.model");
const logger = require("../logger/api.logger");

class ImageRepository {
  constructor() {
    connect();
  }

  async getImagesByUserId(userId) {
    const images = await Image.find({ userId });

    return images;
  }

  async createImage(video) {
    let data = null;
    try {
      console.log("users:::", video);
      data = await Image.create(video);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async getImageByImageName(fileName) {
    let data = null;
    try {
      console.log("users:::", fileName);
      data = await Image.findOne({ originalname: fileName });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
  async deleteImage(id) {
    let data = null;
    try {
      data = await SMS.deleteOne({ _id: id });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}


module.exports = new ImageRepository();
