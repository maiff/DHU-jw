'use strict';

// External lib
var ADODB = require('./node-adodb/index.js');

// Variable declaration
var connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=stuInfo.mdb;');

//ADODB.debug = true;


exports=module.exports=function updateShare(studentNo){
	connection
  .execute(`UPDATE STUDENT SET selectes = '1' WHERE studentNo = '${studentNo}' `)
  .on('done', function (){
  	console.log('done!')
    //console.log(colors.green.bold('Result:'), colors.bold(JSON.stringify(data, null, '  ')));
  });
}	  