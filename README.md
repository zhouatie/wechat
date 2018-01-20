# 前言

这个项目是我自学react+redux的第一个项目，并结合自己之前所学的node+mongodb，来模仿开发微信客户端。利用每天下班时间边学习边写。由于本人技术水平有限，所以几乎没有什么高级代码。目前还没有写完。本项目会持续更新...



## 技术栈

react+redux+react-router4+socket.io+axios+node.js+mongodb



## 说明


```
本地启动mongodb服务
分别进入wechat跟server文件夹npm install
wechat里npm run start 
server里node app.js 和 chat.js 这两个文件
```


> 喜欢的话可以帮忙点个star

> 开发环境：macbook pro 、vscode、Chrome、node

> 如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行

`npm install -g cnpm --registry=https://registry.npm.taobao.org`



## 目标功能
- [x] 注册
- [x] 登录
- [x] 添加好友
- [x] 支持私聊
- [x] 消息列表的展示
- [x] 未读消息数量的显示
- [x] axios数据跨域的设置
- [ ] 群聊
- [x] 上传头像
- [x] 个人信息的编辑
- [ ] 朋友圈
 


## 部分截图
![](./data/wechat_2018-01-14.gif)


 <img src="./data/uploadLogo2018011501.gif" width="500"/>


## 总结
1.之前写vue项目的时候，在main.js文件中写express接口，就行了，就不存在跨域问题。在create-react-app启动的静态资源服务中，实在找不到哪里可以写接口，找了好久的node_modules ，都不知道在哪里下手。好在create-react-app中的package.json中加上：`proxy:http://localhost:4000`就能解决跨域问题了。


2.在app.js页面中，使用的是express框架，写socket.io不知道为什么会提醒跨域问题，而我前面的登录接口用axios跨域就没有问题，而且我在express的头部做了CORS处理，还是存在跨域问题。所以只能另启了一个node服务，采用原生node.js编写，跨域就成功了。但是我在新写的服务中，换成用express框架，结果也提示了存在跨域问题。目前个人猜测express可能有什么跨域机制。


3.在引入react-router4的时候遇到了很多疑难杂症，晚上大部分的react-router4一下的版本。按照网上来做，好多报错，到处找博客找文章。后来通过react-router英文文档的阅读解决了各种报错问题。


4.我是通过redux来更新消息列表，中间出现store数据更新了，组件却不渲染。后来求助好友后，原来是我强制修改了state导致页面无法即使刷新。



5.formdata上传文件，相当于表单上传，头部为`Content-Type:multipart/form-data`,这点要注意了！
> 注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据。具体见   [multer](https://www.npmjs.com/package/multer)
```javascript
var multer = require('multer');
var upload = multer({ dest: '../wechat/public/logos' }); // dest 指的是图片存到哪个文件夹里

// 上传头像
app.post("/uploadLogo", upload.single("avatar"), (req, res) => {
    User.update({ _id: req.body.id }, { $set: { logo: './logos/' + req.file.filename } }, function () {
        res.send({
            status: "success",
            url: './logos/' + req.file.filename
        })
    })
})
```


## 参考资料
《深入浅出React和Redux》-- 程墨

《MongoDB实战（第二版）》

[react-router](https://reacttraining.com/react-router/web/guides/philosophy)

[react](https://reactjs.org/docs/hello-world.html)

[redux中文文档](http://www.redux.org.cn/index.html)

[mongoose](http://www.nodeclass.com/api/mongoose.html#guide_connections)

[基于 Vue、Nodejs、Socket.io 的聊天应用](https://juejin.im/entry/5923e2242f301e006b2a7827)

[multer](https://www.npmjs.com/package/multer)
