const userService = require("../service/user.service");
const util = require("../utils");
const logger = require("../logger/api.logger");

function getUsers(req, res) {
  (async function () {
    // const { fullName, id, username, workspace } = req.body;
    logger.info("Controller: getUsers");
    const data = await userService.getUsers();
    return res.status(200).send({
      status: 200,
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function register(req, res) {
  (async function () {
    const { mobile, name } = req.body;
    logger.info("Controller: register");
    if (!mobile) {
      return res.status(400).send({
        status: 400,
        message: "mobile required !",
      });
    }
    if (!name) {
      return res.status(400).send({
        status: 400,
        message: "name required !",
      });
    }
    const user = await userService.findByMobile(mobile);
    if (user) {
      const otp = util.generateOtp();
      return res.status(200).send({
        status: 200,
        message: "otp successfully sent!",
      });
    }
    const otp = util.generateOtp();
    const data = await userService.createUser({ ...req.body, otp });
    return res.status(200).send({
      status: 200,
      message: "create successfully !",
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function compareOtp(req, res) {
  (async function () {
    const { otp } = req.params;
    logger.info("Controller: compareOtp");
    const user = await userService.findByOtp(otp);
    if (user) {
      return res.status(200).send({
        status: 200,
        message: "otp matched!",
      });
    }

    return res.status(400).send({
      status: 400,
      message: "wrong otp!",
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

module.exports = {
  getUsers,
  register,
  compareOtp,
};
