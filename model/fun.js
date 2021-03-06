//方法库

//获取当前时间，格式YYYY-MM-DD
exports.getNowFormatDate = function() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

//帖子id，   时间戳加5位的随机数
exports.postids = function() {
	//当前时间戳
	var timestamp = Date.parse(new Date());
	var maths = (Math.floor(Math.random() * 99999)) + timestamp;
	return maths;
}