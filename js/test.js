!function ($) {
	"use strict"; // jshint ;_;

	var Accordion = function (el) {
		this.el=el;
	}

	Accordion.prototype = {
		constructor: Accordion,
		show: function(){	
			var ul=$(this.el).parents('ul').get(0);
			var li=$(this.el).parents('li').get(0);
			
			if($(ul).find('div.arrow').length!=0){
				$(ul).find('div.arrow').removeClass('down');
				$(li).find('.arrow').addClass('down');
			}
			$(ul).find('li').removeClass('active');
			$(li).addClass('active');
			console.log($(this.el));
		}
	}
	
	/* TAB PLUGIN */

	$.fn.accordion = function ( option ) {
	return this.each(function () {
	var $this = $(this)
	, data = $this.data('accordion')
	if (!data) $this.data('accordion', (data = new Accordion(this)))
	if (typeof option == 'string') data[option]()
	})
	}

	$.fn.accordion.Constructor = Accordion


	/* TAB DATA-API */
	$(function () {
		$('body').on('click.accordion.data-api', '.accordion .header', function (e) {
		  e.preventDefault()
		  $(this).accordion('show')
		})
	})  
}((window.jQuery));