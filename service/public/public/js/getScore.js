var getScore=(
	function(){
		var getScore_page=new common_page({
			id:'score-container',
			content:'<h2 class="header">'+
				'本学期成绩'+
			'</h2>'+
			'<table class="striped ">'+
              '<thead>'+
                '<tr>'+
                    '<th >课程名称</th>'+
                    '<th >学分</th>'+
                    '<th >成绩</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody></tbody>'+
            '</table>'
		})

		function router_score(){
			Q.reg('score',function(){
				
				getScore_page.show();
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					tool.loadingShow();
					getScoreAndSetTr();
				}
				
			});
		}
		function getScoreAndSetTr(){
			$.post('/getScore',function(data){
					var courseArray=JSON.parse(data).scoreLists;//array
					//console.log(data);
					//console.log(typeof data);
					var str=''; 
					for(var i in courseArray){
						str+='<tr><td>'+courseArray[i].name+'</td><td>'
						+courseArray[i].credit+'</td><td>'
						+courseArray[i].score+'</td></tr>';
					}
					//console.log('1'+str)
					$('#score-container table tbody').html(str);

					tool.loadingHide();
				})

		}		
		
		return{
			router_score:router_score
		}

})();