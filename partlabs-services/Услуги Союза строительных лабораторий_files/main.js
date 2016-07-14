(function($) {

	$(function() {
    	
		// Add elements counter
		$('.main-menu > ul > li').each(function(index){
		  index += 1;
		  $(this).addClass("item-" + index);
		});

		$('.main-menu > ul > li:first-child').addClass('item-first');
		$('.main-menu > ul > li:last-child').addClass('item-last');

	})

})(jQuery);