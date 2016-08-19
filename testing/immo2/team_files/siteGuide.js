
function setcookie(name, value, expires, path, domain, secure) {
    expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + "=" + escape(value)], s, i;
    for(i in s = {expires: expires, path: path, domain: domain}){
        s[i] && r.push(i + "=" + s[i]);
    }
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
}
function getcookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts[key] = array2json(value); /* :RECURSION: */
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';

            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + (value ? value.replace(/"/g, '\\"') : value) + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)

            parts.push(str);
        }
    }
    var json = parts.join(",");
    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}

function  getPageSize(){
       var xs, ys, w=window, b=document.body;
 
       if (w.innerHeight && w.scrollMaxY) {
               xs = b.scrollWidth;
               ys = w.innerHeight + w.scrollMaxY;
       } else if (b.scrollHeight > b.offsetHeight){
               xs = b.scrollWidth;
               ys = b.scrollHeight;
       }else if(document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight){
               xs = document.documentElement.scrollWidth;
               ys = document.documentElement.scrollHeight;
       }else{
               xs = b.offsetWidth;
               ys = b.offsetHeight;
       }
 
       var ww, wh, de = document.documentElement;
       if (self.innerHeight) {
               ww = self.innerWidth;
               wh = self.innerHeight;
       }else if (de && de.clientHeight){
               ww = de.clientWidth;
               wh = de.clientHeight;
       }else if (b) {
               ww = b.clientWidth;
               wh = b.clientHeight;
       }
       ph = ys<wh ? ph = wh : ph = ys;
 	   pw = xs<ww ? ww:  pw = xs;
       
 
       return [pw,ph,ww,wh];
}



	
function getDocumentHeight() {
	var ua = navigator.userAgent.toLowerCase()
	, isOpera = (ua.indexOf('opera')  > -1)
	, isIE = (!isOpera && ua.indexOf('msie') > -1)
	, _d = document, de = _d.documentElement, b = _d.body;
 	return Math.max(_d.compatMode != 'CSS1Compat' ? b.scrollHeight : de.scrollHeight, 
 					function(){
 						return ((_d.compatMode || isIE) && !isOpera) ? (_d.compatMode == 'CSS1Compat') ? de.clientHeight : b.clientHeight : (_d.parentWindow || _d.defaultView).innerHeight;
					}()
				);
}

function ShowHints($list){
	var xs = [0], ys=[0], L = {}, PageSize = getPageSize();
	
	for(var i in $list){
		var $this = jQuery($list[i].item), o = $this.offset(), w = $this.width(), h = $this.height();
		L[i]=[[o.left, o.top], [o.left+w, o.top+h]];
		xs.push(o.left);
		xs.push(o.left+w);
		ys.push(o.top);
		ys.push(o.top+h);
	}
	xs.push(PageSize[0]);
	ys.push(PageSize[1]);
	
	xs.sort(function(a,b){return a - b});
	
	function array_unique(a){
		for (var i = 0; i < a.length; i++)
		for (var j = i + 1; j < a.length;)
		if (a[i] == a[j]) a.splice(j, 1);
		else j++;
		return a;
	}
	xs = array_unique(xs);
	ys.sort(function(a,b){return a - b});
	ys = array_unique(ys);
	
	LOG(xs);
	for(var xn_cnt in xs);
		
	LOG(ys);
	LOG(ys.length);
	var tbl = {};
	for(var i =0; i <=ys.length-1; i++){
		var a = [];
		
		for(var e=0; e <=xn_cnt; e++){
			a.push(xs[e]);
		}
		tbl[ys[i]]=a;
	}
	var html = '<table border="0" class="prompt">';
	var last_h=0, last_w=0;
	for(var i in tbl){
		if (i>0){
			html +='<tr id="tr_'+i+'" height="'+(i-last_h)+'">';
			
			last_w=0;
		
				for(var e in tbl[i]){
					LOG(tbl[i][e]+" = "+last_w);
					if (tbl[i][e]>0){
						html+="<td id='td_"+i+"_"+e+"' style='width: "+(parseFloat(tbl[i][e])-parseFloat(last_w))+"px; height: "+(i-last_h)+"px;'>";
						var ok=false;
						LOG(L);
							
							for(var r in L){
								LOG(L[r][0][0]+" - "+L[r][1][0]);
								if(L[r][0][0]==tbl[i][e] && L[r][1]==i)
									ok = true;
							}

							LOG("______");
						if(ok)
							html+='1';
						else
							html+='&nbsp;';
							
						html+="</td>";
						last_w=tbl[i][e];
					}
				}
				last_h=i;
			html +='</tr>';
		}
	}	
	html+='</table>';
	jQuery('body').append(html);
	return;
}

