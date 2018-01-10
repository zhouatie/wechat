var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    friends: Array,
    logo: {
        type: String,
        default: './image/icon_moren_face.png'
    },
    rooms: Array
});

var User = mongoose.model('user', loginSchema);

module.exports = User;