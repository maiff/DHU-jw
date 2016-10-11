var InforamtionModel=require('./createUpdateModel.js');

module.exports=function getAllInformation(fn){
	InforamtionModel.find(function(err,doc){
		if(err){
			console.log('err:'+err);
		}else{
			fn(doc);
		}
	})
}
