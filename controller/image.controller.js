const imageService = require("../service/image.service");
const logger = require("../logger/api.logger");
const fileUploadConfig = require("../config/video.config").fileUploadConfig;
const multer = require("multer");

function getImagesByUserId(req, res) {
  (async function () {
    logger.info("Controller: getContents");
    const data = await imageService.getImagesByUserId(req.params.userId);
    return res.status(200).send({
      status: 200,
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function uploadImages(req, res) {
  (async function () {
    const { files, userId } = req.body;
    console.log("file", userId);
    req.files.map(async (item) => {
      const isExist = await imageService.getImageByImageName(item.originalname);
      if (!isExist) {
        const data = await imageService.createImage({
          url: item.path,
          originalname: item.originalname,
          userId: userId,
        });
      }
      return item;
    });
    return res.status(200).send({
      status: 200,
      message: "uploaded successfully !",
      data: req.files,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

module.exports = {
  getImagesByUserId,
  uploadImages,
};
