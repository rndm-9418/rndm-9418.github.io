$(document).ready(function(){
	
	//Вызов плагина слайдера
	$(".js-slider").ionRangeSlider({
		hide_min_max: true,
		hide_from_to: true,
		min: 0,
		max: 100,
		step: 5,
		from: 50,
		onFinish: function (data) {
			if(data.from < 25){
				$(".js-slider-text").text("Не владею");
			}else if(data.from >= 25 && data.from < 50){
				$(".js-slider-text").text("Использую готовые решения");
			}else if(data.from >= 50 && data.from < 100){
				$(".js-slider-text").text("Использую готовые решения и умею их переделывать");
			}else if(data.from == 100){
				$(".js-slider-text").text("Пишу сложный JS с нуля");
			}
		},
	});

	//Кастомный плейсхолдер
	function pseudoPlaceholder(){
		
		$(".js-input").each(function(){
			if($(this).val() ) {
				$(this).next(".js-placeholder").addClass("pseudo-input__placeholder--small");
			}
		})

		$(".js-input").on("focus", function() {
			$(this).next(".js-placeholder").addClass("pseudo-input__placeholder--small");
		});

		$(".js-input").on("blur", function() {
			if( !$(this).val() ) {
				$(this).next(".js-placeholder").removeClass("pseudo-input__placeholder--small");
			}
		});
	}
	pseudoPlaceholder();

	//Адаптивное меню
	function responsiveMenu(){
		$(window).resize(function(){
			if($(window).outerWidth() >= 768){
				$(".js-header").removeClass("header--visible");
				$(".js-bar").removeClass("toggle__bar--closed");
			}
		});

		$(".js-toggle").on("click", function(){
			$(".js-header").toggleClass("header--visible");
			$(".js-bar").toggleClass("toggle__bar--closed");
		})
	}
	responsiveMenu();

	//Прокрутка к блоку
	function scrollToBlock(){
		$(".js-link").on("click", function(e){

			e.preventDefault();

			var value = $(this).attr("data-value");
			var headerHeight = $(".js-header").outerHeight();

			$("html").animate(
					{scrollTop: $("." + value).find(".js-icon").offset().top - headerHeight}, function() {}
				);
		})
	}
	scrollToBlock();

	//Сдвижение страницы для попапов валидации
	function validationOffset(){
		$(".js-submit").on("click", function(){
			setTimeout(function(){ 

				var currentOffset = $("html").scrollTop();
				var headerHeight = $(".js-header").outerHeight();

				$("html").animate(
					{scrollTop: currentOffset - headerHeight}, function() {}
				)
			}, 10);
		})
	}
	validationOffset();

	//Изменение цвета ссылок при прокрутке
	function linksHighlight(){
		var lastId;
		var topMenu = $(".js-header");
		var menuItems = topMenu.find("a");
		var scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

		$(window).scroll(function(){
			var topMenuHeight = topMenu.outerHeight()+15;
			var fromTop = $(this).scrollTop()+topMenuHeight;
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
				return this;
			});
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
				lastId = id;
				menuItems
				.parent().removeClass("nav__item--active")
				.end().filter("[href='#" + id+ "']").parent().addClass("nav__item--active");
			}                   
		});

	}
	linksHighlight();

	//Кастомный селект
	function customSelect(){
		$("select").on("change", function(){
			var value = $(this).val();
			if(!value){
				$(this).next(".js-select-output").text("Год рождения");
			}else{
				$(this).next(".js-select-output").text(value);
			}
		});

	}
	customSelect();





	$(function() {
		jcf.replaceAll();
	});
});






