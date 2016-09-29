//// THIS FILE IS CONCATENATED WITH gulp-obfuscator-js
(function (native_require, this_module) {

    // Blatantly stolen from the fantastic node-obfuscator project by Stephen Mathieson
    //     https://github.com/stephenmathieson/node-obfuscator/blob/master/lib/require.js

    // based on TJ Holowaychuk's commonjs require binding

    function require(p, root) {
        // third-party module?  use native require
        if ('.' != p[0] && '/' != p[0]) {
            return native_require(p);
        }

        root = root || 'root';

        var path = require.resolve(p);

        // if it's a non-registered json file, it
        // must be at the root of the project
        if (!path && /\.json$/i.test(p)) {
            return native_require('./' + require.basename(p));
        }

        var module = require.cache[path];

        if (!module) {
            try {
                return native_require(p);
            } catch (err) {
                throw new Error('failed to require "' + p + '" from ' + root +'\n' +
                                                err.message + '\n' + err.stack);
            }
        }

        if (!module.exports) {
            module.exports = {};
            module.call(module.exports, module, module.exports,
                require.relative(path));
        }

        return module.exports;
    }

    // same as node's `require`
    require.cache = {};

    // node's native `path.basename`
    require.basename = native_require('path').basename;

    require.resolve = function (path) {
        // GH-12
        if ('.' != path[0]) {
            return native_require.resolve(path);
        }

        var pathWithSlash = path.slice(-1) === '/' ? path : path + '/';
        var paths = [
            path,
            path + '.js',
            pathWithSlash + 'index.js',
            path + '.json',
            pathWithSlash + 'index.json'
        ];

        for (var i in paths) {
            var p = paths[i];
            if (require.cache[p]) {
                return p;
            }
        }
    };

    require.register = function (path, fn) {
        require.cache[path] = fn;
    };

    require.relative = function (parent) {
        function relative(p) {
            if ('.' != p[0]) {
                return require(p);
            }

            var path = parent.split('/');
            var segs = p.split('/');
            path.pop();

            for (var i in segs) {
                var seg = segs[i];
                if ('..' == seg) {
                    path.pop();
                } else if ('.' != seg) {
                    path.push(seg);
                }
            }

            return require(path.join('/'), parent);
        }

        relative.resolve = require.resolve;
        relative.cache = require.cache;
        return relative;
    };

    //// BEGIN ORIGINAL SOURCE

    // BEGIN FILE ./ajax-help.js
    require.register("./ajax-help.js", function (module, exports, require) {

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


    });
    // END FILE

    // BEGIN FILE ./detail-information.js
    require.register("./detail-information.js", function (module, exports, require) {


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


    });
    // END FILE

    // BEGIN FILE ./feedback.js
    require.register("./feedback.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./getCourse.js
    require.register("./getCourse.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./getCourseTable.js
    require.register("./getCourseTable.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./getGymCount.js
    require.register("./getGymCount.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./getScore.js
    require.register("./getScore.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./home-information.js
    require.register("./home-information.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./login.js
    require.register("./login.js", function (module, exports, require) {


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
    });
    // END FILE

    // BEGIN FILE ./loginout.js
    require.register("./loginout.js", function (module, exports, require) {

function loginout(){
	document.cookie='';
	window.location='#!home';
}
    });
    // END FILE

    // BEGIN FILE ./main.js
    require.register("./main.js", function (module, exports, require) {


(function(){
		
		home.router_home();
		login.router_login();
		detail.router_u();
		getScore.router_score();
		getCourseTable.router_courseTable();
		getGymCount.router_gymCount();
		getCourse.router_course();
		feedback.router_feedback();
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
    });
    // END FILE

    // BEGIN FILE ./object-commonPage.js
    require.register("./object-commonPage.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./q.js
    require.register("./q.js", function (module, exports, require) {

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
    });
    // END FILE

    // BEGIN FILE ./tool.js
    require.register("./tool.js", function (module, exports, require) {

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
    });
    // END FILE

    //// END OF ORIGINAL SOURCE
    this_module.exports = require("./main.js");
} (require, module));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb2JmdXNjYXRvci9iZWdpbm5pbmcuanMiLCJhamF4LWhlbHAuanMiLCJkZXRhaWwtaW5mb3JtYXRpb24uanMiLCJmZWVkYmFjay5qcyIsImdldENvdXJzZS5qcyIsImdldENvdXJzZVRhYmxlLmpzIiwiZ2V0R3ltQ291bnQuanMiLCJnZXRTY29yZS5qcyIsImhvbWUtaW5mb3JtYXRpb24uanMiLCJsb2dpbi5qcyIsImxvZ2lub3V0LmpzIiwibWFpbi5qcyIsIm9iamVjdC1jb21tb25QYWdlLmpzIiwicS5qcyIsInRvb2wuanMiLCIuL29iZnVzY2F0b3IvZW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29uY2F0ZW5hdGVkLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJ2YXIgYWhlbHA9KGZ1bmN0aW9uKCl7XHJcblx0XHRmdW5jdGlvbiBzZXRVc2VySWQoY29va2llLHRpbWUpe1xyXG5cdFx0XHR2YXIgaW5kZXg9Y29va2llWzBdLmluZGV4T2YoJz0nKSsxO1xyXG5cdFx0XHR2YXIgbGVuPWNvb2tpZVswXS5sZW5ndGg7XHJcblxyXG5cdFx0XHR0b29sLnNldENvb2tpZSgndXNlcmlkJyxjb29raWVbMF0uc2xpY2UoaW5kZXgsbGVuKSx0aW1lKTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHNldGxvZ2lubmFtZShjb29raWUsdGltZSl7XHJcblx0XHRcdHZhciBpbmRleD1jb29raWVbMl0uaW5kZXhPZignPScpKzE7XHJcblx0XHRcdHZhciBsZW49Y29va2llWzJdLmxlbmd0aDtcclxuXHJcblx0XHRcdHRvb2wuc2V0Q29va2llKCdsb2dpbm5hbWUnLGNvb2tpZVsyXS5zbGljZShpbmRleCxsZW4pLnRyaW0oKSx0aW1lKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBpc0xvZ2luZWQoKXtcclxuXHRcdFx0cmV0dXJuIHRvb2wuZ2V0Q29va2llKCd1c2VyaWQnKT90cnVlOmZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIG5vTG9naW5Ub0xvZ2luKCl7XHJcblx0XHRcdGlmKCFpc0xvZ2luZWQoKSl7XHJcblx0XHRcdFx0TWF0ZXJpYWxpemUudG9hc3QoJ+ivt+eZu+W9lSEnLCA0MDAwKTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb249JyMhbG9naW4nO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybntcclxuXHRcdFx0c2V0VXNlcklkOnNldFVzZXJJZCxcclxuXHRcdFx0c2V0bG9naW5uYW1lOnNldGxvZ2lubmFtZSxcclxuXHRcdFx0aXNMb2dpbmVkOmlzTG9naW5lZCxcclxuXHRcdFx0bm9Mb2dpblRvTG9naW46bm9Mb2dpblRvTG9naW5cclxuXHRcdH1cclxufSkoKTtcclxuXHJcbiIsIlxyXG52YXJcdGRldGFpbD0oZnVuY3Rpb24oKXtcclxuXHRcdHZhciBkZXRhaWxfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonYXJ0aWNsZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50OlxyXG5cdFx0XHRcdCc8aDQgY2xhc3M9XCJoZWFkZXJcIj48L2g0PicrXHJcblx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb250ZW50XCI+JytcclxuXHRcdFx0XHRcdCc8ZGl2PjwvZGl2PicrXHJcblx0XHRcdFx0JzwvZGl2PidcclxuXHRcdFx0XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX3UoKXtcclxuXHRcdFx0US5yZWcoJ3UnLGZ1bmN0aW9uKEwpe1xyXG5cdFx0XHQgICAgJC5nZXQoXCIvdT9xPVwiK0wubWF0Y2goL1xcZCsvZyksIGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0dmFyIGRhdGE9SlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEudGl0bGUpO1xyXG5cdFx0XHRcdFx0ZGV0YWlsX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0JCgnI2FydGljbGUtY29udGFpbmVyIC5oZWFkZXInKS50ZXh0KGRhdGEudGl0bGUpO1xyXG5cdFx0XHRcdFx0JCgnI2FydGljbGUtY29udGFpbmVyIC5jb250ZW50ICBkaXYnKS5odG1sKGRhdGEuY29udGVudCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfdTpyb3V0ZXJfdVxyXG5cdFx0fVxyXG5cdH0pKCk7XHJcblxyXG4iLCJ2YXIgZmVlZGJhY2s9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZmVlZGJhY2tfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonY291cnNlVGFibGUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDpcclxuXHRcdFx0JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0J+WPjemmiOW7uuiuricrXHJcblx0XHRcdCc8L2gyPicrXHJcblx0XHRcdCc8Zm9ybSA+JytcclxuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxpbnB1dCBpZD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgY2xhc3M9XCJ2YWxpZGF0ZVwiPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD4nK1xyXG5cdCAgICAgIFx0XHQnPC9kaXY+JytcclxuXHQgICAgICBcdFx0JzxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj4nK1xyXG5cdCAgICAgIFx0XHRcdCc8dGV4dGFyZWEgaWQ9XCJ0ZXh0YXJlYVwiIGNsYXNzPVwibWF0ZXJpYWxpemUtdGV4dGFyZWFcIj48L3RleHRhcmVhPicrXHJcblx0ICAgICAgXHRcdFx0JzxsYWJlbCBmb3I9XCJ0ZXh0YXJlYVwiPui/memHjOWhq+aCqOeahOaEj+ingTwvbGFiZWw+JytcclxuXHRcdFx0XHQnPC9kaXY+JytcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQnPGJ1dHRvbiBjbGFzcz1cImJ0biB3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHRcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFjdGlvblwiIGlkPVwiZmVlZGJhY2tcIj4nK1xyXG5cdFx0XHRcdFx0J+aPkOS6pCcrXHJcblx0XHRcdFx0XHQnPC9idXR0b24+JytcclxuXHRcdFx0JzwvZnJvbT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9mZWVkYmFjaygpe1xyXG5cdFx0XHRRLnJlZygnZmVlZGJhY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRmZWVkYmFja19wYWdlLnNob3coKTtcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKCcjZmVlZGJhY2snKS5jbGljayhmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHRleHRhcmVhSXNFbXB0eSgpKXtcclxuXHRcdFx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCflj43ppojlhoXlrrnkuI3og73kuLrnqbrvvIEnLCA0MDAwKTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCd0cnVlJyk7XHJcblx0XHRcdFx0XHQkLmFqYXgoe1xyXG5cdFx0XHRcdFx0XHR0eXBlOidwb3N0JyxcclxuXHRcdFx0XHRcdFx0dXJsOicvZmVlZGJhY2snLFxyXG5cdFx0XHRcdFx0XHRkYXRhOntcclxuXHRcdFx0XHRcdFx0XHQnZW1haWwnOiQoJyNlbWFpbCcpLnZhbCgpLFxyXG5cdFx0XHRcdFx0XHRcdCdjb250ZW50JzokKCcjdGV4dGFyZWEnKS52YWwoKVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCflj43ppojmiJDlip/vvIzmiJHku6zkvJrlj4rml7blpITnkIZ+JywgNDAwMCk7XHJcblx0XHRcdFx0XHRcdFx0JCgnI2ZlZWRiYWNrJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1x0XHRcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIHRleHRhcmVhSXNFbXB0eSgpe1xyXG5cdFx0XHRyZXR1cm4gJCgnI3RleHRhcmVhJykudmFsKCk9PScnP3RydWU6ZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX2ZlZWRiYWNrOnJvdXRlcl9mZWVkYmFja1xyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgZ2V0Q291cnNlPShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGdldENvdXJzZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidjb3Vyc2VUYWJsZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50OlxyXG5cdFx0XHQnPGgyIGNsYXNzPVwiaGVhZGVyXCI+JytcclxuXHRcdFx0XHQn5pys5a2m5pyf5bey6YCJ6K++56iLJytcclxuXHRcdFx0JzwvaDI+JytcclxuXHRcdFx0Jzx0YWJsZSBjbGFzcz1cIiBib3JkZXJlZFwiID4nK1xyXG5cdFx0XHQgIFx0Jzx0aGVhZD4nK1xyXG5cdFx0XHQgICBcdFx0Jzx0cj4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+6K++56iL5Luj56CBPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+6K++56iL5ZCN56ewPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5a2m5YiGPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5Lu76K++5pWZ5biIPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5ZGo5qyhPC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5pe26Ze0PC90aD4nK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzx0aCA+5LiK6K++5Zyw54K5PC90aD4nK1xyXG4gICAgICAgICAgICAgICAgXHQnPC90cj4nK1xyXG4gICAgICAgICAgICAgICAnPC90aGVhZD4nK1xyXG4gICAgICAgICAgICAgIFx0Jzx0Ym9keSBpZD1cImNvdXJzZVwiPjwvdGJvZHk+JytcclxuICAgICAgICAgICAgJzwvdGFibGU+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfY291cnNlKCl7XHJcblx0XHRcdFEucmVnKCdnZXRDb3Vyc2UnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldENvdXJzZV9wYWdlLnNob3coKTtcclxuXHJcblx0XHRcdFx0XHRnZXRDb3Vyc2VBbmRTZXRUcigpO1xyXG5cdFx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdH1cdFxyXG5cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBnZXRDb3Vyc2VBbmRTZXRUcih0ZXJtKXtcclxuXHRcdFx0JC5wb3N0KCcvZ2V0Q291cnNlJyxmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdCQoJyNjb3Vyc2UnKS5odG1sKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9jb3Vyc2U6cm91dGVyX2NvdXJzZVxyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgZ2V0Q291cnNlVGFibGU9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZ2V0Q291cnNlVGFibGVfcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRpZDonY291cnNlVGFibGUtY29udGFpbmVyJyxcclxuXHRcdFx0Y29udGVudDonPGZvcm0+JytcclxuXHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj4nK1xyXG4gICAgXHRcdFx0XHQnPHNlbGVjdCBpZD1cInRyZW1TZWxlY3RcIj4nK1xyXG4gICAgICBcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+MjAxNjIwMTdhPC9vcHRpb24+JytcclxuICAgICAgXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIjIwMTUyMDE2c1wiPjIwMTUyMDE2czwvb3B0aW9uPicrXHJcbiAgICAgIFx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCIyMDE2MjAxN2FcIj4yMDE2MjAxN2E8L29wdGlvbj4nK1xyXG4gICAgICBcdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiMjAxNjIwMTdzXCI+MjAxNjIwMTdzPC9vcHRpb24+JytcclxuICAgIFx0XHRcdFx0Jzwvc2VsZWN0PicrXHJcbiAgICBcdFx0XHRcdFxyXG4gIFx0XHRcdFx0JzwvZGl2PicrXHJcbiAgXHRcdFx0XHQnPC9mb3JtPicrXHJcblx0XHRcdCc8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/or77ooagnK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwiIGJvcmRlcmVkXCIgPicrXHJcbiAgICAgICAgICAgICAgJzx0Ym9keSBpZD1cImNvdXJzZVRhYmxlXCI+PC90Ym9keT4nK1xyXG4gICAgICAgICAgICAnPC90YWJsZT4nXHJcblx0XHR9KVxyXG5cclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9jb3Vyc2VUYWJsZSgpe1xyXG5cdFx0XHRRLnJlZygnY291cnNlVGFibGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRpZihhaGVscC5ub0xvZ2luVG9Mb2dpbigpKXtcclxuXHRcdFx0XHRcdGdldENvdXJzZVRhYmxlX3BhZ2Uuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGdldENvdXJzZVRhYmxlQW5kU2V0VHIoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JCgnI3RyZW1TZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0Z2V0Q291cnNlVGFibGVBbmRTZXRUcigkKHRoaXMpLnZhbCgpKVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVx0XHJcblxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGdldENvdXJzZVRhYmxlQW5kU2V0VHIodGVybSl7XHJcblx0XHRcdCQucG9zdCgnL2dldENvdXJzZVRhYmxlJyx7dHI6dGVybX0sZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHQkKCcjY291cnNlVGFibGUnKS5odG1sKGRhdGEpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHR9XHRcdFxyXG5cdFx0XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9jb3Vyc2VUYWJsZTpyb3V0ZXJfY291cnNlVGFibGVcclxuXHRcdH1cclxuXHJcbn0pKCk7IiwidmFyIGdldEd5bUNvdW50PShcclxuXHRmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGdldEd5bUNvdW50X3BhZ2U9bmV3IGNvbW1vbl9wYWdlKHtcclxuXHRcdFx0aWQ6J2d5bUNvdW50LWNvbnRhaW5lcicsXHJcblx0XHRcdGNvbnRlbnQ6JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0J+acrOWtpuacn+S9k+mUu+aDheWGtScrXHJcblx0XHRcdCc8L2gyPicrXHJcblx0XHRcdCc8dGFibGUgY2xhc3M9XCIgYm9yZGVyZWRcIiA+JytcclxuICAgICAgICAgICAgICAnPHRib2R5IGlkPVwiZ3ltQ291bnRcIj48L3Rib2R5PicrXHJcbiAgICAgICAgICAgICc8L3RhYmxlPidcclxuXHRcdH0pXHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX2d5bUNvdW50KCl7XHJcblx0XHRcdFEucmVnKCdneW1Db3VudCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdGlmKGFoZWxwLm5vTG9naW5Ub0xvZ2luKCkpe1xyXG5cdFx0XHRcdFx0Z2V0R3ltQ291bnRfcGFnZS5zaG93KCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGdldEd5bUNvdW50QW5kU2V0VHIodG9vbC5nZXRDb29raWUoJ2lkJykpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHRcclxuXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gZ2V0R3ltQ291bnRBbmRTZXRUcihpZCl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGlkKVxyXG5cdFx0XHQkLnBvc3QoJy9nZXRHeW1Db3VudCcse3N0dUlkOmlkfSxmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYoZGF0YT09XCI8dHI+PC90cj48dHI+PC90cj5cIil7XHJcblx0XHRcdFx0XHRcdC8vYWxlcnQoMSlcclxuXHRcdFx0XHRcdFx0ZGF0YT0nPHRyPjx0ZD7llYrlgbbvvIHlj6/og73kvZPogrLpg6jnmoTnvZHnq5nngrjkuobvvIznqI3lkI7ph43or5V+PC90ZD48L3RyPidcclxuXHRcdFx0XHRcdFx0Ly8kKCcjZ3ltQ291bnQnKS5odG1sKCc8dHI+PHRkPuWViuWBtu+8geWPr+iDveS9k+iCsumDqOeahOe9keermeeCuOS6hu+8jOeojeWQjumHjeivlX48L3RkPjwvdHI+Jyk7XHJcblx0XHRcdFx0XHR9XHJcbi8vXHRcdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0XHRcdCQoJyNneW1Db3VudCcpLmh0bWwoZGF0YSk7XHJcbi8vXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0fVx0XHRcclxuXHRcdFxyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRyb3V0ZXJfZ3ltQ291bnQ6cm91dGVyX2d5bUNvdW50XHJcblx0XHR9XHJcblxyXG59KSgpOyIsInZhciBnZXRTY29yZT0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBnZXRTY29yZV9wYWdlPW5ldyBjb21tb25fcGFnZSh7XHJcblx0XHRcdGlkOidzY29yZS1jb250YWluZXInLFxyXG5cdFx0XHRjb250ZW50Oic8aDIgY2xhc3M9XCJoZWFkZXJcIj4nK1xyXG5cdFx0XHRcdCfmnKzlrabmnJ/miJDnu6knK1xyXG5cdFx0XHQnPC9oMj4nK1xyXG5cdFx0XHQnPHRhYmxlIGNsYXNzPVwic3RyaXBlZCBcIj4nK1xyXG4gICAgICAgICAgICAgICc8dGhlYWQ+JytcclxuICAgICAgICAgICAgICAgICc8dHI+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHRoID7or77nqIvlkI3np7A8L3RoPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzx0aCA+5a2m5YiGPC90aD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8dGggPuaIkOe7qTwvdGg+JytcclxuICAgICAgICAgICAgICAgICc8L3RyPicrXHJcbiAgICAgICAgICAgICAgJzwvdGhlYWQ+JytcclxuICAgICAgICAgICAgICAnPHRib2R5PjwvdGJvZHk+JytcclxuICAgICAgICAgICAgJzwvdGFibGU+J1xyXG5cdFx0fSlcclxuXHJcblx0XHRmdW5jdGlvbiByb3V0ZXJfc2NvcmUoKXtcclxuXHRcdFx0US5yZWcoJ3Njb3JlJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGFoZWxwLm5vTG9naW5Ub0xvZ2luKCk7XHJcblx0XHRcdFx0Z2V0U2NvcmVfcGFnZS5zaG93KCk7XHJcblx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLnNpZGVOYXYoJ2hpZGUnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRnZXRTY29yZUFuZFNldFRyKCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gZ2V0U2NvcmVBbmRTZXRUcigpe1xyXG5cdFx0XHQkLnBvc3QoJy9nZXRTY29yZScsZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHR2YXIgY291cnNlQXJyYXk9SlNPTi5wYXJzZShkYXRhKS5zY29yZUxpc3RzOy8vYXJyYXlcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKHR5cGVvZiBkYXRhKTtcclxuXHRcdFx0XHRcdHZhciBzdHI9Jyc7IFxyXG5cdFx0XHRcdFx0Zm9yKHZhciBpIGluIGNvdXJzZUFycmF5KXtcclxuXHRcdFx0XHRcdFx0c3RyKz0nPHRyPjx0ZD4nK2NvdXJzZUFycmF5W2ldLm5hbWUrJzwvdGQ+PHRkPidcclxuXHRcdFx0XHRcdFx0K2NvdXJzZUFycmF5W2ldLmNyZWRpdCsnPC90ZD48dGQ+J1xyXG5cdFx0XHRcdFx0XHQrY291cnNlQXJyYXlbaV0uc2NvcmUrJzwvdGQ+PC90cj4nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnMScrc3RyKVxyXG5cdFx0XHRcdFx0JCgnI3Njb3JlLWNvbnRhaW5lciB0YWJsZSB0Ym9keScpLmh0bWwoc3RyKTtcclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdH1cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX3Njb3JlOnJvdXRlcl9zY29yZVxyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJ2YXIgaG9tZT0oXHJcblx0ZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIHJvdXRlcl9ob21lKCl7XHJcblx0XHRcdFEucmVnKCdob21lJyxmdW5jdGlvbigpe1xyXG5cclxuXHRcdFx0XHRjb21tb25fcGFnZV9ub3dfc2hvdy5oaWRlKCk7XHJcblx0XHRcdFx0Y29tbW9uX3BhZ2Vfbm93X3Nob3cucHVzaCgkKCcjbWFpbi1jb250YWluZXInKSk7XHJcblx0XHRcdFx0Y29tbW9uX3BhZ2Vfbm93X3Nob3cuc2hvdygpO1x0XHJcblxyXG5cdFx0XHRcdGlmKGFoZWxwLmlzTG9naW5lZCgpKXtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5uYW1lJykudGV4dCh0b29sLmdldENvb2tpZSgndXNlcm5hbWUnKSkucGFyZW50KCkuYXR0cignaHJlZicsJyMnKTtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJycpLnBhcmVudCgpLm9mZignY2xpY2snKTtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJ+mAgOWHuueZu+W9lScpLnBhcmVudCgpLmNsaWNrKGxvZ2lub3V0KTtcclxuXHRcdFx0XHRcdC8vICQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJ+mAgOWHuueZu+W9lScpLnBhcmVudCgpLmNsaWNrKGxvZ2lub3V0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5uYW1lJykudGV4dCgn6K+355m75b2VJykucGFyZW50KCkuYXR0cignaHJlZicsJyMhbG9naW4nKTtcclxuXHRcdFx0XHRcdCQoJyNuYXYtbW9iaWxlIGEgc3Bhbi5sb2dpbm91dCcpLnRleHQoJycpLnBhcmVudCgpLm9mZignY2xpY2snKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdFxyXG5cdFx0XHQkLmdldChcIi9ob21lXCIsIGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQgIGNvbnNvbGUubG9nKCBkYXRhKTtcclxuXHRcdFx0ICB2YXIgbGlMaXN0PSQoJy5jb2xsZWN0aW9uIGxpJyk7XHJcblx0XHRcdCAgdmFyIGxlbj1saUxpc3QubGVuZ3RoO1xyXG5cdFx0XHQgIGZvcih2YXIgaT0wO2k8bGVuO2krKyl7XHJcblx0XHRcdCAgXHQkKGxpTGlzdFtpXSkuY2hpbGRyZW4oKS5hdHRyKCdocmVmJywnIyF1LycrZGF0YVtpXS5saW5rKTtcclxuXHRcdFx0ICBcdCQobGlMaXN0W2ldKS5jaGlsZHJlbigpLmh0bWwoZGF0YVtpXS50ZXh0Kyc8c3Bhbj4nK2RhdGFbaV0udGltZSsnPC9zcGFuPicpO1xyXG5cdFx0XHQgIH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRmdW5jdGlvbiBsb2dpbm91dCgpe1xyXG5cdFx0XHR0b29sLmNsZWFyQ29va2llKCk7XHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCfpgIDlh7rmiJDlip8nLCA0MDAwKTtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWxvZ2luJztcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWhvbWUnO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm57XHJcblx0XHRcdHJvdXRlcl9ob21lOnJvdXRlcl9ob21lXHJcblx0XHR9XHJcblxyXG59KSgpOyIsIlxyXG52YXIgbG9naW49KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbG9naW5fcGFnZT1uZXcgY29tbW9uX3BhZ2Uoe1xyXG5cdFx0XHRcdGlkOidsb2dpbi1jb250YWluZXInLFxyXG5cdFx0XHRcdGNvbnRlbnQ6JzxoMiBjbGFzcz1cImhlYWRlclwiPicrXHJcblx0XHRcdFx0XHRcdFx0J+ivt+i+k+WFpeaVmeWKoeWkhOi0puWPt+WvhueggeeZu+W9lScrXHJcblx0XHRcdFx0XHRcdCc8L2gyPicrXHJcblx0XHRcdFx0XHRcdCc8Zm9ybSA+JytcclxuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0XHRcdCAgICAgICAgICBcdFx0XHQnPGlucHV0IGlkPVwidXNlbmFtZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ2YWxpZGF0ZVwiIG5hbWU9XCJ1c2VuYW1lXCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwidXNlbmFtZVwiPuWtpuWPtzwvbGFiZWw+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHQnPC9kaXY+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHQnPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzNlwiPicrXHJcblx0XHRcdCAgICAgICAgICBcdFx0XHQnPGlucHV0IGlkPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBjbGFzcz1cInZhbGlkYXRlXCIgbmFtZT1cInBhc3N3b3JkXCI+JytcclxuXHRcdFx0ICAgICAgICAgIFx0XHRcdCc8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj7mlZnliqHlpITlr4bnoIE8L2xhYmVsPicrXHJcblx0XHQgICAgICAgIFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0ICAgICAgICBcdFx0XHQnIDxwPicrXHJcbiAgICAgIFx0XHRcdFx0XHRcdFx0JzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImlzU2F2ZUxvZ2luXCIgLz4nK1xyXG4gICAgICBcdFx0XHRcdFx0XHRcdCc8bGFiZWwgZm9yPVwiaXNTYXZlTG9naW5cIj4zMOWkqeiusOS9j+aIkTwvbGFiZWw+JytcclxuICAgIFx0XHRcdFx0XHRcdCc8L3A+JytcclxuXHRcdCAgICAgICAgXHRcdFx0JzxidXR0b24gY2xhc3M9XCJidG4gd2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhY3Rpb25cIiBpZD1cImxvZ2luXCI+JytcclxuXHRcdCAgICAgICAgXHRcdFx0XHQn55m75b2VJytcclxuXHRcdCAgXHRcdFx0XHRcdCc8L2J1dHRvbj4nK1xyXG5cdFx0ICBcdFx0XHRcdCc8L2Zyb20+J1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gcm91dGVyX2xvZ2luKCl7XHJcblx0XHRcdFEucmVnKCdsb2dpbicsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRsb2dpbl9wYWdlLnNob3coKTtcclxuXHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykuc2lkZU5hdignaGlkZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdCQoJyNsb2dpbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIGlzTG9naW5fMzA9JCgnI2lzU2F2ZUxvZ2luJykucHJvcCgnY2hlY2tlZCcpO1xyXG5cdFx0XHRcdCQuYWpheCh7XHJcblx0XHRcdFx0XHR0eXBlOidwb3N0JyxcclxuXHRcdFx0XHRcdHVybDonL2xvZ2luJyxcclxuXHRcdFx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdFx0XHQndXNlbmFtZSc6JCgnI3VzZW5hbWUnKS52YWwoKSxcclxuXHRcdFx0XHRcdFx0J3Bhc3N3b3JkJzokKCcjcGFzc3dvcmQnKS52YWwoKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGF0YS5sZW5ndGg+MT9sb2dpblN1Y2Nlc3MoZGF0YSxpc0xvZ2luXzMwKTpsb2dpbkZhaWwoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZScsJ3RydWUnKTtcclxuXHRcdFx0fSk7XHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gbG9naW5TdWNjZXNzKGNvb2tpZSxpc18zMCl7XHJcblx0XHRcdHZhciB0aW1lPWlzXzMwPzMwOm51bGw7XHJcblx0XHRcdHRvb2wuc2V0Q29va2llKCdpZCcsJCgnI3VzZW5hbWUnKS52YWwoKSx0aW1lKTtcclxuXHRcdFx0XHJcblxyXG5cdFx0XHRNYXRlcmlhbGl6ZS50b2FzdCgn55m75b2V5oiQ5YqfJywgNDAwMCk7XHJcblx0XHRcdGFoZWxwLnNldFVzZXJJZChjb29raWUsdGltZSk7XHJcblx0XHRcdGFoZWxwLnNldGxvZ2lubmFtZShjb29raWUsdGltZSk7XHJcblxyXG5cdFx0XHQkLnBvc3QoJy9nZXROYW1lJyxmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0dG9vbC5zZXRDb29raWUoJ3VzZXJuYW1lJyxkYXRhLHRpbWUpO1xyXG5cdFx0XHRcdFx0XHQkKCcjbmF2LW1vYmlsZSBhIHNwYW4ubmFtZScpLnRleHQoZGF0YSkucGFyZW50KCkuYXR0cignaHJlZicsJyMnKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHQkKCcjbG9naW4nKS5hdHRyKCdkaXNhYmxlJywnZmFsc2UnKTtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uPScjIWhvbWUnO1xyXG5cdFx0fVxyXG5cdFx0ZnVuY3Rpb24gbG9naW5GYWlsKCl7XHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCfnmbvlvZXlpLHotKUnLCA0MDAwKTtcclxuXHRcdH1cdFx0XHJcblx0XHRcclxuXHRcdHJldHVybntcclxuXHRcdFx0cm91dGVyX2xvZ2luOnJvdXRlcl9sb2dpblxyXG5cdFx0fVxyXG5cclxufSkoKTsiLCJmdW5jdGlvbiBsb2dpbm91dCgpe1xyXG5cdGRvY3VtZW50LmNvb2tpZT0nJztcclxuXHR3aW5kb3cubG9jYXRpb249JyMhaG9tZSc7XHJcbn0iLCJcclxuKGZ1bmN0aW9uKCl7XHJcblx0XHRcclxuXHRcdGhvbWUucm91dGVyX2hvbWUoKTtcclxuXHRcdGxvZ2luLnJvdXRlcl9sb2dpbigpO1xyXG5cdFx0ZGV0YWlsLnJvdXRlcl91KCk7XHJcblx0XHRnZXRTY29yZS5yb3V0ZXJfc2NvcmUoKTtcclxuXHRcdGdldENvdXJzZVRhYmxlLnJvdXRlcl9jb3Vyc2VUYWJsZSgpO1xyXG5cdFx0Z2V0R3ltQ291bnQucm91dGVyX2d5bUNvdW50KCk7XHJcblx0XHRnZXRDb3Vyc2Uucm91dGVyX2NvdXJzZSgpO1xyXG5cdFx0ZmVlZGJhY2sucm91dGVyX2ZlZWRiYWNrKCk7XHJcblx0XHRRLmluaXQoe1xyXG5cdFx0XHRrZXk6JyEnLC8qIHVybOmHjCPlkox1cmzlkI3kuYvpl7TnmoTliIblibLnrKblj7cg6buY6K6k5Li65oSf5Y+55Y+3ICovXHJcblx0XHRcdGluZGV4Oidob21lJywvKiDpppbpobXlnLDlnYAg5aaC5p6c6K6/6Zeu5Yiw5LiN6IO96K6/6Zeu6aG16Z2i5Lmf5Lya6Lez5Zue5q2k6aG1ICovXHJcblx0XHRcdHBvcDpmdW5jdGlvbihMKXsvKiDmr4/mrKHmnIl1cmzlj5jmm7Tml7bpg73kvJrop6blj5Fwb3Dlm57osIMgKi9cclxuXHRcdFx0XHRjb25zb2xlLmxvZygncG9wIOW9k+WJjeWPguaVsOaYrzonK0wpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHQkKFwiLmJ1dHRvbi1jb2xsYXBzZVwiKS5zaWRlTmF2KCk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgXHQkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKTtcclxuICAgIFx0JCgnLmNvbGxhcHNpYmxlJykuY29sbGFwc2libGUoe1xyXG4gICAgICBcdFx0YWNjb3JkaW9uIDogZmFsc2UgLy8gQSBzZXR0aW5nIHRoYXQgY2hhbmdlcyB0aGUgY29sbGFwc2libGUgYmVoYXZpb3IgdG8gZXhwYW5kYWJsZSBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGFjY29yZGlvbiBzdHlsZVxyXG4gICAgXHR9KTtcclxuICBcdH0pO1xyXG4gICAgICAgXHJcblxyXG59KSgpOyIsInZhciBjb21tb25fcGFnZV9ub3dfc2hvdz17XHJcblx0ZWxlOm51bGxcclxufTtcclxuY29tbW9uX3BhZ2Vfbm93X3Nob3cucHVzaD1mdW5jdGlvbihub3dfc2hvdyl7XHJcblx0dGhpcy5lbGU9bm93X3Nob3c7XHJcbn07XHJcbmNvbW1vbl9wYWdlX25vd19zaG93LnNob3c9ZnVuY3Rpb24oKXtcclxuXHR0aGlzLmVsZT90aGlzLmVsZS5zaG93KCk6bnVsbDtcclxufTtcclxuY29tbW9uX3BhZ2Vfbm93X3Nob3cuaGlkZT1mdW5jdGlvbigpe1xyXG5cdHRoaXMuZWxlP3RoaXMuZWxlLmhpZGUoKTpudWxsO1xyXG59XHJcblxyXG52YXIgY29tbW9uX3BhZ2U9ZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLl9tYWluPSQoJzxkaXY+Jyx7XHJcblx0XHQnY2xhc3MnOidhbGwnLFxyXG5cdFx0J2lkJzpvYmouaWRcclxuXHR9KTtcclxuXHR2YXIgbWFpbl9uYXY9JzxuYXYgPicrXHJcblx0JzxkaXYgY2xhc3M9XCJjb250YWluZXJcIj4nK1xyXG5cdFx0JzxhIGhyZWY9XCIjIWhvbWVcIj4nK1xyXG5cdFx0XHQnPGltZyBzcmM9XCIuL3B1YmxpYy9pbWcvYXJyb3cucG5nXCIgY2xhc3M9XCJyZXR1cm5cIiA+JytcclxuXHRcdCc8L2E+JytcclxuXHQnPC9kaXY+JytcclxuXHQnPC9uYXY+J1xyXG5cdHRoaXMuX21haW4uaHRtbChtYWluX25hdik7XHJcblx0XHJcblx0JCgnPGRpdj4nLHtcclxuXHRcdCdjbGFzcyc6J2NvbnRhaW5lcidcclxuXHR9KS5odG1sKG9iai5jb250ZW50KVxyXG5cdC5hcHBlbmRUbyh0aGlzLl9tYWluKTtcclxuXHJcblx0dGhpcy5fbWFpbi5hcHBlbmRUbygnYm9keScpO1xyXG59O1xyXG5cclxuY29tbW9uX3BhZ2UucHJvdG90eXBlLnNob3c9ZnVuY3Rpb24oKXtcclxuXHRjb21tb25fcGFnZV9ub3dfc2hvdy5oaWRlKCk7XHJcblx0Y29tbW9uX3BhZ2Vfbm93X3Nob3cucHVzaCh0aGlzLl9tYWluKTtcclxuXHRjb21tb25fcGFnZV9ub3dfc2hvdy5zaG93KCk7XHJcbn07IiwidmFyIFxyXG5RPWZ1bmN0aW9uKFcsRCxNLEhUTUwsaGFzaCx2aWV3LGFyZyxMTCxpLGluZGV4LFJlZ2V4LGtleSxRKXtcclxuXHRIVE1MPUQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXTtcclxuXHRSZWdleD1bXTtcclxuXHRrZXk9JyEnO1xyXG5cdG9uaGFzaGNoYW5nZT1mdW5jdGlvbigpe1xyXG5cdFx0US5oYXNoPWhhc2g9bG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoa2V5Lmxlbmd0aCsxKTtcclxuXHJcblx0XHRhcmc9aGFzaC5zcGxpdCgnLycpO1xyXG5cclxuXHRcdGk9UmVnZXgubGVuZ3RoO1xyXG5cdFx0d2hpbGUoaS0tKVxyXG5cdFx0XHRpZihMTD1oYXNoLm1hdGNoKFJlZ2V4W2ldKSl7XHJcblx0XHRcdFx0YXJnWzBdPVJlZ2V4W2ldO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0aWYoIVFbYXJnWzBdXSlcclxuXHRcdFx0YXJnWzBdPWluZGV4O1xyXG5cdFx0XHJcblx0XHRpZihRLnBvcClcclxuXHRcdFx0US5wb3AuYXBwbHkoVyxhcmcpO1xyXG5cclxuXHRcdFEubGFzaD12aWV3PWFyZy5zaGlmdCgpO1xyXG5cclxuXHRcdEhUTUwuc2V0QXR0cmlidXRlKCd2aWV3Jyx2aWV3KTtcclxuXHJcblx0XHRRW3ZpZXddLmFwcGx5KFcsYXJnKTtcclxuXHR9O1xyXG5cdFE9e1xyXG5cdFx0aW5pdDpmdW5jdGlvbihvKXtcclxuXHJcblx0XHRcdGlmKG8ua2V5IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdGtleT1vLmtleTtcclxuXHJcblx0XHRcdGluZGV4PW8uaW5kZXh8fCdWJztcclxuXHJcblx0XHRcdGlmKG8ucG9wJiZ0eXBlb2Ygby5wb3A9PSdmdW5jdGlvbicpXHJcblx0XHRcdFx0US5wb3A9by5wb3A7XHJcblxyXG5cdFx0XHRvbmhhc2hjaGFuZ2UoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0cmVnOmZ1bmN0aW9uKHIsdSl7XHJcblx0XHRcdGlmKCFyKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdGlmKHUgPT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRcdHU9ZnVuY3Rpb24oKXt9O1xyXG5cclxuXHRcdFx0aWYociBpbnN0YW5jZW9mIFJlZ0V4cCl7XHJcblx0XHRcdFx0UVtyXT11O1xyXG5cdFx0XHRcdFJlZ2V4LnB1c2gocik7XHJcblx0XHRcdH1lbHNlIGlmKHIgaW5zdGFuY2VvZiBBcnJheSl7Ly/mlbDnu4Tms6jlhoxcclxuXHRcdFx0XHRmb3IodmFyIGkgaW4gcil7XHJcblx0XHRcdFx0XHRMPVtdLmNvbmNhdChyW2ldKS5jb25jYXQodSk7XHJcblx0XHRcdFx0XHR0aGlzLnJlZy5hcHBseSh0aGlzLEwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UgaWYodHlwZW9mIHI9PSdzdHJpbmcnKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgdT09J2Z1bmN0aW9uJylcclxuXHRcdFx0XHRcdFFbcl09dTtcclxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiB1PT0nc3RyaW5nJyYmUVt1XSlcclxuXHRcdFx0XHRcdFFbcl09UVt1XTtcclxuXHRcdFx0fVx0XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fSxcclxuXHRcdFY6ZnVuY3Rpb24oKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ1EuanMgPGh0dHBzOi8vZ2l0aHViLmNvbS9pdG9yci9xLmpzPiAyMDE0LzEyLzI4Jyk7XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHR9LFxyXG5cdFx0Z286ZnVuY3Rpb24odSl7XHJcblx0XHRcdGxvY2F0aW9uLmhhc2g9JyMnK2tleSt1O1xyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIFE7XHJcbn0odGhpcyxkb2N1bWVudCk7IiwidmFyIHRvb2w9KFxyXG5cdGZ1bmN0aW9uKCl7XHJcblx0XHRmdW5jdGlvbiBnZXRDb29raWUoY19uYW1lKVxyXG5cdFx0e1xyXG5cdFx0aWYgKGRvY3VtZW50LmNvb2tpZS5sZW5ndGg+MClcclxuXHRcdCAge1xyXG5cdFx0ICBjX3N0YXJ0PWRvY3VtZW50LmNvb2tpZS5pbmRleE9mKGNfbmFtZSArIFwiPVwiKVxyXG5cdFx0ICBpZiAoY19zdGFydCE9LTEpXHJcblx0XHQgICAgeyBcclxuXHRcdCAgICBjX3N0YXJ0PWNfc3RhcnQgKyBjX25hbWUubGVuZ3RoKzEgXHJcblx0XHQgICAgY19lbmQ9ZG9jdW1lbnQuY29va2llLmluZGV4T2YoXCI7XCIsY19zdGFydClcclxuXHRcdCAgICBpZiAoY19lbmQ9PS0xKSBjX2VuZD1kb2N1bWVudC5jb29raWUubGVuZ3RoXHJcblx0XHQgICAgcmV0dXJuIHVuZXNjYXBlKGRvY3VtZW50LmNvb2tpZS5zdWJzdHJpbmcoY19zdGFydCxjX2VuZCkpXHJcblx0XHQgICAgfSBcclxuXHRcdCAgfVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0Q29va2llKGNfbmFtZSx2YWx1ZSxleHBpcmVkYXlzKXtcclxuXHRcdFx0dmFyIGV4ZGF0ZT1uZXcgRGF0ZSgpXHJcblx0XHRcdGV4ZGF0ZS5zZXREYXRlKGV4ZGF0ZS5nZXREYXRlKCkrZXhwaXJlZGF5cylcclxuXHRcdFx0ZG9jdW1lbnQuY29va2llPWNfbmFtZSsgXCI9XCIgK2VzY2FwZSh2YWx1ZSkrXHJcblx0XHRcdCgoZXhwaXJlZGF5cz09bnVsbCkgPyBcIlwiIDogXCI7ZXhwaXJlcz1cIitleGRhdGUudG9HTVRTdHJpbmcoKSlcclxuXHRcdH1cclxuXHRcdGZ1bmN0aW9uIGNsZWFyQ29va2llKCl7IFxyXG5cdFx0XHR2YXIga2V5cz1kb2N1bWVudC5jb29raWUubWF0Y2goL1teID07XSsoPz1cXD0pL2cpOyBcclxuXHRcdFx0aWYgKGtleXMpIHsgXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IGtleXMubGVuZ3RoOyBpLS07KSBcclxuXHRcdFx0XHRcdGRvY3VtZW50LmNvb2tpZT1rZXlzW2ldKyc9MDtleHBpcmVzPScgKyBuZXcgRGF0ZSggMCkudG9VVENTdHJpbmcoKSBcclxuXHRcdFx0fSBcclxuXHRcdH0gXHJcblx0XHRyZXR1cm57XHJcblx0XHRcdGdldENvb2tpZTpnZXRDb29raWUsXHJcblx0XHRcdHNldENvb2tpZTpzZXRDb29raWUsXHJcblx0XHRcdGNsZWFyQ29va2llOmNsZWFyQ29va2llXHJcblx0XHR9XHJcbn0pKCk7IixudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
