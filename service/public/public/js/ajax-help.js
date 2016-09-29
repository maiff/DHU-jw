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

