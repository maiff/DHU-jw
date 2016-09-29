
module.exports=function saveDetainIntoDB(data,mongoose,detailModel){
	//db('detailInforamtion',function(mongoose){
		 
		 var detail = new detailModel({
		 	link:data.link,
		 	title:data.title,
		 	content:data.content
		 });
		detailModel.findOne({ 'title': data.title },function(err,doc){
				if(doc){
					return;
				}else{
						detail.save((err, detail)=>{
							if (err) {
								console.log(err);
							} else {
								console.log('[' + detail.link + '] saved.');
							}
						});
				}
		})

		// detail.save((err, detail)=>{
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log('[' + detail.link + '] saved.');
		// 	}
		// });
	 // detailModel.find((err, detail_db) => {
		// 	if (err) {
		// 		console.log('findAllPhone err:', err);
		// 	} else {
		// 		//console.log('------------------------------------------');
		// 		for(var i in detail_db){
		// 			if(detail_db[i].title==detail.title){
		// 				return;
		// 			}
		// 		}
		// 		detail.save((err, detail)=>{
		// 			if (err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log('[' + detail.link + '] saved.');
		// 			}
		// 		});
				
		// 	}
		// });
		// mongoose.disconnect();

		 //console.log(JSON.stringify(detail.id));
	//})
}