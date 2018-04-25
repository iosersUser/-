//用面向对象的方式书写代码
var init_func = function(){
	//点击不在提醒,设置cookie在当前页面不再提醒
	$('.close').on('click',function(){
		$('.extra_head').hide()
	})
	//	关注
	$('.focus').on('click',function(){
		this.userLoginCheck();
	}.bind(this))
	//	取消关注
	$('.unfocus').on('click',function(){
			this.userLoginCheck();
	}.bind(this))
	$('.btn_close').on('click',function(){
		$('.login_mask').hide()
	})
	//用户登录
	$('.btn_login').on('click',function(){
		this.userLogin()
	}.bind(this))
	//	用户信息的验证
	this.userCheck = function(){
		if(!$('#userName').val()){
			alert('用户名不能为空')
			return false;
		}else if(!$('#pwd').val()){
			alert('密码不能为空')
			return false;
		}else if($('#userName').val().length>6){
			return true
		}else if($('#pwd').val().length>6){
			return true
		}else{
			alert('输入格式错误');
			return false;
		}
	}
	//用户是否登录
	this.userLoginCheck = function(){
		//首先判断用户是否已经登录
		if(!this.getCookie().loginSuc){
			$('.login_mask').show()
		}else{
			alert('您已经登录')
			/*已登录则取消关注请求*/
			$.ajax({
				url:'http://study.163.com/webDev/attention.htm',
				data:{},
				method:'get',
				success:function(res){
					  init_para.setCookie('followSuc', 'followTrue', 1);
					  $('.focus').hide()
                   	  $('.unfocus').show()
				},
				error:function(err){alert(err)}
			})
		}
	}
	//用户点击登录
	this.userLogin = function(){
		if(this.userCheck()){
			$.ajax({
				url:'http://study.163.com/webDev/login.htm',
				data:{
					userName: md5($('#userName').val()), //固定用户名为studyOnline
                    password: md5($('#pwd').val()) //固定用户名密码为study.163.com
				},
				method:'get',
				success:function(res){
					/*0失败 1 成功*/
					if(res == 1){
						$('.login_mask').hide()
						/*设置cookie的值*/
						init_para.setCookie('loginSuc', 'loginTrue', 1);
						/*发送关注的请求*/
						$.ajax({
							url:'http://study.163.com/webDev/attention.htm',
							data:{},
							method:'get',
							success:function(res){
								if(res == 1){
									/*设置已关注的cookie*/
	                                init_para.setCookie('followSuc', 'followTrue', 1);
	                                /*成功之后 隐藏关注按钮 显示已关注按钮*/
	                               $('.focus').hide()
	                               $('.unfocus').show()
								}
							},
							error:function(err){
								alert(err)
							}
						})
					}else{
                        alert('用户名及密码固定为studyOnline和study.163.com');
					}
				},
				error:function(){
					alert('登录失败！请重新登录')
				}
			})
		}
	}
	//广告轮播
	this.slider = function(){
		var currentImg = 0,//保存当前图片的位置
			allImg = $('.pic_list li'), //所有图片的li
			slide_dot = $('.slide_dot li') //小圆点的li
		var rollOne = function(){
			if(currentImg < allImg.length-1){
				currentImg++ ;
			}else{
				currentImg = 0;
			}
			allImg.each(function(i,v){
				if(i == currentImg){
					allImg.eq(i).show(500)
//					allImg.eq(i).fadeIn(600).end().eq(i).fadeOut(600);
					slide_dot.eq(i).addClass('slide_dot_current')
				}else{
					allImg.eq(i).hide(500)
					slide_dot.eq(i).removeClass('slide_dot_current')
				}
			})
		}
		var timer = setInterval(rollOne,2000)
        $(".pic_list").hover(function () {  
	        clearInterval(timer);  
	        }, function () {  
            timer = setInterval(rollOne,2000);  
        });  
	}
	this.slider()
	this.slider_pic = function(){
		var index=0;  
        var len_img=$(".pic_list li");  
		var slide_dot = $('.slide_dot li') //小圆点的li
        
        len_img.fadeOut(0).eq(index).fadeIn(0);  
        function rollOne(){  
            if(index <len_img.length-1){  
            len_img.eq(index).fadeOut(600).next().fadeIn(700);  
            slide_dot.eq(index).next().addClass('slide_dot_current').siblings().removeClass('slide_dot_current')
            index++;  
        }else if(index == len_img.length-1){  
        	len_img.eq(index).fadeOut(600).end().eq(index).fadeIn(600);
            //len_img.eq(index).fadeOut(600).siblings().eq(0).fadeIn(600);  
            slide_dot.eq(index).addClass('slide_dot_current').siblings().removeClass('slide_dot_current')
            index=0;  
            }  
        }  
        var startRollOne=setInterval(rollOne,2000);  
        $(".pic_list").hover(function () {  
	        clearInterval(startRollOne);  
	        }, function () {  
            startRollOne = setInterval(rollOne,2000);  
        });  
	}
//	this.slider_pic()
	$('.show_video img').on('click',function(){
		$('.video-mask').show()
		
	})
	$('.video-close').on('click',function(){
		$('.video-mask').hide()
		
	})
//	右侧视频播放
	
	/*设置cookie*/
	this.setCookie = function(name, val, days) {
	    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(val);
	    var exp = new Date();
	    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	    cookie += '; expires = ' + exp.toGMTString();
	    document.cookie = cookie;
	
	}

	/*获取cookie值*/
	this.getCookie = function() {
	    var cookie = {};
	    var all = document.cookie;
	    if (all == '') {
	        return cookie;
	    }
	    var list = all.split('; ');
	    for (var i = 0; i < list.length; i++) {
	        var item = list[i];
	        var p = item.indexOf('=');
	        var name = item.substring(0, p);
	        name = decodeURIComponent(name);
	        var value = item.substring(p + 1);
	        value = decodeURIComponent(value);
	        cookie[name] = value;
	    }
	    return cookie;
	}
}
var init_para = {}

window.onload = init_func.apply(init_para)




















