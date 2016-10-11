var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));



var newOne=require('../../getUpdateEveryWhere/save');


// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	var content=req.body.content;
	//time=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
		console.log(content)
		newOne({
			
			content:content,
			
		})
		res.send(true);
	
	
	
	  
});



module.exports = router;