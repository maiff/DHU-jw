var express = require('express');
var path = require('path');


var routes = require('./routes/index');
var detail = require('./routes/article-detail');
var login  = require('./routes/login');
var getName= require('./routes/getName');
var getScore=require('./routes/getScore');
var getCourseTable=require('./routes/getCourseTable');
var getGymCount=require('./routes/getGymCount');
var getCourse=require('./routes/getCourse');
var feedback=require('./routes/feedback');
var maiffInformation=require('./routes/maiffInformation');
var maiffDetail=require('./routes/getMaiffDetail');
var newMaiffArticle=require('./routes/newMaiffArticle');
var byKeyGetDetail=require('./routes/byKeyGetDetail')

var getDownCatalog=require('./routes/getDownCatalog');

//var getSameBirth=require('./routes/getSameBirth');
//var postShare=require('./routes/postShare');
//var postContact=require('./routes/postContact');
//var getStuInfo=require('./routes/getStuInfo');
var copyGet=require('./routes/tool/copyGet');
var copySave=require('./routes/tool/copySave');

var app = express();

//app.use(require('prerender-node').set('prerenderToken', '7fhEukZowRwXaM8rKgkh'));
//console.log(__dirname)
app.use(express.static(__dirname + '/public'));
app.use('/home', routes);
app.use('/u', detail);
app.use('/login', login);
app.use('/getName',getName);
app.use('/getScore',getScore);
app.use('/getCourseTable',getCourseTable);
app.use('/getGymCount',getGymCount);
app.use('/getCourse',getCourse);
app.use('/feedback',feedback);
app.use('/maiffInformation',maiffInformation);
app.use('/m',maiffDetail);
app.use('/newMaiffArticle',newMaiffArticle);
app.use('/byKeyGetDetail',byKeyGetDetail);

app.use('/getDownCatalog',getDownCatalog);
//app.use('/getSameBirth',getSameBirth);
//app.use('/postShare',postShare);
//app.use('/postContact',postContact);
//app.use('/getStuInfo',getStuInfo);

// catch 404 and forward to error handler
app.use('/copyGet',copyGet);
app.use('/copySave',copySave);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}


// var pc_jw=require('./getHomeInformationAndSave/pachong-jw-home');
// var pc_detail=require('./getDetailInner/pc_detail_and_save');

setInterval(function(){
  //pc_jw(pc_detail);
  //pc_detail();
},1000*60*60);

app.listen(3003);

