var mongoose=require('../connctDB/createDb');
//var mongoose=db('detailInforamtion')

var detailModel=require('./createDownDetailModel');
//var detailModel=detailModel(mongoose);
 //detailModel.remove({},function(){})
detailModel.find(function(err,doc){
	console.log(doc.length)})