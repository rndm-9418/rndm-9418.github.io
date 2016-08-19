function PopupBoxButton(title, type, func){
	this.button = document.createElement('input');
	//this.button.href = 'javascript:;';
	//this.button.className = (type == 'active' ? 'popup_box_button' : 'popup_box_button2');
	this.button.type = 'submit';
	this.button.value = title;
	
	jWps.event.add(this.button, 'mouseup', func);
}

function PopupBox(caption, body, buttons, width){
	this.caption = (caption && caption != '') ? caption : getLang('popup_box_loading');
	this.body = (body && body != '') ? body : '<div class="popup_box_loading"></div>';
	
	this.width = (width) ? width : 400;
	
	this.createBoxBack();
	this.createBox();
	this.addButtons(buttons);	
}

function ToolTip(elem, text){
	if(!elem || !text) return;
	this.elem = elem;
	this.text = text;
	
	this.showedBox = false;
	this.timeId = null;
	/* this.elemPos = jWps(this.elem).getPosition();
	this.elemWidth = this.elem.offsetWidth;
	this.elemHeight = this.elem.offsetHieght;
	
	this.op = 0.1;
	
	this.createBox();
	this.setPosition();
	this.appear();
	
	this.elem.onmouseout = function(){
		document.body.removeChild(this.box);
	}.bind(this); */
};

function SetCaretAtEnd(elem) {
        var elemLen = elem.value.length;
        // For IE Only
        if (document.selection) {
            // Set focus
            elem.focus();
            // Use IE Ranges
            var oSel = document.selection.createRange();
            // Reset position to 0 & then set at end
            oSel.moveStart('character', -elemLen);
            oSel.moveStart('character', elemLen);
            oSel.moveEnd('character', 0);
            oSel.select();
        }
        else if (elem.selectionStart || elem.selectionStart == '0') {
            // Firefox/Chrome
            elem.selectionStart = elemLen;
            elem.selectionEnd = elemLen;
            elem.focus();
        } // if
    }

function uiAutocompleteClearCity(){
	var elem = jWps('#ac_city_id')[0];
	var elem_hint = jWps('.ui-autocomplete-hint', elem)[0];
	var elem_input = jWps('.ui-autocomplete-input', elem)[0];
	var elem_hidden = jWps('.ui-autocomplete-hidden', elem)[0];
	
	elem_hint.innerHTML = elem_hint.getAttribute('val');
	elem_input.value = '';
	elem_hidden.value = '';
	
	if(elem.autocomplete_init){
		elem_input.value_old = '';
		elem_input.autocomplete_list_items_cache_value = '';
		elem_input.autocomplete_default_value = '';
		elem_input.autocomplete_default_title = '';
	}
}
function uiAutocompleteDataFixCityCountry(elem){
	elem.autocomplete_data['country'] = jWps('#ac_country_id').find('.ui-autocomplete-hidden')[0].value;
}

function uiAutocompleteClearCity2(){
	var elem = jWps('#change_city_id')[0];
	var elem_hint = jWps('.ui-autocomplete-hint', elem)[0];
	var elem_input = jWps('.ui-autocomplete-input', elem)[0];
	var elem_hidden = jWps('.ui-autocomplete-hidden', elem)[0];
	
	elem_hint.innerHTML = elem_hint.getAttribute('val');
	elem_input.value = '';
	elem_hidden.value = '';
	
	if(elem.autocomplete_init){
		elem_input.value_old = '';
		elem_input.autocomplete_list_items_cache_value = '';
		elem_input.autocomplete_default_value = '';
		elem_input.autocomplete_default_title = '';
	}
}
function uiAutocompleteDataFixCityCountry2(elem){
	elem.autocomplete_data['country'] = jWps('#change_country_id').find('.ui-autocomplete-hidden')[0].value;
}


function Loader(id, item, file_name){
	if (!file_name) file_name = 'ajax-loader.gif';
	
	var a = "<img src='/images/"+file_name+"' id='loader_"+id+"'>";
	if ($(item).length>0){
		$(item).after(a);
		return function(){
			$('#loader_'+id).remove();
		}
	}else
		return a;
}

