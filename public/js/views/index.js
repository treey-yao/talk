$(function() {
	var $titletext = $("#yj-title-text");
	var $contenttext = $("#yj-content-text");
	var $publishbtn = $("#yj-publish-btn");

	//发表
	$publishbtn.click(function() {
		var titletext = $titletext.val();
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

			}else if(returntext == 201) {
				showMessage("嘿！你成功提交了！");
				
				//清空文本框
				$titletext.val("");
				$contenttext.val("");
				
			}
		}

	});

	//-------------ajax-------------
	
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

	

});