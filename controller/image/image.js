const express = require('express');
const Image = require('../../models/image');
const multer = require("multer");
const path = require("path");


const getimage = async (req, res, next) => {
    try {

        let phonebook = await PhoneBook.find({});

        if (users.length > 0) {
            return res.status(200).json({
                'message': 'image fetched successfully',
                'data': phonebook
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No phonebook found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ".uploads"), // cb -> callback
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
  
  const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
  }).single("image");
  

const createImage = async (req, res, next) => {
    handleMultipartData(req, res, async (err) => {
        if (err) {
          res.json({ msgs: err.message });
        }
    
        res.json({
          body: req.body,
          file: req.file,
        });
      });
    }
module.exports = {
    getimage: getimage,
    createImage: createImage,
}
