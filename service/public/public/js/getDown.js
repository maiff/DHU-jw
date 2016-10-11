var getDown=(
	function(){
		var getDown_page=new common_page({
			id:'down-container',
			content:'<h2 class="header">'+
				'学生下载:'+
			'</h2>'+
			'<form >'+
				'<div class="input-field col s6">'+
          			'<input id="detail_key" type="text" class="validate" name="q">'+
          			'<label for="detail_key">输入查找的字段</label>'+
          		'</div>'+
          		'<button class="btn waves-effect waves-light" type="button" name="action" id="deail-search">'+
    				'查询'+
				'</button>'+
		  	'</from>'+
			'<ul class="down-collection collection">'+
			       //  '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			      	// '<li><a href="#!u/index_detail.jsp?ID=4922" class="collection-item waves-effect waves-teal"><span>2016-09-23</span></a></li>'+
			'</ul>'
		})

		function router_down(){
			Q.reg('getDown',function(){
				
				getDown_page.show();
				$('.button-collapse').sideNav('hide');
					tool.loadingShow();
					getDownAndSetTr();				
			});
		}
		$('#deail-search').click(function(){
			tool.loadingShow();
			$.post('./byKeyGetDetail',{q:$('#detail_key').val()},function(data){
				console.log(typeof data);
				var liList=$('.down-collection');
				if(data.length!=0){
					liList.html('');
					var len=data.length;
					for(var i=0;i<len;i++){
					  		var li=$('<li>')
					  		var a=$('<a>').attr('href','#!u/'+data[i].link).addClass('collection-item waves-effect waves-teal');
					  		a.html(data[i].title+'<span>'+'</span>');
					  		li.append(a);
					  		liList.append(li);
					  		//$(liList[i]).children().attr('href','#!u/'+data[i].link);
					  		//$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
					}
				}else{
					liList.html('没有找到相关内容～');
				}
				tool.loadingHide();
			});
		})
		function getDownAndSetTr(){
			$.get("/getDownCatalog", function(data){
				  console.log(typeof data);
				  var liList=$('.down-collection');
				  var len=data.length;
				  for(var i=0;i<len;i++){
				  		var li=$('<li>')
				  		var a=$('<a>').attr('href','#!u/'+data[i].link).addClass('collection-item waves-effect waves-teal');
				  		a.html(data[i].text+'<span>'+data[i].time+'</span>');
				  		li.append(a);
				  		liList.append(li);
				  		//$(liList[i]).children().attr('href','#!u/'+data[i].link);
				  		//$(liList[i]).children().html(data[i].text+'<span>'+data[i].time+'</span>');
				  }
				  tool.loadingHide();
				});
					
		}		
		
		return{
			router_down:router_down
		}

})();