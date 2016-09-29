var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var login=require('../login/index');

function shuffle(array) {
    array.sort(function() {
        return Math.random() - 0.5;
    });
    return array;
}
// console.log(router)

/* GET home page. */
router.post('/', function(req, res, next) {
	
	var usename=req.body.usename;
	var password=req.body.password;
	console.log(usename=='admin'&&password=='1314520yqq')
	if(usename=='admin'&&password=='1314520yqq'){
		var random_num=shuffle(['a','b','c','d','e','x','y','z','p','q']).join('');
		//console.log(random_num)
		_admin={};
		_admin[random_num]=true;
		res.send(["userid=1314520yqq",'admin=true',`loginname=${random_num}`]);
	}else{
	//res.header("Access-Control-Allow-Origin", "*");
		login(usename,password,function(cookie){
			//console.log(cookie[0])
			//res.cookie('userid',getUserId(cookie));
			//res.redirect('http://localhost:3000/');
			cookie.length>1?res.send(cookie):res.send(false);
		})
	}
	  
});
function getUserId(cookie){
	var index=cookie[0].indexOf('=')+1;
	var len=cookie[0].length;

	return cookie[0].slice(index,len);
}

module.exports = router;