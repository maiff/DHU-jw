var mongoose=require('../connctDB/createDb');

var Schema = mongoose.Schema;
	 var updateSchema=new Schema({
	 	
	 	content:String
	 	
	 });
var updateModel = mongoose.model('updateSchema', updateSchema);
module.exports=updateModel;
