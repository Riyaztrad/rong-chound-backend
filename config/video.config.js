const multer = require("multer");
const fs = require("fs");

function fileFilter(req, file, callback) {
  var errorMessage = "";
  if (!file || file.mimetype !== "video/mp4") {
    errorMessage =
      'Wrong file type "' +
      file.originalname.split(".").pop() +
      '" found. Only mp4 video files are allowed!';
  }
  if (errorMessage) {
    return callback(
      { errorMessage: errorMessage, code: "LIMIT_FILE_TYPE" },
      false
    );
  }
  callback(null, true);
}

function destinationPath(req, file, callback) {
  var stat = null;
  try {
    stat = fs.statSync("content/");
  } catch (err) {
    fs.mkdirSync("content/");
  }
  callback(null, "content/");
}

function fileNameConvention(req, file, callback) {
  callback(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
}

const limits = {
  fileSize: 100 * 1024 * 1024, // 200MB
};

const storage = multer.diskStorage({
  destination: destinationPath,
  filename: fileNameConvention,
});

const fileUploadConfig = {
  fileFilter: fileFilter,
  storage: storage,
  limits: limits,
};

module.exports.fileUploadConfig = fileUploadConfig;
