var 
Q=function(W,D,M,HTML,hash,view,arg,LL,i,index,Regex,key,Q){
	HTML=D.getElementsByTagName('html')[0];
	Regex=[];
	key='!';
	onhashchange=function(){
		Q.hash=hash=location.hash.substring(key.length+1);

		arg=hash.split('/');

		i=Regex.length;
		while(i--)
			if(LL=hash.match(Regex[i])){
				arg[0]=Regex[i];
				break;
			}

		if(!Q[arg[0]])
			arg[0]=index;
		
		if(Q.pop)
			Q.pop.apply(W,arg);

		Q.lash=view=arg.shift();

		HTML.setAttribute('view',view);

		Q[view].apply(W,arg);
	};
	Q={
		init:function(o){

			if(o.key!==undefined)
				key=o.key;

			index=o.index||'V';

			if(o.pop&&typeof o.pop=='function')
				Q.pop=o.pop;

			onhashchange();

			return this
		},
		reg:function(r,u){
			if(!r)
				return;

			if(u == undefined)
				u=function(){};

			if(r instanceof RegExp){
				Q[r]=u;
				Regex.push(r);
			}else if(r instanceof Array){//数组注册
				for(var i in r){
					L=[].concat(r[i]).concat(u);
					this.reg.apply(this,L);
				}
			}else if(typeof r=='string'){
				if(typeof u=='function')
					Q[r]=u;
				else if(typeof u=='string'&&Q[u])
					Q[r]=Q[u];
			}	
			
			return this
		},
		V:function(){
			console.log('Q.js <https://github.com/itorr/q.js> 2014/12/28');
			return this
		},
		go:function(u){
			location.hash='#'+key+u;
			return this
		}
	};
	return Q;
}(this,document);
var common_page_now_show={
	ele:null
};
common_page_now_show.push=function(now_show){
	this.ele=now_show;
};
common_page_now_show.show=function(){
	this.ele?this.ele.show():null;
};
common_page_now_show.hide=function(){
	this.ele?this.ele.hide():null;
}

var common_page=function(obj){
	this._main=$('<div>',{
		'class':'all',
		'id':obj.id
	});
	var main_nav='<nav >'+
	'<div class="container">'+
		'<a href="#!home">'+
			'<img src="./public/img/arrow.png" class="return" >'+
		'</a>'+
	'</div>'+
	'</nav>'
	this._main.html(main_nav);
	
	$('<div>',{
		'class':'container'
	}).html(obj.content)
	.appendTo(this._main);

	this._main.appendTo('body');
};

common_page.prototype.show=function(){
	common_page_now_show.hide();
	common_page_now_show.push(this._main);
	common_page_now_show.show();
};
var tool=(
	function(){
		function getCookie(c_name)
		{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    { 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
		    } 
		  }
		return undefined;
		}


		function setCookie(c_name,value,expiredays){
			var exdate=new Date()
			exdate.setDate(exdate.getDate()+expiredays)
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
		}
		function clearCookie(){ 
			var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
			if (keys) { 
				for (var i = keys.length; i--;) 
					document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
			} 
		} 
		return{
			getCookie:getCookie,
			setCookie:setCookie,
			clearCookie:clearCookie
		}
})();
var ahelp=(function(){
		function setUserId(cookie,time){
			var index=cookie[0].indexOf('=')+1;
			var len=cookie[0].length;

			tool.setCookie('userid',cookie[0].slice(index,len),time);
		}
		function setloginname(cookie,time){
			var index=cookie[2].indexOf('=')+1;
			var len=cookie[2].length;

			tool.setCookie('loginname',cookie[2].slice(index,len).trim(),time);
		}

		function isLogined(){
			return tool.getCookie('userid')?true:false;
		}

		function noLoginToLogin(){
			if(!isLogined()){
				Materialize.toast('请登录!', 4000);
				window.location='#!login';
				return false;
			}
			return true;
		}
		return{
			setUserId:setUserId,
			setloginname:setloginname,
			isLogined:isLogined,
			noLoginToLogin:noLoginToLogin
		}
})();


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
					// $('#nav-mobile a span.loginout').text('退出登录').parent().click(loginout);
				}
				else{
					$('#nav-mobile a span.name').text('请登录').parent().attr('href','#!login');
					$('#nav-mobile a span.loginout').text('').parent().off('click');
				}

				
			});

			
			$.get("/home", function(data){
			  console.log( data);
			  var liList=$('.collection li');
			  var len=liList.length;
			  for(var i=0;i<len;i++){
			  	$(liList[i]).children().attr('href','#!u/'+data[i].link);
			  	$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
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
			

			Materialize.toast('登录成功', 4000);
			ahelp.setUserId(cookie,time);
			ahelp.setloginname(cookie,time);

			$.post('/getName',function(data){
						tool.setCookie('username',data,time);
						$('#nav-mobile a span.name').text(data).parent().attr('href','#');
					});
			$('#login').attr('disable','false');
			window.location='#!home';
		}
		function loginFail(){
			Materialize.toast('登录失败', 4000);
		}		
		
		return{
			router_login:router_login
		}

})();

var	detail=(function(){
		var detail_page=new common_page({
			id:'article-container',
			content:
				'<h4 class="header"></h4>'+
				'<div class="content">'+
					'<div></div>'+
				'</div>'
			
		});


		function router_u(){
			Q.reg('u',function(L){
			    $.get("/u?q="+L.match(/\d+/g), function(data){
					var data=JSON.parse(data);
					console.log(data.title);
					detail_page.show();
					$('#article-container .header').text(data.title);
					$('#article-container .content  div').html(data.content);
				});

			});
		}
		
		

		return{
			router_u:router_u
		}
	})();


