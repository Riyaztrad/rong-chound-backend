let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var SMS = new Schema({
    content: {
        type: String,
        required : [ true, 'content is required'],
        lowercase : true
    },
    mobile: {
        type: String,
        required : [ true, 'mobile is required'],
        unique : true,
        lowercase : true
    },
    userId: {
        type: String,
        required : [ true, 'userId is required'],
        unique : true,
        lowercase : true
    }


});

module.exports = mongoose.model('SMS', SMS);