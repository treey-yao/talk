$(function() {
	//**********图片裁剪*************
	//-------全局变量-----
	var $image = $(".cropper"),
		$sjupdatebtn = $("#sj-update-btn"),
		dataURL = "",
		console = window.console || {
			log: $.noop
		},
		cropper;
	//上传图片
	$('#file').change(function() {
		//			获取上传文件名
		var path = $('#file').val();

		var start = path.lastIndexOf('.');
		var fileName = path.substring(start, path.length).toLowerCase();

		//			判断是否是图片
		if(fileName != '.png' && fileName != '.jpg' && fileName != '.jpeg' && fileName != '.bmp' && fileName != '.gif') {
			showMessage("该文件不是图片！");
		} else {

			var upload = document.getElementById('file');
			var file = upload.files[0];
			var reader = new FileReader();

			//将文件以Data URL形式读入页面  
			reader.readAsDataURL(file);


			reader.onload = function() {
				var url = this.result;
				$image.attr("src", url);
				//图片裁剪
				cropper();
			}
		}
	})

	//点击修改
	$sjupdatebtn.click(function() {

		var $qqname = $("#qqname").val() ;
		var $phone = $("#phone").val();
		var $email = $("#email").val();
		var $sex = $("#sex").val();
		var $file = $('#file').val()|| 1;
		
		//验证QQ号

		if(!/^[1-9][0-9]{4,}/i.test($qqname)) {
			showMessage("请输入正确的QQ号！");
		}
		//验证手机号
		else if(!/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test($phone)) {
			showMessage("请输入正确的手机号！");
		}

		//验证邮箱
		else if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i.test($email)) {
			showMessage("请输入正确的邮箱");
		
		} else {
			
			if($file != 1) {
				
				dataURL = $image.cropper("getDataURL", {
			      width: 50,
			      height: 50
			   });
			}

			var returntext = updateajax($qqname, $phone, $email, $sex ,dataURL)


			if(returntext == 110) {
				showMessage("系统错误！");
			} else if(returntext == 101) {
				showMessage("提交失败！");
			} else if(returntext == 201) {
				showMessage("修改成功！三秒后将跳回到首页");
				setTimeout(function() {
					window.location = "/";
				}, 3000);
			}
		}
		

	});

	//------------方法-------------------
	//加载 图片裁剪
	function cropper() {
		$image.cropper({
			aspectRatio: 1 / 1,
			data: {
				x: 100,
				y: 100,
				width: 200,
				height: 200
			},
			preview: ".preview",
			build: function(e) {
				console.log(e.type);
			},

			built: function(e) {
				console.log(e.type);
			},

			dragstart: function(e) {
				console.log(e.type);
			},

			dragmove: function(e) {
				console.log(e.type);
			},
			dragend: function(e) {
				console.log(e.type);
			}
		});
	}

	//-------------------ajax-------------
	function updateajax(qqname, phone, email,sex, dataURL) {
		var i = "";
		$.ajax({
			type: "post",
			url: "/doPersonal",
			async: false,
			data: {
				qqname: qqname,
				phone: phone,
				email:email,
				sex:sex,
				dataURL:dataURL
			},
			dataType: "json",
			success: function(result) {
//				console.log(result)
				i = result;
			}
		});
		return i;
	}
});