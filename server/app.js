var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser")
var multer = require('multer');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('./mongo/mongodb.js');
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().single('avatar'));
var upload = multer({ dest: '../wechat/public/logos' });
var User = require("./mongo/models/user.js");

var online_arr = [];

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
    // if(online_arr.indexOf(req.body.username)>=0){
    //     res.json({
    //             status: 'error',
    //             message: "用户已在线"
    //         })
    //         return;
    // }
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
            online_arr.push(doc.username);
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

    User.update({ _id: friend.id }, { $addToSet: { friends: self } }, (err, doc) => {

    })
    User.update({ _id: self.id }, { $addToSet: { friends: friend } }, (err, doc) => {
        res.json({
            status: "success",
            message: "添加好友成功"
        })
    })

})

// 上传头像
app.post("/uploadLogo", upload.single("avatar"), (req, res) => {
    User.update({ _id: req.body.id }, { $set: { logo: './logos/' + req.file.filename } }, function () {
        res.send({
            status: "success",
            url: './logos/' + req.file.filename
        })
    })
})




app.listen(4000);