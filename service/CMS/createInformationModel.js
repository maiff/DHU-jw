var mongoose=require('../connctDB/createDb');

var Schema = mongoose.Schema;
	 var InformationSchema=new Schema({
	 	title:String,
	 	content:String,
	 	time:String
	 });
var InformationModel = mongoose.model('InformationModel', InformationSchema);
module.exports=InformationModel;