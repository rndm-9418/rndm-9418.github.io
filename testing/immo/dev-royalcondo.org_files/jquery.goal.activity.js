/**
* @name jQuery plugin Activity
* @version 1.3a
* @author vs.ustinov
* @author an.nidziy
* @author gr.tsvetkov
* @license GNU Free Documentation License
* @copyright 2013 ООО «АйТи-агентство»
* @link http://www.it-agency.ru/process/60seconds
* @uses jQuery 1.7+
*
* Параметры: options = default
*
* @param achieveTime = 60
* Время (в секундах), при котором будет засчитано достижение (вызвана callBack-функция)
*
* @param loop = 0
* При зачете достижения - не останавливаться, считать дальше
*
* @param eventList = 'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error'
* При зачете достижения - не останавливаться, считать дальше
*
* @param testPeriod = 10
* Время (в секундах) - периодичность проверки событий на странице
*
* @param useMultiMode = 0
* Использовать cookie, для продолжения работы при переходах на другие страницы сайта
*
* @param callBack = function (e) { console.log('Achieved!') }
* CallBack-функция, которая будет отрабатывать по достижение времени achieveTime
*
* @param watchEvery = 1
* Время (в секундах) - периодичность работы.
*
*
* @todo $('selector').activity(options)
*
* @example $('body').activity({'achieveTime':60,'testPeriod':10, useMultiMode: 1, callBack: function (e) { ga('send', 'event', 'Activity', '60_sec'); yaCounterXXXXXXXXX.reachGoal('60_sec'); }});
* Пример использования. Засчитать достижение по истечении 60 секунд;
* Проверять активность каждые 10 секунд; Достижение засчитывать по всему сайту;
* При достижении отработает функция, которая выполнит:
* ga('send', 'event', 'Activity', '60_sec'); для Universal Analytics
* yaCounterXXXXXXXXX.reachGoal('60_sec'); для Яндекс.Метрика (где XXXXXXXXX = ваш счетчик)
*
*/

(function( $ ){
	var timerHand = 0, data = {}, eventFlag = 0, methods = { // Системные переменные и методы
		init:function(settings) { //Функция инициализация
			return this.each(function() { //Инициализируем объекты
				data = jQuery.extend({ // Установка параметров
					achieveTime: 60 // Время (в секундах), при котором будет засчитано достижение (вызвана callBack-функция)
					,loop:0 // При зачете достижения - не останавливаться, считать дальше
					,eventList:'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error'
					,testPeriod: 10 // Время (в секундах) - периодичность проверки событий на странице
					,useMultiMode : 1 // Использовать cookie, для продолжения работы при переходах по страницам
					,callBack: function (e) { console.log('Achieved!') } // CallBack-функция, которая будет отрабатывать по достижение времени achieveTime
					,watchEvery: 1 // Время (в секундах) - периодичность работы.
					,counter : {'test':0, 'achiev':0} // Счетчики проверки активности и достижения (оставить по-умолчанию)
				}, settings);

				data.watchEvery *= 1000; //Счетчик наблюдения

				if(data.useMultiMode) {
					methods.loadMultiData();//Если включен режим кросс-страничного наблюдения - загружаем данные
				}

				if(data.counter.achiev != -1) { //Если не выключено
					$(this).bind(data.eventList, methods.eventTrigger); //Bind`дим события из eventList к указанному объекту
					methods.process();  // Запускаем процесс проверки
				}
			})
		}, process:function() { // Функция, отрабатывающая каждые watchEvery*1000
			data.counter.test += 1; // Увеличиваем счетчик проверки активности

			if(data.counter.test == data.testPeriod) { // Если пришло время его просматривать
				if(eventFlag) { // Если во время проверки было зафиксировано событие
					eventFlag = 0; // Сбрасываем флаг фиксации события
					data.counter.achiev += data.testPeriod; // Увеличиваем счетчик достижения на количество времени проверки активности
				}
				data.counter.test = 0; // Сбрасываем счетчик проверки активности
			}

			timerHand = setTimeout(methods.process, data.watchEvery); // Установка таймера watchEvery
			if(data.counter.achiev >= data.achieveTime) { // Проверка, не сработало ли достижение
				if(!data.loop) clearTimeout(timerHand); // Если в цикле "достигаем" - убираем сбрасываем таймер проверки
				data.counter.achiev = data.loop ? 0 : -1; //Если в цикле - сбрасываем достижение, иначе выключаем
				data.callBack.call(this,data); // Вызываем callBack-функцию отработки достижения
			}
			if(data.useMultiMode) document.cookie = 'activity=' + data.counter.test+'|'+data.counter.achiev+'; path=/;'; // Если используем кросс-страничные достижения - сохраняем данные счетчиков в cookie

		}, eventTrigger:function() { // Триггер, отрабатывает при срабатывании событий из eventList
			eventFlag = 1; // Установка флага отработки события
		}, loadMultiData:function() { // Стандартный способ загрузки cookie
			var search = ' activity=';
			var cookie = ' ' + document.cookie;
			if (cookie.length > 0) {
				if (cookie.indexOf(search) != -1) {
					offset = cookie.indexOf(search) + search.length;
					var m = unescape(cookie.substring(offset, cookie.indexOf(";", offset) == -1 ? cookie.length : cookie.indexOf(";", offset))).split('|');
					data.counter.test = parseInt(m[0]);
					data.counter.achiev = parseInt(m[1]);
					return;
				}
			}
			data.counter.test = data.counter.achiev = 0;
		}};

		$.fn.activity = function(method) { // Плагин Activity
			if(methods[method]) { // Если вызван метод
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				if(typeof method === "object" || !method) { // Происходит инициализация
					return methods.init.apply(this, arguments);
				} else {
					$.error("Method " + method + " does not exist on jQuery.activity"); //Выводим ошибку.
				}
			}
		}
})( jQuery );