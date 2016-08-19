(function($) {
    $(function() {

		
        /*
         * Browser detect
         */

        function getBrowser() {
            if ( navigator.userAgent.indexOf( 'WebKit'  ) + 1 ) {
                $('html').addClass( 'webkit' );
            }
        }

        $(document).on('ready', getBrowser);


        /*
         * Placeholder fix init
         */

        $('input, textarea').placeholder();


        /*
         * Switch
         */

        $( '.switch__item' ).click(function(){
            if( ! $(this).hasClass('switch__item_active') ) {
                $(this).parents('.switch').find('.switch__item').removeClass('switch__item_active');
                $(this).addClass('switch__item_active');
                $(this).find("input[type=radio]").prop('checked', true);
            }
        });

        /*
         * Layout
         */

        $( '.layout__item' ).click(function(event){
            event.preventDefault();
            if( ! $(this).hasClass('layout__item_active') ) {
	            $('#timeline, #listing').hide();
                $(this).parents('.layout').find('.layout__item').removeClass('layout__item_active');
                $(this).addClass('layout__item_active');
				$('#'+$(this).data('target')).show();
            }
        });


        /*
         * Data Picker (jQuery UI)
         */

    //    $( '.input_datapicker .input__area' ).datepicker();



        /*
         * Folders
         */

        $( '.folders__item' ).on('click', function(event){
            event.preventDefault();

            $('.folders__item_active').removeClass('folders__item_active')
            $(this).addClass('folders__item_active');

            $('.folder__content_active').removeClass('folder__content_active')
            $( $(this).attr('href') ).addClass('folder__content_active')

        });


        /*
         * Tabs
         */

        $('.tabs__tags__item').on('click',function(){
            if($(this).hasClass('tabs__tags__item_active') == false) {
                $('.tabs__tags__item').each(function(){
                    $(this).removeClass('tabs__tags__item_active');
                });
                $(this).addClass('tabs__tags__item_active');
            }
            var blockID = $(this).attr('rel');
            $('.tabs__bodies__item').css('display', 'none');
            $('#' + blockID).toggle().show();
        });


        /*
         * Collapse
         */

        $('.collapse__handler').on('click',function(event){
            event.preventDefault();
            $(this).parents('.collapse').toggleClass('collapse_active');
            $(this).trigger('collapse');
        });


        /*
         * Hidden event
         */

        $('.hidden-event__handler').on('click', function(event){
            event.preventDefault();
            if ( ! $(this).parents('.hidden-event').hasClass('hidden-event_active') ) {
                $('.hidden-event').removeClass('hidden-event_active');
                $(this).parents('.hidden-event').addClass('hidden-event_active');
            }
            else {
                $('.hidden-event').removeClass('hidden-event_active');
                $(this).parents('.hidden-event').removeClass('hidden-event_active');
            }
        });

        $(document).on('click', function(event) {
            if ( !$(event.target).closest('.hidden-event').length ) {
                $('.hidden-event').removeClass('hidden-event_active');
            }
        });

        $(document).on('keyup', function(event) {
            if (event.keyCode == 27) {
                $('.hidden-event').removeClass('hidden-event_active');
            }
        });


    });
    
})(jQuery);

function new_modal(html, modal_class){
	$('.popup').modal('hide').remove();
	$('body').append('<div class="popup modal '+(typeof modal_class!='undefined' ? modal_class : '')+' fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+(typeof html == 'string' ? html : '')+'</div>');
	if (typeof html == 'object')
		$('.popup.modal').append(html);
	$('.popup').modal('show');
	$('.modal-backdrop').on('click', function(){
		$('.popup').modal('hide').remove();
	});
}
/*

function GetHelp(mdl){
	var id = help_config[mdl] || mdl;
	if (id != undefined){
		$('body').addClass('load');
		$('#help_page').remove();
		$.post("/ajax.php", {module: 'pages', id: id, dataType: 'json', act: 'getPage'}, function(data){
			$('body').removeClass('load');	
			$('body').append('<div id="help_page" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+data.response+'</div>');
			$('#help_page').modal('show');		
		}, 'json');	
	}
}
*/

function reg_ajax_upload(){
		
		
		var btnUpload=jQuery('#reg_plus_img');
		var status=jQuery('#reg_plus_img');
		if (typeof AjaxUpload != 'undefined'){
			return new AjaxUpload(btnUpload, {
				action: '/modules/account/upload.php',
				name: 'uploadfile',
				onSubmit: function(file, ext){
					 if (! (ext && /^(jpg|png|jpeg)$/.test(ext))){ 
						status.text('Only JPG OR PNG files are allowed');
						return false;
					}
					$("#reg_plus_img").html($GL("account_uploading:Загружаем"));
				},
				onComplete: function(file, response){
			
					response = eval('('+response+')');
					console.info(response);
					$("#reg_plus_img").html($GL('account_change_photo:Изменить фото'));
					if(response['result']=="success"){
						$("#reg_plus_img").addClass('choosed');
					}else{
						swal($GL('error'), $GL("lang_errorLoadFile"), 'error');
					}
				}
			});
		}
}
$(document).ready(function(){
	
	
	
	$(function() {
        $('input, textarea').placeholder();
    });


    $('.content__slider').slick({
        infinite: true,
        dots: true,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>'
    });


    $(".reviews__area").mCustomScrollbar({
        axis:"y",
        theme:"dark"
    });


    $('.reviews__profile, .handler').click(function() {
        var toShow = $(this).data('show');
        $('.reviews__area:not('+toShow+'), .toggle:not('+toShow+')').slideUp();
        $(toShow).slideToggle();
    });


    $('.buttons-tab__item').click(function() {
        $('.buttons-tab__item').removeClass('buttons-tab__item_active');
        $(this).addClass('buttons-tab__item_active');
    });


    $('.tabs__tag').on('click', function(event){
        event.preventDefault();
        var $this = $(this);
        $this.parents('.tabs').find('.tabs__tag_state_current').removeClass('tabs__tag_state_current');
        $this.addClass('tabs__tag_state_current');

        $this.parents('.tabs').find('.tabs__section_state_visible').removeClass('tabs__section_state_visible');
        $this.parents('.tabs').find('.tabs__section').eq( $this.index() ).addClass('tabs__section_state_visible');
    });


    $('.collapse__handler').on('click',function(event){
        event.preventDefault();
        $(this).parents('.collapse').toggleClass('collapse_active');
    });    
	
	
	if ($('body').colorTip)
		$('.tip[title]').colorTip({color:'black'});
		
	
		if ($('.alert__header').length>1){
		var top = parseInt($('.alert__header').eq(0).css('top'));
		$('.alert__header').each(function(i, el){
			if (i>0){
				$(el).css({top: top+"px"});
			}
			top = top+$(el).height()+35;
		})
	}
	
	$('#reg_plus_img').on('mouseenter', function(){
			$(this).addClass('button_id_photo_hover');
		}).on('mouseleave', function(){
			$(this).removeClass('button_id_photo_hover');
		});
	reg_ajax_upload();
})