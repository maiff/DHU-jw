var home=(
	function(){
		function router_home(){
			Q.reg('home',function(){

				common_page_now_show.hide();
				common_page_now_show.push($('#main-container'));
				common_page_now_show.show();	

				if(ahelp.isLogined()){
					$('#nav-mobile a span.name').text(tool.getCookie('username')).parent().attr('href','#');
					$('#nav-mobile a span.loginout').text('').parent().off('click');
					$('#nav-mobile a span.loginout').text('退出登录').parent().click(loginout);
					if(tool.getCookie('id')==141320231){
						$('#nav-mobile').append('<li><a href="#!getStuInfo"></a></li>')
					}
					// $('#nav-mobile a span.loginout').text('退出登录').parent().click(loginout);
				}
				else{
					$('#nav-mobile a span.name').text('请登录').parent().attr('href','#!login');
					$('#nav-mobile a span.loginout').text('').parent().off('click');
				}

				
			});

			
			$.get("/home", function(data){
			  console.log( data);
			  var liList=$('.home-collection li');
			  var len=liList.length;
			  for(var i=0;i<len;i++){
			  	$(liList[i]).children().attr('href','#!u/'+data[i].link);
			  	$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
			  }
			});
			$.get("/maiffInformation", function(data){
			  console.log( data);
			  var data=JSON.parse(data)
			  var collection=$('.maiff-collection');
			  var len=data.length;
			  for(var i=0;i<len;i++){
			  	var li=$('<li>')
		  		var a=$('<a>').attr('href','#!m/'+data[i]._id).addClass('collection-item waves-effect waves-teal');
		  		a.html(data[i].title+'<span>'+data[i].time+'</span>');
		  		li.append(a);
		  		collection.append(li);
			  }
			});
		}
		function loginout(){
			tool.clearCookie();
			Materialize.toast('退出成功', 4000);
			window.location='#!login';
			window.location='#!home';
			
		}

		return{
			router_home:router_home
		}

})();