var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var getCourse=require('../getCourse/getCourse');

var deal_cookie=require('../tool/dealCookieObjToArr');

// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	
	console.log(deal_cookie(req.cookies) );
	//res.header("Access-Control-Allow-Origin", "*");
	getCourse(deal_cookie(req.cookies),function(courseJSON){res.send(courseJSON)});
	
	  
});



module.exports = router;