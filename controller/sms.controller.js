const smsService = require("../service/sms.service");
const logger = require("../logger/api.logger");

function getSmsByUserId(req, res) {
  (async function () {
    const { userId } = req.params;
    logger.info("Controller: getSmsByUserId");
    const data = await smsService.getSmsByUserId(userId);
    return res.status(200).send({
      status: 200,
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function saveSms(req, res) {
  (async function () {
    const { messages, userId } = req.body;
    logger.info("Controller: saveSms");
    if (!messages) {
      return res.status(400).send({
        status: 400,
        message: "contacts required !",
      });
    }

    if (!userId) {
      return res.status(400).send({
        status: 400,
        message: "userId required !",
      });
    }

    messages.map(async (item) => {
      const data = await smsService.findByMsg(item.message);
      if (!data) {
        await smsService.createSMS({ ...item, userId });

        return item;
      }
      return item;
    });

    return res.status(200).send({
      status: 200,
      message: "created successfully !",
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}


function deleteSMS(req, res) {
  (async function () {
    const data = await smsService.deleteSMS(req.params.id);
    return res.status(200).send({
      status: 200,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}


module.exports = {
  getSmsByUserId,
  saveSms,
  deleteSMS
};
