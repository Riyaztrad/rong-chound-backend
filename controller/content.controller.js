const contentService = require("../service/content.service");
const logger = require("../logger/api.logger");
const fileUploadConfig = require("../config/video.config").fileUploadConfig;
const multer = require("multer");

function getContents(req, res) {
  (async function () {
    logger.info("Controller: getContents");
    const data = await contentService.getContents();
    return res.status(200).send({
      status: 200,
      data,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function deleteContent(req, res) {
  (async function () {
    logger.info("Controller: getContents");
    const data = await contentService.deleteContent(req.params.id);
    return res.status(200).send({
      status: 200,
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

function uploadContent(req, res) {
  (async function () {
    var upload = multer(fileUploadConfig).single("user-file");
    upload(req, res, async (uploadError) => {
      const { file, title } = req.body;

      if (uploadError) {
        var errorMessage;
        if (uploadError.code === "LIMIT_FILE_TYPE") {
          errorMessage = uploadError.errorMessage;
        } else if (uploadError.code === "LIMIT_FILE_SIZE") {
          errorMessage = "Maximum file size allowed is 20MB";
        }
        return res.json({
          error: errorMessage,
        });
      }
      const fileId = req.file.filename.split("-")[0];
      const link = "/content/" + fileId;

      // res.json({
      //   success: true,
      //   link: link,
      // });
      await contentService.createContent({
        url: req.file.path,
        title,
      });
      return res.status(200).send({
        status: 200,
        message: "create successfully !",
        data: req.file,
      });
      // return res.send(req.file);
    });
  })().catch((err) => {
    res.status(503).send(err.stack);
  });
}

module.exports = {
  getContents,
  uploadContent,
  deleteContent
};
