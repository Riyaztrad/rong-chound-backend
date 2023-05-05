var express =   require("express");
const server = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');


var app         =   express();

var multer  =   require('multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');
   
  app.post('upload-avatar',function(req,res){
      upload(req,res,function(err) {
          if(err) {
              return res.end("Error uploading file.");
          }
          res.end("File is uploaded");
      });
  });
//create the basic server setup
server.create(config, db);

//start the server
server.start();
