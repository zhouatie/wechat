var app = require('http').createServer(handler)
var io = require('socket.io')(app);

// var express = require("express");
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.listen(8888);

function handler(req, res) {

}


var arrAllSocket = {};
io.on('connection', function (socket) {
  socket.on('join', function (userName) {
    user = userName;
    socket.username = user;
    arrAllSocket[user] = socket;//把socket存到全局数组里面去
  });

  //私聊：服务器接受到私聊信息，发送给目标用户
  socket.on('private_message', function (from, to, msg) {
    var target = arrAllSocket[to];

    if (target) {
console.log(target.username)
      target.emit("private_message", from, to, msg);
      target.emit("common_message", from, to, msg);
    }
  });

  //连接断开
  socket.on('disconnect', function (data) {
    delete(arrAllSocket[socket.username]);
  });
});
