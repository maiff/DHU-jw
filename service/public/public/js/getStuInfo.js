var getStuInfo=(
	function(){
		var getStuInfo_page=new common_page({
			id:'score-container',
			content:'<h2 class="header">'+
				'本学期成绩'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
	      			'<input id="SELECT" type="text" class="validate" name="SELECT">'+
	      			'<label for="SELECT">查询子段</label>'+
	      		'</div>'+
	      		'<div class="input-field col s6">'+
	      			'<input id="s_value" type="text" class="validate" name="s_value">'+
	      			'<label for="s_value">查询值</label>'+
				'</div>'+
				'<div class="input-field col s6">'+
	      			'<input id="get_info_SELECT" type="text" class="validate" name="get_info_SELECT">'+
	      			'<label for="get_info_SELECT">想要得到的字段值</label>'+
				'</div>'+
				'<button class="btn waves-effect waves-light" type="button" name="action" id="getStuInfo_btn">'+
					'提交'+
				'</button>'+
			'</from>'+
			'<table class="striped" id="getStuInfo_table">'+
              '<thead>'+
                '<tr>'+
                    '<th >SELECT</th>'+
                    '<th >s_value</th>'+
                    '<th >get_info_SELECT</th>'+
                '</tr>'+
              '</thead>'+
              '<tbody></tbody>'+
            '</table>'
		})

		function router_getStuInfo(){
			Q.reg('getStuInfo',function(){
				ahelp.noLoginToLogin();
				getStuInfo_page.show();
				$('.button-collapse').sideNav('hide');
				// tool.loadingShow();
				$('#getStuInfo_btn').click(function(){
					tool.loadingShow();
					getValueAndSet()
				})
				
			});
		}
		function getValueAndSet(){
			$.ajax({
					type:'post',
					url:'/getStuInfo',
					data:{
						'SELECT':$('#SELECT').val(),
						'value':$('#s_value').val(),
						'get_info_SELECT':$('#get_info_SELECT').val()
					},
					success:function(data){
						var data=JSON.parse(data);
						console.log(data);
						tool.loadingHide();
						dealData(data);
						//data.length>1?loginSuccess(data,isLogin_30):loginFail();
					}
				})

		};
		function dealData(data){
			//[{"studentNo":"141320231","name":"向王涛","IDCard":"342501199606272612"}]
			//var thList=$('#getStuInfo_table tr th');
			//JSON.parse(data)[0]
			//console.log(JSON.parse(data)[0])
			var count=0;
			for(var i in data[0]){
				console.log(data[0])
				$('#getStuInfo_table tr th').eq(count).text(i);
				count++;
			}
			var str='';
			for(var l=0;l<data.length;l++){
				var sub_str='';
				for(var k in data[l]){
					sub_str+='<td>'+data[l][k]+'</td>'


				}
				str+=('<tr>'+sub_str+'</tr>');
			}
			$('#getStuInfo_table tbody').html(str);


		}		
		
		return{
			router_getStuInfo:router_getStuInfo
		}

})();