var express = require("express");
var app = express();

var router = require("./router/router.js")

var session = require('express-session')

//调用session
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}));

//模板引擎
app.set("view engine", "ejs");

//静态页面 
app.use(express.static("./public"));
app.use("/avatar" ,express.static("./avatar"));

//-----------首页-------------
app.get("/", router.showIndex);

//提交说说
app.post("/doPublish", router.doPublish);
//显示说说
app.get("/doShowTongue", router.doShowTongue);
//帖子总数
app.post("/doTotal", router.doTotal);


//-----------注册-------------
app.get("/register", router.showRegister);
//注册业务
app.post("/doRegister", router.doRegister);
//-----------注册  end------------



//-----------登录-------------
app.get("/login", router.showlogin);
//登录业务
app.post("/doLogin", router.doLogin);

//-----------个人信息-------------
app.get("/personal", router.showPersonal);
//修改个人信息
app.post("/doPersonal", router.doPersonal);


//-----------个人主页-------------
app.get("/user/:username", router.showUser);
//个人帖子
app.get("/doshowUserTongue", router.doshowUserTongue);
//个人帖子总数
app.get("/doUserTotal", router.doUserTotal);

//-----------评论-------------
app.get("/post/:postid", router.showPost);
//显示评论
app.post("/showComment", router.showComment);
//提交评论
app.post("/doPostcomment", router.doPostcomment);

//----------人员列表---------------
app.get("/Memberlist", router.showMemberlist);
//用户总数
app.post("/doListTotal", router.doListTotal);
//用户信息
app.get("/doShowList", router.doShowList);


//-----------404-------------/
app.use("/404",router.show404);




app.listen(8085);


