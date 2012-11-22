!function ($) {

"use strict"; // jshint ;_;

  

  var Tabs = function (el) {
	this.el=el;
	}


  Tabs.prototype = {
	constructor: Tabs,
	show: function(){	
		var ul=$(this.el).parents('ul').get(0);		
		if($(ul).hasClass('lock'))return;
		//console.log($(this.el),$(ul));
		$(ul).find('li').removeClass('active');
		$(this.el).parent().addClass('active');
		var index = $(this.el).parent().index();
		//console.log('next',$(ul).next());
		
		var target = $(ul).next().hasClass('tabs-content')?$(ul).next():$(ul).attr('data-target');
		
		if(target){
			//console.log($(target).find('.tabs-content-item'));
			$(target).find('.tabs-content-item').removeClass('active');
			//console.log($(target).find('.tabs-content-item').get(index));
			$($(target).find('.tabs-content-item').get(index)).addClass('active');
		}
	},
	hover: function(){		
		var ul=$(this.el).parents('ul').get(0);		
		if(!$(ul).hasClass('hover'))return;
		this.show();
	}
	}
 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tabs = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tabs')
      if (!data) $this.data('tabs', (data = new Tabs(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tabs.Constructor = Tabs


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '.tabs a', function (e) {
      e.preventDefault()
      $(this).tabs('show')
    })
    $('body').on('mouseover.tab.data-api', '.tabs a', function (e) {
      e.preventDefault()
      $(this).tabs('hover')
    })
  })
  
}((window.jQuery));


/* fix ie6 nav hover */
$.fn.nav = function() {
	return this.each(function() {
		$(this).hover(function(){
			$(this).addClass("hover");
			$('> .dir',this).addClass("open");
			$('ul:first',this).css('visibility', 'visible');
			if($(this).parents('ul').hasClass('nav-linear'))$('ul:first',this).width($(this).parents('div').width());//fix ie6 linear ul width
		},function(){
			$(this).removeClass("hover");
			$('.open',this).removeClass("open");
			$('ul:first',this).css('visibility', 'hidden');
		});
	});
}

function navMinimize(){	
	if($(window).outerWidth()<=360){
		console.log('width<360');
		var btn='<div class="nav-menu"><button type="button" class="btn nav-btn"><span class="nav-icon"></span><span class="nav-icon"></span><span class="nav-icon"></span></button></div>';
		$(".nav-wrap").find('.nav-menu').remove();
		$(btn).prependTo($(".nav-wrap"));
		$(".nav-btn").click(function(){
			$(this).parents('.nav-wrap').find('.nav').slideToggle();
		});
		$(".nav").find('li').each(function(i,el){
			if($(el).find('ul').length!=0){
				$(el).mouseover(function(){
					$(el).css('background','none');
				});
			}
		});
	}
	else{
		$(".nav-wrap").find('.nav-menu').remove();
		$(".nav").show();
	}
}

$(document).ready(function(){
	if($.browser.msie && $.browser.version<7){
		if($("ul.nav").length!=0) {
			$("ul.nav li").nav();
		}
	}
	navMinimize();	
	$(window).resize(function(){
	navMinimize();	
	});
});