var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var getGymCount=require('../getGymCount/getGymCount');

var deal_cookie=require('../tool/dealCookieObjToArr');

// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	var stuId=req.body.stuId;
	console.log(stuId)
	//console.log(deal_cookie(req.cookies) );
	//res.header("Access-Control-Allow-Origin", "*");
	getGymCount(stuId,function(courseJSON){res.send(courseJSON)});
	
	  
});



module.exports = router;