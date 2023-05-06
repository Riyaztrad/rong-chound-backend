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
    let data = null;
    try {
      data = await AdminUser.create(adminUser);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async login(adminUser) {
    let data = null;
    try {
      console.log("adminUser",adminUser)
      data = await AdminUser.findOne({
        username: adminUser.username,
        password: adminUser.password,
      });
    } catch (err) {
      logger.error("Error::" + err);
    }
    console.log("data",data)
    return data;
  }

  async findByMobile(mobile) {
    let data = null;
    try {
      data = await AdminUser.findOne({ mobile });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
  async updateAdminUser(adminUser) {
    let data = null;
    try {
      data = await AdminUser.updateOne(adminUser);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteAdminUser(adminUserId) {
    let data = null;
    try {
      data = await AdminUser.deleteOne({ _id: adminUserId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new AdminUserRepository();
