$(function(){
	
	var $yjpostbtn =$("#yj-post-btn");
	var $yjpostcomment =$("#yj-post-comment");
	
	

	
	//提交评论
	$yjpostbtn.click(function(){
		var yjpostcomment =$yjpostcomment.val();
		var ids =$yjpostcomment.attr("name");

		if(yjpostcomment==""){
			showMessage("嘿！你的评论呢！");
		}else{
			console.log(yjpostcomment)
			var commenttext = commentajax(yjpostcomment,ids);
			
			if(commenttext==100){
				showMessage("你的评论失败了！");
			}else if(commenttext==101){
				showMessage("你的评论被系统吞噬了！");
			}else if(commenttext==200){
				showMessage("你的评论被系统认同！");
			}
		}
	});
	
	
	
	
	//---------------ajax------------
	
	
	function commentajax(postcomment,ids){
		var i = "";
		$.ajax({
			type: "post",
			url: "/doPostcomment",
			async: false,
			data: {
				content: postcomment,
				ids:ids
			},
			dataType: "json",
			success: function(result) {
				i = result;
			}
		});
		return i;
	}
	

})







