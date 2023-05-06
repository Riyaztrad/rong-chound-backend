const phonebookRepository = require("../repository/phonebook.repository");

class UserService {
  constructor() {}

  async getContacts() {
    return await phonebookRepository.getContacts();
  }

  async createContact(data) {
    return await phonebookRepository.createContact(data);
  }

  async findByMobile(mobile) {
    return await phonebookRepository.findByMobile(mobile);
}

  async findByUserId(userId) {
    return await phonebookRepository.findByUserId(userId);
  }

  async updateContact(data) {
    return await phonebookRepository.updateContact(data);
  }

  async deleteContact(id) {
    return await phonebookRepository.deleteContact(id);
  }
}

module.exports = new UserService();
