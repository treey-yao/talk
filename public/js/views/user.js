$(function() {
	
	var $yjcontent = $("#yj-content");
	var $yjusername = $("#yj-user-name");
	var $yjimgname = $("#yj-imgname");
	
	
	
	//当前页数
	var queryname = 0;
	
	//当前用户名
	var yjusername =$yjusername.text();
	var yjimgname =$yjimgname.attr("src");
	
	//	帖子总数
	var total = doTotal(yjusername);
	
	//上一页按钮
	var $yjpreviousbox = $("#yj-previous-box");
	//下一页按钮
	var $yjnextbox = $("#yj-next-box");
	

	//个人帖子数据
	var showInde = showUserTongue(queryname,yjusername);
	//显示帖子
	showPost(showInde);
	//分页的显示  
	showPaging();
	
	//上一页
	$yjpreviousbox.click(function() {
		var pag = $(this).attr("name")
		queryname = pag;
		//个人帖子数据
		showInde = showUserTongue(queryname,yjusername);
		showPost(showInde);
		showPaging();
	});
	
	
	//下一页
	$yjnextbox.click(function() {
		var pag = $(this).attr("name");
		queryname = pag;
		showInde = showUserTongue(queryname,yjusername);
		showPost(showInde);
		showPaging();
	});
	
	
	

	
	//----------------方法------------
	//显示帖子
	function showPost(showinfo) {
		if(showinfo == 110) {
			showMessage("嘿！系统错误！");
		} else if(showinfo == 201) {
			showMessage("嘿！没有人百舌！");
		} else {
			$yjcontent.html("");
			var htmls = "";
			if(!(showinfo == "" || null)) {
				for(var i = 0; i < showinfo.length; i++) {

					htmls = htmls + '<div class="col-md-12 y-detail clearfix">' +
						'<div class="y-detail-box">' +
						'<span class="y-detail-img ">' +
						'<img src="' + yjimgname + '" class="img-circle"/>' +
						'</span>' +
						'<span class="y-detail-text">' +
						'<a class="y-detail-name">' + yjusername + '</a>' +
						'<small class="y-detail-time">' + getDateDiff(showinfo[i].time) + '</small>' +
						'</span>' +
						'</div>' +
						'<p class="y-detail-content">' + showinfo[i].content + '</p>' +
						'<p class="pull-right ">' +
						'	<a class="btn btn-default" href="/post/' + showinfo[i].ids + '" role="button" id="' + showinfo[i].ids + '">详情 &raquo;</a>' +
						'</p>' +
						'</div>'
				}
				$yjcontent.append(htmls)
			}
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
	
	
	//分页显示
	function showPaging() {

		//总页数
		var allpage = Math.ceil(parseInt(total) / 16);
		
		if(queryname == 0) {
			$yjpreviousbox.addClass("disabled");
			
			if(allpage>1){
				$yjnextbox.removeClass("disabled");
			}else{
				$yjnextbox.addClass("disabled");
			}

		} else if(queryname == allpage) {
			$yjpreviousbox.removeClass("disabled");
			$yjnextbox.addClass("disabled");
		} else {
			$yjpreviousbox.removeClass("disabled");
			$yjnextbox.removeClass("disabled")
		}

		$yjpreviousbox.attr("name", parseInt(queryname) - 1);
		$yjnextbox.attr("name", parseInt(queryname) + 1);

	}

	
	
	//----------------ajax------------
	//个人全部帖子
	function showUserTongue(page,name) {
		var i = "";
		$.ajax({
			type: "get",
			url: "/doshowUserTongue",
			data: "page=" + page+"&name="+name,
			async: false,
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}
	
	
	//显示帖子总数
	function doTotal(name) {
		var i = "";
		$.ajax({
			type: "get",
			url: "/doUserTotal",
			data: "name="+name,
			async: false,
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}
	
})