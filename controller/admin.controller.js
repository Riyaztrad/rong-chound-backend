const adminService = require("../service/adminUser.service");
const util = require("../utils");
const logger = require("../logger/api.logger");

function getUsers(req, res) {
  (async function () {
    // const { fullName, id, username, workspace } = req.body;
    logger.info("Controller: getUsers");
    const data = await adminService.getAdminUsers();
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
    const { username, password, name } = req.body;
    logger.info("Controller: register");
    if (!username) {
      return res.status(400).send({
        status: 400,
        message: "username required !",
      });
    }
    if (!password) {
      return res.status(400).send({
        status: 400,
        message: "password required !",
      });
    }
    if (!name) {
      return res.status(400).send({
        status: 400,
        message: "name required !",
      });
    }
    const data = await adminService.createAdminUser({ ...req.body });
    return res.status(200).send({
      status: 200,
      message: "create successfully !",
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function login(req, res) {
  (async function () {
    const { username, password } = req.body;
    logger.info("Controller: login");
    if (!password) {
      return res.status(400).send({
        status: 400,
        message: "password required !",
      });
    }
    if (!username) {
      return res.status(400).send({
        status: 400,
        message: "username required !",
      });
    }
    const user = await adminService.login({ username, password });
    if (user) {
      return res.status(200).send({
        status: 200,
        message: "login successfully!",
        data: user,
      });
    }

    return res.status(400).send({
      status: 400,
      message: "invalid username or password!",
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

module.exports = {
  getUsers,
  register,
  login,
};
