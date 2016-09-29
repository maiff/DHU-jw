var upCatalog=require('./getDown/getDownCatalog');
var getDeatailAndSave=require('./getDetailInner/pc_detail_and_save');

upCatalog(function(){
	getDeatailAndSave('./information_down.json')
});