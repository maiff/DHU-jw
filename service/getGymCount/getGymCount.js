var cheerio=require('cheerio');

var request= require('superagent');


//var get_cookie=null;
module.exports=function get(stuId,fn){
	// if(get_cookie==null){
	// 	getCookie(stuId,fn);
	// }
	// else{
	// 	console.log(get_cookie);
	// 	getGymCount(get_cookie,stuId,fn);
	// }
	getCookie(stuId,fn);
}
function getGymCount(cookie,stuId,fn){
	request.post(`http://218.193.151.40/SportWeb/gym/gymExercise/gymExercise_query_result.jsp?collegeName=&operType=2&pageno=1&qryType=1&queryType=1&queryValue=${stuId}&queryValue1=${stuId}&queryValue2=&queryValue3=&submit=%E6%9F%A5%20%20%E8%AF%A2`)
	   .redirects(0)
	   .set("Cookie", cookie)
	   .end(function(err,res){
	   		var html=res.text;
	   		var $=cheerio.load(html);
	   		var tr=$('form[name="formone"]').find('table').find('table tr');
	   		var info=tr.eq(2)+'';
	   		var title_tr=$('<tr></tr>')
	   		tr.eq(3).find('td').each(function(index,element){
	   			if(index<4||index==12){
	   				title_tr.append(element);
	   			}
	   		});

	   		
	   		var content_tr=$('<tr></tr>');
	   		tr.eq(4).find('td').each(function(index,element){
	   			if(index<4||index==12){
	   				content_tr.append(element);
	   			}
	   		});;
	   		fn(info+title_tr+content_tr);
	   		// console.log(content_tr.text())
	   		//console.log(info+title+content)
	   });
}

function getCookie(stuId,fn){
	request.post('http://218.193.151.40/servlet/adminservlet?displayName=&displayPasswd=&operType=1&passwd=wxf123dzq&select=1&submit.x=55&submit.y=24&userName=xqltyb')
		   .redirects(0)
		   .end(function(err,res){
		   	if(res.header){
		   		var cookie=res.header['set-cookie'];
		   		get_cookie=cookie;
		   		getGymCount(cookie,stuId,fn);
		   	}else{
		   		getCookie(stuId,fn);
		   	}
		   });

}

// setInterval(function(){
// 	request.post('http://218.193.151.40/servlet/adminservlet?displayName=&displayPasswd=&operType=1&passwd=wxf123dzq&select=1&submit.x=55&submit.y=24&userName=xqltyb')
// 		   .redirects(0)
// 		   .end(function(err,res){
// 		   		var cookie=res.header['set-cookie'];
// 		   		get_cookie=cookie;
// 		   		console.log(cookie)
// 		   		//getGymCount(cookie,stuId,fn);
// 		   });
// },24*3600);