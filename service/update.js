var pc_jw=require('./getHomeInformationAndSave/pachong-jw-home');
var getDeatailAndSave=require('./getDetailInner/pc_detail_and_save');

var exec = require('child_process').exec; 
var cmdStr = 'scp -i /media/mmx/杂/谷歌下载/maiff  /media/mmx/学习/前端项目/教务处/service/information.json ubuntu@115.159.24.134:ss/service/';

pc_jw(function(){
	getDeatailAndSave('./information.json');
    
    //传递information.js
    exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        console.log('传递information.json成功！');
    }
});
});


