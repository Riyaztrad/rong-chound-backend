const { connect, disconnect } = require("../config/db.config");
const { AdminUser } = require("../model/admin.model");
const logger = require("../logger/api.logger");

class AdminUserRepository {
  constructor() {
    connect();
  }

  async getAdminUsers() {
    const adminUsers = await AdminUser.find({});
    console.log("adminUsers:::", adminUsers);
    return adminUsers;
  }

  async createAdminUser(adminUser) {
    let data = {};
    try {
      data = await AdminUser.create(adminUser);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async login(adminUser) {
    let data = {};
    try {
      data = await AdminUser.findOne({
        username: adminUser.username,
        password: adminUser.username,
      });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async findByMobile(mobile) {
    let data = {};
    try {
      data = await AdminUser.findOne({ mobile });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
  async updateAdminUser(adminUser) {
    let data = {};
    try {
      data = await AdminUser.updateOne(adminUser);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteAdminUser(adminUserId) {
    let data = {};
    try {
      data = await AdminUser.deleteOne({ _id: adminUserId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new AdminUserRepository();
