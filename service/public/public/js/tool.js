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