var query=require('./getStuInfo.js'),
update=require('./updateIsShare.js');

query('selectes','1','name',function(data){
	console.log(data)
})