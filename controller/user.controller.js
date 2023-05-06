const userService = require("../service/user.service");
const util = require("../utils");
const logger = require("../logger/api.logger");
const { Vonage } = require("@vonage/server-sdk");
const jwt = require("jsonwebtoken");

const vonage = new Vonage({
  apiKey: "61d49819",
  apiSecret: "yJhRd3IE7vcAxZO8",
});

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
    const otp = util.generateOtp();
    const from = "Vonage APIs";
    const to = mobile;
    const text = `Your one time password is ${otp}`;

    const user = await userService.findByMobile(mobile);
    if (user) {
      await vonage.sms
        .send({ to, SenderID: from, text })
        .then((resp) => {
          console.log("Message sent successfully");
          console.log(resp);
        })
        .catch((err) => {
          console.log("There was an error sending the messages.");
          console.error(err);
        });
      return res.status(200).send({
        status: 200,
        message: "otp successfully sent!",
      });
    }

    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });

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
    const { otp,mobile } = req.params;
    logger.info("Controller: compareOtp");
    const user = await userService.findByOtp(otp,mobile);
    if (user) {
      const token = jwt.sign(
        {
          user,
        },
        "rong-auth-token"
      );
      return res.status(200).send({
        status: 200,
        message: "otp matched!",
        data: token,
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
