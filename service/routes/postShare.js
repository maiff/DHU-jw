var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser');
router.use(cookieParser());

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var getStudentNo=require('../getStudentNo/getStudentNo.js');

var deal_cookie=require('../tool/dealCookieObjToArr');
var share=require('../getBirthday/updateIsShare.js');

router.post('/', function(req, res, next) {
  var studentNo=req.body.studentNo;
    getStudentNo(deal_cookie(req.cookies),function(stu){
      if(stu==studentNo){
        //console.log(req.body)
        //console.log(req.body.studentNo)

        share(studentNo) 
        res.send('yes') 
      }else{
        res.send('');
      }
    });
});

module.exports = router;
