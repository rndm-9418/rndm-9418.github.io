// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
}());

function include(url){
  document.write('<script src="'+url+'"></script>');
  return false ;
}

// Place any jQuery/helper plugins in here.

include('/bitrix/templates/rula/js/vendor/jquery.easing.1.3.min.js');
include('/bitrix/templates/rula/js/vendor/jquery.maskedinput.min.js');
include('/bitrix/templates/rula/js/vendor/jquery.validate.min.js');
include('/bitrix/templates/rula/js/vendor/messages_ru.min.js');
include('/bitrix/templates/rula/js/vendor/jquery.form.js');
include('/bitrix/templates/rula/js/vendor/jquery.flexslider.js');
include('/bitrix/templates/rula/js/vendor/jquery-ui.min.js');
include('/bitrix/templates/rula/js/vendor/fotorama.js');
include('/bitrix/templates/rula/js/vendor/jquery.jcarousel.min.js');
include('/bitrix/templates/rula/js/vendor/jquery.colorbox-min.js');
include('/bitrix/templates/rula/js/vendor/jquery.reveal.js');

(function($) {

  $(function() {

    function functionHeight() {
      var windowHeight,
          mainHeight;

      windowHeight = $(window).innerHeight();
      mainHeight = $('.content').innerHeight();

      $('.content').css('min-height', windowHeight);
      $('.left-sidebar').css('min-height', mainHeight);
    }

    $(functionHeight);

    $(window).resize(functionHeight);
    $(window).on('click', functionHeight);

    $(".tel").mask("+7 (999) 999-99-99");

    $("#help").validate({
      messages: {
        name: "Поле не заполнено",
        email: {
          required: "Поле не заполнено",
          email: "Неверный формат"
        },
        user_name: "Поле не заполнено",
        user_email: {
          required: "Поле не заполнено",
          email: "Неверный формат"
        },
        SUBJECT: "Поле не заполнено",
        MESSAGE: "Поле не заполнено"
      }
    });

    $('#help').ajaxForm(function(){
      document.getElementById('help').reset();
      $('#help').css('display', 'none');
      $('.help-success').css('display', 'block');
      $(functionHeight);
    });

    $('.help-success-close').on('click', function() {
      $('#help').css('display', 'block');
      $('.help-success').css('display', 'none');
      $(functionHeight);
      return false;
    });

    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: "thumbnails",
      directionNav: true,
      thumbCaptions: true
    });

    $( "#tabs-art" ).tabs();
    //$( "#tabs-hardware" ).tabs();

    $('.fotorama').fotorama({
      thumbwidth: '84',
      thumbheight: '56'
    });

    $( '.spinner').spinner({
      min: 1
    });

    // ----- Carousel

    $('.jcarousel-hardware').jcarousel({
      //wrap: "circular"
    });

    /*$('.jcarousel-hardware').jcarouselAutoscroll({
      target: '+=4',
      interval: 5000
    });

    $('.jcarousel-hardware').hover(function() {
      $(this).jcarouselAutoscroll('stop');
    }, function() {
      $(this).jcarouselAutoscroll('start');
    });*/

    $('.jcarousel-prev').jcarouselControl({
      target: '-=4'
    });

    $('.jcarousel-next').jcarouselControl({
      target: '+=4'
    });

    // ----- Carousel clients

    $('.jcarousel-logo, .jcarousel-date').jcarousel({
      //wrap: "circular"
    });

    // $('.jcarousel-logo, .jcarousel-date').jcarouselAutoscroll({
    //   target: '+=1',
    //   interval: 5000
    // });

    $('.jcarousel-prev-logo').jcarouselControl({
      target: '-=4',
      carousel: $('.jcarousel-logo, .jcarousel-date')
    });

    $('.jcarousel-next-logo').jcarouselControl({
      target: '+=4',
      carousel: $('.jcarousel-logo, .jcarousel-date')
    });

    $('a.gallery').colorbox({rel:'gallery'});

  })

})(jQuery);