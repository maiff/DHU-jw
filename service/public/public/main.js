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
	//this.ele?this.ele.removeClass('margin-left-100'):null;
	//var that=this;
	//setTimeout(function(){
		this.ele?this.ele.show():null;
	//},300)

};
common_page_now_show.hide=function(){
	//this.ele?this.ele.addClass('margin-left-100'):null;
	
	
	//setTimeout(function(){
		this.ele?this.ele.hide():null;
	//},300)

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
		function loadingShow(){
			$('.loading-container').show();
		}
		function loadingHide(){
			$('.loading-container').hide()
		}
		var needLoginFromHash='';
		return{
			getCookie:getCookie,
			setCookie:setCookie,
			clearCookie:clearCookie,
			loadingShow:loadingShow,
			loadingHide:loadingHide,
			needLoginFromHash:needLoginFromHash
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
				tool.needLoginFromHash=window.location.hash;
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

var	detail=(function(){
		var detail_page=new common_page({
			id:'article-container',
			content:
				'<h4 class="header"></h4>'+
				'<div class="content">'+
					'<div></div>'+
				'</div>'
			
		});

		$('#article-container a').removeAttr('href').click(function(){
						history.go(-1);
					})

		function router_u(){
			Q.reg('u',function(L){
				tool.loadingShow();
			    $.get("/u?q="+L.match(/\d+/g), function(data){
					//console.log(JSON.parse(data))
					//var data=JSON.parse(data);
					//console.log(data.title);

					detail_page.show();
					$('#article-container .header').text(data.title);
					$('#article-container .content  div').html(data.content);
					tool.loadingHide();
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
				
				getScore_page.show();
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					tool.loadingShow();
					getScoreAndSetTr();
				}
				
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

					tool.loadingHide();
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
					tool.loadingShow();
					
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
					tool.loadingHide();
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
					tool.loadingShow();
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
						//console.log(data)
						$('#gymCount').html(data);
//					}
						tool.loadingHide();
					
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
					tool.loadingShow();
					getCourseAndSetTr();
					

				}	

			});
		}
		function getCourseAndSetTr(term){
			$.post('/getCourse',function(data){
					$('#course').html(data);
					tool.loadingHide();	
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
		var loginedContent='<div id="logined-bir">'+
		'<h3 class="header">'+
				'你的出生年月日是<span id="birthday"></span>'+
			'</h3>'+
			'<h4>'+
				'全校一共有<span id="sameBirNum">0</span>个跟你同年同月同日生'+
			'</h4>'+
			'<div class="row">'+
      			'<div class="col s12 m5">'+
        			'<div class="card-panel">'+
        				'<h5>下面是跟你同年同月同日生的且公开自己信息的人</h5>'+
          				'<table id="share-info">'+

          				'</table>'+
          				
        			'</div>'+
      			'</div>'+
    		'</div>'+
    		'<form >'+
				'<div class="input-field col s6">'+
						'<input id="contact" type="text"  class="validate">'+
						'<label for="contact">联系方式</label>'+
						'<p>当然你可以选择不留，直接提交，那样只会显示你的姓名，学号。</p>'+
					'</div>'+
					'<button class="btn waves-effect waves-light" type="button" name="action" id="share">'+
				'我来共享'+
				'</button>'+
			'</from>'+	
			'<div class="row">'+
      			'<div class="col s12 m5">'+
        			'<div class="card-panel">'+
        				'<h5>免责声明</h5>'+
          				'<span class="">所有信息都是私密的不会公开（除非你同意公开），同时maiff通过合法手段用大量爬虫爬取的数据得到的结果。</span>'+
        			'</div>'+
      			'</div>'+
    		'</div>'+
    		'<!-- JiaThis Button BEGIN --><div class="jiathis_style_m"></div><script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_m.js" charset="utf-8"></script><!-- JiaThis Button END -->'+
    		'</div>'+
    		'<div id="noLogin-bir">'+
    			'<h5>'+
						'用教务处的账号密码登录，可以查看全校和你同年同月同日生的人的个数，当然你可以选择共享你的信息，让你们找到对方，快来登录吧。'+
				'</h5>'+
				'<a href="#!login">立即去登陆</a>'
    		'</div>'



		var getHowMuchBirSame_page=new common_page({
			id:'birSame-container',
			content:loginedContent
			
		})

		function router_sameBir(){
			Q.reg('sameBir',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp. isLogined()){
					getHowMuchBirSame_page.show();
					tool.loadingShow();
					$('#logined-bir').show();
					$('#noLogin-bir').hide();
					getBirAndSet(tool.getCookie('id'));
					
				}else{
					tool.needLoginFromHash=window.location.hash;
					getHowMuchBirSame_page.show();
					//alert(('#birSame-container container').text())
					$('#logined-bir').hide();
					$('#noLogin-bir').show();
				}	

			});
		}
		function getBirAndSet(studentNo){
			$.ajax({
					type:'post',
					url:'/getSameBirth',
					data:{
						'studentNo':studentNo,
									},
					success:function(data){
						console.log(data)
						var base_info=data.base_info;
						$('#birthday').text(base_info.birthday);
						$('#sameBirNum').text(Number(base_info.count)-1);

						$('#share-info').html('不好意思目前没人共享信息，赶紧把为这个网页共享出去，让大家都参与进来，祝你早日找到那么有缘的人。');
						var detail_info=data.detail_info;
						if(detail_info.length!=0){
							var str='';
							for(var i=0;i<detail_info.length;i++){
								 str='<tr><td>'+detail_info[i].name+'</td><td>'+detail_info[i].studentNo+'</td><td>'+detail_info[i].contact+'</td><tr>';
							}  
							$('#share-info').html();
							$('#share-info').html(str);

						}
						tool.loadingHide();
				}

			});	
		};
		$('#share').click(function(){
				$.ajax({
					type:'post',
					url:'/postShare',
					data:{
						'studentNo':tool.getCookie('id')
					},
					success:function(data){
						//console.log(data);

						Materialize.toast('分享成功', 4000);
						$('#login').attr('disable','false');
					}
				});
				$.ajax({
					type:'post',
					url:'/postContact',
					data:{
						'studentNo':tool.getCookie('id'),
						'contact':$('#contact').val()
					},
					success:function(data){
						//console.log(data);

						//Materialize.toast('分享成功', 4000);
						$('#login').attr('disable','false');
					}
				})
				$(this).attr('disable','true');
			});	

		
		return{
			router_sameBir:router_sameBir
		}

})();

//                    					'不好意思目前没人共享信息，赶紧把为这个网页共享出去，让大家都参与进来，祝你早日找到那么有缘的人。'+
//					'<tr><th>向王涛<td><td>141320231</td></tr>'+

var getStuInfo=(
	function(){
		var getStuInfo_page=new common_page({
			id:'score-container',
			content:'<h2 class="header">'+
				'本学期成绩'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="SELECT" type="text" class="validate" name="SELECT">'+
	      			'<label for="SELECT">查询子段</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<input id="s_value" type="text" class="validate" name="s_value">'+
	      			'<label for="s_value">查询值</label>'+
				'</div>'+
				'<div class="input-field col s6">'+
	      			'<input id="get_info_SELECT" type="text" class="validate" name="get_info_SELECT">'+
	      			'<label for="get_info_SELECT">想要得到的字段值</label>'+
				'</div>'+
				'<button class="btn waves-effect waves-light" type="button" name="action" id="getStuInfo_btn">'+
					'提交'+
				'</button>'+
			'</from>'+
			'<table class="striped" id="getStuInfo_table">'+
              '<thead>'+
                '<tr>'+
                    '<th >SELECT</th>'+
                    '<th >s_value</th>'+
                    '<th >get_info_SELECT</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody></tbody>'+
            '</table>'
		})

		function router_getStuInfo(){
			Q.reg('getStuInfo',function(){
				ahelp.noLoginToLogin();
				getStuInfo_page.show();
				$('.button-collapse').sideNav('hide');
				// tool.loadingShow();
				$('#getStuInfo_btn').click(function(){
					tool.loadingShow();
					getValueAndSet()
				})
				
			});
		}
		function getValueAndSet(){
			$.ajax({
					type:'post',
					url:'/getStuInfo',
					data:{
						'SELECT':$('#SELECT').val(),
						'value':$('#s_value').val(),
						'get_info_SELECT':$('#get_info_SELECT').val()
					},
					success:function(data){
						var data=JSON.parse(data);
						console.log(data);
						tool.loadingHide();
						dealData(data);
						//data.length>1?loginSuccess(data,isLogin_30):loginFail();
					}
				})

		};
		function dealData(data){
			//[{"studentNo":"141320231","name":"向王涛","IDCard":"342501199606272612"}]
			//var thList=$('#getStuInfo_table tr th');
			//JSON.parse(data)[0]
			//console.log(JSON.parse(data)[0])
			var count=0;
			for(var i in data[0]){
				console.log(data[0])
				$('#getStuInfo_table tr th').eq(count).text(i);
				count++;
			}
			var str='';
			for(var l=0;l<data.length;l++){
				var sub_str='';
				for(var k in data[l]){
					sub_str+='<td>'+data[l][k]+'</td>'


				}
				str+=('<tr>'+sub_str+'</tr>');
			}
			$('#getStuInfo_table tbody').html(str);


		}		
		
		return{
			router_getStuInfo:router_getStuInfo
		}

})();
var getDown=(
	function(){
		var getDown_page=new common_page({
			id:'down-container',
			content:'<h2 class="header">'+
				'学生下载:'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
          			'<input id="detail_key" type="text" class="validate" name="q">'+
          			'<label for="detail_key">输入查找的字段</label>'+
          		'</div>'+
          		'<button class="btn waves-effect waves-light" type="button" name="action" id="deail-search">'+
    				'查询'+
				'</button>'+
		  	'</from>'+
			'<ul class="down-collection collection">'+
			       //  '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			'</ul>'
		})

		function router_down(){
			Q.reg('getDown',function(){
				
				getDown_page.show();
				$('.button-collapse').sideNav('hide');
					tool.loadingShow();
					getDownAndSetTr();				
			});
		}
		$('#deail-search').click(function(){
			tool.loadingShow();
			$.post('./byKeyGetDetail',{q:$('#detail_key').val()},function(data){
				console.log(typeof data);
				var liList=$('.down-collection');
				if(data.length!=0){
					liList.html('');
					var len=data.length;
					for(var i=0;i<len;i++){
					  		var li=$('<li>')
					  		var a=$('<a>').attr('href','#!u/'+data[i].link).addClass('collection-item waves-effect waves-teal');
					  		a.html(data[i].title+'<span>'+'</span>');
					  		li.append(a);
					  		liList.append(li);
					  		//$(liList[i]).children().attr('href','#!u/'+data[i].link);
					  		//$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
					}
				}else{
					liList.html('没有找到相关内容～');
				}
				tool.loadingHide();
			});
		})
		function getDownAndSetTr(){
			$.get("/getDownCatalog", function(data){
				  console.log(typeof data);
				  var liList=$('.down-collection');
				  var len=data.length;
				  for(var i=0;i<len;i++){
				  		var li=$('<li>')
				  		var a=$('<a>').attr('href','#!u/'+data[i].link).addClass('collection-item waves-effect waves-teal');
				  		a.html(data[i].text+'<span>'+data[i].time+'</span>');
				  		li.append(a);
				  		liList.append(li);
				  		//$(liList[i]).children().attr('href','#!u/'+data[i].link);
				  		//$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
				  }
				  tool.loadingHide();
				});
					
		}		
		
		return{
			router_down:router_down
		}

})();

var	maiff_detail=(function(){
		var maiff_detail_page=new common_page({
			id:'maiff_article-container',
			content:
				'<h4 class="header"></h4>'+
				'<div class="content">'+
					'<div></div>'+
				'</div>'
			
		});


		function router_m(){
			Q.reg('m',function(L){
				console.log(L)
				tool.loadingShow();
			    $.get("/m?q="+L, function(data){
					//console.log(JSON.parse(data))
					//var data=JSON.parse(data);
					console.log(data);

					maiff_detail_page.show();
					$('#maiff_article-container .header').text(data.title);
					$('#maiff_article-container .content  div').html(data.content);
					tool.loadingHide();
				});

			});
		}
		
		

		return{
			router_m:router_m
		}
	})();


var maiffArticle=(
	function(){
		var maiffArticle_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'来写你的内容吧～'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="maiff-title" type="text" class="validate">'+
	      			'<label for="maiff-title">title</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<textarea id="maiff-textarea" class="materialize-textarea"></textarea>'+
	      			'<label for="maiff-textarea">来写你的内容吧</label>'+
				'</div>'+
				
				'<button class="btn waves-effect waves-light" type="button" name="action" id="newMaiff">'+
					'提交'+
					'</button>'+
			'</from>'
		})

		function router_maiffArticle(){
			Q.reg('newA',function(){
				$('.button-collapse').sideNav('hide');
				maiffArticle_page.show();

			});
			$('#newMaiff').click(function(){
				
				if(textareaIsEmpty()){
					Materialize.toast('反馈内容不能为空！', 4000);
				}else{
					$(this).attr('disabled','true');
					$.ajax({
						type:'post',
						url:'./newMaiffArticle',
						data:{
							'title':$('#maiff-title').val(),
							'content':$('#maiff-textarea').val()
						},
						success:function(data){
							Materialize.toast('写成功了~', 4000);
							$('#feedback').removeAttr('disabled');
							window.location='#!home';
								
						}
					})
				}
				
				
			});		
		}
		function textareaIsEmpty(){
			return $('#maiff-textarea').val()==''?true:false;
		}
		
		return{
			router_maiffArticle:router_maiffArticle
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
		getStuInfo.router_getStuInfo();
		getDown.router_down();
		maiff_detail.router_m();
		maiffArticle.router_maiffArticle();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInEuanMiLCJvYmplY3QtY29tbW9uUGFnZS5qcyIsInRvb2wuanMiLCJhamF4LWhlbHAuanMiLCJob21lLWluZm9ybWF0aW9uLmpzIiwibG9naW4uanMiLCJkZXRhaWwtaW5mb3JtYXRpb24uanMiLCJnZXRTY29yZS5qcyIsImdldENvdXJzZVRhYmxlLmpzIiwiZ2V0R3ltQ291bnQuanMiLCJnZXRDb3Vyc2UuanMiLCJmZWVkYmFjay5qcyIsImdldEhvd011Y2hCaXJTYW1lLmpzIiwiZ2V0U3R1SW5mby5qcyIsImdldERvd24uanMiLCJtYWlmZi1kZXRhaWwtaW5mb3JtYXRpb24uanMiLCJuZXdNYWlmZkFydGljbGUuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFxyXG5RPWZ1bmN0aW9uKFcsRCxNLEhUTUwsaGFzaCx2aWV3LGFyZyxMTCxpLGluZGV4LFJlZ2V4LGtleSxRKXtcclxuXHRIVE1MPUQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXTtcclxuXHRSZWdleD1bXTtcclxuXHRrZXk9JyEnO1xyXG5cdG9uaGFzaGNoYW5nZT1mdW5jdGlvbigpe1xyXG5cdFx0US5oYXNoPWhhc2g9bG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoa2V5Lmxlbmd0aCsxKTtcclxuXHJcblx0XHRhcmc9aGFzaC5zcGxpdCgnLycpO1xyXG5cclxuXHRcdGk9UmVnZXgubGVuZ3RoO1xyXG5cdFx0d2hpbGUoaS0tKVxyXG5cdFx0XHRpZihMTD1oYXNoLm1hdGNoKFJlZ2V4W2ldKSl7XHJcblx0XHRcdFx0YXJnWzBdPVJlZ2V4W2ldO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYoIVFbYXJnWzBdXSlcclxuXHRcdFx0YXJnWzBdPWluZGV4O1xyXG5cdFx0XHJcblx0XHRpZihRLnBvcClcclxuXHRcdFx0US5wb3AuYXBwbHkoVyxhcmcpO1xyXG5cclxuXHRcdFEubGFzaD12aWV3PWFyZy5zaGlmdCgpO1xyXG5cclxuXHRcdEhUTUwuc2V0QXR0cmlidXRlKCd2aWV3Jyx2aWV3KTtcclxuXHJcblx0XHRRW3ZpZXddLmFwcGx5KFcsYXJnKTtcclxuXHR9O1xyXG5cdFE9e1xyXG5cdFx0aW5pdDpmdW5jdGlvbihvKXtcclxuXHJcblx0XHRcdGlmKG8ua2V5IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdGtleT1vLmtleTtcclxuXHJcblx0XHRcdGluZGV4PW8uaW5kZXh8fCdWJztcclxuXHJcblx0XHRcdGlmKG8ucG9wJiZ0eXBlb2Ygby5wb3A9PSdmdW5jdGlvbicpXHJcblx0XHRcdFx0US5wb3A9by5wb3A7XHJcblxyXG5cdFx0XHRvbmhhc2hjaGFuZ2UoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0cmVnOmZ1bmN0aW9uKHIsdSl7XHJcblx0XHRcdGlmKCFyKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdGlmKHUgPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHU9ZnVuY3Rpb24oKXt9O1xyXG5cclxuXHRcdFx0aWYociBpbnN0YW5jZW9mIFJlZ0V4cCl7XHJcblx0XHRcdFx0UVtyXT11O1xyXG5cdFx0XHRcdFJlZ2V4LnB1c2gocik7XHJcblx0XHRcdH1lbHNlIGlmKHIgaW5zdGFuY2VvZiBBcnJheSl7Ly/mlbDnu4Tms6jlhoxcclxuXHRcdFx0XHRmb3IodmFyIGkgaW4gcil7XHJcblx0XHRcdFx0XHRMPVtdLmNvbmNhdChyW2ldKS5jb25jYXQodSk7XHJcblx0XHRcdFx0XHR0aGlzLnJlZy5hcHBseSh0aGlzLEwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UgaWYodHlwZW9mIHI9PSdzdHJpbmcnKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgdT09J2Z1bmN0aW9uJylcclxuXHRcdFx0XHRcdFFbcl09dTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiB1PT0nc3RyaW5nJyYmUVt1XSlcclxuXHRcdFx0XHRcdFFbcl09UVt1XTtcclxuXHRcdFx0fVx0XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fSxcclxuXHRcdFY6ZnVuY3Rpb24oKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1EuanMgPGh0dHBzOi8vZ2l0aHViLmNvbS9pdG9yci9xLmpzPiAyMDE0LzEyLzI4Jyk7XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0Z286ZnVuY3Rpb24odSl7XHJcblx0XHRcdGxvY2F0aW9uLmhhc2g9JyMnK2tleSt1O1xyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIFE7XHJcbn0odGhpcyxkb2N1bWVudCk7IiwidmFyIGNvbW1vbl9wYWdlX25vd19zaG93PXtcclxuXHRlbGU6bnVsbFxyXG59O1xyXG5jb21tb25fcGFnZV9ub3dfc2hvdy5wdXNoPWZ1bmN0aW9uKG5vd19zaG93KXtcclxuXHR0aGlzLmVsZT1ub3dfc2hvdztcclxufTtcclxuY29tbW9uX3BhZ2Vfbm93X3Nob3cuc2hvdz1mdW5jdGlvbigpe1xyXG5cdC8vdGhpcy5lbGU/dGhpcy5lbGUucmVtb3ZlQ2xhc3MoJ21hcmdpbi1sZWZ0LTEwMCcpOm51bGw7XHJcblx0Ly92YXIgdGhhdD10aGlzO1xyXG5cdC8vc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGU/dGhpcy5lbGUuc2hvdygpOm51bGw7XHJcblx0Ly99LDMwMClcclxuXHJcbn07XHJcbmNvbW1vbl9wYWdlX25vd19zaG93LmhpZGU9ZnVuY3Rpb24oKXtcclxuXHQvL3RoaXMuZWxlP3RoaXMuZWxlLmFkZENsYXNzKCdtYXJnaW4tbGVmdC0xMDAnKTpudWxsO1xyXG5cdFxyXG5cdFxyXG5cdC8vc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5lbGU/dGhpcy5lbGUuaGlkZSgpOm51bGw7XHJcblx0Ly99LDMwMClcclxuXHJcbn1cclxuXHJcbnZhciBjb21tb25fcGFnZT1mdW5jdGlvbihvYmope1xyXG5cdHRoaXMuX21haW49JCgnPGRpdj4nLHtcclxuXHRcdCdjbGFzcyc6J2FsbCcsXHJcblx0XHQnaWQnOm9iai5pZFxyXG5cdH0pO1xyXG5cdHZhciBtYWluX25hdj0nPG5hdiA+JytcclxuXHQnPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPicrXHJcblx0XHQnPGEgaHJlZj1cIiMhaG9tZVwiPicrXHJcblx0XHRcdCc8aW1nIHNyYz1cIi4vcHVibGljL2ltZy9hcnJvdy5wbmdcIiBjbGFzcz1cInJldHVyblwiID4nK1xyXG5cdFx0JzwvYT4nK1xyXG5cdCc8L2Rpdj4nK1xyXG5cdCc8L25hdj4nXHJcblx0dGhpcy5fbWFpbi5odG1sKG1haW5fbmF2KTtcclxuXHRcclxuXHQkKCc8ZGl2Picse1xyXG5cdFx0J2NsYXNzJzonY29udGFpbmVyJ1xyXG5cdH0pLmh0bWwob2JqLmNvbnRlbnQpXHJcblx0LmFwcGVuZFRvKHRoaXMuX21haW4pO1xyXG5cclxuXHR0aGlzLl9tYWluLmFwcGVuZFRvKCdib2R5Jyk7XHJcbn07XHJcblxyXG5jb21tb25fcGFnZS5wcm90b3R5cGUuc2hvdz1mdW5jdGlvbigpe1xyXG5cdGNvbW1vbl9wYWdlX25vd19zaG93LmhpZGUoKTtcclxuXHRjb21tb25fcGFnZV9ub3dfc2hvdy5wdXNoKHRoaXMuX21haW4pO1xyXG5cdGNvbW1vbl9wYWdlX25vd19zaG93LnNob3coKTtcclxufTsiLCJ2YXIgdG9vbD0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIGdldENvb2tpZShjX25hbWUpXHJcblx0XHR7XHJcblx0XHRpZiAoZG9jdW1lbnQuY29va2llLmxlbmd0aD4wKVxyXG5cdFx0ICB7XHJcblx0XHQgIGNfc3RhcnQ9ZG9jdW1lbnQuY29va2llLmluZGV4T2YoY19uYW1lICsgXCI9XCIpXHJcblx0XHQgIGlmIChjX3N0YXJ0IT0tMSlcclxuXHRcdCAgICB7IFxyXG5cdFx0ICAgIGNfc3RhcnQ9Y19zdGFydCArIGNfbmFtZS5sZW5ndGgrMSBcclxuXHRcdCAgICBjX2VuZD1kb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIixjX3N0YXJ0KVxyXG5cdFx0ICAgIGlmIChjX2VuZD09LTEpIGNfZW5kPWRvY3VtZW50LmNvb2tpZS5sZW5ndGhcclxuXHRcdCAgICByZXR1cm4gdW5lc2NhcGUoZG9jdW1lbnQuY29va2llLnN1YnN0cmluZyhjX3N0YXJ0LGNfZW5kKSlcclxuXHRcdCAgICB9IFxyXG5cdFx0ICB9XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRDb29raWUoY19uYW1lLHZhbHVlLGV4cGlyZWRheXMpe1xyXG5cdFx0XHR2YXIgZXhkYXRlPW5ldyBEYXRlKClcclxuXHRcdFx0ZXhkYXRlLnNldERhdGUoZXhkYXRlLmdldERhdGUoKStleHBpcmVkYXlzKVxyXG5cdFx0XHRkb2N1bWVudC5jb29raWU9Y19uYW1lKyBcIj1cIiArZXNjYXBlKHZhbHVlKStcclxuXHRcdFx0KChleHBpcmVkYXlzPT1udWxsKSA/IFwiXCIgOiBcIjtleHBpcmVzPVwiK2V4ZGF0ZS50b0dNVFN0cmluZygpKVxyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gY2xlYXJDb29raWUoKXsgXHJcblx0XHRcdHZhciBrZXlzPWRvY3VtZW50LmNvb2tpZS5tYXRjaCgvW14gPTtdKyg/PVxcPSkvZyk7IFxyXG5cdFx0XHRpZiAoa2V5cykgeyBcclxuXHRcdFx0XHRmb3IgKHZhciBpID0ga2V5cy5sZW5ndGg7IGktLTspIFxyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuY29va2llPWtleXNbaV0rJz0wO2V4cGlyZXM9JyArIG5ldyBEYXRlKCAwKS50b1VUQ1N0cmluZygpIFxyXG5cdFx0XHR9IFxyXG5cdFx0fSBcclxuXHRcdGZ1bmN0aW9uIGxvYWRpbmdTaG93KCl7XHJcblx0XHRcdCQoJy5sb2FkaW5nLWNvbnRhaW5lcicpLnNob3coKTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGxvYWRpbmdIaWRlKCl7XHJcblx0XHRcdCQoJy5sb2FkaW5nLWNvbnRhaW5lcicpLmhpZGUoKVxyXG5cdFx0fVxyXG5cdFx0dmFyIG5lZWRMb2dpbkZyb21IYXNoPScnO1xyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRnZXRDb29raWU6Z2V0Q29va2llLFxyXG5cdFx0XHRzZXRDb29raWU6c2V0Q29va2llLFxyXG5cdFx0XHRjbGVhckNvb2tpZTpjbGVhckNvb2tpZSxcclxuXHRcdFx0bG9hZGluZ1Nob3c6bG9hZGluZ1Nob3csXHJcblx0XHRcdGxvYWRpbmdIaWRlOmxvYWRpbmdIaWRlLFxyXG5cdFx0XHRuZWVkTG9naW5Gcm9tSGFzaDpuZWVkTG9naW5Gcm9tSGFzaFxyXG5cdFx0fVxyXG59KSgpOyIsInZhciBhaGVscD0oZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIHNldFVzZXJJZChjb29raWUsdGltZSl7XHJcblx0XHRcdHZhciBpbmRleD1jb29raWVbMF0uaW5kZXhPZignPScpKzE7XHJcblx0XHRcdHZhciBsZW49Y29va2llWzBdLmxlbmd0aDtcclxuXHJcblx0XHRcdHRvb2wuc2V0Q29va2llKCd1c2VyaWQnLGNvb2tpZVswXS5zbGljZShpbmRleCxsZW4pLHRpbWUpO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gc2V0bG9naW5uYW1lKGNvb2tpZSx0aW1lKXtcclxuXHRcdFx0dmFyIGluZGV4PWNvb2tpZVsyXS5pbmRleE9mKCc9JykrMTtcclxuXHRcdFx0dmFyIGxlbj1jb29raWVbMl0ubGVuZ3RoO1xyXG5cclxuXHRcdFx0dG9vbC5zZXRDb29raWUoJ2xvZ2lubmFtZScsY29va2llWzJdLnNsaWNlKGluZGV4LGxlbikudHJpbSgpLHRpbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzTG9naW5lZCgpe1xyXG5cdFx0XHRyZXR1cm4gdG9vbC5nZXRDb29raWUoJ3VzZXJpZCcpP3RydWU6ZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbm9Mb2dpblRvTG9naW4oKXtcclxuXHRcdFx0aWYoIWlzTG9naW5lZCgpKXtcclxuXHRcdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn6K+355m75b2VIScsIDQwMDApO1xyXG5cdFx0XHRcdHRvb2wubmVlZExvZ2luRnJvbUhhc2g9d2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWxvZ2luJztcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHNldFVzZXJJZDpzZXRVc2VySWQsXHJcblx0XHRcdHNldGxvZ2lubmFtZTpzZXRsb2dpbm5hbWUsXHJcblx0XHRcdGlzTG9naW5lZDppc0xvZ2luZWQsXHJcblx0XHRcdG5vTG9naW5Ub0xvZ2luOm5vTG9naW5Ub0xvZ2luXHJcblx0XHR9XHJcbn0pKCk7XHJcblxyXG4iLCJ2YXIgaG9tZT0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9ob21lKCl7XHJcblx0XHRcdFEucmVnKCdob21lJyxmdW5jdGlvbigpe1xyXG5cclxuXHRcdFx0XHRjb21tb25fcGFnZV9ub3dfc2hvdy5oaWRlKCk7XHJcblx0XHRcdFx0Y29tbW9uX3BhZ2Vfbm93X3Nob3cucHVzaCgkKCcjbWFpbi1jb250YWluZXInKSk7XHJcblx0XHRcdFx0Y29tbW9uX3BhZ2Vfbm93X3Nob3cuc2hvdygpO1x0XHJcblxyXG5cdFx0XHRcdGlmKGFoZWxwLmlzTG9naW5lZCgpKXtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5uYW1lJykudGV4dCh0b29sLmdldENvb2tpZSgndXNlcm5hbWUnKSkucGFyZW50KCkuYXR0cignaHJlZicsJyMnKTtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJycpLnBhcmVudCgpLm9mZignY2xpY2snKTtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJ+mAgOWHuueZu+W9lScpLnBhcmVudCgpLmNsaWNrKGxvZ2lub3V0KTtcclxuXHRcdFx0XHRcdGlmKHRvb2wuZ2V0Q29va2llKCdpZCcpPT0xNDEzMjAyMzEpe1xyXG5cdFx0XHRcdFx0XHQkKCcjbmF2LW1vYmlsZScpLmFwcGVuZCgnPGxpPjxhIGhyZWY9XCIjIWdldFN0dUluZm9cIj48L2E+PC9saT4nKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gJCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgn6YCA5Ye655m75b2VJykucGFyZW50KCkuY2xpY2sobG9naW5vdXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLm5hbWUnKS50ZXh0KCfor7fnmbvlvZUnKS5wYXJlbnQoKS5hdHRyKCdocmVmJywnIyFsb2dpbicpO1xyXG5cdFx0XHRcdFx0JCgnI25hdi1tb2JpbGUgYSBzcGFuLmxvZ2lub3V0JykudGV4dCgnJykucGFyZW50KCkub2ZmKCdjbGljaycpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHJcblx0XHRcdCQuZ2V0KFwiL2hvbWVcIiwgZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdCAgY29uc29sZS5sb2coIGRhdGEpO1xyXG5cdFx0XHQgIHZhciBsaUxpc3Q9JCgnLmhvbWUtY29sbGVjdGlvbiBsaScpO1xyXG5cdFx0XHQgIHZhciBsZW49bGlMaXN0Lmxlbmd0aDtcclxuXHRcdFx0ICBmb3IodmFyIGk9MDtpPGxlbjtpKyspe1xyXG5cdFx0XHQgIFx0JChsaUxpc3RbaV0pLmNoaWxkcmVuKCkuYXR0cignaHJlZicsJyMhdS8nK2RhdGFbaV0ubGluayk7XHJcblx0XHRcdCAgXHQkKGxpTGlzdFtpXSkuY2hpbGRyZW4oKS5odG1sKGRhdGFbaV0udGV4dCsnPHNwYW4+JytkYXRhW2ldLnRpbWUrJzwvc3Bhbj4nKTtcclxuXHRcdFx0ICB9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkLmdldChcIi9tYWlmZkluZm9ybWF0aW9uXCIsIGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQgIGNvbnNvbGUubG9nKCBkYXRhKTtcclxuXHRcdFx0ICB2YXIgZGF0YT1KU09OLnBhcnNlKGRhdGEpXHJcblx0XHRcdCAgdmFyIGNvbGxlY3Rpb249JCgnLm1haWZmLWNvbGxlY3Rpb24nKTtcclxuXHRcdFx0ICB2YXIgbGVuPWRhdGEubGVuZ3RoO1xyXG5cdFx0XHQgIGZvcih2YXIgaT0wO2k8bGVuO2krKyl7XHJcblx0XHRcdCAgXHR2YXIgbGk9JCgnPGxpPicpXHJcblx0XHQgIFx0XHR2YXIgYT0kKCc8YT4nKS5hdHRyKCdocmVmJywnIyFtLycrZGF0YVtpXS5faWQpLmFkZENsYXNzKCdjb2xsZWN0aW9uLWl0ZW0gd2F2ZXMtZWZmZWN0IHdhdmVzLXRlYWwnKTtcclxuXHRcdCAgXHRcdGEuaHRtbChkYXRhW2ldLnRpdGxlKyc8c3Bhbj4nK2RhdGFbaV0udGltZSsnPC9zcGFuPicpO1xyXG5cdFx0ICBcdFx0bGkuYXBwZW5kKGEpO1xyXG5cdFx0ICBcdFx0Y29sbGVjdGlvbi5hcHBlbmQobGkpO1xyXG5cdFx0XHQgIH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBsb2dpbm91dCgpe1xyXG5cdFx0XHR0b29sLmNsZWFyQ29va2llKCk7XHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCfpgIDlh7rmiJDlip8nLCA0MDAwKTtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWxvZ2luJztcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWhvbWUnO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9ob21lOnJvdXRlcl9ob21lXHJcblx0XHR9XHJcblxyXG59KSgpOyIsIlxyXG52YXIgbG9naW49KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbG9naW5fcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRcdGlkOidsb2dpbi1jb250YWluZXInLFxyXG5cdFx0XHRcdGNvbnRlbnQ6JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0XHRcdFx0J+ivt+i+k+WFpeaVmeWKoeWkhOi0puWPt+WvhueggeeZu+W9lScrXHJcblx0XHRcdFx0XHRcdCc8L2gyPicrXHJcblx0XHRcdFx0XHRcdCc8Zm9ybSA+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0XHRcdCAgICAgICAgICBcdFx0XHQnPGlucHV0IGlkPVwidXNlbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5hbWU9XCJ1c2VuYW1lXCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwidXNlbmFtZVwiPuWtpuWPtzwvbGFiZWw+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHQnPC9kaXY+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0XHRcdCAgICAgICAgICBcdFx0XHQnPGlucHV0IGlkPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cInBhc3N3b3JkXCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj7mlZnliqHlpITlr4bnoIE8L2xhYmVsPicrXHJcblx0XHQgICAgICAgIFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0ICAgICAgICBcdFx0XHQnIDxwPicrXHJcbiAgICAgIFx0XHRcdFx0XHRcdFx0JzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImlzU2F2ZUxvZ2luXCIgLz4nK1xyXG4gICAgICBcdFx0XHRcdFx0XHRcdCc8bGFiZWwgZm9yPVwiaXNTYXZlTG9naW5cIj4zMOWkqeiusOS9j+aIkTwvbGFiZWw+JytcclxuICAgIFx0XHRcdFx0XHRcdCc8L3A+JytcclxuXHRcdCAgICAgICAgXHRcdFx0JzxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhY3Rpb25cIiBpZD1cImxvZ2luXCI+JytcclxuXHRcdCAgICAgICAgXHRcdFx0XHQn55m75b2VJytcclxuXHRcdCAgXHRcdFx0XHRcdCc8L2J1dHRvbj4nK1xyXG5cdFx0ICBcdFx0XHRcdCc8L2Zyb20+J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX2xvZ2luKCl7XHJcblx0XHRcdFEucmVnKCdsb2dpbicsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRsb2dpbl9wYWdlLnNob3coKTtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdCQoJyNsb2dpbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIGlzTG9naW5fMzA9JCgnI2lzU2F2ZUxvZ2luJykucHJvcCgnY2hlY2tlZCcpO1xyXG5cdFx0XHRcdHRvb2wubG9hZGluZ1Nob3coKTtcclxuXHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZToncG9zdCcsXHJcblx0XHRcdFx0XHR1cmw6Jy9sb2dpbicsXHJcblx0XHRcdFx0XHRkYXRhOntcclxuXHRcdFx0XHRcdFx0J3VzZW5hbWUnOiQoJyN1c2VuYW1lJykudmFsKCksXHJcblx0XHRcdFx0XHRcdCdwYXNzd29yZCc6JCgnI3Bhc3N3b3JkJykudmFsKClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcblx0XHRcdFx0XHRcdGRhdGEubGVuZ3RoPjE/bG9naW5TdWNjZXNzKGRhdGEsaXNMb2dpbl8zMCk6bG9naW5GYWlsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGUnLCd0cnVlJyk7XHJcblx0XHRcdH0pO1x0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGxvZ2luU3VjY2Vzcyhjb29raWUsaXNfMzApe1xyXG5cdFx0XHR2YXIgdGltZT1pc18zMD8zMDpudWxsO1xyXG5cdFx0XHR0b29sLnNldENvb2tpZSgnaWQnLCQoJyN1c2VuYW1lJykudmFsKCksdGltZSk7XHJcblx0XHRcdFxyXG5cdFx0XHR0b29sLmxvYWRpbmdIaWRlKCk7XHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCfnmbvlvZXmiJDlip8nLCA0MDAwKTtcclxuXHRcdFx0YWhlbHAuc2V0VXNlcklkKGNvb2tpZSx0aW1lKTtcclxuXHRcdFx0YWhlbHAuc2V0bG9naW5uYW1lKGNvb2tpZSx0aW1lKTtcclxuXHJcblx0XHRcdCQucG9zdCgnL2dldE5hbWUnLGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHR0b29sLnNldENvb2tpZSgndXNlcm5hbWUnLGRhdGEsdGltZSk7XHJcblx0XHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5uYW1lJykudGV4dChkYXRhKS5wYXJlbnQoKS5hdHRyKCdocmVmJywnIycpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdCQoJyNsb2dpbicpLmF0dHIoJ2Rpc2FibGUnLCdmYWxzZScpO1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb249dG9vbC5uZWVkTG9naW5Gcm9tSGFzaHx8JyMhaG9tZSc7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBsb2dpbkZhaWwoKXtcclxuXHRcdFx0XHRcdFx0dG9vbC5sb2FkaW5nSGlkZSgpO1xyXG5cdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn55m75b2V5aSx6LSlJywgNDAwMCk7XHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9sb2dpbjpyb3V0ZXJfbG9naW5cclxuXHRcdH1cclxuXHJcbn0pKCk7IiwiXHJcbnZhclx0ZGV0YWlsPShmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRldGFpbF9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidhcnRpY2xlLWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6XHJcblx0XHRcdFx0JzxoNCBjbGFzcz1cImhlYWRlclwiPjwvaDQ+JytcclxuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK1xyXG5cdFx0XHRcdFx0JzxkaXY+PC9kaXY+JytcclxuXHRcdFx0XHQnPC9kaXY+J1xyXG5cdFx0XHRcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNhcnRpY2xlLWNvbnRhaW5lciBhJykucmVtb3ZlQXR0cignaHJlZicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGhpc3RvcnkuZ28oLTEpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfdSgpe1xyXG5cdFx0XHRRLnJlZygndScsZnVuY3Rpb24oTCl7XHJcblx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xyXG5cdFx0XHQgICAgJC5nZXQoXCIvdT9xPVwiK0wubWF0Y2goL1xcZCsvZyksIGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhKU09OLnBhcnNlKGRhdGEpKVxyXG5cdFx0XHRcdFx0Ly92YXIgZGF0YT1KU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhkYXRhLnRpdGxlKTtcclxuXHJcblx0XHRcdFx0XHRkZXRhaWxfcGFnZS5zaG93KCk7XHJcblx0XHRcdFx0XHQkKCcjYXJ0aWNsZS1jb250YWluZXIgLmhlYWRlcicpLnRleHQoZGF0YS50aXRsZSk7XHJcblx0XHRcdFx0XHQkKCcjYXJ0aWNsZS1jb250YWluZXIgLmNvbnRlbnQgIGRpdicpLmh0bWwoZGF0YS5jb250ZW50KTtcclxuXHRcdFx0XHRcdHRvb2wubG9hZGluZ0hpZGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRcclxuXHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl91OnJvdXRlcl91XHJcblx0XHR9XHJcblx0fSkoKTtcclxuXHJcbiIsInZhciBnZXRTY29yZT0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBnZXRTY29yZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidzY29yZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50Oic8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/miJDnu6knK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwic3RyaXBlZCBcIj4nK1xyXG4gICAgICAgICAgICAgICc8dGhlYWQ+JytcclxuICAgICAgICAgICAgICAgICc8dHI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHRoID7or77nqIvlkI3np7A8L3RoPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzx0aCA+5a2m5YiGPC90aD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8dGggPuaIkOe7qTwvdGg+JytcclxuICAgICAgICAgICAgICAgICc8L3RyPicrXHJcbiAgICAgICAgICAgICAgJzwvdGhlYWQ+JytcclxuICAgICAgICAgICAgICAnPHRib2R5PjwvdGJvZHk+JytcclxuICAgICAgICAgICAgJzwvdGFibGU+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfc2NvcmUoKXtcclxuXHRcdFx0US5yZWcoJ3Njb3JlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGdldFNjb3JlX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0aWYoYWhlbHAubm9Mb2dpblRvTG9naW4oKSl7XHJcblx0XHRcdFx0XHR0b29sLmxvYWRpbmdTaG93KCk7XHJcblx0XHRcdFx0XHRnZXRTY29yZUFuZFNldFRyKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldFNjb3JlQW5kU2V0VHIoKXtcclxuXHRcdFx0JC5wb3N0KCcvZ2V0U2NvcmUnLGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0dmFyIGNvdXJzZUFycmF5PUpTT04ucGFyc2UoZGF0YSkuc2NvcmVMaXN0czsvL2FycmF5XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyh0eXBlb2YgZGF0YSk7XHJcblx0XHRcdFx0XHR2YXIgc3RyPScnOyBcclxuXHRcdFx0XHRcdGZvcih2YXIgaSBpbiBjb3Vyc2VBcnJheSl7XHJcblx0XHRcdFx0XHRcdHN0cis9Jzx0cj48dGQ+Jytjb3Vyc2VBcnJheVtpXS5uYW1lKyc8L3RkPjx0ZD4nXHJcblx0XHRcdFx0XHRcdCtjb3Vyc2VBcnJheVtpXS5jcmVkaXQrJzwvdGQ+PHRkPidcclxuXHRcdFx0XHRcdFx0K2NvdXJzZUFycmF5W2ldLnNjb3JlKyc8L3RkPjwvdHI+JztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJzEnK3N0cilcclxuXHRcdFx0XHRcdCQoJyNzY29yZS1jb250YWluZXIgdGFibGUgdGJvZHknKS5odG1sKHN0cik7XHJcblxyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nSGlkZSgpO1xyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfc2NvcmU6cm91dGVyX3Njb3JlXHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXRDb3Vyc2VUYWJsZT0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBnZXRDb3Vyc2VUYWJsZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidjb3Vyc2VUYWJsZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50Oic8Zm9ybT4nK1xyXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPicrXHJcbiAgICBcdFx0XHRcdCc8c2VsZWN0IGlkPVwidHJlbVNlbGVjdFwiPicrXHJcbiAgICAgIFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD4yMDE2MjAxN2E8L29wdGlvbj4nK1xyXG4gICAgICBcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMjAxNTIwMTZzXCI+MjAxNTIwMTZzPC9vcHRpb24+JytcclxuICAgICAgXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjIwMTYyMDE3YVwiPjIwMTYyMDE3YTwvb3B0aW9uPicrXHJcbiAgICAgIFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIyMDE2MjAxN3NcIj4yMDE2MjAxN3M8L29wdGlvbj4nK1xyXG4gICAgXHRcdFx0XHQnPC9zZWxlY3Q+JytcclxuICAgIFx0XHRcdFx0XHJcbiAgXHRcdFx0XHQnPC9kaXY+JytcclxuICBcdFx0XHRcdCc8L2Zvcm0+JytcclxuXHRcdFx0JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0J+acrOWtpuacn+ivvuihqCcrXHJcblx0XHRcdCc8L2gyPicrXHJcblx0XHRcdCc8dGFibGUgY2xhc3M9XCIgYm9yZGVyZWRcIiA+JytcclxuICAgICAgICAgICAgICAnPHRib2R5IGlkPVwiY291cnNlVGFibGVcIj48L3Rib2R5PicrXHJcbiAgICAgICAgICAgICc8L3RhYmxlPidcclxuXHRcdH0pXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX2NvdXJzZVRhYmxlKCl7XHJcblx0XHRcdFEucmVnKCdjb3Vyc2VUYWJsZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdGlmKGFoZWxwLm5vTG9naW5Ub0xvZ2luKCkpe1xyXG5cdFx0XHRcdFx0Z2V0Q291cnNlVGFibGVfcGFnZS5zaG93KCk7XHJcblx0XHRcdFx0XHR0b29sLmxvYWRpbmdTaG93KCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGdldENvdXJzZVRhYmxlQW5kU2V0VHIoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JCgnI3RyZW1TZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0Z2V0Q291cnNlVGFibGVBbmRTZXRUcigkKHRoaXMpLnZhbCgpKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldENvdXJzZVRhYmxlQW5kU2V0VHIodGVybSl7XHJcblx0XHRcdCQucG9zdCgnL2dldENvdXJzZVRhYmxlJyx7dHI6dGVybX0sZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKCcjY291cnNlVGFibGUnKS5odG1sKGRhdGEpO1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nSGlkZSgpO1xyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfY291cnNlVGFibGU6cm91dGVyX2NvdXJzZVRhYmxlXHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXRHeW1Db3VudD0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBnZXRHeW1Db3VudF9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidneW1Db3VudC1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50Oic8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/kvZPplLvmg4XlhrUnK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwiIGJvcmRlcmVkXCIgPicrXHJcbiAgICAgICAgICAgICAgJzx0Ym9keSBpZD1cImd5bUNvdW50XCI+PC90Ym9keT4nK1xyXG4gICAgICAgICAgICAnPC90YWJsZT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9neW1Db3VudCgpe1xyXG5cdFx0XHRRLnJlZygnZ3ltQ291bnQnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldEd5bUNvdW50X3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xyXG5cdFx0XHRcdFx0Z2V0R3ltQ291bnRBbmRTZXRUcih0b29sLmdldENvb2tpZSgnaWQnKSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cdFxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBnZXRHeW1Db3VudEFuZFNldFRyKGlkKXtcclxuXHRcdFx0Y29uc29sZS5sb2coaWQpXHJcblx0XHRcdCQucG9zdCgnL2dldEd5bUNvdW50Jyx7c3R1SWQ6aWR9LGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZihkYXRhPT1cIjx0cj48L3RyPjx0cj48L3RyPlwiKXtcclxuXHRcdFx0XHRcdFx0Ly9hbGVydCgxKVxyXG5cdFx0XHRcdFx0XHRkYXRhPSc8dHI+PHRkPuWViuWBtu+8geWPr+iDveS9k+iCsumDqOeahOe9keermeeCuOS6hu+8jOeojeWQjumHjeivlX48L3RkPjwvdHI+J1xyXG5cdFx0XHRcdFx0XHQvLyQoJyNneW1Db3VudCcpLmh0bWwoJzx0cj48dGQ+5ZWK5YG277yB5Y+v6IO95L2T6IKy6YOo55qE572R56uZ54K45LqG77yM56iN5ZCO6YeN6K+VfjwvdGQ+PC90cj4nKTtcclxuXHRcdFx0XHRcdH1cclxuLy9cdFx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdFx0XHQkKCcjZ3ltQ291bnQnKS5odG1sKGRhdGEpO1xyXG4vL1x0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRvb2wubG9hZGluZ0hpZGUoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfZ3ltQ291bnQ6cm91dGVyX2d5bUNvdW50XHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXRDb3Vyc2U9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZ2V0Q291cnNlX3BhZ2U9bmV3IGNvbW1vbl9wYWdlKHtcclxuXHRcdFx0aWQ6J2NvdXJzZVRhYmxlLWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6XHJcblx0XHRcdCc8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/lt7LpgInor77nqIsnK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwiIGJvcmRlcmVkXCIgPicrXHJcblx0XHRcdCAgXHQnPHRoZWFkPicrXHJcblx0XHRcdCAgIFx0XHQnPHRyPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7or77nqIvku6PnoIE8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7or77nqIvlkI3np7A8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7lrabliIY8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7ku7vor77mlZnluIg8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7kuIror77lkajmrKE8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7kuIror77ml7bpl7Q8L3RoPicrXHJcblx0ICAgICAgICAgICAgICAgICAgICAnPHRoID7kuIror77lnLDngrk8L3RoPicrXHJcbiAgICAgICAgICAgICAgICBcdCc8L3RyPicrXHJcbiAgICAgICAgICAgICAgICc8L3RoZWFkPicrXHJcbiAgICAgICAgICAgICAgXHQnPHRib2R5IGlkPVwiY291cnNlXCI+PC90Ym9keT4nK1xyXG4gICAgICAgICAgICAnPC90YWJsZT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9jb3Vyc2UoKXtcclxuXHRcdFx0US5yZWcoJ2dldENvdXJzZScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdGlmKGFoZWxwLm5vTG9naW5Ub0xvZ2luKCkpe1xyXG5cdFx0XHRcdFx0Z2V0Q291cnNlX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xyXG5cdFx0XHRcdFx0Z2V0Q291cnNlQW5kU2V0VHIoKTtcclxuXHRcdFx0XHRcdFxyXG5cclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gZ2V0Q291cnNlQW5kU2V0VHIodGVybSl7XHJcblx0XHRcdCQucG9zdCgnL2dldENvdXJzZScsZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKCcjY291cnNlJykuaHRtbChkYXRhKTtcclxuXHRcdFx0XHRcdHRvb2wubG9hZGluZ0hpZGUoKTtcdFxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfY291cnNlOnJvdXRlcl9jb3Vyc2VcclxuXHRcdH1cclxuXHJcbn0pKCk7IiwidmFyIGZlZWRiYWNrPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGZlZWRiYWNrX3BhZ2U9bmV3IGNvbW1vbl9wYWdlKHtcclxuXHRcdFx0aWQ6J2NvdXJzZVRhYmxlLWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6XHJcblx0XHRcdCc8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCflj43ppojlu7rorq4nK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPGZvcm0gPicrXHJcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xyXG5cdCAgICAgIFx0XHRcdCc8aW5wdXQgaWQ9XCJlbWFpbFwiIHR5cGU9XCJlbWFpbFwiIGNsYXNzPVwidmFsaWRhdGVcIj4nK1xyXG5cdCAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+JytcclxuXHQgICAgICBcdFx0JzwvZGl2PicrXHJcblx0ICAgICAgXHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+JytcclxuXHQgICAgICBcdFx0XHQnPHRleHRhcmVhIGlkPVwidGV4dGFyZWFcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT4nK1xyXG5cdCAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwidGV4dGFyZWFcIj7ov5nph4zloavmgqjnmoTmhI/op4E8L2xhYmVsPicrXHJcblx0XHRcdFx0JzwvZGl2PicrXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0JzxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhY3Rpb25cIiBpZD1cImZlZWRiYWNrXCI+JytcclxuXHRcdFx0XHRcdCfmj5DkuqQnK1xyXG5cdFx0XHRcdFx0JzwvYnV0dG9uPicrXHJcblx0XHRcdCc8L2Zyb20+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfZmVlZGJhY2soKXtcclxuXHRcdFx0US5yZWcoJ2ZlZWRiYWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0ZmVlZGJhY2tfcGFnZS5zaG93KCk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JCgnI2ZlZWRiYWNrJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZih0ZXh0YXJlYUlzRW1wdHkoKSl7XHJcblx0XHRcdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn5Y+N6aaI5YaF5a655LiN6IO95Li656m677yBJywgNDAwMCk7XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywndHJ1ZScpO1xyXG5cdFx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdFx0dHlwZToncG9zdCcsXHJcblx0XHRcdFx0XHRcdHVybDonL2ZlZWRiYWNrJyxcclxuXHRcdFx0XHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0XHRcdFx0J2VtYWlsJzokKCcjZW1haWwnKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0XHQnY29udGVudCc6JCgnI3RleHRhcmVhJykudmFsKClcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn5Y+N6aaI5oiQ5Yqf77yM5oiR5Lus5Lya5Y+K5pe25aSE55CGficsIDQwMDApO1xyXG5cdFx0XHRcdFx0XHRcdCQoJyNmZWVkYmFjaycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWhvbWUnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcdFx0XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiB0ZXh0YXJlYUlzRW1wdHkoKXtcclxuXHRcdFx0cmV0dXJuICQoJyN0ZXh0YXJlYScpLnZhbCgpPT0nJz90cnVlOmZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9mZWVkYmFjazpyb3V0ZXJfZmVlZGJhY2tcclxuXHRcdH1cclxuXHJcbn0pKCk7IiwidmFyIGdldEhvd011Y2hCaXJTYW1lPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGxvZ2luZWRDb250ZW50PSc8ZGl2IGlkPVwibG9naW5lZC1iaXJcIj4nK1xyXG5cdFx0JzxoMyBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0J+S9oOeahOWHuueUn+W5tOaciOaXpeaYrzxzcGFuIGlkPVwiYmlydGhkYXlcIj48L3NwYW4+JytcclxuXHRcdFx0JzwvaDM+JytcclxuXHRcdFx0JzxoND4nK1xyXG5cdFx0XHRcdCflhajmoKHkuIDlhbHmnIk8c3BhbiBpZD1cInNhbWVCaXJOdW1cIj4wPC9zcGFuPuS4qui3n+S9oOWQjOW5tOWQjOaciOWQjOaXpeeUnycrXHJcblx0XHRcdCc8L2g0PicrXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwicm93XCI+JytcclxuICAgICAgXHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgczEyIG01XCI+JytcclxuICAgICAgICBcdFx0XHQnPGRpdiBjbGFzcz1cImNhcmQtcGFuZWxcIj4nK1xyXG4gICAgICAgIFx0XHRcdFx0JzxoNT7kuIvpnaLmmK/ot5/kvaDlkIzlubTlkIzmnIjlkIzml6XnlJ/nmoTkuJTlhazlvIDoh6rlt7Hkv6Hmga/nmoTkuro8L2g1PicrXHJcbiAgICAgICAgICBcdFx0XHRcdCc8dGFibGUgaWQ9XCJzaGFyZS1pbmZvXCI+JytcclxuXHJcbiAgICAgICAgICBcdFx0XHRcdCc8L3RhYmxlPicrXHJcbiAgICAgICAgICBcdFx0XHRcdFxyXG4gICAgICAgIFx0XHRcdCc8L2Rpdj4nK1xyXG4gICAgICBcdFx0XHQnPC9kaXY+JytcclxuICAgIFx0XHQnPC9kaXY+JytcclxuICAgIFx0XHQnPGZvcm0gPicrXHJcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xyXG5cdFx0XHRcdFx0XHQnPGlucHV0IGlkPVwiY29udGFjdFwiIHR5cGU9XCJ0ZXh0XCIgIGNsYXNzPVwidmFsaWRhdGVcIj4nK1xyXG5cdFx0XHRcdFx0XHQnPGxhYmVsIGZvcj1cImNvbnRhY3RcIj7ogZTns7vmlrnlvI88L2xhYmVsPicrXHJcblx0XHRcdFx0XHRcdCc8cD7lvZPnhLbkvaDlj6/ku6XpgInmi6nkuI3nlZnvvIznm7TmjqXmj5DkuqTvvIzpgqPmoLflj6rkvJrmmL7npLrkvaDnmoTlp5PlkI3vvIzlrablj7fjgII8L3A+JytcclxuXHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0JzxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhY3Rpb25cIiBpZD1cInNoYXJlXCI+JytcclxuXHRcdFx0XHQn5oiR5p2l5YWx5LqrJytcclxuXHRcdFx0XHQnPC9idXR0b24+JytcclxuXHRcdFx0JzwvZnJvbT4nK1x0XHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwicm93XCI+JytcclxuICAgICAgXHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgczEyIG01XCI+JytcclxuICAgICAgICBcdFx0XHQnPGRpdiBjbGFzcz1cImNhcmQtcGFuZWxcIj4nK1xyXG4gICAgICAgIFx0XHRcdFx0JzxoNT7lhY3otKPlo7DmmI48L2g1PicrXHJcbiAgICAgICAgICBcdFx0XHRcdCc8c3BhbiBjbGFzcz1cIlwiPuaJgOacieS/oeaBr+mDveaYr+engeWvhueahOS4jeS8muWFrOW8gO+8iOmZpOmdnuS9oOWQjOaEj+WFrOW8gO+8ie+8jOWQjOaXtm1haWZm6YCa6L+H5ZCI5rOV5omL5q6155So5aSn6YeP54is6Jmr54is5Y+W55qE5pWw5o2u5b6X5Yiw55qE57uT5p6c44CCPC9zcGFuPicrXHJcbiAgICAgICAgXHRcdFx0JzwvZGl2PicrXHJcbiAgICAgIFx0XHRcdCc8L2Rpdj4nK1xyXG4gICAgXHRcdCc8L2Rpdj4nK1xyXG4gICAgXHRcdCc8IS0tIEppYVRoaXMgQnV0dG9uIEJFR0lOIC0tPjxkaXYgY2xhc3M9XCJqaWF0aGlzX3N0eWxlX21cIj48L2Rpdj48c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIiBzcmM9XCJodHRwOi8vdjMuamlhdGhpcy5jb20vY29kZS9qaWF0aGlzX20uanNcIiBjaGFyc2V0PVwidXRmLThcIj48L3NjcmlwdD48IS0tIEppYVRoaXMgQnV0dG9uIEVORCAtLT4nK1xyXG4gICAgXHRcdCc8L2Rpdj4nK1xyXG4gICAgXHRcdCc8ZGl2IGlkPVwibm9Mb2dpbi1iaXJcIj4nK1xyXG4gICAgXHRcdFx0JzxoNT4nK1xyXG5cdFx0XHRcdFx0XHQn55So5pWZ5Yqh5aSE55qE6LSm5Y+35a+G56CB55m75b2V77yM5Y+v5Lul5p+l55yL5YWo5qCh5ZKM5L2g5ZCM5bm05ZCM5pyI5ZCM5pel55Sf55qE5Lq655qE5Liq5pWw77yM5b2T54S25L2g5Y+v5Lul6YCJ5oup5YWx5Lqr5L2g55qE5L+h5oGv77yM6K6p5L2g5Lus5om+5Yiw5a+55pa577yM5b+r5p2l55m75b2V5ZCn44CCJytcclxuXHRcdFx0XHQnPC9oNT4nK1xyXG5cdFx0XHRcdCc8YSBocmVmPVwiIyFsb2dpblwiPueri+WNs+WOu+eZu+mZhjwvYT4nXHJcbiAgICBcdFx0JzwvZGl2PidcclxuXHJcblxyXG5cclxuXHRcdHZhciBnZXRIb3dNdWNoQmlyU2FtZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidiaXJTYW1lLWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6bG9naW5lZENvbnRlbnRcclxuXHRcdFx0XHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9zYW1lQmlyKCl7XHJcblx0XHRcdFEucmVnKCdzYW1lQmlyJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XHJcblx0XHRcdFx0aWYoYWhlbHAuIGlzTG9naW5lZCgpKXtcclxuXHRcdFx0XHRcdGdldEhvd011Y2hCaXJTYW1lX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xyXG5cdFx0XHRcdFx0JCgnI2xvZ2luZWQtYmlyJykuc2hvdygpO1xyXG5cdFx0XHRcdFx0JCgnI25vTG9naW4tYmlyJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0Z2V0QmlyQW5kU2V0KHRvb2wuZ2V0Q29va2llKCdpZCcpKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0dG9vbC5uZWVkTG9naW5Gcm9tSGFzaD13aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHRcdFx0XHRcdGdldEhvd011Y2hCaXJTYW1lX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0Ly9hbGVydCgoJyNiaXJTYW1lLWNvbnRhaW5lciBjb250YWluZXInKS50ZXh0KCkpXHJcblx0XHRcdFx0XHQkKCcjbG9naW5lZC1iaXInKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcjbm9Mb2dpbi1iaXInKS5zaG93KCk7XHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldEJpckFuZFNldChzdHVkZW50Tm8pe1xyXG5cdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0dHlwZToncG9zdCcsXHJcblx0XHRcdFx0XHR1cmw6Jy9nZXRTYW1lQmlydGgnLFxyXG5cdFx0XHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0XHRcdCdzdHVkZW50Tm8nOnN0dWRlbnRObyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0XHRcdHZhciBiYXNlX2luZm89ZGF0YS5iYXNlX2luZm87XHJcblx0XHRcdFx0XHRcdCQoJyNiaXJ0aGRheScpLnRleHQoYmFzZV9pbmZvLmJpcnRoZGF5KTtcclxuXHRcdFx0XHRcdFx0JCgnI3NhbWVCaXJOdW0nKS50ZXh0KE51bWJlcihiYXNlX2luZm8uY291bnQpLTEpO1xyXG5cclxuXHRcdFx0XHRcdFx0JCgnI3NoYXJlLWluZm8nKS5odG1sKCfkuI3lpb3mhI/mgJ3nm67liY3msqHkurrlhbHkuqvkv6Hmga/vvIzotbbntKfmiorkuLrov5nkuKrnvZHpobXlhbHkuqvlh7rljrvvvIzorqnlpKflrrbpg73lj4LkuI7ov5vmnaXvvIznpZ3kvaDml6nml6Xmib7liLDpgqPkuYjmnInnvJjnmoTkurrjgIInKTtcclxuXHRcdFx0XHRcdFx0dmFyIGRldGFpbF9pbmZvPWRhdGEuZGV0YWlsX2luZm87XHJcblx0XHRcdFx0XHRcdGlmKGRldGFpbF9pbmZvLmxlbmd0aCE9MCl7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHN0cj0nJztcclxuXHRcdFx0XHRcdFx0XHRmb3IodmFyIGk9MDtpPGRldGFpbF9pbmZvLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRcdFx0XHRcdFx0IHN0cj0nPHRyPjx0ZD4nK2RldGFpbF9pbmZvW2ldLm5hbWUrJzwvdGQ+PHRkPicrZGV0YWlsX2luZm9baV0uc3R1ZGVudE5vKyc8L3RkPjx0ZD4nK2RldGFpbF9pbmZvW2ldLmNvbnRhY3QrJzwvdGQ+PHRyPic7XHJcblx0XHRcdFx0XHRcdFx0fSAgXHJcblx0XHRcdFx0XHRcdFx0JCgnI3NoYXJlLWluZm8nKS5odG1sKCk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI3NoYXJlLWluZm8nKS5odG1sKHN0cik7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRvb2wubG9hZGluZ0hpZGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcdFxyXG5cdFx0fTtcclxuXHRcdCQoJyNzaGFyZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0dXJsOicvcG9zdFNoYXJlJyxcclxuXHRcdFx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdFx0XHQnc3R1ZGVudE5vJzp0b29sLmdldENvb2tpZSgnaWQnKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG5cdFx0XHRcdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn5YiG5Lqr5oiQ5YqfJywgNDAwMCk7XHJcblx0XHRcdFx0XHRcdCQoJyNsb2dpbicpLmF0dHIoJ2Rpc2FibGUnLCdmYWxzZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOidwb3N0JyxcclxuXHRcdFx0XHRcdHVybDonL3Bvc3RDb250YWN0JyxcclxuXHRcdFx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdFx0XHQnc3R1ZGVudE5vJzp0b29sLmdldENvb2tpZSgnaWQnKSxcclxuXHRcdFx0XHRcdFx0J2NvbnRhY3QnOiQoJyNjb250YWN0JykudmFsKClcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly9NYXRlcmlhbGl6ZS50b2FzdCgn5YiG5Lqr5oiQ5YqfJywgNDAwMCk7XHJcblx0XHRcdFx0XHRcdCQoJyNsb2dpbicpLmF0dHIoJ2Rpc2FibGUnLCdmYWxzZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlJywndHJ1ZScpO1xyXG5cdFx0XHR9KTtcdFxyXG5cclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfc2FtZUJpcjpyb3V0ZXJfc2FtZUJpclxyXG5cdFx0fVxyXG5cclxufSkoKTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICBcdFx0XHRcdFx0J+S4jeWlveaEj+aAneebruWJjeayoeS6uuWFseS6q+S/oeaBr++8jOi1tue0p+aKiuS4uui/meS4que9kemhteWFseS6q+WHuuWOu++8jOiuqeWkp+WutumDveWPguS4jui/m+adpe+8jOelneS9oOaXqeaXpeaJvuWIsOmCo+S5iOaciee8mOeahOS6uuOAgicrXHJcbi8vXHRcdFx0XHRcdCc8dHI+PHRoPuWQkeeOi+a2mzx0ZD48dGQ+MTQxMzIwMjMxPC90ZD48L3RyPicrXHJcbiIsInZhciBnZXRTdHVJbmZvPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGdldFN0dUluZm9fcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonc2NvcmUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDonPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5pys5a2m5pyf5oiQ57upJytcclxuXHRcdFx0JzwvaDI+JytcclxuXHRcdFx0Jzxmb3JtID4nK1xyXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+JytcclxuXHQgICAgICBcdFx0XHQnPGlucHV0IGlkPVwiU0VMRUNUXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cIlNFTEVDVFwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJTRUxFQ1RcIj7mn6Xor6LlrZDmrrU8L2xhYmVsPicrXHJcblx0ICAgICAgXHRcdCc8L2Rpdj4nK1xyXG5cdCAgICAgIFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxpbnB1dCBpZD1cInNfdmFsdWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidmFsaWRhdGVcIiBuYW1lPVwic192YWx1ZVwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJzX3ZhbHVlXCI+5p+l6K+i5YC8PC9sYWJlbD4nK1xyXG5cdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHM2XCI+JytcclxuXHQgICAgICBcdFx0XHQnPGlucHV0IGlkPVwiZ2V0X2luZm9fU0VMRUNUXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cImdldF9pbmZvX1NFTEVDVFwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJnZXRfaW5mb19TRUxFQ1RcIj7mg7PopoHlvpfliLDnmoTlrZfmrrXlgLw8L2xhYmVsPicrXHJcblx0XHRcdFx0JzwvZGl2PicrXHJcblx0XHRcdFx0JzxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhY3Rpb25cIiBpZD1cImdldFN0dUluZm9fYnRuXCI+JytcclxuXHRcdFx0XHRcdCfmj5DkuqQnK1xyXG5cdFx0XHRcdCc8L2J1dHRvbj4nK1xyXG5cdFx0XHQnPC9mcm9tPicrXHJcblx0XHRcdCc8dGFibGUgY2xhc3M9XCJzdHJpcGVkXCIgaWQ9XCJnZXRTdHVJbmZvX3RhYmxlXCI+JytcclxuICAgICAgICAgICAgICAnPHRoZWFkPicrXHJcbiAgICAgICAgICAgICAgICAnPHRyPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzx0aCA+U0VMRUNUPC90aD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8dGggPnNfdmFsdWU8L3RoPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzx0aCA+Z2V0X2luZm9fU0VMRUNUPC90aD4nK1xyXG4gICAgICAgICAgICAgICAgJzwvdHI+JytcclxuICAgICAgICAgICAgICAnPC90aGVhZD4nK1xyXG4gICAgICAgICAgICAgICc8dGJvZHk+PC90Ym9keT4nK1xyXG4gICAgICAgICAgICAnPC90YWJsZT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9nZXRTdHVJbmZvKCl7XHJcblx0XHRcdFEucmVnKCdnZXRTdHVJbmZvJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGFoZWxwLm5vTG9naW5Ub0xvZ2luKCk7XHJcblx0XHRcdFx0Z2V0U3R1SW5mb19wYWdlLnNob3coKTtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdC8vIHRvb2wubG9hZGluZ1Nob3coKTtcclxuXHRcdFx0XHQkKCcjZ2V0U3R1SW5mb19idG4nKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xyXG5cdFx0XHRcdFx0Z2V0VmFsdWVBbmRTZXQoKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gZ2V0VmFsdWVBbmRTZXQoKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHRcdHR5cGU6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0dXJsOicvZ2V0U3R1SW5mbycsXHJcblx0XHRcdFx0XHRkYXRhOntcclxuXHRcdFx0XHRcdFx0J1NFTEVDVCc6JCgnI1NFTEVDVCcpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHQndmFsdWUnOiQoJyNzX3ZhbHVlJykudmFsKCksXHJcblx0XHRcdFx0XHRcdCdnZXRfaW5mb19TRUxFQ1QnOiQoJyNnZXRfaW5mb19TRUxFQ1QnKS52YWwoKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdHZhciBkYXRhPUpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHR0b29sLmxvYWRpbmdIaWRlKCk7XHJcblx0XHRcdFx0XHRcdGRlYWxEYXRhKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHQvL2RhdGEubGVuZ3RoPjE/bG9naW5TdWNjZXNzKGRhdGEsaXNMb2dpbl8zMCk6bG9naW5GYWlsKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHR9O1xyXG5cdFx0ZnVuY3Rpb24gZGVhbERhdGEoZGF0YSl7XHJcblx0XHRcdC8vW3tcInN0dWRlbnROb1wiOlwiMTQxMzIwMjMxXCIsXCJuYW1lXCI6XCLlkJHnjovmtptcIixcIklEQ2FyZFwiOlwiMzQyNTAxMTk5NjA2MjcyNjEyXCJ9XVxyXG5cdFx0XHQvL3ZhciB0aExpc3Q9JCgnI2dldFN0dUluZm9fdGFibGUgdHIgdGgnKTtcclxuXHRcdFx0Ly9KU09OLnBhcnNlKGRhdGEpWzBdXHJcblx0XHRcdC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShkYXRhKVswXSlcclxuXHRcdFx0dmFyIGNvdW50PTA7XHJcblx0XHRcdGZvcih2YXIgaSBpbiBkYXRhWzBdKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhWzBdKVxyXG5cdFx0XHRcdCQoJyNnZXRTdHVJbmZvX3RhYmxlIHRyIHRoJykuZXEoY291bnQpLnRleHQoaSk7XHJcblx0XHRcdFx0Y291bnQrKztcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgc3RyPScnO1xyXG5cdFx0XHRmb3IodmFyIGw9MDtsPGRhdGEubGVuZ3RoO2wrKyl7XHJcblx0XHRcdFx0dmFyIHN1Yl9zdHI9Jyc7XHJcblx0XHRcdFx0Zm9yKHZhciBrIGluIGRhdGFbbF0pe1xyXG5cdFx0XHRcdFx0c3ViX3N0cis9Jzx0ZD4nK2RhdGFbbF1ba10rJzwvdGQ+J1xyXG5cclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHN0cis9KCc8dHI+JytzdWJfc3RyKyc8L3RyPicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQoJyNnZXRTdHVJbmZvX3RhYmxlIHRib2R5JykuaHRtbChzdHIpO1xyXG5cclxuXHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9nZXRTdHVJbmZvOnJvdXRlcl9nZXRTdHVJbmZvXHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXREb3duPShcblx0ZnVuY3Rpb24oKXtcblx0XHR2YXIgZ2V0RG93bl9wYWdlPW5ldyBjb21tb25fcGFnZSh7XG5cdFx0XHRpZDonZG93bi1jb250YWluZXInLFxuXHRcdFx0Y29udGVudDonPGgyIGNsYXNzPVwiaGVhZGVyXCI+Jytcblx0XHRcdFx0J+WtpueUn+S4i+i9vTonK1xuXHRcdFx0JzwvaDI+Jytcblx0XHRcdCc8Zm9ybSA+Jytcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xuICAgICAgICAgIFx0XHRcdCc8aW5wdXQgaWQ9XCJkZXRhaWxfa2V5XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cInFcIj4nK1xuICAgICAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwiZGV0YWlsX2tleVwiPui+k+WFpeafpeaJvueahOWtl+autTwvbGFiZWw+JytcbiAgICAgICAgICBcdFx0JzwvZGl2PicrXG4gICAgICAgICAgXHRcdCc8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiYWN0aW9uXCIgaWQ9XCJkZWFpbC1zZWFyY2hcIj4nK1xuICAgIFx0XHRcdFx0J+afpeivoicrXG5cdFx0XHRcdCc8L2J1dHRvbj4nK1xuXHRcdCAgXHQnPC9mcm9tPicrXG5cdFx0XHQnPHVsIGNsYXNzPVwiZG93bi1jb2xsZWN0aW9uIGNvbGxlY3Rpb25cIj4nK1xuXHRcdFx0ICAgICAgIC8vICAnPGxpPjxhIGhyZWY9XCIjIXUvaW5kZXhfZGV0YWlsLmpzcD9JRD00OTIyXCIgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW0gd2F2ZXMtZWZmZWN0IHdhdmVzLXRlYWxcIj48c3Bhbj4yMDE2LTA5LTIzPC9zcGFuPjwvYT48L2xpPicrXG5cdFx0XHQgICAgICBcdC8vICc8bGk+PGEgaHJlZj1cIiMhdS9pbmRleF9kZXRhaWwuanNwP0lEPTQ5MjJcIiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbSB3YXZlcy1lZmZlY3Qgd2F2ZXMtdGVhbFwiPjxzcGFuPjIwMTYtMDktMjM8L3NwYW4+PC9hPjwvbGk+Jytcblx0XHRcdCAgICAgIFx0Ly8gJzxsaT48YSBocmVmPVwiIyF1L2luZGV4X2RldGFpbC5qc3A/SUQ9NDkyMlwiIGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtIHdhdmVzLWVmZmVjdCB3YXZlcy10ZWFsXCI+PHNwYW4+MjAxNi0wOS0yMzwvc3Bhbj48L2E+PC9saT4nK1xuXHRcdFx0ICAgICAgXHQvLyAnPGxpPjxhIGhyZWY9XCIjIXUvaW5kZXhfZGV0YWlsLmpzcD9JRD00OTIyXCIgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW0gd2F2ZXMtZWZmZWN0IHdhdmVzLXRlYWxcIj48c3Bhbj4yMDE2LTA5LTIzPC9zcGFuPjwvYT48L2xpPicrXG5cdFx0XHQgICAgICBcdC8vICc8bGk+PGEgaHJlZj1cIiMhdS9pbmRleF9kZXRhaWwuanNwP0lEPTQ5MjJcIiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbSB3YXZlcy1lZmZlY3Qgd2F2ZXMtdGVhbFwiPjxzcGFuPjIwMTYtMDktMjM8L3NwYW4+PC9hPjwvbGk+Jytcblx0XHRcdCAgICAgIFx0Ly8gJzxsaT48YSBocmVmPVwiIyF1L2luZGV4X2RldGFpbC5qc3A/SUQ9NDkyMlwiIGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtIHdhdmVzLWVmZmVjdCB3YXZlcy10ZWFsXCI+PHNwYW4+MjAxNi0wOS0yMzwvc3Bhbj48L2E+PC9saT4nK1xuXHRcdFx0ICAgICAgXHQvLyAnPGxpPjxhIGhyZWY9XCIjIXUvaW5kZXhfZGV0YWlsLmpzcD9JRD00OTIyXCIgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW0gd2F2ZXMtZWZmZWN0IHdhdmVzLXRlYWxcIj48c3Bhbj4yMDE2LTA5LTIzPC9zcGFuPjwvYT48L2xpPicrXG5cdFx0XHQgICAgICBcdC8vICc8bGk+PGEgaHJlZj1cIiMhdS9pbmRleF9kZXRhaWwuanNwP0lEPTQ5MjJcIiBjbGFzcz1cImNvbGxlY3Rpb24taXRlbSB3YXZlcy1lZmZlY3Qgd2F2ZXMtdGVhbFwiPjxzcGFuPjIwMTYtMDktMjM8L3NwYW4+PC9hPjwvbGk+Jytcblx0XHRcdCAgICAgIFx0Ly8gJzxsaT48YSBocmVmPVwiIyF1L2luZGV4X2RldGFpbC5qc3A/SUQ9NDkyMlwiIGNsYXNzPVwiY29sbGVjdGlvbi1pdGVtIHdhdmVzLWVmZmVjdCB3YXZlcy10ZWFsXCI+PHNwYW4+MjAxNi0wOS0yMzwvc3Bhbj48L2E+PC9saT4nK1xuXHRcdFx0ICAgICAgXHQvLyAnPGxpPjxhIGhyZWY9XCIjIXUvaW5kZXhfZGV0YWlsLmpzcD9JRD00OTIyXCIgY2xhc3M9XCJjb2xsZWN0aW9uLWl0ZW0gd2F2ZXMtZWZmZWN0IHdhdmVzLXRlYWxcIj48c3Bhbj4yMDE2LTA5LTIzPC9zcGFuPjwvYT48L2xpPicrXG5cdFx0XHQnPC91bD4nXG5cdFx0fSlcblxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9kb3duKCl7XG5cdFx0XHRRLnJlZygnZ2V0RG93bicsZnVuY3Rpb24oKXtcblx0XHRcdFx0XG5cdFx0XHRcdGdldERvd25fcGFnZS5zaG93KCk7XG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nU2hvdygpO1xuXHRcdFx0XHRcdGdldERvd25BbmRTZXRUcigpO1x0XHRcdFx0XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0JCgnI2RlYWlsLXNlYXJjaCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHR0b29sLmxvYWRpbmdTaG93KCk7XG5cdFx0XHQkLnBvc3QoJy4vYnlLZXlHZXREZXRhaWwnLHtxOiQoJyNkZXRhaWxfa2V5JykudmFsKCl9LGZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0eXBlb2YgZGF0YSk7XG5cdFx0XHRcdHZhciBsaUxpc3Q9JCgnLmRvd24tY29sbGVjdGlvbicpO1xuXHRcdFx0XHRpZihkYXRhLmxlbmd0aCE9MCl7XG5cdFx0XHRcdFx0bGlMaXN0Lmh0bWwoJycpO1xuXHRcdFx0XHRcdHZhciBsZW49ZGF0YS5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yKHZhciBpPTA7aTxsZW47aSsrKXtcblx0XHRcdFx0XHQgIFx0XHR2YXIgbGk9JCgnPGxpPicpXG5cdFx0XHRcdFx0ICBcdFx0dmFyIGE9JCgnPGE+JykuYXR0cignaHJlZicsJyMhdS8nK2RhdGFbaV0ubGluaykuYWRkQ2xhc3MoJ2NvbGxlY3Rpb24taXRlbSB3YXZlcy1lZmZlY3Qgd2F2ZXMtdGVhbCcpO1xuXHRcdFx0XHRcdCAgXHRcdGEuaHRtbChkYXRhW2ldLnRpdGxlKyc8c3Bhbj4nKyc8L3NwYW4+Jyk7XG5cdFx0XHRcdFx0ICBcdFx0bGkuYXBwZW5kKGEpO1xuXHRcdFx0XHRcdCAgXHRcdGxpTGlzdC5hcHBlbmQobGkpO1xuXHRcdFx0XHRcdCAgXHRcdC8vJChsaUxpc3RbaV0pLmNoaWxkcmVuKCkuYXR0cignaHJlZicsJyMhdS8nK2RhdGFbaV0ubGluayk7XG5cdFx0XHRcdFx0ICBcdFx0Ly8kKGxpTGlzdFtpXSkuY2hpbGRyZW4oKS5odG1sKGRhdGFbaV0udGV4dCsnPHNwYW4+JytkYXRhW2ldLnRpbWUrJzwvc3Bhbj4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxpTGlzdC5odG1sKCfmsqHmnInmib7liLDnm7jlhbPlhoXlrrnvvZ4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0b29sLmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdGZ1bmN0aW9uIGdldERvd25BbmRTZXRUcigpe1xuXHRcdFx0JC5nZXQoXCIvZ2V0RG93bkNhdGFsb2dcIiwgZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdCAgY29uc29sZS5sb2codHlwZW9mIGRhdGEpO1xuXHRcdFx0XHQgIHZhciBsaUxpc3Q9JCgnLmRvd24tY29sbGVjdGlvbicpO1xuXHRcdFx0XHQgIHZhciBsZW49ZGF0YS5sZW5ndGg7XG5cdFx0XHRcdCAgZm9yKHZhciBpPTA7aTxsZW47aSsrKXtcblx0XHRcdFx0ICBcdFx0dmFyIGxpPSQoJzxsaT4nKVxuXHRcdFx0XHQgIFx0XHR2YXIgYT0kKCc8YT4nKS5hdHRyKCdocmVmJywnIyF1LycrZGF0YVtpXS5saW5rKS5hZGRDbGFzcygnY29sbGVjdGlvbi1pdGVtIHdhdmVzLWVmZmVjdCB3YXZlcy10ZWFsJyk7XG5cdFx0XHRcdCAgXHRcdGEuaHRtbChkYXRhW2ldLnRleHQrJzxzcGFuPicrZGF0YVtpXS50aW1lKyc8L3NwYW4+Jyk7XG5cdFx0XHRcdCAgXHRcdGxpLmFwcGVuZChhKTtcblx0XHRcdFx0ICBcdFx0bGlMaXN0LmFwcGVuZChsaSk7XG5cdFx0XHRcdCAgXHRcdC8vJChsaUxpc3RbaV0pLmNoaWxkcmVuKCkuYXR0cignaHJlZicsJyMhdS8nK2RhdGFbaV0ubGluayk7XG5cdFx0XHRcdCAgXHRcdC8vJChsaUxpc3RbaV0pLmNoaWxkcmVuKCkuaHRtbChkYXRhW2ldLnRleHQrJzxzcGFuPicrZGF0YVtpXS50aW1lKyc8L3NwYW4+Jyk7XG5cdFx0XHRcdCAgfVxuXHRcdFx0XHQgIHRvb2wubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0fVx0XHRcblx0XHRcblx0XHRyZXR1cm57XG5cdFx0XHRyb3V0ZXJfZG93bjpyb3V0ZXJfZG93blxuXHRcdH1cblxufSkoKTsiLCJcclxudmFyXHRtYWlmZl9kZXRhaWw9KGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbWFpZmZfZGV0YWlsX3BhZ2U9bmV3IGNvbW1vbl9wYWdlKHtcclxuXHRcdFx0aWQ6J21haWZmX2FydGljbGUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDpcclxuXHRcdFx0XHQnPGg0IGNsYXNzPVwiaGVhZGVyXCI+PC9oND4nK1xyXG5cdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrXHJcblx0XHRcdFx0XHQnPGRpdj48L2Rpdj4nK1xyXG5cdFx0XHRcdCc8L2Rpdj4nXHJcblx0XHRcdFxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9tKCl7XHJcblx0XHRcdFEucmVnKCdtJyxmdW5jdGlvbihMKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhMKVxyXG5cdFx0XHRcdHRvb2wubG9hZGluZ1Nob3coKTtcclxuXHRcdFx0ICAgICQuZ2V0KFwiL20/cT1cIitMLCBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShkYXRhKSlcclxuXHRcdFx0XHRcdC8vdmFyIGRhdGE9SlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdG1haWZmX2RldGFpbF9wYWdlLnNob3coKTtcclxuXHRcdFx0XHRcdCQoJyNtYWlmZl9hcnRpY2xlLWNvbnRhaW5lciAuaGVhZGVyJykudGV4dChkYXRhLnRpdGxlKTtcclxuXHRcdFx0XHRcdCQoJyNtYWlmZl9hcnRpY2xlLWNvbnRhaW5lciAuY29udGVudCAgZGl2JykuaHRtbChkYXRhLmNvbnRlbnQpO1xyXG5cdFx0XHRcdFx0dG9vbC5sb2FkaW5nSGlkZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX206cm91dGVyX21cclxuXHRcdH1cclxuXHR9KSgpO1xyXG5cclxuIiwidmFyIG1haWZmQXJ0aWNsZT0oXG5cdGZ1bmN0aW9uKCl7XG5cdFx0dmFyIG1haWZmQXJ0aWNsZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XG5cdFx0XHRpZDonY291cnNlVGFibGUtY29udGFpbmVyJyxcblx0XHRcdGNvbnRlbnQ6XG5cdFx0XHQnPGgyIGNsYXNzPVwiaGVhZGVyXCI+Jytcblx0XHRcdFx0J+adpeWGmeS9oOeahOWGheWuueWQp++9nicrXG5cdFx0XHQnPC9oMj4nK1xuXHRcdFx0Jzxmb3JtID4nK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXG5cdCAgICAgIFx0XHRcdCc8aW5wdXQgaWQ9XCJtYWlmZi10aXRsZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPicrXG5cdCAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwibWFpZmYtdGl0bGVcIj50aXRsZTwvbGFiZWw+Jytcblx0ICAgICAgXHRcdCc8L2Rpdj4nK1xuXHQgICAgICBcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xuXHQgICAgICBcdFx0XHQnPHRleHRhcmVhIGlkPVwibWFpZmYtdGV4dGFyZWFcIiBjbGFzcz1cIm1hdGVyaWFsaXplLXRleHRhcmVhXCI+PC90ZXh0YXJlYT4nK1xuXHQgICAgICBcdFx0XHQnPGxhYmVsIGZvcj1cIm1haWZmLXRleHRhcmVhXCI+5p2l5YaZ5L2g55qE5YaF5a655ZCnPC9sYWJlbD4nK1xuXHRcdFx0XHQnPC9kaXY+Jytcblx0XHRcdFx0XG5cdFx0XHRcdCc8YnV0dG9uIGNsYXNzPVwiYnRuIHdhdmVzLWVmZmVjdCB3YXZlcy1saWdodFwiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiYWN0aW9uXCIgaWQ9XCJuZXdNYWlmZlwiPicrXG5cdFx0XHRcdFx0J+aPkOS6pCcrXG5cdFx0XHRcdFx0JzwvYnV0dG9uPicrXG5cdFx0XHQnPC9mcm9tPidcblx0XHR9KVxuXG5cdFx0ZnVuY3Rpb24gcm91dGVyX21haWZmQXJ0aWNsZSgpe1xuXHRcdFx0US5yZWcoJ25ld0EnLGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5zaWRlTmF2KCdoaWRlJyk7XG5cdFx0XHRcdG1haWZmQXJ0aWNsZV9wYWdlLnNob3coKTtcblxuXHRcdFx0fSk7XG5cdFx0XHQkKCcjbmV3TWFpZmYnKS5jbGljayhmdW5jdGlvbigpe1xuXHRcdFx0XHRcblx0XHRcdFx0aWYodGV4dGFyZWFJc0VtcHR5KCkpe1xuXHRcdFx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCflj43ppojlhoXlrrnkuI3og73kuLrnqbrvvIEnLCA0MDAwKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsJ3RydWUnKTtcblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0dHlwZToncG9zdCcsXG5cdFx0XHRcdFx0XHR1cmw6Jy4vbmV3TWFpZmZBcnRpY2xlJyxcblx0XHRcdFx0XHRcdGRhdGE6e1xuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiQoJyNtYWlmZi10aXRsZScpLnZhbCgpLFxuXHRcdFx0XHRcdFx0XHQnY29udGVudCc6JCgnI21haWZmLXRleHRhcmVhJykudmFsKClcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xuXHRcdFx0XHRcdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn5YaZ5oiQ5Yqf5LqGficsIDQwMDApO1xuXHRcdFx0XHRcdFx0XHQkKCcjZmVlZGJhY2snKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9KTtcdFx0XG5cdFx0fVxuXHRcdGZ1bmN0aW9uIHRleHRhcmVhSXNFbXB0eSgpe1xuXHRcdFx0cmV0dXJuICQoJyNtYWlmZi10ZXh0YXJlYScpLnZhbCgpPT0nJz90cnVlOmZhbHNlO1xuXHRcdH1cblx0XHRcblx0XHRyZXR1cm57XG5cdFx0XHRyb3V0ZXJfbWFpZmZBcnRpY2xlOnJvdXRlcl9tYWlmZkFydGljbGVcblx0XHR9XG5cbn0pKCk7IiwiXHJcbihmdW5jdGlvbigpe1xyXG5cdFx0XHJcblx0XHRob21lLnJvdXRlcl9ob21lKCk7XHJcblx0XHRsb2dpbi5yb3V0ZXJfbG9naW4oKTtcclxuXHRcdGRldGFpbC5yb3V0ZXJfdSgpO1xyXG5cdFx0Z2V0U2NvcmUucm91dGVyX3Njb3JlKCk7XHJcblx0XHRnZXRDb3Vyc2VUYWJsZS5yb3V0ZXJfY291cnNlVGFibGUoKTtcclxuXHRcdGdldEd5bUNvdW50LnJvdXRlcl9neW1Db3VudCgpO1xyXG5cdFx0Z2V0Q291cnNlLnJvdXRlcl9jb3Vyc2UoKTtcclxuXHRcdGZlZWRiYWNrLnJvdXRlcl9mZWVkYmFjaygpO1xyXG5cdFx0Z2V0SG93TXVjaEJpclNhbWUucm91dGVyX3NhbWVCaXIoKTtcclxuXHRcdGdldFN0dUluZm8ucm91dGVyX2dldFN0dUluZm8oKTtcclxuXHRcdGdldERvd24ucm91dGVyX2Rvd24oKTtcclxuXHRcdG1haWZmX2RldGFpbC5yb3V0ZXJfbSgpO1xyXG5cdFx0bWFpZmZBcnRpY2xlLnJvdXRlcl9tYWlmZkFydGljbGUoKTtcclxuXHRcdFEuaW5pdCh7XHJcblx0XHRcdGtleTonIScsLyogdXJs6YeMI+WSjHVybOWQjeS5i+mXtOeahOWIhuWJsuespuWPtyDpu5jorqTkuLrmhJ/lj7nlj7cgKi9cclxuXHRcdFx0aW5kZXg6J2hvbWUnLC8qIOmmlumhteWcsOWdgCDlpoLmnpzorr/pl67liLDkuI3og73orr/pl67pobXpnaLkuZ/kvJrot7Plm57mraTpobUgKi9cclxuXHRcdFx0cG9wOmZ1bmN0aW9uKEwpey8qIOavj+asoeaciXVybOWPmOabtOaXtumDveS8muinpuWPkXBvcOWbnuiwgyAqL1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdwb3Ag5b2T5YmN5Y+C5pWw5pivOicrTCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdCQoXCIuYnV0dG9uLWNvbGxhcHNlXCIpLnNpZGVOYXYoKTtcclxuXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICBcdCQoJ3NlbGVjdCcpLm1hdGVyaWFsX3NlbGVjdCgpO1xyXG4gICAgXHQkKCcuY29sbGFwc2libGUnKS5jb2xsYXBzaWJsZSh7XHJcbiAgICAgIFx0XHRhY2NvcmRpb24gOiBmYWxzZSAvLyBBIHNldHRpbmcgdGhhdCBjaGFuZ2VzIHRoZSBjb2xsYXBzaWJsZSBiZWhhdmlvciB0byBleHBhbmRhYmxlIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYWNjb3JkaW9uIHN0eWxlXHJcbiAgICBcdH0pO1xyXG4gIFx0fSk7XHJcbiAgICAgICBcclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
