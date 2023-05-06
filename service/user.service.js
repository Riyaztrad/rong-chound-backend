const userRepository  = require('../repository/user.repository');

class UserService {

    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user);
    }
    async findByMobile(mobile) {
        return await userRepository.findByMobile(mobile);
    }

    async findByOtp(otp) {
        return await userRepository.findByOtp(otp);
    }

    async updateUser(user) {
        return await userRepository.updateUser(user);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }

}

module.exports = new UserService();