
var login=(
	function(){
		var login_page=new common_page({
				id:'login-container',
				content:'<h2 class="header">'+
							'请输入教务处账号密码登录'+
						'</h2>'+
						'<form >'+
							'<div class="input-field col s6">'+
			          			'<input id="usename" type="text" class="validate" name="usename">'+
			          			'<label for="usename">学号</label>'+
			          		'</div>'+
			          		'<div class="input-field col s6">'+
			          			'<input id="password" type="password" class="validate" name="password">'+
			          			'<label for="password">教务处密码</label>'+
		        			'</div>'+
		        			' <p>'+
      							'<input type="checkbox" id="isSaveLogin" />'+
      							'<label for="isSaveLogin">30天记住我</label>'+
    						'</p>'+
		        			'<button class="btn waves-effect waves-light" type="button" name="action" id="login">'+
		        				'登录'+
		  					'</button>'+
		  				'</from>'
		});

		function router_login(){
			Q.reg('login',function(){
				login_page.show();
				$('.button-collapse').sideNav('hide');
				
				
			});
			
			$('#login').click(function(){
				var isLogin_30=$('#isSaveLogin').prop('checked');
				tool.loadingShow();
				$.ajax({
					type:'post',
					url:'/login',
					data:{
						'usename':$('#usename').val(),
						'password':$('#password').val()
					},
					success:function(data){
						console.log(data);

						data.length>1?loginSuccess(data,isLogin_30):loginFail();
					}
				})
				$(this).attr('disable','true');
			});			
		}

		function loginSuccess(cookie,is_30){
			var time=is_30?30:null;
			tool.setCookie('id',$('#usename').val(),time);
			
			tool.loadingHide();
			Materialize.toast('登录成功', 4000);
			ahelp.setUserId(cookie,time);
			ahelp.setloginname(cookie,time);

			$.post('/getName',function(data){
						tool.setCookie('username',data,time);
						$('#nav-mobile a span.name').text(data).parent().attr('href','#');
					});
			$('#login').attr('disable','false');
			window.location=tool.needLoginFromHash||'#!home';
		}
		function loginFail(){
						tool.loadingHide();
			Materialize.toast('登录失败', 4000);
		}		
		
		return{
			router_login:router_login
		}

})();