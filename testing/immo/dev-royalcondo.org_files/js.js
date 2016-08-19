jQuery(document).ready(function(){
		jQuery("#news .news_type").click(function(){
			jQuery("#news .news_type").removeClass("massive-button_pushed");
			jQuery(this).addClass("massive-button_pushed");
			jQuery("#news .cards__item").hide();
			jQuery("#news .type_"+jQuery(this).data('type')).css({'display': 'inline-block'});
		});
});