var feedback=(
	function(){
		var feedback_page=new common_page({
			id:'courseTable-container',
			content:
			'<h2 class="header">'+
				'反馈建议'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="email" type="email" class="validate">'+
	      			'<label for="email">Email</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<textarea id="textarea" class="materialize-textarea"></textarea>'+
	      			'<label for="textarea">这里填您的意见</label>'+
				'</div>'+
				
				'<button class="btn waves-effect waves-light" type="button" name="action" id="feedback">'+
					'提交'+
					'</button>'+
			'</from>'
		})

		function router_feedback(){
			Q.reg('feedback',function(){
				$('.button-collapse').sideNav('hide');
				feedback_page.show();

			});
			$('#feedback').click(function(){
				
				if(textareaIsEmpty()){
					Materialize.toast('反馈内容不能为空！', 4000);
				}else{
					$(this).attr('disabled','true');
					$.ajax({
						type:'post',
						url:'/feedback',
						data:{
							'email':$('#email').val(),
							'content':$('#textarea').val()
						},
						success:function(data){
							Materialize.toast('反馈成功，我们会及时处理~', 4000);
							$('#feedback').removeAttr('disabled');
							window.location='#!home';
								
						}
					})
				}
				
				
			});		
		}
		function textareaIsEmpty(){
			return $('#textarea').val()==''?true:false;
		}
		
		return{
			router_feedback:router_feedback
		}

})();