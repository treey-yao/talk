var fs = require("fs");
var path = require("path");

//时间戳插件
var sd = require('silly-datetime');

//创建临时文件
exports.addFile = function(datafile, callback) {
	
	
	
	//	tempup 临时缓存文件夹
	var uploadDir = path.normalize(__dirname + "/../tempup/");

	//文字名字
	//当前时间戳
	var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
	//随机数
	var ran = parseInt(Math.random() * 8999 + 10000);
	
	var textname=ttt + ran+"treey";
	

	 //过滤data:URL
	var base64Data = datafile.replace(/^data:image\/\w+;base64,/, "");
    var datafile = new Buffer(base64Data, 'base64');
	

	fs.writeFile(uploadDir +textname+".png", datafile, function(err) {
		if(err) {
			callback(err, null);
			return;
		}
		callback(err, textname);
	});
}