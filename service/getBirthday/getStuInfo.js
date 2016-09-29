/**
 * Created by Newton on 2014/4/2.
 */

'use strict';

// External lib
var ADODB = require('./node-adodb/index.js');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=stuInfo.mdb;');

//ADODB.debug = true;


exports=module.exports=function returnHowMuch(tableName,value,getWhat,fn){
	var tableName=tableName||'studentNo';

	//console.log(tableName)
	connection
	  .query(`SELECT * FROM STUDENT WHERE ${tableName}="${value}"`)
	  .on('done', function (data,err){
	   		var objList=[];
	   		if(err){
	   			console.log(err)
	   		}
	   		var data=data.records;
	   		for(var i=0;i<data.length;i++){
	   			var obj={};
	   			obj.studentNo=data[i].studentNo;
	   			obj.name=data[i].name;
	   			obj[getWhat]=data[i][getWhat];
	   			objList.push(obj);
	   		}
	   		//console.log(tableName)
	   		fn(JSON.stringify(objList));

	  });
}	  
