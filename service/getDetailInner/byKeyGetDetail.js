var detailModel=require('./createDetailModel');

module.exports=function(regexp,fn){
	detailModel.find({title:regexp},function(err,doc){
			fn(doc);
	})
}