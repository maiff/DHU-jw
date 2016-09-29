var request= require('superagent');
var charset = require('superagent-charset');
charset(request);

var cheerio=require('cheerio');

exports=module.exports=function getStudentNo(cookie,fn){
	request.get(`http://jw.dhu.edu.cn/dhu/student/query/scorepoint.jsp`)
   				  .charset('GBK ')
   				  .set("Cookie", cookie)                 
          		  .end(function(err, res){
          		  	var html=res.text;
               		var $=cheerio.load(html);
          		  	var studentNo=$('table').eq(1).find('tr').eq('2').find('td').eq(0).text()
          		  	fn(studentNo);
          		  });
}