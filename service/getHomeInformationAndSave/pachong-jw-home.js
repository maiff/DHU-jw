'use strict'
var fs=require('fs');

var cheerio=require('cheerio');

var request= require('superagent');
var charset = require('superagent-charset');
charset(request);

var header={
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding':'gzip, deflate, sdch',
	'Accept-Language':'zh-CN,zh;q=0.8',
	'Cache-Control':'max-age=0',
	'Connection':'keep-alive',
	'Cookie':'shxz=0539774974;',
	'Host':'jw.dhu.edu.cn',
	'Upgrade-Insecure-Requests':1,
	'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
}


function sp_jw_home(fn){
	request.get('http://jw.dhu.edu.cn/dhu/index/')
		.charset('gbk')
		.set(header)
		.end(function(err,res){
			//console.log(res.text);
			var container=[];

			var $=cheerio.load(res.text);

			$('#page-content-l-stud li').each(function(){
				getInformation($(this),container);
			});
			//console.log(container);
			saveInformation(container,fn);

			


		});
}
module.exports=sp_jw_home;

function getInformation(ele,container){
				var obj={
					link:'',
				 	text:'',
				  	time:''	
				};
				var a=ele.children('span').children('a');
				obj.time=ele.children('span').eq(1).text();
				obj.link=a.attr('href');
				obj.text=a.text();
				container.push(obj);

}

function saveInformation(data,fn){
	var data=JSON.stringify(data);
	fs.writeFile('information.json', data,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   //console.log(fn)
   fn()
});
}
//sp_jw_home();