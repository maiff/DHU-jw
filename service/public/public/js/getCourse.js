var getCourse=(
	function(){
		var getCourse_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'本学期已选课程'+
			'</h2>'+
			'<table class=" bordered" >'+
			  	'<thead>'+
			   		'<tr>'+
	                    '<th >课程代码</th>'+
	                    '<th >课程名称</th>'+
	                    '<th >学分</th>'+
	                    '<th >任课教师</th>'+
	                    '<th >上课周次</th>'+
	                    '<th >上课时间</th>'+
	                    '<th >上课地点</th>'+
                	'</tr>'+
               '</thead>'+
              	'<tbody id="course"></tbody>'+
            '</table>'
		})

		function router_course(){
			Q.reg('getCourse',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getCourse_page.show();
					tool.loadingShow();
					getCourseAndSetTr();
					

				}	

			});
		}
		function getCourseAndSetTr(term){
			$.post('/getCourse',function(data){
					$('#course').html(data);
					tool.loadingHide();	
				})

		}		
		
		return{
			router_course:router_course
		}

})();