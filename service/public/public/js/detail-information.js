
var	detail=(function(){
		var detail_page=new common_page({
			id:'article-container',
			content:
				'<h4 class="header"></h4>'+
				'<div class="content">'+
					'<div></div>'+
				'</div>'
			
		});

		$('#article-container a').removeAttr('href').click(function(){
						history.go(-1);
					})

		function router_u(){
			Q.reg('u',function(L){
				tool.loadingShow();
			    $.get("/u?q="+L.match(/\d+/g), function(data){
					//console.log(JSON.parse(data))
					//var data=JSON.parse(data);
					//console.log(data.title);

					detail_page.show();
					$('#article-container .header').text(data.title);
					$('#article-container .content  div').html(data.content);
					tool.loadingHide();
				});

			});
		}
		
		

		return{
			router_u:router_u
		}
	})();

