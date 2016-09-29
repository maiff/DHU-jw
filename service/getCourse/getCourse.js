var request= require('superagent');
var charset = require('superagent-charset');
charset(request);

var fs=require('fs')
var cheerio=require('cheerio');

exports=module.exports=function getCourse(cookie,fn){
	request.post('http://jw.dhu.edu.cn/dhu/student/selectcourse/seeselectedcourse.jsp')
            .charset('GBK ')
   				  .set("Cookie", cookie)                 
          		  .end(function(err, res){
          		  	var html=res.text;
               	  var $=cheerio.load(html);
                  var trList=$('table[width="900"]>tr');
                  //console.log($('table[width="900"]>tr').eq(0).html());
                  trList.each(function(index,ele){
                      
                         
                        // $(ele).children('th').each(function(i,e){
                        //   i==8?console.log($(e).html()):null;
                        // })
                        if(index==0){
                          $(ele).remove();
                          //console.log($(ele).html())//children('th').length)
                        }
                        $(ele).children().each(function(i,e){
                          if(i==3||i==4||i==5){
                            $(e).remove();
                          }
                        });

                       
                        // $(ele).children('th').each(function(i,e){
                        //   $(e).removeAttr('bgcolor').removeAttr('width').removeAttr('height');
                        //   //console.log(i)
                        // })
                        
                       // console.log($(ele).children().text())
                         //console.log($(ele).find('td').length)
                          // var count=0;
                          // for(var i in obj){
                          //   obj[i]=$(ele).find('td').eq(count++).text();
                          // }
                      
                     
                    

                  })
                  
                  // for(var i in trList){
                  //   trList[i].find
                  // }
                  $('td a').each(function(){
                         // var link=$(this).attr('href');
                          $(this).removeAttr('href')
                  })
                  //console.log($('table[width="900"]').html())
 	                fn($('table[width="900"]').html());
          		  });
}


// var obj={
//                         courseCode:'',
//                         courseName:'',
//                         credit:'',
//                         courseClass:'',
//                         classNum:'',
//                         courseCalder:'',
//                         courseTeacher:'',
//                         courseWeek:'',
//                         courseTime:'',
//                         coursePlace:''
//                       };


