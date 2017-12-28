var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('./mongo/mongodb.js');
app.use(bodyParser.json())

var User = require("./mongo/models/login.js");

app.post("/register",function(req,res){
    
    User.find(req.body,function(err,doc){
        if(doc.length<1){
            var user = new User(req.body);
            user.save(function(err,doc){
                if(err) res.send(err);
                res.send("success");
            })
        }else {
            res.send("用户名已存在！")
        }
    })

})
app.post("/login",function(req,res){
    var conn = {
        'username' : req.body.username
    }
    User.findOne(conn,function(err,doc){
        if(!doc || doc.length<1){
            res.json({
                status:"error",
                message:"该用户不存在"
            });
        }else if(doc.password!=req.body.password){
            res.json({
                status:"error",
                message:"密码错误！"
            })
        }else {
            res.json({
                status:'success',
                message:"登录成功"
            })
        }
    })

})







var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function(socket){
    console.log('a user connected');
    //监听新用户加入
    socket.on('login', function(obj){
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;
        
        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }
        
        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了聊天室');
    });

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        if(onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {userid:socket.name, username:onlineUsers[socket.name]};
            
            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;
            
            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了聊天室');
        }
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username+'说：'+obj.content);
    });
});



app.listen(4000);