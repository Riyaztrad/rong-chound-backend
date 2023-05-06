
const smsRepository = require("../repository/sms.repository");

class UserService {
  constructor() {}

  async getSmsByUserId(userId) {
    return await smsRepository.findByUserId(userId);
  }

  async createSMS(data) {
    return await smsRepository.createSMS(data);
  }

  async findByMsg(data) {
    return await smsRepository.findByMsg(data);
  }
}

module.exports = new UserService();

