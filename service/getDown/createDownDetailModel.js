var mongoose=require('../connctDB/createDb');

var Schema = mongoose.Schema;
	 var detailSchema=new Schema({
	 	title:String,
	 	content:String,
	 	link:String
	 });
var detailDownModel = mongoose.model('detailDownModel', detailSchema);
module.exports=detailDownModel;
