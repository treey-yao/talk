var formidable = require("formidable");
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
var file = require("../model/file.js");

var fs = require("fs");
var path = require("path");

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
		//		console.log(username, password)

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
			if(password == result[0].password) {

				//写入session
				req.session.login = "300";
				req.session.username = username;

				//返回 201  告诉前台 登录成功
				res.send("201")
				return;
			} else {
				//返回 102  告诉前台 密码错误
				res.send("102")
				return;
			}

		});

	});

}

//个人信息----------页面-------------
exports.showPersonal = function(req, res, next) {

	var sessionlogin = req.session.login;
	//获取是否登录
	if(sessionlogin == 300) {
		//如果登录--显示个人信息
		res.render("personal", {
			"username": req.session.login == 300 ? req.session.username : ""
		});
	} else {
		//如果没有登录--调到登录页面
		res.redirect("/login");
	}

}

//个人信息业务
exports.doPersonal = function(req, res) {

	//得到前台 用户填写的东西
	var form = new formidable.IncomingForm();
	//获取当前用户的名字
	//当前用户的名字是唯一
	var username = req.session.username;

	form.parse(req, function(err, fields, files) {

		//得到表单之后做的事情
		var qqname = fields.qqname;
		var phone = fields.phone;
		var email = fields.email;
		var sex = fields.sex;
		var dataURL = fields.dataURL;

		var headName = "";

		//判读用户是否上传的头像  
		if(dataURL != "" || null) {
			//如果上传了头像就保存头像
			//创建临时文件
			file.addFile(dataURL, function(err, textname) {
				if(err) {
					// 创建临时文件错误  返回110
					res.send("110")
				}
				//旧文件地址
				var oldpath = path.normalize(__dirname + "/../tempup/" + textname + ".png");
				//新文件地址+文件名
				var newpath = path.normalize(__dirname + "/../avatar/user/" + textname + ".png");

//				fs.rename(oldpath, newpath, function(err) {
//
//					if(err) {
//						// 文件改名失败  返回111
//						res.send("111");
//						return;
//					}
//
//					headName = newpath;
//
//					//删除临时文件
//					//					fs.unlink(oldpath, function(err) {
//					//						if(err) {
//					//							console.log("删除失败！");
//					//						}
//					//					});
//
//				})
//							

			})
		}

		//修改信息
		db.updateMany("users", {
			"username": username,
		}, {
			$set: {
				'qqname': qqname,
				'phone': phone,
				'sex': sex,
				'email': email,
				'headName': headName
			},
		}, function(err, result) {
			if(err) {
				// 更新出错  返回110
				res.send("110")
				return;
			}

			if(result.length == 0) {
				//修改失败
				res.send("101");
				return;
			} else {
				//修改成功
				res.send("201");
				return;
			}

		})

	});

}

//-------------404--------------
exports.show404 = function(req, res) {
	res.render("404")
}