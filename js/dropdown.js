$(document).ready(function(){

	if($("ul.dropdown").length) {
		$("ul.dropdown li").dropdown();
	}

});

$.fn.dropdown = function() {

	return this.each(function() {

		$(this).hover(function(){
			$(this).addClass("hover");
			$('> .dir',this).addClass("open");
			$('ul:first',this).css('visibility', 'visible');
						if($(this).parents('ul').hasClass('dropdown-linear')){
				//alert('linear'+$(this).parents('div').width());
				$('ul:first',this).width($(this).parents('div').width());//fix ie6 linear ul width
			}
		},function(){
			$(this).removeClass("hover");
			$('.open',this).removeClass("open");
			$('ul:first',this).css('visibility', 'hidden');
		});

	});

}