var getScore=(
	function(){
		var getScore_page=new common_page({
			id:'score-container',
			content:'<h2 class="header">'+
				'本学期成绩'+
			'</h2>'+
			'<table class="striped ">'+
              '<thead>'+
                '<tr>'+
                    '<th >课程名称</th>'+
                    '<th >学分</th>'+
                    '<th >成绩</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody></tbody>'+
            '</table>'
		})

		function router_score(){
			Q.reg('score',function(){
				ahelp.noLoginToLogin();
				getScore_page.show();
				$('.button-collapse').sideNav('hide');
				
				getScoreAndSetTr();
				
			});
		}
		function getScoreAndSetTr(){
			$.post('/getScore',function(data){
					var courseArray=JSON.parse(data).scoreLists;//array
					//console.log(data);
					//console.log(typeof data);
					var str=''; 
					for(var i in courseArray){
						str+='<tr><td>'+courseArray[i].name+'</td><td>'
						+courseArray[i].credit+'</td><td>'
						+courseArray[i].score+'</td></tr>';
					}
					//console.log('1'+str)
					$('#score-container table tbody').html(str);
				})

		}		
		
		return{
			router_score:router_score
		}

})();
var getCourseTable=(
	function(){
		var getCourseTable_page=new common_page({
			id:'courseTable-container',
			content:'<form>'+
				'<div class="input-field col s12">'+
    				'<select id="tremSelect">'+
      				'<option value="" disabled selected>20162017a</option>'+
      				'<option value="20152016s">20152016s</option>'+
      				'<option value="20162017a">20162017a</option>'+
      				'<option value="20162017s">20162017s</option>'+
    				'</select>'+
    				
  				'</div>'+
  				'</form>'+
			'<h2 class="header">'+
				'本学期课表'+
			'</h2>'+
			'<table class=" bordered" >'+
              '<tbody id="courseTable"></tbody>'+
            '</table>'
		})

		function router_courseTable(){
			Q.reg('courseTable',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getCourseTable_page.show();
					
					
					getCourseTableAndSetTr();
					
					$('#tremSelect').change(function(){
						getCourseTableAndSetTr($(this).val())
					});
				}	

			});
		}
		function getCourseTableAndSetTr(term){
			$.post('/getCourseTable',{tr:term},function(data){
					$('#courseTable').html(data);
					
				})

		}		
		
		return{
			router_courseTable:router_courseTable
		}

})();
var getGymCount=(
	function(){
		var getGymCount_page=new common_page({
			id:'gymCount-container',
			content:'<h2 class="header">'+
				'本学期体锻情况'+
			'</h2>'+
			'<table class=" bordered" >'+
              '<tbody id="gymCount"></tbody>'+
            '</table>'
		})

		function router_gymCount(){
			Q.reg('gymCount',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getGymCount_page.show();
					
					getGymCountAndSetTr(tool.getCookie('id'));
					
					
				}	

			});
		}
		function getGymCountAndSetTr(id){
			console.log(id)
			$.post('/getGymCount',{stuId:id},function(data){
					
					if(data=="<tr></tr><tr></tr>"){
						//alert(1)
						data='<tr><td>啊偶！可能体育部的网站炸了，稍后重试~</td></tr>'
						//$('#gymCount').html('<tr><td>啊偶！可能体育部的网站炸了，稍后重试~</td></tr>');
					}
//					else{
						console.log(data)
						$('#gymCount').html(data);
//					}
					
				})

		}		
		
		return{
			router_gymCount:router_gymCount
		}

})();
var getCourse=(
	function(){
		var getCourse_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'本学期已选课程'+
			'</h2>'+
			'<table class=" bordered" >'+
			  	'<thead>'+
			   		'<tr>'+
	                    '<th >课程代码</th>'+
	                    '<th >课程名称</th>'+
	                    '<th >学分</th>'+
	                    '<th >任课教师</th>'+
	                    '<th >上课周次</th>'+
	                    '<th >上课时间</th>'+
	                    '<th >上课地点</th>'+
                	'</tr>'+
               '</thead>'+
              	'<tbody id="course"></tbody>'+
            '</table>'
		})

		function router_course(){
			Q.reg('getCourse',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getCourse_page.show();

					getCourseAndSetTr();
					

				}	

			});
		}
		function getCourseAndSetTr(term){
			$.post('/getCourse',function(data){
					$('#course').html(data);
					
				})

		}		
		
		return{
			router_course:router_course
		}

})();
var feedback=(
	function(){
		var feedback_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'反馈建议'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="email" type="email" class="validate">'+
	      			'<label for="email">Email</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<textarea id="textarea" class="materialize-textarea"></textarea>'+
	      			'<label for="textarea">这里填您的意见</label>'+
				'</div>'+
				
				'<button class="btn waves-effect waves-light" type="button" name="action" id="feedback">'+
					'提交'+
					'</button>'+
			'</from>'
		})

		function router_feedback(){
			Q.reg('feedback',function(){
				$('.button-collapse').sideNav('hide');
				feedback_page.show();

			});
			$('#feedback').click(function(){
				
				if(textareaIsEmpty()){
					Materialize.toast('反馈内容不能为空！', 4000);
				}else{
					$(this).attr('disabled','true');
					$.ajax({
						type:'post',
						url:'/feedback',
						data:{
							'email':$('#email').val(),
							'content':$('#textarea').val()
						},
						success:function(data){
							Materialize.toast('反馈成功，我们会及时处理~', 4000);
							$('#feedback').removeAttr('disabled');
							window.location='#!home';
								
						}
					})
				}
				
				
			});		
		}
		function textareaIsEmpty(){
			return $('#textarea').val()==''?true:false;
		}
		
		return{
			router_feedback:router_feedback
		}

})();
var getHowMuchBirSame=(
	function(){
		var getHowMuchBirSame_page=new common_page({
			id:'gymCount-container',
			content:'<h2 class="header">'+
				'一共有<span id="sameBir">0</span>跟你同年同月同日生'+
			'</h2>'+

		})

		function router_sameBir(){
			Q.reg('sameBir',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getGymCount_page.show();
					
					
					
				}	

			});
		}

		
		return{
			router_sameBir:router_sameBir
		}

})();

