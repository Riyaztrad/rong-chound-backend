const { connect, disconnect } = require("../config/db.config");
const { User } = require("../model/user.model");
const logger = require("../logger/api.logger");

class UserRepository {
  constructor() {
    connect();
  }

  async getUsers() {
    const users = await User.find({});
    console.log("users:::", users);
    return users;
  }

  async createUser(user) {
    let data = null;
    try {
      data = await User.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
  async findByMobile(mobile) {
    let data = null;
    try {
      data = await User.findOne({ mobile });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async findByOtp(otp, mobile) {
    let data = null;
    try {
      data = await User.findOne({ otp, mobile });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateUser(user) {
    let data = null;
    try {
      console.log("user", user);
      data = await User.findOneAndUpdate({ _id: user._id }, user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteUser(userId) {
    let data = null;
    try {
      data = await User.deleteOne({ _id: userId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new UserRepository();
