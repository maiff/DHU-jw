var maiffArticle=(
	function(){
		var maiffArticle_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'来写你的内容吧～'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="maiff-title" type="text" class="validate">'+
	      			'<label for="maiff-title">title</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<textarea id="maiff-textarea" class="materialize-textarea"></textarea>'+
	      			'<label for="maiff-textarea">来写你的内容吧</label>'+
				'</div>'+
				
				'<button class="btn waves-effect waves-light" type="button" name="action" id="newMaiff">'+
					'提交'+
					'</button>'+
			'</from>'
		})

		function router_maiffArticle(){
			Q.reg('newA',function(){
				$('.button-collapse').sideNav('hide');
				maiffArticle_page.show();

			});
			$('#newMaiff').click(function(){
				
				if(textareaIsEmpty()){
					Materialize.toast('反馈内容不能为空！', 4000);
				}else{
					$(this).attr('disabled','true');
					$.ajax({
						type:'post',
						url:'./newMaiffArticle',
						data:{
							'title':$('#maiff-title').val(),
							'content':$('#maiff-textarea').val()
						},
						success:function(data){
							Materialize.toast('写成功了~', 4000);
							$('#feedback').removeAttr('disabled');
							window.location='#!home';
								
						}
					})
				}
				
				
			});		
		}
		function textareaIsEmpty(){
			return $('#maiff-textarea').val()==''?true:false;
		}
		
		return{
			router_maiffArticle:router_maiffArticle
		}

})();