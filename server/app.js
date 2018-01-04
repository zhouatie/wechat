var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('./mongo/mongodb.js');
app.use(bodyParser.json())

var User = require("./mongo/models/login.js");

// app.use(express.static("../wechat/build/"));
// app.use(express.static("./public"));

// let user = {};

// var onlineUsers = {};
// //当前在线人数
// var onlineCount = 0;
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
// 注册
app.post("/register", function (req, res) {

    User.find({ username: req.body.username }, function (err, doc) {
        if (doc.length < 1) {
            var user = new User(req.body);
            user.save(function (err, doc) {
                if (err) res.send(err);
                res.json({
                    status: 'success',
                    message: "登录成功",
                    userInfo: doc
                })
            })
        } else {
            res.send("用户名已存在！")
        }
    })

})
// 登录
app.post("/login", function (req, res) {
    var conn = {
        'username': req.body.username
    }
    User.findOne(conn, function (err, doc) {
        if (!doc || doc.length < 1) {
            res.json({
                status: "error",
                message: "该用户不存在"
            });
        } else if (doc.password != req.body.password) {
            res.json({
                status: "error",
                message: "密码错误！"
            })
        } else {
            // user = doc;
            res.json({
                status: 'success',
                message: "登录成功",
                userInfo: doc
            })
        }
    })

})
// 全局搜索好友
app.post("/getUsers", (req, res) => {
    let partten = new RegExp("^" + req.body.username);
    let conn = {
        username: {
            $regex: partten,
            $ne: req.body.self_username
        }
    }

    User.find(conn, (err, doc) => {
        if (doc) {
            res.json({
                status: "success",
                message: "查找成功",
                userInfo: doc
            })
        }
    }).limit(5)
})
// 添加朋友
app.post('/makeFriend', (req, res) => {

    let self = req.body.self;
    let friend = req.body.friend;
    console.log(self,1);
    console.log(friend,2);
    User.update({ _id: friend.id }, { $addToSet: { friends: self } },(err,doc)=>{

    })
    User.update({ _id: self.id }, { $addToSet: { friends: friend } }, (err, doc) => {
        res.json({
            status: "success",
            message: "添加好友成功"
        })
    })

})









app.listen(4000);