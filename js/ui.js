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
	if($(window).outerWidth()<=720){
		console.log('width<720');
		var btn='<div class="nav-menu"><button type="button" class="btn nav-btn"><span class="nav-icon"></span><span class="nav-icon"></span><span class="nav-icon"></span></button></div>';
		$(".nav-bar").find('.nav-menu').remove();
		/*if($(".nav").parents('.nav-bar').length!=0){
			$(btn).prependTo($(".nav-bar"));
		}
		else{
			console.log('wrap');
			$(".nav").wrap('<div class="nav-bar"></div>');
		}*/
		$(".nav").each(function(i,el){
			/*if($(el).parents('.nav-bar').length!=0){
				console.log($(el).parents('.nav-bar'));
				//$(btn).prependTo($(el).parents('.nav-bar').get(0));
			}
			else{
				console.log('wrap');
				$(el).attr('data-class',$(el).attr('class'));
				$(el).removeClass('nav-linear');
				$(el).removeClass('nav-right');
				$(el).removeClass('nav-rtl');
				$(el).removeClass('nav-vertical');
				$(el).removeClass('nav-vertical-rtl');
				$(el).wrap('<div class="nav-bar"></div>');
			}	
			 */
			var _cls=$(el).attr('class');
			console.log('class',_cls);
			if(!$(el).attr('data-class'))$(el).attr('data-class',_cls);
			if($(el).parents('.nav-bar').length==0){
				$(el).wrap('<div class="nav-bar"></div>');	
				$(el).attr('data-wrap','1');			
			}
			$(btn).prependTo($(el).parents('.nav-bar').get(0));
			
			
			$(el).removeClass('nav-linear');
			$(el).removeClass('nav-right');
			$(el).removeClass('nav-rtl');
			$(el).removeClass('nav-vertical');
			$(el).removeClass('nav-vertical-rtl');
		});
		
		//$(btn).prependTo($(".nav-bar"));
		$(".nav").hide();
		$(".nav-btn").click(function(){
			$(this).parents('.nav-bar').find('.nav').slideToggle();
		});
		
		
		$(".nav").find('li').each(function(i,el){			
			if($(el).find('ul').length!=0){
				$(el).bind('mouseover',function(){
					$(el).css('background','none');
				}).bind('mouseout',function(){
					$(el).removeAttr('style');					
				});
			}
		});
	}
	else{
		$(".nav-bar").find('.nav-menu').remove();
		$(".nav").show();
		$(".nav").each(function(i,el){
			if($(el).attr('data-class')){
				$(el).attr('class',$(el).attr('data-class'));
				//$(el).removeAttr('data-class');
			}
			if($(el).attr('data-wrap')){
					console.log('unwrap',$(el));
				//$(el).unwrap();
				//alert($(el).parents('.nav-bar').get(0).html());
				var _bar = $(el).parents('.nav-bar').get(0);
				//alert($(_bar).html());
				//$(_bar).unwrap();
				console.log($(_bar).parent());
				$(_bar).replaceWith($(el));
			}
		});
		
		$(".nav").find('li').each(function(i,el){			
			if($(el).find('ul').length!=0){
				$(el).unbind('mouseover');
				//$(el).css('background',null);		
				//$(el).unbind('mouseout');
			}
		});
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
	
	//qtip
	$(".dropdown, .ttip").each(function(i,el){
		var _target=$(el).attr('data-target');
		var _text=(_target)?$(_target):$(el).attr('title');
		var _classes =['ui-tooltip-shadow'];
		var _position =  {
				my: 'bottom left',
				at: 'top right'
			};
		var _show='mouseenter';
		var _hide='mouseleave';
		var _offset = 10;
		var _corner = true;
		var _tip={ offset: _offset };
		var _cls='ui-tooltip-tipsy';
		//console.log($(el).attr('data-position'));
		if($(el).hasClass('dropdown')){
			_show='click';
			_hide='click unfocus';
			_cls='ui-tooltip-light';
			$(el).click(function(){return false;});
			_tip.mimic='center';
			if(typeof($(el).attr('data-position'))=="undefined"){
				//console.log('und');
				$(el).attr('data-position','bottom_left_r');
			}
		}
		
		//console.log($(el).attr('data-position'));
		if($(el).attr('data-position')){
			switch($(el).attr('data-position')){
				case "top_center":
					_position = {my: 'bottom center',at: 'top center'};
					_tip.offset = 0;					
					break;
				case "top_left":
					_position = {my: 'bottom right',at: 'top left'};				
					break;
				case "top_right":
					_position = {my: 'bottom left',at: 'top right'};				
					break;
				case "bottom_center":
					_position = {my: 'top center',at: 'bottom center'};	
					_tip.offset = 0;								
					break;
				case "bottom_left":
					_position = {my: 'top right',at: 'bottom left'};				
					break;
				case "bottom_left_r":
					_position = {my: 'top left',at: 'bottom left', adjust: {x: 10}};				
					break;
				case "bottom_right":
					_position = {my: 'top left',at: 'bottom right'};				
					break;
				case "bottom_right_l":
					_position = {my: 'top right',at: 'bottom right', adjust: {x: -10}};				
					break;
				case "center_left":
					_position = {my: 'right center',at: 'left center'};	
					_tip.offset = 0;											
					break;
				case "center_right":
					_position = {my: 'left center',at: 'right center'};	
					_tip.offset = 0;											
					break;
				default:
				break;
			}
		}
		
		if($(el).attr('data-color')){
			_classes.push($(el).attr('data-color'));
		}
		else{
			_classes.push(_cls);		
		}
		
		$(el).qtip({
			content: {text: _text},
			position: _position,
			show: {	event: _show},
			hide: {	event: _hide},
			style: {
				classes: _classes.join(' '),
				tip: _tip
			}
		});
	});
});