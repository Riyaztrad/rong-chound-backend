const userRepository = require("../repository/user.repository");

class UserService {
  constructor() {}

  async getUsers() {
    return await userRepository.getUsers();
  }

  async createUser(user) {
    return await userRepository.createUser(user);
  }
  async findByMobile(mobile) {
    const data = await userRepository.findByMobile(mobile);
    console.log("data", data);
    return data;
  }

  async findByOtp(otp, mobile) {
    return await userRepository.findByOtp(otp, mobile);
  }

  async updateUser(user) {
    return await userRepository.updateUser(user);
  }

  async deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
