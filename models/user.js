let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
        lowercase : true
    },
    mobile: {
        type: Number,
        required : [ true, 'mobile is required'],
        unique : true,
        lowercase : true
    },
    otp: {
        type: Number,
        unique : true,
        lowercase : true
    }

});

module.exports = mongoose.model('User', User);