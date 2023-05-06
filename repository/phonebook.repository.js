const { connect, disconnect } = require("../config/db.config");
const { PhoneBook } = require("../model/phonebook.model");
const logger = require("../logger/api.logger");

class ContactRepository {
  constructor() {
    connect();
  }

  async getContacts() {
    const users = await PhoneBook.find({});
    console.log("users:::", users);
    return users;
  }

  async createContact(user) {
    let data = null;
    try {
      console.log("user",user)
      data = await PhoneBook.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async findByMobile(mobile) {
    let data = null;
    try {
      data = await PhoneBook.findOne({ mobile });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async findByUserId(userId) {
    let data = null;
    try {
      data = await PhoneBook.find({ userId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async updateContact(user) {
    let data = null;
    try {
      data = await PhoneBook.updateOne(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }

  async deleteContact(userId) {
    let data = null;
    try {
      data = await PhoneBook.deleteOne({ _id: userId });
    } catch (err) {
      logger.error("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new ContactRepository();
