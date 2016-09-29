var getGymCount=(
	function(){
		var getGymCount_page=new common_page({
			id:'gymCount-container',
			content:'<h2 class="header">'+
				'本学期体锻情况'+
			'</h2>'+
			'<table class=" bordered" >'+
              '<tbody id="gymCount"></tbody>'+
            '</table>'
		})

		function router_gymCount(){
			Q.reg('gymCount',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp.noLoginToLogin()){
					getGymCount_page.show();
					tool.loadingShow();
					getGymCountAndSetTr(tool.getCookie('id'));
					
					
				}	

			});
		}
		function getGymCountAndSetTr(id){
			console.log(id)
			$.post('/getGymCount',{stuId:id},function(data){
					
					if(data=="<tr></tr><tr></tr>"){
						//alert(1)
						data='<tr><td>啊偶！可能体育部的网站炸了，稍后重试~</td></tr>'
						//$('#gymCount').html('<tr><td>啊偶！可能体育部的网站炸了，稍后重试~</td></tr>');
					}
//					else{
						//console.log(data)
						$('#gymCount').html(data);
//					}
						tool.loadingHide();
					
				})

		}		
		
		return{
			router_gymCount:router_gymCount
		}

})();