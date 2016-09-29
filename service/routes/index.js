var express = require('express');
var router = express.Router();
var fs=require('fs');


// console.log(router)

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log('start')
	//res.header("Access-Control-Allow-Origin", "*");
	fs.readFile('./information.json', function (err, data) {
      if (err) {
         return console.error(err);
      }
      res.send(JSON.parse(new String(data)));
   });
	  
});


module.exports = router;
