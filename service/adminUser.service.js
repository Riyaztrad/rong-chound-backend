const adminUserRepository  = require('../repository/adminUser.repository');

class AdminUserService {

    constructor() {}

    async getAdminUsers() {
        return await adminUserRepository.getAdminUsers();
    }

    async createAdminUser(adminUser) {
        return await adminUserRepository.createAdminUser(adminUser);
    }
    async login(adminUser) {
        
        return await adminUserRepository.login(adminUser);
    }
    async findByMobile(mobile) {
        return await adminUserRepository.findByMobile(mobile);
    }

    async updateAdminUser(adminUser) {
        return await adminUserRepository.updateAdminUser(adminUser);
    }

    async deleteAdminUser(id) {
        return await adminUserRepository.deleteAdminUser(id);
    }

}

module.exports = new AdminUserService();