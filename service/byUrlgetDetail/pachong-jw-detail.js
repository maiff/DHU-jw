'use strict'


var cheerio=require('cheerio');

var request= require('superagent');
var charset = require('superagent-charset');
charset(request);
var path=require('path');

var obj={
	title:'',
	content:''
}
var dowFile=require('../getDetailInner/dowFile');

function sp_jw_detail(url,fn){
	request.get(url)
		.charset('gbk')
		.end(function(err,res){
			// console.log(res.text);
			var $=cheerio.load(res.text);
			obj.title=$('.page-title').text();
			$('.page-content a').each(function(){
				var link=$(this).attr('href');
				$(this).attr('href',`http://jw.dhu.edu.cn${link}`);
				//console.log($(this).attr('href'))
				var href=$(this).attr('href');
				if(href.indexOf('download')!='-1'){

					dowFile($(this).attr('href'));
					$(this).attr('href',`./jw_src/${path.basename(href)}`);
				}
			})
			obj.content=$('.page-content').html();
			fn(obj);
		});
};
module.exports=sp_jw_detail;

