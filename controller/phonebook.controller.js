const phoneBookService = require("../service/phonebook.service");
const logger = require("../logger/api.logger");

function getContactsByUserId(req, res) {
  (async function () {
    const { userId } = req.params;
    logger.info("Controller: getUsers");
    const data = await phoneBookService.findByUserId(userId);
    return res.status(200).send({
      status: 200,
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function saveContacts(req, res) {
  (async function () {
    const { contacts, userId } = req.body;
    logger.info("Controller: saveContacts");
    if (!contacts) {
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

     contacts.map(async (item) => {
      const user = await phoneBookService.findByMobile(item.mobile);
      if (!user) {
       await phoneBookService.createContact({...item,userId});

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

module.exports = {
  getContactsByUserId,
  saveContacts,
};
