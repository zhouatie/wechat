var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8888);

function handler (req, res) {

}

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data,66);
    io.emit("message",{info:'收到消息是'+data.info})
  });
});