$(function() {

	var $yjpostbtn = $("#yj-post-btn");
	var $yjpostcomment = $("#yj-post-comment");

	var $yjcontent = $("#yj-content");

	//帖子 id
	var ids = $yjpostcomment.attr("name");

	//评论 数据
	var showComment = showCommentajax(ids);
	//显示 评论 
	showC(showComment);

	//提交评论
	$yjpostbtn.click(function() {
		var yjpostcomment = $yjpostcomment.val();

		if(yjpostcomment == "") {
			showMessage("嘿！你的评论呢！");
		} else {
			console.log(yjpostcomment)
			var commenttext = commentajax(yjpostcomment, ids);

			if(commenttext == 110) {
				showMessage("你的评论失败了！");
			} else if(commenttext == 101) {
				showMessage("你的评论被系统吞噬了！");
			} else if(commenttext == 200) {
				//评论 数据
				var showComment = showCommentajax(ids);
				//显示 评论 
				showC(showComment);
				/* 清空评论 */
				$yjpostcomment.val("");
				showMessage("你的评论被系统认同！");
			}
		}
	});

	//----------方法----------

	function showC(showinfo) {
		if(showinfo == 110) {
			showMessage("嘿！系统错误！");
		} else {
			$yjcontent.html("");
			var htmls = "";
			if(!(showinfo == "" || null)) {
				for(var i = 0; i < showinfo.length; i++) {
					htmls = htmls + '<div class="col-md-12 y-detail clearfix">' +
						'<div class="y-detail-box">' +
						'<span class="y-detail-img ">' +
						'<img src="' + headimg(showinfo[i].postimgname) + '" class="img-circle"/>' +
						'</span>' +
						'<span class="y-detail-text">' +
						'<a class="y-detail-name" href="/user/'+ showinfo[i].postname +'">' + showinfo[i].postname + '</a>' +
						'<small class="y-detail-time">' + getDateDiff(showinfo[i].posttime) + '</small>' +
						'</span>' +
						'</div>' +
						'<p class="y-detail-content">' + showinfo[i].postcontents + '</p>' +
						'</div>'
				}
				$yjcontent.append(htmls)
			}
		}
	}

	//头像
	//如果后台头像数据为空 设置默认头像
	function headimg(imgsrc) {
		if(imgsrc == null) {
			var img = "/avatar/mr.png";
			return img;
		} else {
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

	//---------------ajax------------

	function showCommentajax(ids) {
		var i = "";
		$.ajax({
			type: "post",
			url: "/showComment",
			async: false,
			data: {
				ids: ids
			},
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

	//提交评论
	function commentajax(postcomment, ids) {
		var i = "";
		$.ajax({
			type: "post",
			url: "/doPostcomment",
			async: false,
			data: {
				content: postcomment,
				ids: ids
			},
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

})