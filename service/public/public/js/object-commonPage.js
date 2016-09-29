var common_page_now_show={
	ele:null
};
common_page_now_show.push=function(now_show){
	this.ele=now_show;
};
common_page_now_show.show=function(){
	//this.ele?this.ele.removeClass('margin-left-100'):null;
	//var that=this;
	//setTimeout(function(){
		this.ele?this.ele.show():null;
	//},300)

};
common_page_now_show.hide=function(){
	//this.ele?this.ele.addClass('margin-left-100'):null;
	
	
	//setTimeout(function(){
		this.ele?this.ele.hide():null;
	//},300)

}

var common_page=function(obj){
	this._main=$('<div>',{
		'class':'all',
		'id':obj.id
	});
	var main_nav='<nav >'+
	'<div class="container">'+
		'<a href="#!home">'+
			'<img src="./public/img/arrow.png" class="return" >'+
		'</a>'+
	'</div>'+
	'</nav>'
	this._main.html(main_nav);
	
	$('<div>',{
		'class':'container'
	}).html(obj.content)
	.appendTo(this._main);

	this._main.appendTo('body');
};

common_page.prototype.show=function(){
	common_page_now_show.hide();
	common_page_now_show.push(this._main);
	common_page_now_show.show();
};