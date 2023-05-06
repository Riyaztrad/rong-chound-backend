// const Middleware = require('../express/middleware');
const taskController = require("../controller/task.controller");
const userController = require("../controller/user.controller");
const adminController = require("../controller/admin.controller");
const phonebookController = require("../controller/phonebook.controller");
const smsController = require("../controller/sms.controller");

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images/logo");
//   },
//   filename: (req, file, cb) => {
//     var filetype = "";
//     if (file.mimetype === "image/gif") {
//       filetype = "gif";
//     }
//     if (file.mimetype === "image/png") {
//       filetype = "png";
//     }
//     if (file.mimetype === "image/jpeg") {
//       filetype = "jpg";
//     }
//     cb(null, "image-" + Date.now() + "." + filetype);
//   },
// });

// const upload = multer({ storage: storage });

function registerRoutes({ router }) {
  router.get("/api/users", userController.getUsers);
  router.post("/api/user", userController.register);
  router.get("/api/compare/:otp", userController.compareOtp);

  // admin routes
  router.post("/api/admin/register", adminController.register);
  router.post("/api/admin/login", adminController.login);

  // phone book
  router.post("/api/phonebook/saveContacts", phonebookController.saveContacts);
  router.get(
    "/api/phonebook/getContacts/:userId",
    phonebookController.getContactsByUserId
  );

  // sms
  router.post("/api/sms/saveSms", smsController.saveSms);
  router.get("/api/sms/getSmsByUserId/:userId", smsController.getSmsByUserId);

  //
  router.get("/api/tasks", (req, res) => {
    console.log(req.body);
    taskController.createTask(req.body.task).then((data) => res.json(data));
  });

  router.put("/api/task", (req, res) => {
    taskController.updateTask(req.body.task).then((data) => res.json(data));
  });

  // router.delete("/api/task/:id", (req, res) => {
  //   taskController.deleteTask(req.params.id).then((data) => res.json(data));
  // });

  // router.get(config.routes.getAdmins, adminController.getAdminUsers);
  // router.post(config.routes.addAdmin, adminController.addAdmin);
  //   router.post(
  //     config.routes.uploadCoverPic,
  //     uploadForCover.single("file"),
  //     adminController.uploadCoverPic
  //   );
} //

module.exports = {
  registerRoutes,
};
