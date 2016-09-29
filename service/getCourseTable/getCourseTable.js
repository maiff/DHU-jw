var request= require('superagent');
var charset = require('superagent-charset');
charset(request);

var cheerio=require('cheerio');

exports=module.exports=function getCourseTable(cookie,term,fn){
	request.post('http://jw.dhu.edu.cn/dhu/student/studentcoursetable.jsp')
   				  .send(`yt=${term}`)
                      .charset('GBK ')
   				  .set("Cookie", cookie)                 
          		  .end(function(err, res){
          		  	var html=res.text;
               		var $=cheerio.load(html);
          		  	$('table').eq(2).html()
                         //console.log($('table').eq(1).text());
          		  	fn($('table').eq(1).html())
          		  	//console.log(JSON.stringify(obj));
 	
          		  });
}