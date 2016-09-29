var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var getName=require('../getName/getName');

var deal_cookie=require('../tool/dealCookieObjToArr');

// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	
	//console.log(deal_cookie(req.cookies) );
	//res.header("Access-Control-Allow-Origin", "*");
	getName(deal_cookie(req.cookies),function(name){res.send(name)});
	
	  
});



module.exports = router;