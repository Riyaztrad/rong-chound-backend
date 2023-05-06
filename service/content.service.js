const contentRepository = require("../repository/content.repository");

class ContentService {
  constructor() {}

  async getContents() {
    return await contentRepository.getContents();
  }

  async createContent(user) {
    return await contentRepository.createContent(user);
  }

  async deleteContent(id) {
    return await contentRepository.deleteContent(id);
  }
}

module.exports = new ContentService();
