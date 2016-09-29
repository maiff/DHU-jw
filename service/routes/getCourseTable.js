var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var getCourseTable=require('../getCourseTable/getCourseTable');

var deal_cookie=require('../tool/dealCookieObjToArr');

// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	var tr=req.body.tr||'20162017a';
	console.log(tr);
	console.log(deal_cookie(req.cookies) );
	//res.header("Access-Control-Allow-Origin", "*");
	getCourseTable(deal_cookie(req.cookies),tr,function(courseJSON){res.send(courseJSON)});
	
	  
});



module.exports = router;