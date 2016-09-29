var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var getStudentNo=require('../getStudentNo/getStudentNo.js');

var deal_cookie=require('../tool/dealCookieObjToArr');
var getInfo=require('../getBirthday/getStuInfo.js');

router.post('/', function(req, res, next) {
 	// var stu_contact=req.body.contact;
 	var SELECT=req.body.SELECT;
 	var value=req.body.value;
 	var get_info_SELECT=req.body.get_info_SELECT;
    getStudentNo(deal_cookie(req.cookies),function(stu){
      if(stu==141320231){
        //console.log(req.body)
        //console.log(req.body.studentNo)

        getInfo(SELECT,value,get_info_SELECT,function(data){
        	res.send(data);
        });
        
      }else{
        res.send('');
      }
    });
});

module.exports = router;
