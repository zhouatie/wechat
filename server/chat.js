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

function handler (req, res) {

}

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data,66);
    io.emit("message",{info:'收到消息是'+data.info})
  });
});