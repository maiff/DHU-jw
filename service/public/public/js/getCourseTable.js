var getCourseTable=(
	function(){
		var getCourseTable_page=new common_page({
			id:'courseTable-container',
			content:'<form>'+
				'<div class="input-field col s12">'+
    				'<select id="tremSelect">'+
      				'<option value="" disabled selected>20162017a</option>'+
      				'<option value="20152016s">20152016s</option>'+
      				'<option value="20162017a">20162017a</option>'+
      				'<option value="20162017s">20162017s</option>'+
    				'</select>'+
    				
  				'</div>'+
  				'</form>'+
			'<h2 class="header">'+
				'本学期课表'+
			'</h2>'+
			'<table class=" bordered" >'+
              '<tbody id="courseTable"></tbody>'+
            '</table>'
		})

		function router_courseTable(){
			Q.reg('courseTable',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getCourseTable_page.show();
					tool.loadingShow();
					
					getCourseTableAndSetTr();
					
					$('#tremSelect').change(function(){
						getCourseTableAndSetTr($(this).val())
					});
				}	

			});
		}
		function getCourseTableAndSetTr(term){
			$.post('/getCourseTable',{tr:term},function(data){
					$('#courseTable').html(data);
					tool.loadingHide();
				})

		}		
		
		return{
			router_courseTable:router_courseTable
		}

})();