function load_reg_form(){
	
	load_info(jQuery("#tmpl-reg_form").html(), 450);
	return false;
}


function getScrollY()
{
    scrollY = 0;   
    if (typeof window.pageYOffset == "number") {
        scrollY = window.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollY = document.documentElement.scrollTop;
    }  else if (document.body && document.body.scrollTop) {
        scrollY = document.body.scrollTop;
    } else if (window.scrollY) {
        scrollY = window.scrollY;
    }
    return scrollY;
}
function load_info(html, width, callback)
{
	var ua = navigator.userAgent.toLowerCase();
var isOpera = (ua.indexOf('opera')  > -1);
var isIE = (!isOpera && ua.indexOf('msie') > -1);

function getDocumentHeight() {
  return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, getViewportHeight());
}

function getViewportHeight() {
  return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;
}

	
	
	
	jQuery("#shadow_info").addClass("shadow_info");
	jQuery("#shadow_info").show();
	
	jQuery("#info_div").addClass("dialog");//.css({top: getScrollY()+100});
	jQuery("#shadow_info").css("height", getDocumentHeight());
	
	var header="<div class='info_head'><a href='#' onclick='close_info(\"\"); return false;'>╳</a></div>";
	jQuery("#info_div").html(header+"<div class='info_content'>"+html+"</div>");
	if (width)
	{
		
		jQuery("#info_div").css("width", width);
		jQuery("#info_div").css("left", "50%");
		jQuery("#info_div").css("margin-left", -1*(width/2));

	}
	
	if(jQuery("#info_div").show() && 1==2)
	{	
		jQuery.get("/ajax.php", {"act": "load_info_confirm", "do": jQuery.cookie('doing')}, function(data){
			if (data!='')
				alert(data);
		});
	}
	
	setTimeout(function(){
		if (typeof window[callback]=='function'){
			window[callback]();		
		}
		else if (typeof callback == 'function')
			callback();
	}, 100);
}
function open_img(src, title, width)
{
	if (!width)
		var width = 500;
	var img='<h2>'+title+'</h2><img src="'+src+'" style="max-width: '+width+'px; background: #fff;"/>';
	load_info(img, width+300);
}

function close_info(id)
{
	$('#info_div').css({'position': 'fixed'});
	jQuery(".dialog").off();
	if (!id || id=='') id = "info_div"; 
	jQuery("#"+id).queue(function(){
		jQuery(this).hide();
		jQuery("#shadow_info").hide();
		jQuery(this).dequeue();
		
	}) 
	;
	jQuery("#"+id).queue(function(next){
		jQuery(this).removeClass();
		next();
		
	});
	
}

function startMultiTimer(serverTime)
{
	var now=new Date().getTime();
	var leftTime=reg_left_time;
	now=Math.floor(now/1000);
	
	var gsm=Math.floor((now-serverTime)/3600);

	if(leftTime<=0)
	{
		return;
	}

	var days=0,seconds=0,minutes=0,hours=0;
	if(leftTime>=86400)
	{days=(leftTime/86400);days=Math.floor(days)+"";}
	if(leftTime>=3600)
	{hours=(leftTime-days*86400)/3600;hours=Math.floor(hours)+"";}
	if(leftTime>=60)
		{minutes=(leftTime-(days*86400)-(hours*3600))/60;
		minutes=Math.floor(minutes)+""}
	
	seconds=leftTime-(days*86400)-(hours*3600)-(minutes*60);
	seconds=Math.floor(seconds)+"";
	
		
	if (days.length==1){
		jQuery(".day_1").text(0);
		jQuery(".day_2").text(days);
	}
	else{
		
		jQuery(".day_1").text(days.substr(0,1));
		jQuery(".day_2").text(days.substr(1,1));
	}

	if (hours<10){
		jQuery(".hour_1").text(0);
		jQuery(".hour_2").text(hours);
	}
	else{
		jQuery(".hour_1").text(hours.substr(0,1));
		jQuery(".hour_2").text(hours.substr(1,1));
	}
	if (minutes<10){
		jQuery(".min_1").text(0);
		jQuery(".min_2").text(minutes);
	}
	else{
		jQuery(".min_1").text(minutes.substr(0,1));
		jQuery(".min_2").text(minutes.substr(1,1));
	}
	
	if (seconds<10){
		jQuery(".sec_1").text(0);
		jQuery(".sec_2").text(seconds);
	}
	else{
		jQuery(".sec_1").text(seconds.substr(0,1));
		jQuery(".sec_2").text(seconds.substr(1,1));
	}
	
	leftTime--;
	reg_left_time=leftTime;
	setTimeout("startMultiTimer("+(serverTime+1)+")",1000);
}

