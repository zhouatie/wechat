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

// io.on('connection', function (socket) {
//   socket.on('message', function (data) {
//     console.log(data,66);
//     io.emit("message",{info:'收到消息是'+data.info})
//   });
// });

var arrAllSocket = [];
io.on('connection', function (socket) {
  console.log(1)
  socket.on('join', function (userName) {
    user = userName;
  console.log(user,'进去了')
    
    arrAllSocket[user] = socket;//把socket存到全局数组里面去 
  });

  //私聊：服务器接受到私聊信息，发送给目标用户  
  socket.on('private_message', function (from, to, msg) {
    var target = arrAllSocket[to];
    console.log("接受私人消息",to,target)
    if (target) {
      console.log('emitting private message by ', from, ' say to ', to, msg);
      target.emit("private_message", from, to, msg);
    }
  });
}); 

io.on("disconnect",function(a){
  console.log(a)
})