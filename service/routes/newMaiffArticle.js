var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var newOne=require('../CMS/newInformation');


// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	var title=req.body.title;
	var content=req.body.content;
	var time=new Date();
	time=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
	if(_admin[req.cookies['loginname']]){
		newOne({
			title:title,
			content:content,
			time:time
		})
		res.send(true);
	}
	
	
	  
});



module.exports = router;