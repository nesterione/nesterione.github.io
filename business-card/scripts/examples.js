$(document).ready(function(){
	$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});
$(".gears" ).height($(".gears" ).width()); 

$( window ).resize(function() {
  
  $(".gears" ).height($(".gears" ).width()); 
});
/*'rgb(96, 202, 105);'*/
$('#fullpage').fullpage({
				anchors: ['home', 'frontend', 'backend','android','management', 'about'], 
				sectionsColor: ['rgb(252, 251, 225)', 'rgb(46, 76, 51)', 'rgb(90, 65, 124)', 'rgb(96, 202, 105);' , 'rgb(86, 123, 219)', 'rgb(252, 251, 225)'],
				navigation: true,
				navigationPosition: 'right',
				navigationTooltips: ['Начальная', 'Front-End', 'Back-End','Android','Управление','Обо мне'],
				'afterLoad': function(anchorLink, index){
					if(index == 2){
						$('#js,#css,#html').addClass('active');
					}
					if(index == 3) {
						$('#gear1,#gear2,#gear3').addClass('active');
					}
					if(index == 4) {
						$('#tablet,#phone, .devices').addClass('active');
					}
				}, 
				'onLeave': function(index, nextIndex, direction){
					if(index == 2){
						$('#js,#css,#html').removeClass('active');
					}
					if(index == 3) {
						$('#gear1,#gear2,#gear3').removeClass('active');
					}
					if(index == 4) {
						$('#tablet,#phone, .devices').removeClass('active');
					}
				},
				responsive: 600
			});	
});
