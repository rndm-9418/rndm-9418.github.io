function slider(){0==current&&$(".slider__button--left").addClass("slider__button--inactive"),$(".slider__button--left").on("click",function(a){a.preventDefault(),0!=current&&($(".slider__button--right").removeClass("slider__button--inactive"),$(".slider__slides").animate({"margin-left":"+=850"},1e3),current--,0==current&&$(".slider__button--left").addClass("slider__button--inactive"))}),$(".slider__button--right").on("click",function(a){a.preventDefault(),amount-1>current&&($(".slider__button--left").removeClass("slider__button--inactive"),$(".slider__slides").animate({"margin-left":"-=850"},1e3),current++,current==amount-1&&$(".slider__button--right").addClass("slider__button--inactive"))})}function getTimeRemaining(a){var b=Date.parse(a)-Date.parse(new Date),c=Math.floor(b/1e3%60),d=Math.floor(b/1e3/60%60),e=Math.floor(b/36e5%24),f=Math.floor(b/864e5);return{total:b,days:f,hours:e,minutes:d,seconds:c}}function initializeClock(a){var b=$(".js-clock"),c=setInterval(function(){var d=getTimeRemaining(a),e="0"+d.days,f="0"+d.hours,g="0"+d.minutes,h="0"+d.seconds;b.find(".js-days").html(e.slice(-2)),b.find(".js-hours").html(f.slice(-2)),b.find(".js-minutes").html(g.slice(-2)),b.find(".js-seconds").html(h.slice(-2)),d.total<=0&&clearInterval(c)},1e3)}function customSelect(){$(document).click(function(){$(".js-select").removeClass("js-arrow js-border"),$(".js-list").addClass("js-hidden")}),$(".js-select").on("click",function(a){$(this).toggleClass("js-arrow js-border"),$(this).find(".js-list").toggleClass("js-hidden"),a.stopPropagation()}),$(".js-item").on("click",function(){var a=$(this).text();$(this).parents(".js-select").find(".js-piece").text(a)})}function calc(){var a=$(".js-submit"),b=$(".js-power"),c=$(".js-range"),d=$(".js-result");a.on("click",function(a){a.preventDefault();var e=$(".js-square").val(),f=$(".js-ceil").val(),g=$(".js-people").val(),h=$(".js-sun").text(),i=$(".js-tech").val(),j=$(".js-vent").is(":checked"),k=$(".js-air").text(),l=$(".js-temp").is(":checked"),m=$(".js-win").is(":checked"),n=$(".js-win-square").text(),o=$(".js-floor").is(":checked");2e4>=+e&&2.7>=+f&&3>=+g&&"средняя"==h&&1>=+i&&0==j&&1>=+k&&0==l&&0==m&&1>=+n&&0==o?(b.text("10"),c.text("15"),d.text("синий кондиционер")):+e>2e4&&4e4>=+e&&+f>2.7&&5>=+f&&+g>3&&6>=+g&&"низкая"==h&&+i>1&&10>=+i&&0==j&&+k>1&&5>=+k&&0==l&&0==m&&+n>1&&5>=+n&&0==o?(b.text("15"),c.text("20"),d.text("зеленый кондиционер")):+e>4e4&&+f>5&&+g>6&&"высокая"==h&&+i>10&&1==j&&+k>5&&1==l&&1==m&&+n>5&&1==o?(b.text("20"),c.text("25"),d.text("красный кондиционер")):(b.text("123"),c.text("345"),d.text("черный кондиционер"))})}var current=0,amount=$(".slider__slide").length;slider();var deadline="June 15 2016";initializeClock(deadline),customSelect(),calc();