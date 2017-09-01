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


//-----------注册-------------//
app.get("/register", router.showRegister);
//-----------注册业务-------------
app.post("/doRegister", router.doRegister);
//-----------注册  end------------

//-----------登录-------------//
app.get("/login", router.showlogin);
//-----------登录业务-------------
app.post("/doLogin", router.doLogin);

//-----------个人信息-------------//
app.get("/personal", router.showPersonal);

//-----------修改个人信息-------------//
app.post("/doPersonal", router.doPersonal);


app.use("/404",router.show404);

app.listen(8085);


