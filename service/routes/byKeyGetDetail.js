var express = require('express');
var router = express.Router();
var fs=require('fs');
//var detail=require('../homeanddetail/pachong-jw-detail');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
// console.log(router)


var find=require('../getDetailInner/byKeyGetDetail');
/* GET home page. */
router.post('/', function(req, res, next) {
	//console.log('start')
	//res.header("Access-Control-Allow-Origin", "*");
	//console.log(req.query.q)
	var re = new RegExp(req.body.q);
	find(re,function(doc){
		res.send(doc)
	})	
	// detailModel.find((err, test) => {
	// 		if (err) {
	// 			console.log('findAllPhone err:', err);
	// 		} else {
	// 			console.log('------------------------------------------');
	// 			//console.log(test.length)
	// 			for(var i in test){
	// 				if(test[i].link==`index_detail.jsp?ID=${req.query.q}`){
	// 					res.send(test[i]);
	// 				}
	// 			}
	// 			// test.forEach((element, index, phones) => {
	// 			// 	console.log(phones);
	// 			// });
	// 		}
	// 	});
	// detail(`http://jw.dhu.edu.cn/dhu/index/index_detail.jsp?ID=${req.query.q}`,function(data){
	// 	res.send(data);
	// });
	//index_detail.jsp?ID=4927
	// fs.readFile('./detailArtcle/index_detail.jsp?ID='+req.query.q+'.json', function (err, data) {
 //      if (err) {
 //         return console.error(err);
 //      }
 //      //console.log(JSON.parse(new String(data)));
 //      res.send(JSON.parse(new String(data)));
 //   });

});




module.exports = router;
