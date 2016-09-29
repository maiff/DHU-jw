var mongoose=require('../connctDB/createDb');

var Schema = mongoose.Schema;
	 var detailSchema=new Schema({
	 	title:String,
	 	content:String,
	 	link:String
	 });
var detailModel = mongoose.model('detailModel', detailSchema);
module.exports=detailModel;
