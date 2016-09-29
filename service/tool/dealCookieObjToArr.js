exports=module.exports=function deal_cookie(cookies_obj){
	var cookies_arr=[];
	var count=0;
	for(var i in cookies_obj){
		cookies_arr[count++]=`${i}=${cookies_obj[i]}`
	}
	return cookies_arr;
}