let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Image = new Schema({
    userId: {
        type: String,
        required : [ true, 'userId is required'],
        lowercase : true
    },
    image: {
        type: Number,
        required : [ true, 'image is required'],
        unique : true,
        lowercase : true
    }

});

module.exports = mongoose.model('Image', Image);