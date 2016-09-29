var request= require('superagent');
var charset = require('superagent-charset');
charset(request);

var cheerio=require('cheerio');

exports=module.exports=function getScore(cookie,fn){
	request.get('http://jw.dhu.edu.cn/dhu/admin/score/classscorelist.jsp')
   				  .charset('GBK ')
   				  .set("Cookie", cookie)                 
          		  .end(function(err, res){
          		  	var html=res.text;
               		var $=cheerio.load(html);
          		  	//console.log($('table[bordercolor="#000000"] tr').length);
          		  	var trLists=Array.from($('table[bordercolor="#000000"] tr'));
          		  	trLists=trLists.slice(1,trLists.length-3);
          		  	// for(var i in trLists){
          		  	// 	console.log($(trLists[i]).text())
          		  	// }
          		  	
          		  	
          		  	var scoreLists=[];
          		  	trLists.forEach(function(ele){
          		  		var obj={
	          		  		name:'',
	          		  		credit:'',
	          		  		crouseProperty:'',
	          		  		score:'',
	          		  		isCredit:'',
	          		  		isGPA:'',
	          		  	};
          		  		var count=0;
          		  		for(var i in obj){
          		  			obj[i]=$(ele).find('td').eq(count++).text();
          		  			
          		  		}
          		  		scoreLists.push(obj);
          		  	});
          		  	var obj={scoreLists:scoreLists};
          		  	fn(JSON.stringify(obj))
          		  	//console.log(JSON.stringify(obj));
 	
          		  });
}