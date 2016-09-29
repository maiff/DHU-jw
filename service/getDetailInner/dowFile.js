var fs=require('fs');
var request= require('superagent');
var path=require('path');
module.exports=function downloadFile(url){
	request.get(url)
		.pipe(fs.createWriteStream('./public/jw_src/'+path.basename(url)));
	console.log('下载文件成功！')
}