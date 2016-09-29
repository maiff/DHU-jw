/**
 * Created by Newton on 2014/4/2.
 */

'use strict';

// External lib
var ADODB = require('./node-adodb/index.js');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=stuInfo.mdb;');

//ADODB.debug = true;


exports=module.exports=function returnHowMuch(studentNo,fn){
	connection
	  .query(`SELECT * FROM STUDENT WHERE studentNo="${studentNo}"`)
	  .on('done', function (data){
	    var birth=data.records[0].birthday;
	    
	    connection
	  		.query(`SELECT * FROM STUDENT WHERE birthday="${birth}"`)
	  		.on('done', function (data){
	  			var obj={
  					'birthday':birth,
  					'count':data.records.length
  				}
  				var detail=[];
  				for(var i=0;i<obj.count;i++){
  					var obj2={};
  					//console.log(data.records[i].selectes);
  					if(data.records[i].selectes=='1'){
  						obj2.studentNo=data.records[i].studentNo;
  						obj2.name=data.records[i].name;
  						obj2.contact=data.records[i].contact||'空';
  						detail.push(obj2);
  					}
  				}
	  			fn(obj,detail);
	  		});

	  });
}	  
