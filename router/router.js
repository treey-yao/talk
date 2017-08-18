var formidable = require("formidable");
var db = require("../model/db.js");
var md5 = require("../model/md5.js");

//首页-----------页面
exports.showIndex = function(req, res, next) {
	res.render("index", {
		"login": req.session.login == 300 ? true : false,
		"username": req.session.login == 300 ? req.session.username : ""
	});
}

//注册----------页面-------------
exports.showRegister = function(req, res, next) {
	res.render("register");
}

//注册业务
exports.doRegister = function(req, res) {
	//得到前台 用户填写的东西
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		//得到表单之后做的事情
		var username = fields.username;
		var password = fields.password;
		console.log(username, password)

		//查询当前用户是否重名
		db.find("users", {
			"username": username
		}, function(err, result) {
			if(err) {
				// 查询出错
				res.send("103")
				return;
			}
			// 查到该用户
			if(result.length != 0) {
				//返回 101  告诉前台 该用户名已被占用
				res.send("101")
				return;
			}

			//设置MD5 加密
			password = md5(md5(password) + "treey");
			//添加用户
			db.insertOne("users", {
				"username": username,
				"password": password,
			}, function(err, result) {
				if(err) {
					// 插入数据错误
					res.send("104")
					return;
				}
				//写入session
				req.session.login = "300";
				req.session.username = username;

				//返回 200  告诉前台 该用户名可以被使用
				res.send("200");

			})

		})

	});

}


//登录----------页面-------------
exports.showlogin = function(req, res, next) {
	res.render("login");
}
//登录业务
exports.doLogin = function(req, res) {
	//得到前台 用户填写的东西
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		//得到表单之后做的事情
		var username = fields.username;
		var password = fields.password;
		console.log(username, password)
		
		//设置MD5 加密
		password = md5(md5(password) + "treey");

		//查询当前用户是否存在
		db.find("users", {
			"username": username
		}, function(err, result) {
			if(err) {
				// 查询出错  返回110
 				res.send("110")
				return;
			}
			// 查该用户
			if(result.length == 0) {
				//返回 101  告诉前台 该用户名不存在
				res.send("101")
				return;
			}
			//判断该用户 密码是否正确
			if(password==result[0].password){
				
				//写入session
				req.session.login = "300";
				req.session.username = username;
				
				//返回 201  告诉前台 登录成功
				res.send("201")
				return;
			}else {
				//返回 102  告诉前台 密码错误
				res.send("102")
				return;
			}
			
		});
		

	});

}

//个人信息----------页面-------------
exports.showPersonal = function(req, res, next) {
	res.render("personal",{
		"username": req.session.login == 300 ? req.session.username : ""
	});
}



