var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var feedback=require('../feedback/feedback');


// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	
	var email=req.body.email;
	var content=req.body.content;

	//res.header("Access-Control-Allow-Origin", "*");
	feedback(email,content);
	res.send(true);
	  
});

module.exports = router;