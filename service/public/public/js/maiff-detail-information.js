
var	maiff_detail=(function(){
		var maiff_detail_page=new common_page({
			id:'maiff_article-container',
			content:
				'<h4 class="header"></h4>'+
				'<div class="content">'+
					'<div></div>'+
				'</div>'
			
		});


		function router_m(){
			Q.reg('m',function(L){
				console.log(L)
				tool.loadingShow();
			    $.get("/m?q="+L, function(data){
					//console.log(JSON.parse(data))
					//var data=JSON.parse(data);
					console.log(data);

					maiff_detail_page.show();
					$('#maiff_article-container .header').text(data.title);
					$('#maiff_article-container .content  div').html(data.content);
					tool.loadingHide();
				});

			});
		}
		
		

		return{
			router_m:router_m
		}
	})();

