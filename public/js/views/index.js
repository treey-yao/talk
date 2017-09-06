$(function() {
	//	var $titletext = $("#yj-title-text");
	var $contenttext = $("#yj-content-text");
	var $publishbtn = $("#yj-publish-btn");
	var $yjcontent = $("#yj-content");

	//显示说说
	var showInde = showTongueAjax();

	if(showInde == 110) {
		showMessage("嘿！系统错误！");
	}else if(showInde == 201){
		showMessage("嘿！没有人百舌！");
	} else {
		var htmls = "";
		if(!(showInde == "" || null)) {
			for(var i = 0; i < showInde.length; i++) {
				htmls = htmls + '<div class="col-md-3 y-detail">' +
					'<div class="y-detail-box">' +
					'<span class="y-detail-img ">' +
					'<img src="' + headimg(showInde[i].img) + '" class="img-circle"/>' +
					'</span>' +
					'<span class="y-detail-text">' +
					'<a class="y-detail-name">' + showInde[i].name + '</a>' +
					'<small class="y-detail-time">' + getDateDiff(showInde[i].time) + '</small>' +
					'</span>' +
					'</div>' +
					'<p class="y-detail-content">' + showInde[i].content + '</p>' +
					'<p>' +
					'	<a class="btn btn-default" href="#" role="button" id="' + showInde[i]._id + '">详情 &raquo;</a>' +
					'</p>' +
					'</div>'
			}

			$yjcontent.append(htmls)

		} 
	}

	//发表
	$publishbtn.click(function() {
		var titletext = "1";
		var contenttext = $contenttext.val();

		if(titletext == "" || null) {
			showMessage("嘿！你的标题呢！");
		} else if(contenttext == "" || null) {
			showMessage("嘿！你的内容呢！");
		} else {
			var returntext = addajax(titletext, contenttext);

			if(returntext == 110) {
				showMessage("嘿！系统错误！");
			} else if(returntext == 104) {
				showMessage("嘿！提交错误了！");

			} else if(returntext == 201) {
				showMessage("嘿！你成功提交了！");

				//清空文本框
				//	$titletext.val("");
				$contenttext.val("");
			}
		}

	});

	//--------------方法-------------
	
	//头像
	//如果后台头像数据为空 设置默认头像
	function headimg(imgsrc){
		if(imgsrc==null){
			var img ="/avatar/mr.png";
			return img;
		}else{
			return imgsrc;
		}
	}

	//类似微信微博时间显示
	//dateStr=2017-05-10 15:00:00
	function getDateDiff(dateStr) {
		var publishTime = getDateTimeStamp(dateStr) / 1000,
			d_seconds,
			d_minutes,
			d_hours,
			d_days,
			timeNow = parseInt(new Date().getTime() / 1000),
			d,

			date = new Date(publishTime * 1000),
			Y = date.getFullYear(),
			M = date.getMonth() + 1,
			D = date.getDate(),
			H = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds();
		//小于10的在前面补0
		if(M < 10) {
			M = '0' + M;
		}
		if(D < 10) {
			D = '0' + D;
		}
		if(H < 10) {
			H = '0' + H;
		}
		if(m < 10) {
			m = '0' + m;
		}
		if(s < 10) {
			s = '0' + s;
		}

		d = timeNow - publishTime;
		d_days = parseInt(d / 86400);
		d_hours = parseInt(d / 3600);
		d_minutes = parseInt(d / 60);
		d_seconds = parseInt(d);

		if(d_days > 0 && d_days < 3) {
			return d_days + '天前';
		} else if(d_days <= 0 && d_hours > 0) {
			return d_hours + '小时前';
		} else if(d_hours <= 0 && d_minutes > 0) {
			return d_minutes + '分钟前';
		} else if(d_seconds < 60) {
			if(d_seconds <= 0) {
				return '刚刚';
			} else {
				return d_seconds + '秒前';
			}
		} else if(d_days >= 3 && d_days < 30) {
			return M + '-' + D + ' ' + H + ':' + m;
		} else if(d_days >= 30) {
			return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
		}
	}

	function getDateTimeStamp(dateStr) {
		return Date.parse(dateStr.replace(/-/gi, "/"));
	}

	//-------------ajax-------------
	//提交说说
	function addajax(titletext, contenttext) {
		var i = "";
		$.ajax({
			type: "post",
			url: "/doPublish",
			async: false,
			data: {
				title: titletext,
				content: contenttext
			},
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

	function showTongueAjax() {
		var i = "";
		$.ajax({
			type: "post",
			url: "/doShowTongue",
			async: false,
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

});