var getHowMuchBirSame=(
	function(){
		var loginedContent='<div id="logined-bir">'+
		'<h3 class="header">'+
				'你的出生年月日是<span id="birthday"></span>'+
			'</h3>'+
			'<h4>'+
				'全校一共有<span id="sameBirNum">0</span>个跟你同年同月同日生'+
			'</h4>'+
			'<div class="row">'+
      			'<div class="col s12 m5">'+
        			'<div class="card-panel">'+
        				'<h5>下面是跟你同年同月同日生的且公开自己信息的人</h5>'+
          				'<table id="share-info">'+

          				'</table>'+
          				
        			'</div>'+
      			'</div>'+
    		'</div>'+
    		'<form >'+
				'<div class="input-field col s6">'+
						'<input id="contact" type="text"  class="validate">'+
						'<label for="contact">联系方式</label>'+
						'<p>当然你可以选择不留，直接提交，那样只会显示你的姓名，学号。</p>'+
					'</div>'+
					'<button class="btn waves-effect waves-light" type="button" name="action" id="share">'+
				'我来共享'+
				'</button>'+
			'</from>'+	
			'<div class="row">'+
      			'<div class="col s12 m5">'+
        			'<div class="card-panel">'+
        				'<h5>免责声明</h5>'+
          				'<span class="">所有信息都是私密的不会公开（除非你同意公开），同时maiff通过合法手段用大量爬虫爬取的数据得到的结果。</span>'+
        			'</div>'+
      			'</div>'+
    		'</div>'+
    		'<!-- JiaThis Button BEGIN --><div class="jiathis_style_m"></div><script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_m.js" charset="utf-8"></script><!-- JiaThis Button END -->'+
    		'</div>'+
    		'<div id="noLogin-bir">'+
    			'<h5>'+
						'用教务处的账号密码登录，可以查看全校和你同年同月同日生的人的个数，当然你可以选择共享你的信息，让你们找到对方，快来登录吧。'+
				'</h5>'+
				'<a href="#!login">立即去登陆</a>'
    		'</div>'



		var getHowMuchBirSame_page=new common_page({
			id:'birSame-container',
			content:loginedContent
			
		})

		function router_sameBir(){
			Q.reg('sameBir',function(){
				$('.button-collapse').sideNav('hide');
				if(ahelp. isLogined()){
					getHowMuchBirSame_page.show();
					tool.loadingShow();
					$('#logined-bir').show();
					$('#noLogin-bir').hide();
					getBirAndSet(tool.getCookie('id'));
					
				}else{
					tool.needLoginFromHash=window.location.hash;
					getHowMuchBirSame_page.show();
					//alert(('#birSame-container container').text())
					$('#logined-bir').hide();
					$('#noLogin-bir').show();
				}	

			});
		}
		function getBirAndSet(studentNo){
			$.ajax({
					type:'post',
					url:'/getSameBirth',
					data:{
						'studentNo':studentNo,
									},
					success:function(data){
						console.log(data)
						var base_info=data.base_info;
						$('#birthday').text(base_info.birthday);
						$('#sameBirNum').text(Number(base_info.count)-1);

						$('#share-info').html('不好意思目前没人共享信息，赶紧把为这个网页共享出去，让大家都参与进来，祝你早日找到那么有缘的人。');
						var detail_info=data.detail_info;
						if(detail_info.length!=0){
							var str='';
							for(var i=0;i<detail_info.length;i++){
								 str='<tr><td>'+detail_info[i].name+'</td><td>'+detail_info[i].studentNo+'</td><td>'+detail_info[i].contact+'</td><tr>';
							}  
							$('#share-info').html();
							$('#share-info').html(str);

						}
						tool.loadingHide();
				}

			});	
		};
		$('#share').click(function(){
				$.ajax({
					type:'post',
					url:'/postShare',
					data:{
						'studentNo':tool.getCookie('id')
					},
					success:function(data){
						//console.log(data);

						Materialize.toast('分享成功', 4000);
						$('#login').attr('disable','false');
					}
				});
				$.ajax({
					type:'post',
					url:'/postContact',
					data:{
						'studentNo':tool.getCookie('id'),
						'contact':$('#contact').val()
					},
					success:function(data){
						//console.log(data);

						//Materialize.toast('分享成功', 4000);
						$('#login').attr('disable','false');
					}
				})
				$(this).attr('disable','true');
			});	

		
		return{
			router_sameBir:router_sameBir
		}

})();

//                    					'不好意思目前没人共享信息，赶紧把为这个网页共享出去，让大家都参与进来，祝你早日找到那么有缘的人。'+
//					'<tr><th>向王涛<td><td>141320231</td></tr>'+
