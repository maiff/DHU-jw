var pc_jw=require('./getHomeInformationAndSave/pachong-jw-home');
var getDeatailAndSave=require('./getDetailInner/pc_detail_and_save');


pc_jw(function(){
	getDeatailAndSave('./information.json');
});