function Show_Hint(element, offSet, Params){
	
	
	var xxx = offSet.top+"-"+offSet.left+"#"+element.width()+"-"+element.height();
	if (Params.Z){
		jQuery("#GuideText").css({'z-index': parseInt(Params.Z)+1});
	}
	
	if (Guides.lastOffset==xxx)
		return false;
	else
		Guides.lastOffset=xxx;
		
	$('.site-guide-current').removeClass('site-guide-current');
	element.addClass('site-guide-current');
	
	$('.ShadowGuides').remove();

	if (jQuery("#TR1").length==0){
		
		jQuery(".container-overlay").append("<div id='TR1' class='ShadowGuides traHorizontal_1 traVertical_1'></div><div id='TR2' class='ShadowGuides traHorizontal_1 traVertical_2'></div><div id='TR3' class='ShadowGuides traHorizontal_1 traVertical_3'></div><div id='TR4' class='ShadowGuides traHorizontal_2 traVertical_1'></div><div id='TR5' class='ShadowGuides traHorizontal_2 traVertical_2'></div><div id='TR6' class='ShadowGuides traHorizontal_2 traVertical_3'></div><div id='TR7' class='ShadowGuides traHorizontal_3 traVertical_1'></div><div id='TR8' class='ShadowGuides traHorizontal_3 traVertical_2'></div><div id='TR9' class='ShadowGuides traHorizontal_3 traVertical_3'></div><div id='TR10' class='ShadowGuides traHorizontal_2 traVertical_2'></div>");
	}
	
	$('body').css({"overflow-y": 'hidden'}); 
	
	
	var $shadow = jQuery(".ShadowGuides");
	
	if (Params.shadow){
		
		$shadow.css({'background': 'rgba(0,0,0, '+parseFloat(Params.shadow[0])+')'});
		if (Params.shadow[1])
			jQuery("#TR10").css({"box-shadow": Params.shadow[1]});
	}
	
	var PageSize = getPageSize(), 
		padding_h = Params['padding_h']?Params['padding_h']:0, 
		padding_v = Params['padding_v']?Params['padding_v']:0, 
		margin_h = Params['margin_h']?Params['margin_h']:0, 
		margin_v = Params['margin_v'] ? Params['margin_v'] : 0;
	
	if (!element.hasClass('site-guide-was-target') && 0){	
		var _padding_v = 200, _padding_h = 200;
	}else
		var _padding_v = padding_v, _padding_h = padding_h;
		
		var _padding_v = padding_v, _padding_h = padding_h;
		
		jQuery(".traHorizontal_1").css({"height": offSet.top-_padding_v/2+margin_v});
		jQuery(".traVertical_1").css({"width": offSet.left-_padding_h/2+margin_h});
		
		jQuery(".traVertical_2").css({"width": 'auto', "left": parseFloat(jQuery("#TR1").css("left"))+parseFloat(jQuery("#TR1").css("width")), "right": 0});
		jQuery(".traHorizontal_2").css({"height": element.height()+_padding_v, "top": (parseFloat(jQuery("#TR1").css("height")))});
		
		jQuery(".traVertical_3").css({"left": parseFloat(jQuery("#TR4").width())+parseFloat(jQuery("#TR5").width())+(jQuery("body").css('overflow')=='hidden'||Params.body_ohidden?15:0), 'right': 0});
		jQuery(".traHorizontal_3").css({"top": (jQuery("#TR1").height())+parseFloat(jQuery("#TR4").height()), "height": window.PageSize[1]-(jQuery("#TR1").height())+parseFloat(jQuery("#TR4").height())});	
		$shadow.css({'opacity': 1});
	
		
	
	
	
		setTimeout(function(){
			
			$('.ShadowGuides').addClass('ShadowGuides-open');
			$(".traHorizontal_1").css({"height": offSet.top-padding_v/2+margin_v});
			$(".traHorizontal_2").css({"height": element.height()+padding_v, "top": offSet.top-padding_v/2+margin_v});
			$(".traHorizontal_3").css({ "top": (offSet.top-padding_v/2+margin_v) + (element.height()+padding_v), "height": window.PageSize[1]-((offSet.top-padding_v/2+margin_v) + (element.height()+padding_v))});
			
			$(".traVertical_1").css({'width': offSet.left-padding_h/2+margin_h});
			$(".traVertical_2").css({ "left": offSet.left-padding_h/2+margin_h});
			$('#TR5').css({'width': element.width()+padding_h});
			$(".traVertical_3").css({'left': offSet.left-padding_h/2+margin_h+element.width()+padding_h});
			
			setTimeout(function(){
				$('.ShadowGuides-open').removeClass('ShadowGuides-open');
			}, 800);
			$shadow.css({'opacity': 1});
		}, 100);

	if (element)
		element.addClass('site-guide-was-target');
	
	jQuery("#TR5, #TR10").css({"background": 'none'});
	if (Params.Z){
		jQuery("#GuideText").css({'z-index': parseInt(Params.Z)+1});
		$shadow.css({'z-index': parseInt(Params.Z)});
	}
	if (Params.arrow_pos){
		jQuery("#GuideText").addClass('arrowpos-'+Params.arrow_pos);
	}
	if (System.config.hints_last_elup){
		System.config.hints_last_elup.e.css({'z-index': System.config.hints_last_elup.z});
	}
	if (Params.active){
		System.config.hints_last_elup={e: element, z: element.css('z-index')};
		element.css({'z-index': jQuery("#GuideText").css('z-index')});
	}else
		System.config.hints_last_elup=false;
		
	var TR10 = jQuery("#TR10");
	TR10.css({'box-shadow': '0 2px 10px 0 rgba(0, 0, 0, 0.5), 0 0 25px 0 rgba(0, 0, 0, 0.7) inset'});
	
	if (TR10.data('addclass')){
		TR10.removeClass(TR10.data('addclass'));
		TR10.data('addclass', false);
	}
	if (Params.addClass)
		jQuery("#TR10").addClass(Params.shadow_bd).data('addclass', Params.addClass);
	if (Params.shadow_bd){
		TR10.css({'box-shadow': function (){
							switch(Params.shadow_bd){
								case 'yellow': { return TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(255,255,0,0.7) inset'}); break;}
								case 'red': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(255,0,0,0.7) inset'}); break;}
								case 'green': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(0,255,0, 0.7) inset'}); break;}
								case 'blue': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(0,0,255,0.7) inset'}); break;}
								case 'aqua': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(0,255,255,0.7) inset'}); break;}
								case 'purpule': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(255,0,255,0.7) inset'}); break;}
								case 'white': { return  TR10.css({'box-shadow': '0 2px 10px 0 rgba(0,0,0,0.5), 0 0 25px 0 rgba(255,255,255,0.7) inset'}); break;}
								default: { return TR10.css({'box-shadow': Params.shadow_bd}); break; }	
							} 
						}});
	}
	
	$shadow.unbind(System.eventClick).bind(System.eventClick, function(){
		CloseHints();
	});
	if (typeof Params.fn == 'function'){
		Params.fn();
	}
	Guides.l={'element': element, 'offSet': offSet, 'Params': Params};
	if (Params.hint_id){
		jQuery("#GuideText, .ShadowGuides").addClass(Params.hint_id);
	}
	return true;
}

var System = {config: {}};

var Guides = {};
Guides.list = [];
Guides.lastPoss = {};
Guides.lastOffset = undefined;



function count_prs(obj)
{
    var count = 0; 
    for(var prs in obj) 
    { 
        count++;
    } 
    return count; 
}


function SiteGuides(step, LList, LParams){
		
	// arrow_pos
		if (!LList)
			LList = Guides.list;
			
		if (Guides.interval) clearInterval(Guides.interval);
			Guides.lastPoss={};
		var EventClick = 'ontouchstart' in document.documentElement  ? 'touchend' : 'click';
		Guides.cnt=count_prs(LList);
		
		if (step==0 && LParams && LParams.startLocation){
			jQuery.cookie('GuideStartPage', window.location.href, "/");
		}
		
		if (step<Guides.cnt){
		if (!LList[step]){
			SiteGuides(parseInt(step)+1, LList, LParams);
		}
		if (LList[step].click){
			jQuery(LList[step].click).click();
		}
		if (LList[step].link){
			
			
			var d = window.location.href.split(document.domain), link = LList[step].link.substr(0, 1)=='/' ? LList[step].link : $(LList[step].link).attr('href');
			
			if (d[1]!=link){
				jQuery.cookie('GuideStep', step+1, "/");
				jQuery.cookie('GuideStep_list', array2json(LList), "/");
				
				$('body').addClass('load');
				
				window.location.href=link;
				return;
			}else
				SiteGuides(step+1, LList, LParams);
		}
		jQuery.cookie('GuideStep', null, "/");
		jQuery.cookie('GuideStep_list', null, "/");
		
		var elem = undefined;
		if (LList[step].item!=false){
			elem = LList[step].parent ? LList[step].parent.find(LList[step].item) : $(LList[step].item);
		}
		console.info(elem);
		if (typeof LList[step].padding_v=='undefined')
			LList[step].padding_v = elem && elem.data("sg_padding_v") ? parseInt(elem.data("sg_padding_v")) : 0;
		if (typeof LList[step].padding_h=='undefined')
			LList[step].padding_h = elem && elem.data("sg_padding_h") ? parseInt(elem.data("sg_padding_h")) : 0;
		if (typeof LList[step].margin_v=='undefined')
			LList[step].margin_v = elem && elem.data("sg_margin_v") ? parseInt(elem.data("sg_margin_v")) : 0;
		if (typeof LList[step].margin_h=='undefined')
			LList[step].margin_h = elem && elem.data("sg_margin_h") ? parseInt(elem.data("sg_margin_h")) : 0;
		
		if (elem.data('sg_position')!='undefined')
			LList[step].position=elem.data('sg_position');
		
		if (Guides.interval) clearInterval(Guides.interval);
		
		setTimeout(function(){
			if (LList[step].item!=false){
				
				var element = LList[step].parent ? LList[step].parent.find(LList[step].item) : jQuery(LList[step].item);
				LOG(LList[step].item);
				if (element.length ){
					
					function show_promped(){
							
							if(typeof LList[step].show == "function"){
								LList[step].show();
							}
							
							element = LList[step].parent ? LList[step].parent.find(LList[step].item) : jQuery(LList[step].item);
							offSet = element.offset();
							
							var TR5_top = offSet.top-LList[step].padding_v/2;
							
							var POS = 'top';
							if (LList[step]['position'])  POS = LList[step]['position'];
							
							if (typeof LList[step].scrollNone=='undefined'){ 
								var st = parseFloat(TR5_top)-(POS=='top' ? parseFloat(jQuery("#GuideText").height()) : 0)-30;
								
								jQuery("body").animate({scrollTop : st},300); // авто скрол страницы до элемента
							}
							
							if (LList[step].item && jQuery(LList[step].item).length==0){ // если текущего элемента нет на странице пытаемся запустить следующий шаг
								SiteGuides(step+(LList[step-1] && LList[step-1].link?0:1), LList, LParams);
								return false;
							}
							
							console.log(Guides.lastPoss);
							if ( typeof Guides.lastPoss.top == 'undefined' ||  ((Guides.lastPoss.top && (Guides.lastPoss.top!=Math.round(offSet.top) || Guides.lastPoss.left!=Math.round(offSet.left))))){
								
								System.config.show_hints=true;
								
								
								jQuery("#GuideText").data('GuideCurrentStep', step);
								LList[step]._params=LParams;
								console.warn(offSet);
								if (Show_Hint(element, offSet, LList[step])){
									
									$('#GuideText').remove();
									$("body").append("<div id='GuideText'></div>");
								}
								
								$('#TR5, #TR10').show();
								
								var TR5 = jQuery("#TR5");
								TR5.bind(EventClick, function(){
									jQuery("#Guide_next").click();
								});
								var text = ""+LList[step].text+"<div class='next'><a href='javascript: void 0;' id='Guide_next'>"+(step<Guides.cnt-1?$GL('NextPrompt:Дальше'):$GL("close"))+"</a></div>";
								

								if (!(step<Guides.cnt-1) && Guides._params)
									Guides._params.click_close=false;
									
								
								jQuery("#GuideText").html(text);
								jQuery("#Guide_next").bind(EventClick, function(){
									if (step<Guides.cnt-1)
										SiteGuides(parseInt(step)+1, LList, LParams);
									else{
										CloseHints();
									}
								});
								console.info(LList[step]);
								
								
								var	LTOP = POS=="top" ? 
														parseFloat(TR5_top)-parseFloat(jQuery("#GuideText").css("height"))-15 
													  : 
													  	( 
													  		POS=="bottom" ? 
													  						offSet.top+element.height()+LList[step].padding_v/2+20 
													  					  : 
													  					  (
													  					  	POS=='left' || POS=='right' ? 
													  					  									LTOP = TR5_top+(element.height()+LList[step].padding_v)/2 - $("#GuideText").height()/2
													  					  								: 0
													  					  )
													  	)
									, TR5_left = offSet.left+LList[step].margin_h-LList[step].padding_h/2, 
									LLEFT = POS=="left" ? parseFloat(TR5_left)-parseFloat(jQuery("#GuideText").css("width"))-15 : 
														(POS=='right' ? parseFloat(TR5_left)+element.width()+LList[step].padding_h + LList[step].margin_h : 0);
														
								var st = $(window).scrollTop(); 
								if (LTOP<st) LTOP=st;
								
								var left = POS=="top" || POS=="bottom"?offSet.left+element.width()/2-$('#GuideText').width()/2:LLEFT;
								var pageSize = getPageSize();
								if (left+$("#GuideText").width() > pageSize[0]){
									left = pageSize[0]-$("#GuideText").outerWidth()-10;
								}
								
								jQuery("#GuideText").css({
									"left": left, 
									"top": LTOP
								});
								
															
								jQuery("#GuideText").removeClass('position-top');
								jQuery("#GuideText").removeClass('position-right');
								jQuery("#GuideText").removeClass('position-bottom');
								jQuery("#GuideText").removeClass('position-left');
								
								jQuery("#GuideText").addClass('position-'+POS);
									
								
								
								$('#TR5, #TR10').hide();
								
								Guides.lastPoss.top=Math.round(offSet.top);
								Guides.lastPoss.left=Math.round(offSet.left);
								
								if (!LList[step].body_overflow)
									$('body').css({'overflow': 'hidden'});
								else
									$('body').css({'overflow': LList[step].body_overflow});
							}
							console.info('fff');
							
						};
						
					show_promped();
					Guides.interval =  setInterval(function(){
						show_promped();
					}, 1000 );
				}else{
					LOG(LList[step+1]);
					if (Guides.interval) clearInterval(Guides.interval);
					SiteGuides(step+(LList[step-1] && LList[step-1].link?0:1), LList, LParams);
				}
			}
		}, (LList[step]['timeout'] && LList[step]['timeout']!='undefined')?LList[step]['timeout']:1);
		
		}else if(LParams){ // Р—Р°РєСЂС‹С‚РёРµ РїРѕРґСЃРєР°Р·РѕРє
			if (LParams.startLocation){
				jQuery("#GuideText, .ShadowGuides").remove();
				jQuery.cookie('GuideStep', null, "/");
				jQuery.cookie('GuideStep_list', null, "/");
				var SP = jQuery.cookie('GuideStartPage', '/');
				jQuery.cookie('GuideStartPage', null, '/');
				window.location.href=SP;
				return;
			}
			CloseHints();
		}	
}

function ShowPrompt(parent, params, allInPage){
	
	if (jQuery("#GuideText").length==0 && (!params.condition || eval(params.condition))){
		if (!parent) var parent = "body";
		var $list = [], t = params.element? params.element : ".prompt";
		
		if (allInPage==true)
			t="[data-prompt]";
		var $items = jQuery(t, parent);
		
		$items.each(function(i, elem){
			var $this = jQuery(this);
			
			var pos = $this.data("promptpos"),
				Z = $this.data('promptz');
			if (!pos) pos = "top";
			var text = $this.data("prompttext");
			
			if ($this.data("prompt")){
				LOG(text);
				var a = {item: "#"+$this.attr("id"), 
				'parent': parent, 
				text: $this.data('texttype')=='js'?eval(text):text,
				 position: pos, 
				 'Z': Z, 
				 prompt: $this.data("prompt"), 
				 show: function(){
					var c=jQuery.cookie("_prompt_showed");
					if (!c) c ="";
					c+=$this.data("prompt")+";";
					jQuery.cookie("_prompt_showed", c, { path: "/", expires: 7 });
				}, active: $this.data('active')};
				if ($this.data('padding_h'))
					a.padding_h=$this.data('padding_h');
				if ($this.data('color'))
					a.shadow_bd=$this.data('color');
				if ($this.data('margin_h'))
					a.margin_h=$this.data('margin_h');
					
				if (params){
					for(var q in params){
						a[q]=params[q];
					}
				} 
				if ($this.data('pindex')!=undefined)
					$list[parseInt($this.data('pindex'))]=a;
				else
					$list[i]=a;
			}
		});
		
		var list = [];
		for(var i =0; i < $items.length; i++){ 
			list.push($list[i]);
		}

		if (window.SiteGuides){
			if ($list.length>0){
				jQuery("#QW, #QW_overlay").fadeOut(300);
				jQuery("#QW_overlay").hide();
				if ( 1==1){
					Guides._params=params;
					SiteGuides(0, $list, {});
				}
				else
					ShowHints($list);
			}
		}
	}else{
		Guides.timeOutPrompt = setTimeout(function(){
			ShowPrompt(parent, params, allInPage);
		}, 2000);
	}
	return false;
}
function CloseHints(id){
	var close = function(){
		Guides.lastPoss = {};
		Guides.lastOffset = undefined;
		
	jQuery("#GuideText"+(id?"."+id:'')+", .ShadowGuides"+(id?"."+id:'')).empty().remove();
	$('body').css({'overflow': 'auto'});
	clearInterval(Guides.interval);
	System.config.show_hints=false;
	jQuery.cookie('GuideStep', null, "/");
	jQuery.cookie('GuideStep_list', null, "/");
	jQuery("#QW").fadeIn(300);
	System.config.timeOutPrompt=false;
	clearTimeout(Guides.timeOutPrompt);
	
	}
	if (!Guides._params || !Guides._params.click_close){
		close();
	}else{
		wps_confirm($GL('Guides_close'),  $GL('Guides_close_ask'), function(){
				close();
			}, function(){
				return false;
			});
	}
}
jQuery(document).ready(function(){
	window.PageSize = getPageSize();
	jQuery(document).keypress(function (e) { 
		var keyCode = e.which!=0?e.which:e.keyCode;
          if ((keyCode==32 || keyCode==39) && jQuery("#GuideText").length>0) {
               SiteGuides(parseInt(jQuery("#GuideText").data('GuideCurrentStep'))+1, Guides.list, {startLocation: "/"});
          }
     });
     if (jQuery.cookie('GuideStep')){
	     SiteGuides(jQuery.cookie('GuideStep'), eval('('+jQuery.cookie('GuideStep_list')+')'));
     }
});



//SiteGuides(0, [{item: '.button_profile', text: 'Заполните контактную информацию в личном кабинете', Z: 100, position: 'left', arrow_pos: 'top', padding_h: 0, padding_v: 10, margin_h: 20}, {item: false, link: '.button_profile'}, {item: '#user_contacts_form', text: 'Заполните данную форму как можно подробнее', position: 'top', body_overflow: 'auto'}]);





