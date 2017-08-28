var fs = require("fs");
var path = require("path");

//时间戳插件
var sd = require('silly-datetime');

//创建临时文件
exports.addFile = function(datafile, callback) {

	if(datafile != "" || null) {
		var uploadDir = path.normalize(__dirname + "/../avatar/user/");

		//文字名字
		//当前时间戳
		var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
		//随机数
		var ran = parseInt(Math.random() * 8999 + 10000);
		//地址+图片名
		var textname = uploadDir + ttt +ran+ "treey.jpg";

		//过滤data:URL
		var base64Data = datafile.replace(/^data:image\/\w+;base64,/, "");
		var datafile = new Buffer(base64Data, 'base64');

		fs.writeFile(textname, datafile, function(err) {
			if(err) {
				callback(err, null);
				return;
			}
			callback(err, textname);
		});

	} else {
		//当前台没有上传图片是的 返回null
		callback(err, null);
	}

}