var InforamtionModel=require('./createInformationModel.js');

module.exports=function getOneInformation(key,fn){
	InforamtionModel.findOne(key,function(err,doc){
		fn(doc);
	})
}


