const { connect, disconnect } = require("../config/db.config");
const { SMS } = require("../model/sms.model");
const logger = require("../logger/api.logger");

class SMSRepository {
  constructor() {
    connect();
  }

  async getSMS() {
    const users = await SMS.find({});
    console.log("users:::", users);
    return users;
  }

  async createSMS(user) {
    let data = null;
    try {
      console.log("user", user);
      data = await SMS.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
  async findByMsg(message) {
    let data = null;
    try {
      data = await SMS.findOne({ message });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async findByUserId(userId) {
    let data = null;
    try {
      data = await SMS.find({ userId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateContact(user) {
    let data = null;
    try {
      data = await SMS.updateOne(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteSMS(id) {
    let data = null;
    try {
      data = await SMS.deleteOne({ _id: id });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new SMSRepository();
