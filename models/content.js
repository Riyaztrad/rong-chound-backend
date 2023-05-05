let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Content = new Schema({
    title: {
        type: String,
        required : [ true, 'title is required'],
        lowercase : true
    },
    video: {
        type: Number,
        required : [ true, 'video is required'],
        unique : true,
        lowercase : true
    }

});

module.exports = mongoose.model('Content', Content);