/*
setTimeout(function(){
	if (!jQuery.cookie("_getResponse")){
		jQuery.cookie("_getResponse", 1, {path: "/",  expires: 1});
		load_reg_form();
	}
}, 5000);
*/

function show_message(type, text, time, $d)
{
	if (!time) time = 3000;
	if (!$d) $d = $d=document;
	console.log($($d));
	jQuery("#message_info", $($d)).addClass("show_message");
	jQuery("#message_info", $($d)).show("slow");
	jQuery("#message_info", $($d)).addClass(type);
	var ok = "<br><br><center><a href='#' onclick='close_info(\"message_info\"); return false;'>Закрыть</a></center>";
	jQuery("#message_info", $($d)).html(text+ok);
	setTimeout(function(){
		close_info("message_info");
	}, 4000);
	return "";
}


function to_know_free(id){
	load_info(jQuery("#tmpl-free_form").html(), 450, function(){
		if (jQuery.cookie('UserName')) $('#subscribe_name').val(jQuery.cookie('UserName'));
		if (jQuery.cookie('UserEmail')) $('#subscribe_email').val(jQuery.cookie('UserEmail'));
	});
	
	$("#subscribe").click(function(){
		var $form = $("#subscribe_form");
		var email = $("#subscribe_email").val(), name = $("#subscribe_name").val();
		$("#error").remove();
		if (email!=''){
			if (name!=''){
				$("#subscribe").val("Подождите…");
				$.post("/ajax.php", {module: 'forecasts', dataType: 'json', act: 'new_ref', fid: id, 'email': email, 'name': name, id: $('html').data('prid'), ad: $('html').data('ad')}, function(data){
					if(data.result=='-1'){
						alert('Введен не корректный Email');
					}else{
						var request = '?type=ajax&name='+encodeURIComponent($("#subscribe_name").val())+'&email='+encodeURIComponent($("#subscribe_email").val())+'&submit=Будьте с нами!&webform_id='+$form.data('form_id')+"&custom_source="+encodeURIComponent("")+"&callback=?";
						$('#subscribe_form').html('<p class="success">Проверяйте почтовый ящик! Прогноз был успешно отправлен!</p>');
						$.getJSON($form.data('action')+request,function(data){
							window.console.log(data);
						});
					}
				});
			}else{
				$('#subscribe_form').before('<p class="warning" id="error">Введите ваше имя!</p>');
			}
		}else{
			$('#subscribe_form').before('<p class="warning" id="error">Введите Email!</p>');
		}
	});
}

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
function GetHelp(mdl, auto){

	var id = mdl;

	if(typeof help_config != 'undefined') {
		id = help_config[mdl];
	}

	if (id != undefined){
		$('body').addClass('load');
		$.post("/ajax.php", {module: 'pages', id: id, dataType: 'json', act: 'getPage', autoPage: auto==true ? 1 : 0}, function(data){
			$('body').removeClass('load');
			MY_OVERLAY.active(data.response);
		}, 'json');	
	}
}

function getUserTime(){
	var d = new Date(), year = d.getFullYear(),month_num = d.getMonth()+1, day = d.getDate(), hours = d.getHours(), minutes = d.getMinutes(),seconds = d.getSeconds();
	return year+"-"+(month_num<10 ? 0 : '')+month_num+"-"+(day<10 ? 0 : '')+day+" "+(hours<10 ? 0 : '')+hours+":"+(minutes<10 ? 0 : '')+minutes+":"+(seconds<10 ? 0 : '')+seconds
}

