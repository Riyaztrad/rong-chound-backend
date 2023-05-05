let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var PhoneBook = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
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

module.exports = mongoose.model('PhoneBook', PhoneBook);