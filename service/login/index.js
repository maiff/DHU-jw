var request= require('superagent');

exports=module.exports=function loginAndReturnCookie(username,password,fn){
	var fn=fn||function(){};
	var postMes=`userName=${username}&userPwd=${password}`;
	request.post('http://jw.dhu.edu.cn/dhu/login_wz.jsp')
	  		.send(postMes).redirects(0)
	  		.end(function(err,res){
	  			if(res.header){
		  			var cookie=res.header['set-cookie'];
		  			//console.log(deal_cookie(cookie))
		  			deal_cookie(cookie);
		  			fn(cookie);
	  			}else{
	  				loginAndReturnCookie(username,password,fn);
	  			}

	  		});
	  		
};

function deal_cookie(cookie){
	if(cookie==undefined){
		console.log('cookie is not exit!');
		return false;

	}
	else if(cookie.length>1){
		console.log('login successfully!');
		return cookie;

	}
	else{
		console.log('usename or password is error!');
		return false;
	}
	// console.log(cookie)
	
}