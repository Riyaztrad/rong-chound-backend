const imageRepository = require("../repository/image.repository");

class ImageService {
  constructor() {}

  async getImagesByUserId(userId) {
    return await imageRepository.getImagesByUserId(userId);
  }
  async getImageByImageName(imageName) {
    return await imageRepository.getImageByImageName(imageName);
  }
  async createImage(data) {
    return await imageRepository.createImage(data);
  }
}

module.exports = new ImageService();
