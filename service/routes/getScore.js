var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var getScore=require('../getScore/getScore');

var deal_cookie=require('../tool/dealCookieObjToArr');

// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	
	//console.log(deal_cookie(req.cookies) );
	//res.header("Access-Control-Allow-Origin", "*");
	getScore(deal_cookie(req.cookies),function(courseJSON){res.send(courseJSON)});
	
	  
});



module.exports = router;