(function(){
		
		home.router_home();
		login.router_login();
		detail.router_u();
		getScore.router_score();
		getCourseTable.router_courseTable();
		getGymCount.router_gymCount();
		getCourse.router_course();
		feedback.router_feedback();
		getHowMuchBirSame.router_sameBir();

		Q.init({
			key:'!',/* url里#和url名之间的分割符号 默认为感叹号 */
			index:'home',/* 首页地址 如果访问到不能访问页面也会跳回此页 */
			pop:function(L){/* 每次有url变更时都会触发pop回调 */
				console.log('pop 当前参数是:'+L);
			}
		});
	$(".button-collapse").sideNav();

	$(document).ready(function() {
    	$('select').material_select();
    	$('.collapsible').collapsible({
      		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
  	});
       

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInEuanMiLCJvYmplY3QtY29tbW9uUGFnZS5qcyIsInRvb2wuanMiLCJhamF4LWhlbHAuanMiLCJob21lLWluZm9ybWF0aW9uLmpzIiwibG9naW4uanMiLCJkZXRhaWwtaW5mb3JtYXRpb24uanMiLCJnZXRTY29yZS5qcyIsImdldENvdXJzZVRhYmxlLmpzIiwiZ2V0R3ltQ291bnQuanMiLCJnZXRDb3Vyc2UuanMiLCJmZWVkYmFjay5qcyIsImdldEhvd011Y2hCaXJTYW1lLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFxyXG5RPWZ1bmN0aW9uKFcsRCxNLEhUTUwsaGFzaCx2aWV3LGFyZyxMTCxpLGluZGV4LFJlZ2V4LGtleSxRKXtcclxuXHRIVE1MPUQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXTtcclxuXHRSZWdleD1bXTtcclxuXHRrZXk9JyEnO1xyXG5cdG9uaGFzaGNoYW5nZT1mdW5jdGlvbigpe1xyXG5cdFx0US5oYXNoPWhhc2g9bG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoa2V5Lmxlbmd0aCsxKTtcclxuXHJcblx0XHRhcmc9aGFzaC5zcGxpdCgnLycpO1xyXG5cclxuXHRcdGk9UmVnZXgubGVuZ3RoO1xyXG5cdFx0d2hpbGUoaS0tKVxyXG5cdFx0XHRpZihMTD1oYXNoLm1hdGNoKFJlZ2V4W2ldKSl7XHJcblx0XHRcdFx0YXJnWzBdPVJlZ2V4W2ldO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYoIVFbYXJnWzBdXSlcclxuXHRcdFx0YXJnWzBdPWluZGV4O1xyXG5cdFx0XHJcblx0XHRpZihRLnBvcClcclxuXHRcdFx0US5wb3AuYXBwbHkoVyxhcmcpO1xyXG5cclxuXHRcdFEubGFzaD12aWV3PWFyZy5zaGlmdCgpO1xyXG5cclxuXHRcdEhUTUwuc2V0QXR0cmlidXRlKCd2aWV3Jyx2aWV3KTtcclxuXHJcblx0XHRRW3ZpZXddLmFwcGx5KFcsYXJnKTtcclxuXHR9O1xyXG5cdFE9e1xyXG5cdFx0aW5pdDpmdW5jdGlvbihvKXtcclxuXHJcblx0XHRcdGlmKG8ua2V5IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdGtleT1vLmtleTtcclxuXHJcblx0XHRcdGluZGV4PW8uaW5kZXh8fCdWJztcclxuXHJcblx0XHRcdGlmKG8ucG9wJiZ0eXBlb2Ygby5wb3A9PSdmdW5jdGlvbicpXHJcblx0XHRcdFx0US5wb3A9by5wb3A7XHJcblxyXG5cdFx0XHRvbmhhc2hjaGFuZ2UoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0cmVnOmZ1bmN0aW9uKHIsdSl7XHJcblx0XHRcdGlmKCFyKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdGlmKHUgPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHU9ZnVuY3Rpb24oKXt9O1xyXG5cclxuXHRcdFx0aWYociBpbnN0YW5jZW9mIFJlZ0V4cCl7XHJcblx0XHRcdFx0UVtyXT11O1xyXG5cdFx0XHRcdFJlZ2V4LnB1c2gocik7XHJcblx0XHRcdH1lbHNlIGlmKHIgaW5zdGFuY2VvZiBBcnJheSl7Ly/mlbDnu4Tms6jlhoxcclxuXHRcdFx0XHRmb3IodmFyIGkgaW4gcil7XHJcblx0XHRcdFx0XHRMPVtdLmNvbmNhdChyW2ldKS5jb25jYXQodSk7XHJcblx0XHRcdFx0XHR0aGlzLnJlZy5hcHBseSh0aGlzLEwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UgaWYodHlwZW9mIHI9PSdzdHJpbmcnKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgdT09J2Z1bmN0aW9uJylcclxuXHRcdFx0XHRcdFFbcl09dTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiB1PT0nc3RyaW5nJyYmUVt1XSlcclxuXHRcdFx0XHRcdFFbcl09UVt1XTtcclxuXHRcdFx0fVx0XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fSxcclxuXHRcdFY6ZnVuY3Rpb24oKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1EuanMgPGh0dHBzOi8vZ2l0aHViLmNvbS9pdG9yci9xLmpzPiAyMDE0LzEyLzI4Jyk7XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0Z286ZnVuY3Rpb24odSl7XHJcblx0XHRcdGxvY2F0aW9uLmhhc2g9JyMnK2tleSt1O1xyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIFE7XHJcbn0odGhpcyxkb2N1bWVudCk7IiwidmFyIGNvbW1vbl9wYWdlX25vd19zaG93PXtcclxuXHRlbGU6bnVsbFxyXG59O1xyXG5jb21tb25fcGFnZV9ub3dfc2hvdy5wdXNoPWZ1bmN0aW9uKG5vd19zaG93KXtcclxuXHR0aGlzLmVsZT1ub3dfc2hvdztcclxufTtcclxuY29tbW9uX3BhZ2Vfbm93X3Nob3cuc2hvdz1mdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlP3RoaXMuZWxlLnNob3coKTpudWxsO1xyXG59O1xyXG5jb21tb25fcGFnZV9ub3dfc2hvdy5oaWRlPWZ1bmN0aW9uKCl7XHJcblx0dGhpcy5lbGU/dGhpcy5lbGUuaGlkZSgpOm51bGw7XHJcbn1cclxuXHJcbnZhciBjb21tb25fcGFnZT1mdW5jdGlvbihvYmope1xyXG5cdHRoaXMuX21haW49JCgnPGRpdj4nLHtcclxuXHRcdCdjbGFzcyc6J2FsbCcsXHJcblx0XHQnaWQnOm9iai5pZFxyXG5cdH0pO1xyXG5cdHZhciBtYWluX25hdj0nPG5hdiA+JytcclxuXHQnPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPicrXHJcblx0XHQnPGEgaHJlZj1cIiMhaG9tZVwiPicrXHJcblx0XHRcdCc8aW1nIHNyYz1cIi4vcHVibGljL2ltZy9hcnJvdy5wbmdcIiBjbGFzcz1cInJldHVyblwiID4nK1xyXG5cdFx0JzwvYT4nK1xyXG5cdCc8L2Rpdj4nK1xyXG5cdCc8L25hdj4nXHJcblx0dGhpcy5fbWFpbi5odG1sKG1haW5fbmF2KTtcclxuXHRcclxuXHQkKCc8ZGl2Picse1xyXG5cdFx0J2NsYXNzJzonY29udGFpbmVyJ1xyXG5cdH0pLmh0bWwob2JqLmNvbnRlbnQpXHJcblx0LmFwcGVuZFRvKHRoaXMuX21haW4pO1xyXG5cclxuXHR0aGlzLl9tYWluLmFwcGVuZFRvKCdib2R5Jyk7XHJcbn07XHJcblxyXG5jb21tb25fcGFnZS5wcm90b3R5cGUuc2hvdz1mdW5jdGlvbigpe1xyXG5cdGNvbW1vbl9wYWdlX25vd19zaG93LmhpZGUoKTtcclxuXHRjb21tb25fcGFnZV9ub3dfc2hvdy5wdXNoKHRoaXMuX21haW4pO1xyXG5cdGNvbW1vbl9wYWdlX25vd19zaG93LnNob3coKTtcclxufTsiLCJ2YXIgdG9vbD0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIGdldENvb2tpZShjX25hbWUpXHJcblx0XHR7XHJcblx0XHRpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aD4wKVxyXG5cdFx0ICB7XHJcblx0XHQgIGNfc3RhcnQ9ZG9jdW1lbnQuY29va2llLmluZGV4T2YoY19uYW1lICsgXCI9XCIpXHJcblx0XHQgIGlmIChjX3N0YXJ0IT0tMSlcclxuXHRcdCAgICB7IFxyXG5cdFx0ICAgIGNfc3RhcnQ9Y19zdGFydCArIGNfbmFtZS5sZW5ndGgrMSBcclxuXHRcdCAgICBjX2VuZD1kb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIixjX3N0YXJ0KVxyXG5cdFx0ICAgIGlmIChjX2VuZD09LTEpIGNfZW5kPWRvY3VtZW50LmNvb2tpZS5sZW5ndGhcclxuXHRcdCAgICByZXR1cm4gdW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LGNfZW5kKSlcclxuXHRcdCAgICB9IFxyXG5cdFx0ICB9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRDb29raWUoY19uYW1lLHZhbHVlLGV4cGlyZWRheXMpe1xyXG5cdFx0XHR2YXIgZXhkYXRlPW5ldyBEYXRlKClcclxuXHRcdFx0ZXhkYXRlLnNldERhdGUoZXhkYXRlLmdldERhdGUoKStleHBpcmVkYXlzKVxyXG5cdFx0XHRkb2N1bWVudC5jb29raWU9Y19uYW1lKyBcIj1cIiArZXNjYXBlKHZhbHVlKStcclxuXHRcdFx0KChleHBpcmVkYXlzPT1udWxsKSA/IFwiXCIgOiBcIjtleHBpcmVzPVwiK2V4ZGF0ZS50b0dNVFN0cmluZygpKVxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gY2xlYXJDb29raWUoKXsgXHJcblx0XHRcdHZhciBrZXlzPWRvY3VtZW50LmNvb2tpZS5tYXRjaCgvW14gPTtdKyg/PVxcPSkvZyk7IFxyXG5cdFx0XHRpZiAoa2V5cykgeyBcclxuXHRcdFx0XHRmb3IgKHZhciBpID0ga2V5cy5sZW5ndGg7IGktLTspIFxyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuY29va2llPWtleXNbaV0rJz0wO2V4cGlyZXM9JyArIG5ldyBEYXRlKCAwKS50b1VUQ1N0cmluZygpIFxyXG5cdFx0XHR9IFxyXG5cdFx0fSBcclxuXHRcdHJldHVybntcclxuXHRcdFx0Z2V0Q29va2llOmdldENvb2tpZSxcclxuXHRcdFx0c2V0Q29va2llOnNldENvb2tpZSxcclxuXHRcdFx0Y2xlYXJDb29raWU6Y2xlYXJDb29raWVcclxuXHRcdH1cclxufSkoKTsiLCJ2YXIgYWhlbHA9KGZ1bmN0aW9uKCl7XHJcblx0XHRmdW5jdGlvbiBzZXRVc2VySWQoY29va2llLHRpbWUpe1xyXG5cdFx0XHR2YXIgaW5kZXg9Y29va2llWzBdLmluZGV4T2YoJz0nKSsxO1xyXG5cdFx0XHR2YXIgbGVuPWNvb2tpZVswXS5sZW5ndGg7XHJcblxyXG5cdFx0XHR0b29sLnNldENvb2tpZSgndXNlcmlkJyxjb29raWVbMF0uc2xpY2UoaW5kZXgsbGVuKSx0aW1lKTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHNldGxvZ2lubmFtZShjb29raWUsdGltZSl7XHJcblx0XHRcdHZhciBpbmRleD1jb29raWVbMl0uaW5kZXhPZignPScpKzE7XHJcblx0XHRcdHZhciBsZW49Y29va2llWzJdLmxlbmd0aDtcclxuXHJcblx0XHRcdHRvb2wuc2V0Q29va2llKCdsb2dpbm5hbWUnLGNvb2tpZVsyXS5zbGljZShpbmRleCxsZW4pLnRyaW0oKSx0aW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBpc0xvZ2luZWQoKXtcclxuXHRcdFx0cmV0dXJuIHRvb2wuZ2V0Q29va2llKCd1c2VyaWQnKT90cnVlOmZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIG5vTG9naW5Ub0xvZ2luKCl7XHJcblx0XHRcdGlmKCFpc0xvZ2luZWQoKSl7XHJcblx0XHRcdFx0TWF0ZXJpYWxpemUudG9hc3QoJ+ivt+eZu+W9lSEnLCA0MDAwKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb249JyMhbG9naW4nO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybntcclxuXHRcdFx0c2V0VXNlcklkOnNldFVzZXJJZCxcclxuXHRcdFx0c2V0bG9naW5uYW1lOnNldGxvZ2lubmFtZSxcclxuXHRcdFx0aXNMb2dpbmVkOmlzTG9naW5lZCxcclxuXHRcdFx0bm9Mb2dpblRvTG9naW46bm9Mb2dpblRvTG9naW5cclxuXHRcdH1cclxufSkoKTtcclxuXHJcbiIsInZhciBob21lPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX2hvbWUoKXtcclxuXHRcdFx0US5yZWcoJ2hvbWUnLGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHRcdGNvbW1vbl9wYWdlX25vd19zaG93LmhpZGUoKTtcclxuXHRcdFx0XHRjb21tb25fcGFnZV9ub3dfc2hvdy5wdXNoKCQoJyNtYWluLWNvbnRhaW5lcicpKTtcclxuXHRcdFx0XHRjb21tb25fcGFnZV9ub3dfc2hvdy5zaG93KCk7XHRcclxuXHJcblx0XHRcdFx0aWYoYWhlbHAuaXNMb2dpbmVkKCkpe1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLm5hbWUnKS50ZXh0KHRvb2wuZ2V0Q29va2llKCd1c2VybmFtZScpKS5wYXJlbnQoKS5hdHRyKCdocmVmJywnIycpO1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgnJykucGFyZW50KCkub2ZmKCdjbGljaycpO1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgn6YCA5Ye655m75b2VJykucGFyZW50KCkuY2xpY2sobG9naW5vdXQpO1xyXG5cdFx0XHRcdFx0Ly8gJCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgn6YCA5Ye655m75b2VJykucGFyZW50KCkuY2xpY2sobG9naW5vdXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLm5hbWUnKS50ZXh0KCfor7fnmbvlvZUnKS5wYXJlbnQoKS5hdHRyKCdocmVmJywnIyFsb2dpbicpO1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgnJykucGFyZW50KCkub2ZmKCdjbGljaycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHJcblx0XHRcdCQuZ2V0KFwiL2hvbWVcIiwgZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCAgY29uc29sZS5sb2coIGRhdGEpO1xyXG5cdFx0XHQgIHZhciBsaUxpc3Q9JCgnLmNvbGxlY3Rpb24gbGknKTtcclxuXHRcdFx0ICB2YXIgbGVuPWxpTGlzdC5sZW5ndGg7XHJcblx0XHRcdCAgZm9yKHZhciBpPTA7aTxsZW47aSsrKXtcclxuXHRcdFx0ICBcdCQobGlMaXN0W2ldKS5jaGlsZHJlbigpLmF0dHIoJ2hyZWYnLCcjIXUvJytkYXRhW2ldLmxpbmspO1xyXG5cdFx0XHQgIFx0JChsaUxpc3RbaV0pLmNoaWxkcmVuKCkuaHRtbChkYXRhW2ldLnRleHQrJzxzcGFuPicrZGF0YVtpXS50aW1lKyc8L3NwYW4+Jyk7XHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGxvZ2lub3V0KCl7XHJcblx0XHRcdHRvb2wuY2xlYXJDb29raWUoKTtcclxuXHRcdFx0TWF0ZXJpYWxpemUudG9hc3QoJ+mAgOWHuuaIkOWKnycsIDQwMDApO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb249JyMhbG9naW4nO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX2hvbWU6cm91dGVyX2hvbWVcclxuXHRcdH1cclxuXHJcbn0pKCk7IiwiXHJcbnZhciBsb2dpbj0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBsb2dpbl9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdFx0aWQ6J2xvZ2luLWNvbnRhaW5lcicsXHJcblx0XHRcdFx0Y29udGVudDonPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHRcdFx0XHQn6K+36L6T5YWl5pWZ5Yqh5aSE6LSm5Y+35a+G56CB55m75b2VJytcclxuXHRcdFx0XHRcdFx0JzwvaDI+JytcclxuXHRcdFx0XHRcdFx0Jzxmb3JtID4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8aW5wdXQgaWQ9XCJ1c2VuYW1lXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cInVzZW5hbWVcIj4nK1xyXG5cdFx0XHQgICAgICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJ1c2VuYW1lXCI+5a2m5Y+3PC9sYWJlbD4nK1xyXG5cdFx0XHQgICAgICAgICAgXHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHQgICAgICAgICAgXHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8aW5wdXQgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuYW1lPVwicGFzc3dvcmRcIj4nK1xyXG5cdFx0XHQgICAgICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPuaVmeWKoeWkhOWvhueggTwvbGFiZWw+JytcclxuXHRcdCAgICAgICAgXHRcdFx0JzwvZGl2PicrXHJcblx0XHQgICAgICAgIFx0XHRcdCcgPHA+JytcclxuICAgICAgXHRcdFx0XHRcdFx0XHQnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaXNTYXZlTG9naW5cIiAvPicrXHJcbiAgICAgIFx0XHRcdFx0XHRcdFx0JzxsYWJlbCBmb3I9XCJpc1NhdmVMb2dpblwiPjMw5aSp6K6w5L2P5oiRPC9sYWJlbD4nK1xyXG4gICAgXHRcdFx0XHRcdFx0JzwvcD4nK1xyXG5cdFx0ICAgICAgICBcdFx0XHQnPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFjdGlvblwiIGlkPVwibG9naW5cIj4nK1xyXG5cdFx0ICAgICAgICBcdFx0XHRcdCfnmbvlvZUnK1xyXG5cdFx0ICBcdFx0XHRcdFx0JzwvYnV0dG9uPicrXHJcblx0XHQgIFx0XHRcdFx0JzwvZnJvbT4nXHJcblx0XHR9KTtcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfbG9naW4oKXtcclxuXHRcdFx0US5yZWcoJ2xvZ2luJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGxvZ2luX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0JCgnI2xvZ2luJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgaXNMb2dpbl8zMD0kKCcjaXNTYXZlTG9naW4nKS5wcm9wKCdjaGVja2VkJyk7XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0dXJsOicvbG9naW4nLFxyXG5cdFx0XHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0XHRcdCd1c2VuYW1lJzokKCcjdXNlbmFtZScpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHQncGFzc3dvcmQnOiQoJyNwYXNzd29yZCcpLnZhbCgpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblxyXG5cdFx0XHRcdFx0XHRkYXRhLmxlbmd0aD4xP2xvZ2luU3VjY2VzcyhkYXRhLGlzTG9naW5fMzApOmxvZ2luRmFpbCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlJywndHJ1ZScpO1xyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBsb2dpblN1Y2Nlc3MoY29va2llLGlzXzMwKXtcclxuXHRcdFx0dmFyIHRpbWU9aXNfMzA/MzA6bnVsbDtcclxuXHRcdFx0dG9vbC5zZXRDb29raWUoJ2lkJywkKCcjdXNlbmFtZScpLnZhbCgpLHRpbWUpO1xyXG5cdFx0XHRcclxuXHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCfnmbvlvZXmiJDlip8nLCA0MDAwKTtcclxuXHRcdFx0YWhlbHAuc2V0VXNlcklkKGNvb2tpZSx0aW1lKTtcclxuXHRcdFx0YWhlbHAuc2V0bG9naW5uYW1lKGNvb2tpZSx0aW1lKTtcclxuXHJcblx0XHRcdCQucG9zdCgnL2dldE5hbWUnLGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHR0b29sLnNldENvb2tpZSgndXNlcm5hbWUnLGRhdGEsdGltZSk7XHJcblx0XHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5uYW1lJykudGV4dChkYXRhKS5wYXJlbnQoKS5hdHRyKCdocmVmJywnIycpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdCQoJyNsb2dpbicpLmF0dHIoJ2Rpc2FibGUnLCdmYWxzZScpO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBsb2dpbkZhaWwoKXtcclxuXHRcdFx0TWF0ZXJpYWxpemUudG9hc3QoJ+eZu+W9leWksei0pScsIDQwMDApO1xyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfbG9naW46cm91dGVyX2xvZ2luXHJcblx0XHR9XHJcblxyXG59KSgpOyIsIlxyXG52YXJcdGRldGFpbD0oZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkZXRhaWxfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonYXJ0aWNsZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50OlxyXG5cdFx0XHRcdCc8aDQgY2xhc3M9XCJoZWFkZXJcIj48L2g0PicrXHJcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb250ZW50XCI+JytcclxuXHRcdFx0XHRcdCc8ZGl2PjwvZGl2PicrXHJcblx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX3UoKXtcclxuXHRcdFx0US5yZWcoJ3UnLGZ1bmN0aW9uKEwpe1xyXG5cdFx0XHQgICAgJC5nZXQoXCIvdT9xPVwiK0wubWF0Y2goL1xcZCsvZyksIGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0dmFyIGRhdGE9SlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEudGl0bGUpO1xyXG5cdFx0XHRcdFx0ZGV0YWlsX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0JCgnI2FydGljbGUtY29udGFpbmVyIC5oZWFkZXInKS50ZXh0KGRhdGEudGl0bGUpO1xyXG5cdFx0XHRcdFx0JCgnI2FydGljbGUtY29udGFpbmVyIC5jb250ZW50ICBkaXYnKS5odG1sKGRhdGEuY29udGVudCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfdTpyb3V0ZXJfdVxyXG5cdFx0fVxyXG5cdH0pKCk7XHJcblxyXG4iLCJ2YXIgZ2V0U2NvcmU9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZ2V0U2NvcmVfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonc2NvcmUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDonPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5pys5a2m5pyf5oiQ57upJytcclxuXHRcdFx0JzwvaDI+JytcclxuXHRcdFx0Jzx0YWJsZSBjbGFzcz1cInN0cmlwZWQgXCI+JytcclxuICAgICAgICAgICAgICAnPHRoZWFkPicrXHJcbiAgICAgICAgICAgICAgICAnPHRyPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzx0aCA+6K++56iL5ZCN56ewPC90aD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8dGggPuWtpuWIhjwvdGg+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHRoID7miJDnu6k8L3RoPicrXHJcbiAgICAgICAgICAgICAgICAnPC90cj4nK1xyXG4gICAgICAgICAgICAgICc8L3RoZWFkPicrXHJcbiAgICAgICAgICAgICAgJzx0Ym9keT48L3Rib2R5PicrXHJcbiAgICAgICAgICAgICc8L3RhYmxlPidcclxuXHRcdH0pXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX3Njb3JlKCl7XHJcblx0XHRcdFEucmVnKCdzY29yZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRhaGVscC5ub0xvZ2luVG9Mb2dpbigpO1xyXG5cdFx0XHRcdGdldFNjb3JlX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Z2V0U2NvcmVBbmRTZXRUcigpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldFNjb3JlQW5kU2V0VHIoKXtcclxuXHRcdFx0JC5wb3N0KCcvZ2V0U2NvcmUnLGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0dmFyIGNvdXJzZUFycmF5PUpTT04ucGFyc2UoZGF0YSkuc2NvcmVMaXN0czsvL2FycmF5XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0eXBlb2YgZGF0YSk7XHJcblx0XHRcdFx0XHR2YXIgc3RyPScnOyBcclxuXHRcdFx0XHRcdGZvcih2YXIgaSBpbiBjb3Vyc2VBcnJheSl7XHJcblx0XHRcdFx0XHRcdHN0cis9Jzx0cj48dGQ+Jytjb3Vyc2VBcnJheVtpXS5uYW1lKyc8L3RkPjx0ZD4nXHJcblx0XHRcdFx0XHRcdCtjb3Vyc2VBcnJheVtpXS5jcmVkaXQrJzwvdGQ+PHRkPidcclxuXHRcdFx0XHRcdFx0K2NvdXJzZUFycmF5W2ldLnNjb3JlKyc8L3RkPjwvdHI+JztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzEnK3N0cilcclxuXHRcdFx0XHRcdCQoJyNzY29yZS1jb250YWluZXIgdGFibGUgdGJvZHknKS5odG1sKHN0cik7XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9zY29yZTpyb3V0ZXJfc2NvcmVcclxuXHRcdH1cclxuXHJcbn0pKCk7IiwidmFyIGdldENvdXJzZVRhYmxlPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGdldENvdXJzZVRhYmxlX3BhZ2U9bmV3IGNvbW1vbl9wYWdlKHtcclxuXHRcdFx0aWQ6J2NvdXJzZVRhYmxlLWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6Jzxmb3JtPicrXHJcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+JytcclxuICAgIFx0XHRcdFx0JzxzZWxlY3QgaWQ9XCJ0cmVtU2VsZWN0XCI+JytcclxuICAgICAgXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPjIwMTYyMDE3YTwvb3B0aW9uPicrXHJcbiAgICAgIFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIyMDE1MjAxNnNcIj4yMDE1MjAxNnM8L29wdGlvbj4nK1xyXG4gICAgICBcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMjAxNjIwMTdhXCI+MjAxNjIwMTdhPC9vcHRpb24+JytcclxuICAgICAgXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjIwMTYyMDE3c1wiPjIwMTYyMDE3czwvb3B0aW9uPicrXHJcbiAgICBcdFx0XHRcdCc8L3NlbGVjdD4nK1xyXG4gICAgXHRcdFx0XHRcclxuICBcdFx0XHRcdCc8L2Rpdj4nK1xyXG4gIFx0XHRcdFx0JzwvZm9ybT4nK1xyXG5cdFx0XHQnPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5pys5a2m5pyf6K++6KGoJytcclxuXHRcdFx0JzwvaDI+JytcclxuXHRcdFx0Jzx0YWJsZSBjbGFzcz1cIiBib3JkZXJlZFwiID4nK1xyXG4gICAgICAgICAgICAgICc8dGJvZHkgaWQ9XCJjb3Vyc2VUYWJsZVwiPjwvdGJvZHk+JytcclxuICAgICAgICAgICAgJzwvdGFibGU+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfY291cnNlVGFibGUoKXtcclxuXHRcdFx0US5yZWcoJ2NvdXJzZVRhYmxlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0aWYoYWhlbHAubm9Mb2dpblRvTG9naW4oKSl7XHJcblx0XHRcdFx0XHRnZXRDb3Vyc2VUYWJsZV9wYWdlLnNob3coKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRnZXRDb3Vyc2VUYWJsZUFuZFNldFRyKCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCQoJyN0cmVtU2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGdldENvdXJzZVRhYmxlQW5kU2V0VHIoJCh0aGlzKS52YWwoKSlcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cdFxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBnZXRDb3Vyc2VUYWJsZUFuZFNldFRyKHRlcm0pe1xyXG5cdFx0XHQkLnBvc3QoJy9nZXRDb3Vyc2VUYWJsZScse3RyOnRlcm19LGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0JCgnI2NvdXJzZVRhYmxlJykuaHRtbChkYXRhKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfY291cnNlVGFibGU6cm91dGVyX2NvdXJzZVRhYmxlXHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXRHeW1Db3VudD0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBnZXRHeW1Db3VudF9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidneW1Db3VudC1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50Oic8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/kvZPplLvmg4XlhrUnK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwiIGJvcmRlcmVkXCIgPicrXHJcbiAgICAgICAgICAgICAgJzx0Ym9keSBpZD1cImd5bUNvdW50XCI+PC90Ym9keT4nK1xyXG4gICAgICAgICAgICAnPC90YWJsZT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9neW1Db3VudCgpe1xyXG5cdFx0XHRRLnJlZygnZ3ltQ291bnQnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldEd5bUNvdW50X3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRnZXRHeW1Db3VudEFuZFNldFRyKHRvb2wuZ2V0Q29va2llKCdpZCcpKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldEd5bUNvdW50QW5kU2V0VHIoaWQpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhpZClcclxuXHRcdFx0JC5wb3N0KCcvZ2V0R3ltQ291bnQnLHtzdHVJZDppZH0sZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmKGRhdGE9PVwiPHRyPjwvdHI+PHRyPjwvdHI+XCIpe1xyXG5cdFx0XHRcdFx0XHQvL2FsZXJ0KDEpXHJcblx0XHRcdFx0XHRcdGRhdGE9Jzx0cj48dGQ+5ZWK5YG277yB5Y+v6IO95L2T6IKy6YOo55qE572R56uZ54K45LqG77yM56iN5ZCO6YeN6K+VfjwvdGQ+PC90cj4nXHJcblx0XHRcdFx0XHRcdC8vJCgnI2d5bUNvdW50JykuaHRtbCgnPHRyPjx0ZD7llYrlgbbvvIHlj6/og73kvZPogrLpg6jnmoTnvZHnq5nngrjkuobvvIznqI3lkI7ph43or5V+PC90ZD48L3RyPicpO1xyXG5cdFx0XHRcdFx0fVxyXG4vL1x0XHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdFx0XHQkKCcjZ3ltQ291bnQnKS5odG1sKGRhdGEpO1xyXG4vL1x0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdH1cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX2d5bUNvdW50OnJvdXRlcl9neW1Db3VudFxyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgZ2V0Q291cnNlPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGdldENvdXJzZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidjb3Vyc2VUYWJsZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50OlxyXG5cdFx0XHQnPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5pys5a2m5pyf5bey6YCJ6K++56iLJytcclxuXHRcdFx0JzwvaDI+JytcclxuXHRcdFx0Jzx0YWJsZSBjbGFzcz1cIiBib3JkZXJlZFwiID4nK1xyXG5cdFx0XHQgIFx0Jzx0aGVhZD4nK1xyXG5cdFx0XHQgICBcdFx0Jzx0cj4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+6K++56iL5Luj56CBPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+6K++56iL5ZCN56ewPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5a2m5YiGPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5Lu76K++5pWZ5biIPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5ZGo5qyhPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5pe26Ze0PC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5Zyw54K5PC90aD4nK1xyXG4gICAgICAgICAgICAgICAgXHQnPC90cj4nK1xyXG4gICAgICAgICAgICAgICAnPC90aGVhZD4nK1xyXG4gICAgICAgICAgICAgIFx0Jzx0Ym9keSBpZD1cImNvdXJzZVwiPjwvdGJvZHk+JytcclxuICAgICAgICAgICAgJzwvdGFibGU+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfY291cnNlKCl7XHJcblx0XHRcdFEucmVnKCdnZXRDb3Vyc2UnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldENvdXJzZV9wYWdlLnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRnZXRDb3Vyc2VBbmRTZXRUcigpO1xyXG5cdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdH1cdFxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBnZXRDb3Vyc2VBbmRTZXRUcih0ZXJtKXtcclxuXHRcdFx0JC5wb3N0KCcvZ2V0Q291cnNlJyxmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdCQoJyNjb3Vyc2UnKS5odG1sKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9jb3Vyc2U6cm91dGVyX2NvdXJzZVxyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgZmVlZGJhY2s9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZmVlZGJhY2tfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonY291cnNlVGFibGUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDpcclxuXHRcdFx0JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0J+WPjemmiOW7uuiuricrXHJcblx0XHRcdCc8L2gyPicrXHJcblx0XHRcdCc8Zm9ybSA+JytcclxuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxpbnB1dCBpZD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD4nK1xyXG5cdCAgICAgIFx0XHQnPC9kaXY+JytcclxuXHQgICAgICBcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xyXG5cdCAgICAgIFx0XHRcdCc8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYVwiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIj48L3RleHRhcmVhPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJ0ZXh0YXJlYVwiPui/memHjOWhq+aCqOeahOaEj+ingTwvbGFiZWw+JytcclxuXHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQnPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFjdGlvblwiIGlkPVwiZmVlZGJhY2tcIj4nK1xyXG5cdFx0XHRcdFx0J+aPkOS6pCcrXHJcblx0XHRcdFx0XHQnPC9idXR0b24+JytcclxuXHRcdFx0JzwvZnJvbT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9mZWVkYmFjaygpe1xyXG5cdFx0XHRRLnJlZygnZmVlZGJhY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRmZWVkYmFja19wYWdlLnNob3coKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKCcjZmVlZGJhY2snKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHRleHRhcmVhSXNFbXB0eSgpKXtcclxuXHRcdFx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCflj43ppojlhoXlrrnkuI3og73kuLrnqbrvvIEnLCA0MDAwKTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCd0cnVlJyk7XHJcblx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHR0eXBlOidwb3N0JyxcclxuXHRcdFx0XHRcdFx0dXJsOicvZmVlZGJhY2snLFxyXG5cdFx0XHRcdFx0XHRkYXRhOntcclxuXHRcdFx0XHRcdFx0XHQnZW1haWwnOiQoJyNlbWFpbCcpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdCdjb250ZW50JzokKCcjdGV4dGFyZWEnKS52YWwoKVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCflj43ppojmiJDlip/vvIzmiJHku6zkvJrlj4rml7blpITnkIZ+JywgNDAwMCk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI2ZlZWRiYWNrJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1x0XHRcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHRleHRhcmVhSXNFbXB0eSgpe1xyXG5cdFx0XHRyZXR1cm4gJCgnI3RleHRhcmVhJykudmFsKCk9PScnP3RydWU6ZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX2ZlZWRiYWNrOnJvdXRlcl9mZWVkYmFja1xyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgZ2V0SG93TXVjaEJpclNhbWU9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZ2V0SG93TXVjaEJpclNhbWVfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonZ3ltQ291bnQtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDonPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5LiA5YWx5pyJPHNwYW4gaWQ9XCJzYW1lQmlyXCI+MDwvc3Bhbj7ot5/kvaDlkIzlubTlkIzmnIjlkIzml6XnlJ8nK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cclxuXHRcdH0pXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX3NhbWVCaXIoKXtcclxuXHRcdFx0US5yZWcoJ3NhbWVCaXInLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldEd5bUNvdW50X3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cdFxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9zYW1lQmlyOnJvdXRlcl9zYW1lQmlyXHJcblx0XHR9XHJcblxyXG59KSgpOyIsIlxyXG4oZnVuY3Rpb24oKXtcclxuXHRcdFxyXG5cdFx0aG9tZS5yb3V0ZXJfaG9tZSgpO1xyXG5cdFx0bG9naW4ucm91dGVyX2xvZ2luKCk7XHJcblx0XHRkZXRhaWwucm91dGVyX3UoKTtcclxuXHRcdGdldFNjb3JlLnJvdXRlcl9zY29yZSgpO1xyXG5cdFx0Z2V0Q291cnNlVGFibGUucm91dGVyX2NvdXJzZVRhYmxlKCk7XHJcblx0XHRnZXRHeW1Db3VudC5yb3V0ZXJfZ3ltQ291bnQoKTtcclxuXHRcdGdldENvdXJzZS5yb3V0ZXJfY291cnNlKCk7XHJcblx0XHRmZWVkYmFjay5yb3V0ZXJfZmVlZGJhY2soKTtcclxuXHRcdGdldEhvd011Y2hCaXJTYW1lLnJvdXRlcl9zYW1lQmlyKCk7XHJcblxyXG5cdFx0US5pbml0KHtcclxuXHRcdFx0a2V5OichJywvKiB1cmzph4wj5ZKMdXJs5ZCN5LmL6Ze055qE5YiG5Ymy56ym5Y+3IOm7mOiupOS4uuaEn+WPueWPtyAqL1xyXG5cdFx0XHRpbmRleDonaG9tZScsLyog6aaW6aG15Zyw5Z2AIOWmguaenOiuv+mXruWIsOS4jeiDveiuv+mXrumhtemdouS5n+S8mui3s+WbnuatpOmhtSAqL1xyXG5cdFx0XHRwb3A6ZnVuY3Rpb24oTCl7Lyog5q+P5qyh5pyJdXJs5Y+Y5pu05pe26YO95Lya6Kem5Y+RcG9w5Zue6LCDICovXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3BvcCDlvZPliY3lj4LmlbDmmK86JytMKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0JChcIi5idXR0b24tY29sbGFwc2VcIikuc2lkZU5hdigpO1xyXG5cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIFx0JCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICBcdCQoJy5jb2xsYXBzaWJsZScpLmNvbGxhcHNpYmxlKHtcclxuICAgICAgXHRcdGFjY29yZGlvbiA6IGZhbHNlIC8vIEEgc2V0dGluZyB0aGF0IGNoYW5nZXMgdGhlIGNvbGxhcHNpYmxlIGJlaGF2aW9yIHRvIGV4cGFuZGFibGUgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBhY2NvcmRpb24gc3R5bGVcclxuICAgIFx0fSk7XHJcbiAgXHR9KTtcclxuICAgICAgIFxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
