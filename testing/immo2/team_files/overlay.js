MY_OVERLAY = {
	toggleOverlay: function(){
		
		if($(MY_OVERLAY.overlay).hasClass(  'open' ) ) {
			this.close();
		}else
			this.open();
	},
	open: function(){
		$('body').addClass('overlay-open');
		$(MY_OVERLAY.overlay).removeClass( 'close' );
		$(MY_OVERLAY.overlay).addClass( 'open' );
		$(MY_OVERLAY.container).addClass('overlay-open' );
	},
	close: function(){
		
		if (typeof tinymce != 'undefined'){
			if ($('#overlay-body .editor').length>0 && $('#overlay-body .editor').tinymce())
				$('#overlay-body .editor').tinymce().remove();
		}
		$('body').removeClass('overlay-open');
			$(MY_OVERLAY.overlay).removeClass( 'open' );
			$(MY_OVERLAY.container).removeClass( 'overlay-open' );
			$(MY_OVERLAY.container).css({'transform': ''});
			
			$(MY_OVERLAY.overlay).addClass( 'close' );
			$(MY_OVERLAY.overlay).find('#overlay-body').fadeOut(300, function(){
				$(this).empty();
			});
			var onEndTransitionFn = function( ev ) {
				if(MY_OVERLAY.support.transitions){
					if( ev.propertyName !== 'visibility' ) return;
					$(this).off( MY_OVERLAY.transEndEventName, onEndTransitionFn );
				}
				$(MY_OVERLAY.overlay).removeClass('close');
			};
			if( MY_OVERLAY.support.transitions ) {
				$(this).on( MY_OVERLAY.transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
	},
	active: function(html, callback){
		$('#overlay-body').html(html).show();
		this.open();
		$('#overlay-body').find('input[type=text],input[type=email]').eq(0).focus();
                
                if(typeof callback != 'undefined') {                   
                    callback();
                }
	},        
};
	
(function() {
	 MY_OVERLAY.container = $( 'div.container-overlay');
		MY_OVERLAY.triggerBttn = $('#var_4');
		MY_OVERLAY.overlay = $('div.overlay');
		MY_OVERLAY.closeBttn = $( '.overlay-close' );
		MY_OVERLAY.transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		};
		MY_OVERLAY.transEndEventName = MY_OVERLAY.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
		MY_OVERLAY.support = { transitions : Modernizr.csstransitions };

	

//	triggerBttn.addEventListener( 'click', toggleOverlay );
	MY_OVERLAY.closeBttn.on( 'click', function(){
		MY_OVERLAY.toggleOverlay();
	});
	
	$('#overlay').on('click', function(e){
		if ($(e.target).attr('id')=='overlay')
			MY_OVERLAY.toggleOverlay();
	});
	
	
	
	
})();