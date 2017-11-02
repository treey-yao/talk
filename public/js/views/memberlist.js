$(function() {
	//	var $titletext = $("#yj-title-text");
	var $contenttext = $("#yj-content-text");
	var $publishbtn = $("#yj-publish-btn");
	var $yjcontent = $("#yj-content");

	//当前页数
	var queryname = 0;

	//	帖子总数
	var total = doListTotal();

	//显示说说
	var showInde = showTongueAjax(queryname);

	//上一页按钮
	var $yjpreviousbox = $("#yj-previous-box");
	//下一页按钮
	var $yjnextbox = $("#yj-next-box");

	//页面第一加载时 显示用户
	showPost(showInde);

	//分页的显示  
	showPaging();

	//上一页
	$yjpreviousbox.click(function() {
		var pag = $(this).attr("name")
		queryname = pag;
		showInde = showTongueAjax(pag);
		showPost(showInde);
		showPaging();

	});
	
	//下一页
	$yjnextbox.click(function() {
		var pag = $(this).attr("name");
		queryname = pag;
		console.log(queryname)
		showInde = showTongueAjax(pag);
		showPost(showInde);
		showPaging();
	});

	//--------------方法-------------

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


	//显示用户
	function showPost(showinfo) {
		if(showinfo == 110) {
			showMessage("嘿！系统错误！");
		} else if(showinfo == 201) {
			showMessage("嘿！没有注册百舌了！");
		} else {
			$yjcontent.html("");
			var htmls = "";
			if(!(showinfo == "" || null)) {
				for(var i = 0; i < showinfo.length; i++) {
					htmls = htmls + '<div class="col-md-3 y-detail">' +
						'<div class="y-detail-box">' +
						'<span class="y-detail-img ">' +
						'<img src="' + headimg(showinfo[i].headName) + '" class="img-circle"/>' +
						'</span>' +
						'<span class="y-detail-text">' +
						'<a class="y-detail-name">' + showinfo[i].username + '</a>' +
						'</span>' +
						'</div>' +
						'</div>'
				}
				$yjcontent.append(htmls)
			}
		}
	}

	//分页显示
	function showPaging() {

		//总页数
		var allpage = Math.ceil(parseInt(total) / 16);
		if(queryname == 0) {
			$yjpreviousbox.addClass("disabled");
			$yjnextbox.removeClass("disabled");

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

	//-------------ajax-------------

	//显示用户
	function showTongueAjax(page) {
		var i = "";
		$.ajax({
			type: "get",
			url: "/doShowList",
			data: "page=" + page,
			async: false,
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

	//显示用户总数
	function doListTotal() {
		var i = "";
		$.ajax({
			type: "post",
			url: "/doListTotal",
			async: false,
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}

});