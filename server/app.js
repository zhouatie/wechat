var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('./mongo/mongodb.js');
app.use(bodyParser.json())

var User = require("./mongo/models/login.js");

app.use(express.static("../wechat/build/"));

let user = {};

// 允许跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
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
        console.log(doc)
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
            user = doc;
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
    console.log(req.body.username);
    let partten = new RegExp("^" + req.body.username);
    let conn = {
        username: {
            $regex: partten,
            $ne: user.username
        }
    }

    User.find(conn, (err, doc) => {
        if (doc) {
            console.log(doc)
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
    let id = req.body.id;
    let nickname = req.body.nickname;
    // User.findOne({_id:id},(err,doc) => {
    //     console.log(doc);
    //     if(doc){
    //         if(doc.friends) {
    //             doc.friends.push(id);
    //         }else {
    //             doc.friends = [id]
    //         };
    //         console.log(doc,'doc')
    //         res.json({
    //             status:"success",
    //             message:"查找成功",
    //             userInfo:doc
    //         })
    //     }else {
    //         res.send('error')
    //     }
    // });
    User.update({ _id: id }, { $addToSet: { friends: { id: user._id, nickname: user.nickname } } }, (err, doc) => {

    })
    User.update({ _id: user._id }, { $addToSet: { friends: { id: id, nickname: nickname } } }, (err, doc) => {
        res.json({
            status: "success",
            message: "添加好友成功"
        })
    })

})






var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function (socket) {
    console.log('a user connected');
        io.emit('message', '还你消息');
    //监听新用户加入
    socket.on('login', function (obj) {
        console.log(obj,'server obj');
        io.emit('message', '还你消息');
    });

    //监听用户退出
    socket.on('disconnect', function () {
        
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
        
    });
});



app.listen(4000);