var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var getStudentNo=require('../getStudentNo/getStudentNo.js');

var deal_cookie=require('../tool/dealCookieObjToArr');
var query=require('../getBirthday/query.js');

router.post('/', function(req, res, next) {
	var studentNo=req.body.studentNo;
  	getStudentNo(deal_cookie(req.cookies),function(stu){
  		if(stu==studentNo){
  			//console.log(req.body)
  			//console.log(req.body.studentNo)

  			query(studentNo,function(obj,detail){
  				console.log(obj)
  				console.log(detail);
  				var obj_all={
  					base_info:obj,
  					detail_info:detail
  				};
  				res.send(obj_all);
  			})	
  		}else{
  			res.send('');
  		}
  	});
});

module.exports = router;
