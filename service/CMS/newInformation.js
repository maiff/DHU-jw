var InforamtionModel=require('./createInformationModel.js');


//obj
// {
// 		title:String,
//  	content:String,
//  	id:String,
//  	time:String
// }
module.exports=function newInformation(obj){
	var Inforamtion=new InforamtionModel(obj);
	Inforamtion.save((err, detail)=>{
							if (err) {
								console.log(err);
							} else {
								console.log('[' + detail.id + '] saved.');
							}
						});
}