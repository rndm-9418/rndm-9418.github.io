$(function(){function a(){$(window).width()>=600&&(!$(this).hasClass(g)&&$(this).hasClass(f)?($(h).contents().fadeOut(k,function(){$(h).contents().removeClass(g).addClass(f).appendTo(i).find("figcaption").removeClass("sliderblock__caption--active").end().fadeIn(k)}),$(this).fadeOut(k,function(){$(this).appendTo(h).addClass(g).removeClass(f+" "+e).find("figcaption").addClass("sliderblock__caption--active").end().fadeIn(k)})):!$(this).hasClass(g)&&$(this).hasClass(e)&&($(h).contents().fadeOut(k,function(){$(h).contents().removeClass(g).addClass(e).appendTo(i).find("figcaption").removeClass("sliderblock__caption--active").end().fadeIn(k)}),$(this).fadeOut(k,function(){$(this).appendTo(h).addClass(g).removeClass(f+" "+e).find("figcaption").addClass("sliderblock__caption--active").end().fadeIn(k)})))}function b(){$(l).animate({scrollTop:0},100)}function c(a){$(this).hide(),$(o).show(),a.stopPropagation()}function d(){$(o).hide(),$(n).show()}var e="sliderblock__slide--left",f="sliderblock__slide--right",g="sliderblock__slide--active",h=".sliderblock__active-slide",i=".sliderblock__gallery",j=".sliderblock__slide",k=200,l="html",m=".copyright__button-up",n=".menu__search",o=".menu__form",p=".menu__search-input";$(p).on("click",function(a){a.stopPropagation()}),$(j).on("click",a),$(m).on("click",b),$(n).on("click",c),$(l).on("click",d),$(".links").hide(),$(".showbutton").hide(),$(window).width()<=1e3&&$(".showbutton").show(),$(window).resize(function(){$(window).width()<=1e3?$(".showbutton").show():($(".links").hide(),$(".showbutton").hide().text("Show Menu"))}),$(".showbutton").on("click",function(){$(".links").slideToggle(),"Show Menu"==$(".showbutton").text()?$(this).text("Hide Menu"):$(this).text("Show Menu")})});