$('#responsiveTabsDemo').responsiveTabs({
  /*startCollapsed: 'accordion'*/
});

$(document).ready(function(){
  $('.slider').slick({
    draggable:false,
    touchMove:false
  });
});

$('.open-popup-link').magnificPopup({
  type:'inline',
  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});

$(function(){
  $('#form').validate({
    rules:{
      psw:{
        required: true,
        minlength: 2
      },
      mail:{
        required: true,
        minlength: 2
      }
    },
    messages:{
      psw:{
        required: "Поле 'Пароль' обязательно к заполнению",
        minlength: "Введите не менее 2-х символов в поле 'Пароль'"
      },
      mail:{
        required: "Поле 'Почта' обязательно к заполнению",
        email: "Необходим формат электронного адреса" 
      }
    }
  });
});
