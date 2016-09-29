var fs=require('fs');

var detail=require('../byUrlgetDetail/pachong-jw-detail');
var mongoose=require('../connctDB/createDb');
//var mongoose=db('detailInforamtion')

var detailModel=require('./createDetailModel');
//var detailModel=detailModel(mongoose);
 //detailModel.remove({},function(){})
 // detailModel.find((err, test) => {
	// 		if (err) {
	// 			console.log('findAllPhone err:', err);
	// 		} else {
	// 			console.log('------------------------------------------');
	// 			console.log(test.length)
	// 			// test.forEach((element, index, phones) => {
	// 			// 	console.log(phones);
	// 			// });
	// 		}
	// 	});
 // mongoose.disconnect();

var saveIntoDB=require('./saveInformationIntoDb');

function pc_detail_and_save(path){
	fs.readFile(path, function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      var data=JSON.parse(new String(data));
	      for(var i=0;i<data.length;i++){
	      		dealDetail(data[i])	
	      }
	      console.log('更新细节成功！')
	   });
};


function dealDetail(data){
	 detail('http://jw.dhu.edu.cn/dhu/index/'+data.link,function(pc_data){
	      	//saveInformation(pc_data,data.link);
	      	//console.log(typeof pc_data);
	      	pc_data.link=data.link;
	      	//console.log(data.link)
	      	saveIntoDB(pc_data,mongoose,detailModel);
	      })
}


function saveInformation(data,link){
	//var data=JSON.stringify(data);
	fs.writeFile('./detailArtcle/'+link+'.json', data,  function(err) {
   		if (err) {
       		return console.error(err);
   		}
   //console.log("数据写入成功！");
   //console.log("---------------------")
});
}
//pc_detail_and_save()
module.exports=pc_detail_and_save;