$(document).ready(function(){
	var d = new Date(), year = d.getFullYear(),month_num = d.getMonth()+1, day = d.getDate(), hours = d.getHours(), minutes = d.getMinutes(),seconds = d.getSeconds();
	
	$.post("/ajax.php", {act: 'setActivity', time: 0, dataType: 'json', user_time: getUserTime() });

	$('.hide_pay_page .bubble_blue, .hide_pay_page .bubble_green, .hide_pay_page .close_page').attr('href', '#').on('click', function(e){
		e.preventDefault();
		swal({title: $GL('close_page_until_webi:Эта страница будет доступна после того, как вы просмотрите вводный вебинар!')}, function(){
			if (!$('#enrollOnTopVebinar').hasClass('disabled') && typeof SiteGuides !='undefined') // если пользователь еще не записался на вебинар
				SiteGuides(0, [{item: false, link: '.logo'}, {item: "#next_vebinar_wrap:has(#enrollOnTopVebinar:not(.disabled))", text: 'Запишитесь на ближайший вебинар или <a href="#" onclick="CloseHints(); $(\'body\').animate({scrollTop: $(\'.calendar-wrap__title\').offset().top}, 300); return false;">выберите</a> наиболее подходящее время', position: 'bottom',  margin_h: 7}]);
			else if(UserData.phone=='' && typeof SiteGuides !='undefined')	
				SiteGuides(0, [{item: '.button_profile', text: 'Заполните контактную информацию в личном кабинете', Z: 100, position: 'left', arrow_pos: 'top', padding_h: 0, padding_v: 10, margin_h: 20}, {item: false, link: '.button_profile'}, {item: '#user_contacts_form', text: 'Заполните данную форму как можно подробнее', position: 'top'}]);
		});
	});
	
	
	$('.page_is_closed').attr('href', '#').on('click', function(e){
		e.preventDefault();
		swal({title: $GL('access_denied:Доступ запрещен'), type: 'error', text: $GL('close_page_closed_for:Эта страница доступна только пользователям с уровнем доступа "[#access]"', {access: $(this).data('access')})}, function(){});
	});
	
	if($('.zoom').length>0){
		$('.zoom').fancybox({
			helpers:{
				overlay: {locked: false},
				title:{type: 'inside'}
			}
		});
	}
	
	
	if (UserData.moder=="1"){	
		$('#header_title').on('click', function(e){
			
			if ($(e.target).attr('id')=='header_title'){
				var val = $(this).text();
				$('#header_title').html("<input type='text' id='header_title_input' size='40'>");
				$('#header_title_input').val(val).focus();
				$('#header_title_input').on('blur', function(){
					var val = $(this).val();
					if (val!=''){
						$('#header_title').html(val);
						GoAjax({module: 'settings', act: 'editHeaderTitle', code: $('#header_title').data('code'), title: val }, function(){});	
					}
				});
			}
		});
	}
	
});

function GoAjax(obj, fn){
	obj.dataType = 'json';
	
	
	var response = $.ajax({
		
		type: 	"POST"
	,	url:	"/ajax.php"	
	,	data: 	obj
	,	async:	false
	,	dataType: 'json'
	,	cache: 	false
	,	beforeSend: function(){
		$('body').addClass('load');
	}
	,	complete: function(jqXHR, textStatus){
		$('body').removeClass('load');
	},	success: function(data){
		if (typeof data.error_message != 'undefined'){
			swal({title: $GL('error'), text: data.error_message, type: 'error'});		
		}else if (typeof data.success_message != 'undefined')
			swal({title: $GL('error'), text: data.success_message, type: 'success'});
			
		fn(data);
	}	
	});
	return response.responseJSON;
}
function GetTpl(type, name, mdl){
	var html = GoAjax({act: 'getTpl', type: type, name: name, mdl: mdl}, function(data){
		
	});
	return html.responseTpl;
}

function setLanguage(ln){
	$.cookie('Language', ln, {expire: 365, domain: "."+window.location.host});
	$('body').addClass('load');
	window.location.href=window.location.href;
}

(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( limit - chars );
            }
            setCount($(this)[0], elem);
        }
    });
})(jQuery);


