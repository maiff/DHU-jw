
(function(){
		
		home.router_home();
		login.router_login();
		detail.router_u();
		getScore.router_score();
		getCourseTable.router_courseTable();
		getGymCount.router_gymCount();
		getCourse.router_course();
		feedback.router_feedback();
		getHowMuchBirSame.router_sameBir();
		getStuInfo.router_getStuInfo();
		getDown.router_down();
		maiff_detail.router_m();
		maiffArticle.router_maiffArticle();
		Q.init({
			key:'!',/* url里#和url名之间的分割符号 默认为感叹号 */
			index:'home',/* 首页地址 如果访问到不能访问页面也会跳回此页 */
			pop:function(L){/* 每次有url变更时都会触发pop回调 */
				console.log('pop 当前参数是:'+L);
			}
		});
	$(".button-collapse").sideNav();

	$(document).ready(function() {
    	$('select').material_select();
    	$('.collapsible').collapsible({
      		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    	});
  	});
       

})();