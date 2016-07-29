/*!
 * ··· Chatra | https://chatra.io/
 */
!function(a,b){function c(){}function d(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function e(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function f(a){var b=0;for(var c in a)a.hasOwnProperty(c)&&b++;return b}function g(a,b){if(f(a)!=f(b))return!1;for(var c in a)if(a.hasOwnProperty(c)&&b[c]!=a[c])return!1;return!0}function h(a){a.parentNode&&a.parentNode.removeChild(a)}function i(a){var c=["Webkit","Moz","ms"],d=b.createElement("div");if(void 0!==d.style[a])return!0;a=a.charAt(0).toUpperCase()+a.slice(1);for(var e in c)if(void 0!==d.style[c[e]+a])return!0;return!1}function j(a,b,c,d){return b?(a.addEventListener(b,c,!!d),function(){k(a,b,c,d)}):void 0}function k(a,b,c,d){b&&a.removeEventListener(b,c,!!d)}function l(a,b){var c=new Date;c.setTime(c.getTime()+31536e7),document.cookie=a+"="+b+";expires="+c.toGMTString()+";"}function m(a){var b=document.cookie.split(";");a+="=";for(var c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1);if(0==d.indexOf(a))return d.substring(a.length,d.length)}}function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function o(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))}function p(b){var c=!0;for(var d in b)b.hasOwnProperty(d)&&!{string:1,"boolean":1,number:1}[typeof b[d]]&&null!==b[d]&&(a.console&&a.console.warn&&a.console.warn("Chatra integration error: We accept Strings, Numbers, Booleans and null as integration property values. `"+d+"`’s type is `"+typeof b[d]+"`."),c=!1);return c}function q(a){for(var b in a)null!==a[b]&&(a[b]=a[b].toString());return a}function r(){function f(a){return function(){x[a].apply(this,arguments)}}var k=function(){arguments.length&&("function"==typeof k[arguments[0]]&&"_"!=arguments[0][0]?k[arguments[0]].apply(k,Array.prototype.slice.call(arguments,1)):console.warn("Chatra: No such method: "+arguments[0]))},x=k;d(k,{_init:function(){if(!a.ChatraID)return void console.warn("Chatra: No ChatraID specified, shutting down");if(s){var c=this._sniff=s(a.navigator.userAgent),d=this._setup=a.ChatraSetup||{},e=d.mode||"widget";if("trident"==c.browser.engine&&c.browser.majorVersion&&c.browser.majorVersion<=8)return void this.kill();if("safari"==c.browser.name&&(this._isSafari=!0),"widget"==e&&d.mobileOnly===!0&&!c.features.mobile)return void this.kill();if("widget"==e&&d.disabledOnMobile===!0&&c.features.mobile)return void this.kill();this._features={transform:i("transform"),transition:i("transition")};var f=this._iframe=b.createElement("iframe"),g=this._wrapper=b.createElement("div"),h=this._style=b.createElement("style"),j=b.getElementsByTagName("head")[0],k=a.ChatraProtocol||("https:"===location.protocol?"https:":"http:"),l=a.ChatraHost||"chat.chatra.io",m=a.ChatraID,o=this._getClientId(),p=function(c){var d=function(){e||(!x._killed&&c(),e=!0)},e=!1;(b.attachEvent?"complete"===b.readyState:"loading"!==b.readyState)?d():(b.addEventListener("DOMContentLoaded",d,!1),a.addEventListener("load",d,!1))};j.appendChild(h),h.textContent=v,f.setAttribute("frameborder","0"),f.setAttribute("id","chatra__iframe"),f.setAttribute("allowtransparency","true"),g.setAttribute("id","chatra"),this._addAutoRemovableEvent(a,"message",function(a){var b;try{b=JSON.parse(a.data)}catch(c){return}b.type&&"string"==typeof b.type&&"Chatra"===b.sender&&x._messageHandler(b.type,b.data)}),this._addAutoRemovableEvent(a,"focus",function(){x._postMessage("focus")}),this._addAutoRemovableEvent(a,"blur",function(){x._postMessage("blur")}),d.groupId=window.ChatraGroupID||d.groupId;var q=(navigator.language||navigator.userLanguage||"en").split("-")[0],r="hostId="+m+"&mode="+encodeURIComponent(e)+(d.buttonStyle?"&buttonType="+d.buttonStyle:"")+"&lang="+q+(d.language&&"string"==typeof d.language?"&langOverride="+d.language:"")+(d.locale?"&locale="+encodeURIComponent(JSON.stringify(d.locale)):"")+("undefined"!=typeof d.groupId?"&groupId="+d.groupId:"")+"&clientId="+o+"&currentPage="+encodeURIComponent(location.href)+"&currentPageTitle="+encodeURIComponent(b.title)+"&referrer="+encodeURIComponent(b.referrer),u=k+"//"+l+"/button--jsonp?protocol="+k+"&"+r,y=k+"//"+l+"/?"+r.replace("&clientId","#clientId");switch(e){case"frame":var z,A=d.injectTo;if(!A)return console.warn("Chatra: `ChatraSetup.injectTo` is required when using `frame` mode!"),void x.kill();p(function(){return"string"==typeof A?z=b.getElementById(A):A[0]&&A[0].appendChild?z=A[0]:A.appendChild&&(z=A),z?(f.src=y,z.innerHTML="",void z.appendChild(f)):(console.warn("Chatra: something is wrong with your `ChatraSetup.injectTo`"),void x.kill())});break;default:c.features.mobile?(x._isMobileButton=!0,x._addClass("mobile"),t({url:u,success:function(c){return c?(x._mobileData=c,g.innerHTML=c.html||"",void p(function(){if(x._features.transform){setTimeout(function(){x._adjustZoomLevel()},100);var d=function(){x._adjustZoomLevel()};x._addAutoRemovableEvent(b.body,"touchend",d),x._addAutoRemovableEvent(a,"scroll",d),x._addAutoRemovableEvent(a,"orientationchange",d),x._addAutoRemovableEvent(a,"resize",d)}b.body.appendChild(g),x._mobileButton=b.getElementById("chatra-mobile-button"),x._mobileButtonHref=x._mobileButton&&x._mobileButton.href,x._messageHandler("buttonType",c.buttonType||"tab"),x._messageHandler("setPosition",c.chatPosition||"br"),x._messageHandler("apiReady"),x._messageHandler("readyToRetriveData"),x._messageHandler("headerReady")})):(console.warn("Chatra: button request failed -- no data returned :–("),void x.kill())},error:function(){console.warn("Chatra: button request failed :–("),x.kill()}})):(x._setButtonType("tab"),x._setChatPosition("br"),f.src=y,f.style.position="absolute",g.appendChild(f),p(function(){"webkit"==c.browser.engine&&x._addAutoRemovableEvent(g,"wheel",function(a){x._chatExpanded&&n(a)}),b.body.appendChild(g)}))}a.ChatraIntegration&&this.setIntegrationData(a.ChatraIntegration),d.startHidden&&this.hide(),this.setZIndex("number"==typeof d.zIndex?d.zIndex:this._zIndex),"function"==typeof d.onInit&&d.onInit(),d.colors&&this.setColors(d.colors),d.chatWidth&&this.setChatWidth(d.chatWidth),d.labelWidth&&this.setLabelWidth(d.labelWidth),d.chatHeight&&this.setChatHeight(d.chatHeight),d.buttonPosition&&this.setButtonPosition(d.buttonPosition),x.pageView();for(var B=0;B<w.length;B++)this.apply(this,w[B])}},_chatWidth:340,_chatMinWidth:150,_chatHeight:480,_labelHeight:40,_roundButtonSize:60,_labelMinWidth:90,_zIndex:9999,setIntegrationData:function(a){p(a)&&this._postMessage("integrationData",q(a))},updateIntegrationData:function(a){p(a)&&this._postMessage("updateIntegrationData",q(a))},pageView:function(){var a={currentPage:b.location.href,currentPageTitle:b.title,referrer:b.referrer};g(this._lastPageData,a)||(this._lastPageData=a,this._chatReady?this._sendPageInfo(a):this._pageInfoQ.push(a))},setChatWidth:function(a){"number"==typeof a&&(this._chatWidth=a,this._recalcChatSize())},setLabelWidth:function(a){"number"==typeof a&&(this._labelWidth=a,this._animating(),this._recalcChatSize())},resetLabelWidth:function(){this._labelWidth=null,this._animating(),this._recalcChatSize()},setChatHeight:function(a){"number"==typeof a&&(this._chatHeight=a,this._recalcChatSize())},setZIndex:function(a){"number"==typeof a&&(this._wrapper.style.zIndex=this._zIndex=a)},setButtonPosition:function(a){return-1==["lt","lm","lb","bl","bc","br","rt","rm","rb"].indexOf(a)?void console.warn("Chatra: invalid `positionCode`!"):void this._postMessage("setPosition",a)},resetButtonPosition:function(){this._postMessage("resetPosition")},setColors:function(a){this._postMessage("colors",a)},resetColors:function(){this._postMessage("resetColors")},expandWidget:function(a){this._postMessage("expandChat",!!a)},minimizeWidget:function(){this._postMessage("collapseChat")},openChat:function(a){this._postMessage("openChat",!!a)},expandChat:f("expandWidget"),collapseChat:f("minimizeWidget"),closeChat:f("minimizeWidget"),hide:function(){this._chatHiddenByUser=!0,this._refreshChatVisibility()},show:function(){this._chatHiddenByUser=!1,this._refreshChatVisibility()},hideChat:f("hide"),showChat:f("show"),setGroupId:function(a){"undefined"!=typeof a&&this._postMessage("setGroupId",a)},_messageHandler:function(a,b){switch(a){case"setHostedItem":if(!b||"object"!=typeof b||"string"!=typeof b.key)return;x._setHostedItem(b.key,b.value);break;case"apiReady":x._apiReady=!0,x._sendMessageQ();break;case"readyToRetriveHostedStorage":x._sendHostedStorage();break;case"readyToRetriveData":x._chatReady=!0,x._sendFocus(),x._resolvePageInfoQ();break;case"headerReady":x._chatRendered=!0,x._refreshChatVisibility();break;case"collapseWindow":x._collapseChatWindow();break;case"expandWindow":x._expandChatWindow();break;case"hideChat":x._hideChatFromFrame();break;case"showChat":x._showChatFromFrame();break;case"setPosition":if(!b||"string"!=typeof b)return;x._setChatPosition(b);break;case"buttonType":if(!b||"string"!=typeof b)return;x._setButtonType(b);break;case"titleBlink":x._titleBlink(b);break;case"banned":x._setStoredItem("Chatra.banned",!!b),x._refreshChatVisibility();break;case"restart":x.restart();break;case"analyticsEvent":if(!b||"string"!=typeof b)return;x._logAnalyticsEvent(b);break;case"labelWidth":if("number"!=typeof b&&null!==b)return;x._animating(),x._computedLabelWidth=b,x._recalcChatSize()}},_mobileIntegrationData:{},_mobileIntegrationMethodIsUpdate:!0,_mobileUrlModifiers:{},_mobileApiHandler:function(a,b){function c(){var a="";for(var b in h)h.hasOwnProperty(b)&&(a+="&"+b+"="+encodeURIComponent(h[b]));f.href=g+a}var f=this._mobileButton,g=this._mobileButtonHref,h=this._mobileUrlModifiers;if(f)switch(a){case"integrationData":if("object"!=typeof b)return;if(!p(b))return;this._mobileIntegrationData=b,this._mobileIntegrationMethodIsUpdate=!1,delete h.integration,delete h.updateIntegration,h.integration=JSON.stringify(this._mobileIntegrationData),c();break;case"updateIntegrationData":if("object"!=typeof b)return;if(!p(b))return;d(this._mobileIntegrationData,b),delete h.integration,delete h.updateIntegration,h[this._mobileIntegrationMethodIsUpdate?"updateIntegration":"integration"]=JSON.stringify(this._mobileIntegrationData),c();break;case"colors":if(!b)return;var i=b.buttonText||b[0]||"",j=b.buttonBg||b[1]||"",k=/^(#([0-9a-f]{3}|[0-9a-f]{6})|)$/i;if(!k.test(i)||!k.test(j))return;f.style.color=i,f.style.backgroundColor=j;var l=e(b);delete l.buttonText,delete l.buttonBg,h.colors=JSON.stringify(l),c();break;case"resetColors":f.style.color="",f.style.backgroundColor="";break;case"openChat":f.click();break;case"setPosition":x._messageHandler("setPosition",b);break;case"resetPosition":x._messageHandler("setPosition",x._mobileData.chatPosition);break;case"setGroupId":h.groupId=b,c()}},_hideChatFromFrame:function(){this._chatHiddenByFrame=!0,this._refreshChatVisibility()},_showChatFromFrame:function(){this._chatHiddenByFrame=!1,this._refreshChatVisibility()},_adjustZoomLevel:function(){if(this._features.transform){var c,d=a.screen,e=d.width;({90:1,"-90":1})[a.orientation]&&("ios"==this._sniff.os.name&&"webkit"==this._sniff.browser.engine||"winphone"==this._sniff.os.name&&"trident"==this._sniff.browser.engine)&&(e=d.height),c=e<b.documentElement.clientWidth?a.innerWidth/e:a.innerWidth/b.documentElement.clientWidth,c>.9&&1.1>c&&(c=1),c=c.toFixed(2),c!=this._scale&&("webkit"==this._sniff.browser.engine?(this._wrapper.style.zoom=1>c?1:c,this._transform.scale=1>c?c:1):this._transform.scale=c,this._recalcTransform(),this._scale=c)}},_transform:{},_recalcTransform:function(){var a=(this._transform,"");for(var b in this._transform)this._transform[b]&&this._transform.hasOwnProperty(b)&&(a+=" "+b+"("+this._transform[b]+")");a||(a="none"),this._wrapper.style.transform=this._wrapper.style.WebkitTransform=this._wrapper.style.MozTransform=this._wrapper.style.msTransform=a},_refreshChatVisibility:function(){!this._chatRendered||this._chatHiddenByUser||this._chatHiddenByFrame||"true"===this._getStoredItem("Chatra.banned")?(this._removeClass("visible"),this._postMessage("visible",!1)):(this._addClass("visible"),this._postMessage("visible",!0),this._isSafari&&this._redraw())},_chatExpanded:!1,_expandChatWindow:function(){this._chatExpanded=!0,this._addClass("expanded"),this._isSafari&&(this._isToggling=!0),this._animating(this._isSafari?function(){x._isToggling=!1,x._recalcChatSize()}:c),this._recalcChatSize()},_collapseChatWindow:function(){this._chatExpanded=!1,this._removeClass("expanded"),this._isSafari&&(this._isToggling=!0),this._animating(this._isSafari?function(){x._isToggling=!1,x._recalcChatSize()}:c),this._recalcChatSize()},_animating:function(a){return this._features.transition&&this._chatRendered&&"round"!=this._buttonType?(this._addClass("animating"),clearTimeout(this._animatingTimer),void(this._animatingTimer=setTimeout(function(){x._removeClass("animating"),a&&a()},u))):void(a&&a())},_setChatPosition:function(a){var b={r:"right",l:"left",c:"center",t:"top",b:"bottom",m:"middle"},c=b[a.charAt(0)],d=b[a.charAt(1)];if(this._isMobileButton&&"round"!==this._buttonType&&("right"==c?d="right":"left"==c&&(d="left"),c="bottom"),this._isMobileButton){var e=["0%","0%"];"center"==d&&(e[0]="50%"),("right"==d||"right"==c)&&(e[0]="100%"),"middle"==d&&(e[1]="50%"),"bottom"==c&&(e[1]="100%"),this._wrapper.style.transformOrigin=this._wrapper.style.WebkitTransformOrigin=this._wrapper.style.MozTransformOrigin=this._wrapper.style.msTransformOrigin=e.join(" ")}this._side&&this._removeClass("side-"+this._side),this._position&&this._removeClass("pos-"+this._position),this._addClass("side-"+c),this._addClass("pos-"+d),this._side=c,this._position=d,this._recalcChatSize()},_setButtonType:function(a){this._buttonType&&this._removeClass("style-"+this._buttonType),this._addClass("style-"+a),this._buttonType=a,this._recalcChatSize()},_recalcChatSize:function(){if(this._isMobileButton)"round"==this._buttonType&&"middle"==this._position&&(this._wrapper.style.marginBottom=-this._wrapper.offsetHeight/2+"px");else{var a,b;this._chatExpanded?(a=Math.max(this._chatWidth,this._chatMinWidth),b=this._chatHeight):"round"==this._buttonType?a=b=this._roundButtonSize:(a=Math.max(this._labelWidth||this._computedLabelWidth||this._chatWidth,this._labelMinWidth),b=this._labelHeight,{left:1,right:1}[this._side]&&(b=[a,a=b][0])),"center"==this._position&&(a=2*Math.ceil(a/2)),"middle"!=this._position||this._chatExpanded||(b=2*Math.ceil(b/2)),this._wrapper.style.width=a+"px",this._wrapper.style.height=b+"px",this._transform.translateY="middle"!=this._position||this._chatExpanded?"top"!=this._position||this._chatExpanded||"round"==this._buttonType?void 0:this._isToggling&&this._isSafari?b+"px":"100%":this._isToggling&&this._isSafari?b/2+"px":"50%"}this._transform.translateX="center"==this._position?"-50%":void 0,this._recalcTransform()},_postMessageQ:[],_postMessage:function(a,b){this._apiReady?this._isMobileButton?this._mobileApiHandler(a,b):this._iframe.contentWindow&&this._iframe.contentWindow.postMessage(JSON.stringify({type:a,data:b,sender:"Chatra"}),"*"):this._postMessageQ.push([a,b])},_sendMessageQ:function(){for(;this._postMessageQ.length;)this._postMessage.apply(this,this._postMessageQ.shift())},_pageInfoQ:[],_resolvePageInfoQ:function(){for(;this._pageInfoQ.length;)this._sendPageInfo(this._pageInfoQ.shift())},_sendPageInfo:function(a){this._postMessage("clientData",a)},_sendFocus:function(){var a=b.hasFocus?b.hasFocus():!0;this._postMessage(a?"focus":"blur")},_getClientId:function(){var a=this._getStoredItem("Chatra.clientId"),b=this._setup.clientId;if(b){var c=typeof b;("string"===c||"number"===c)&&(a=b)}if(a)return a;for(var d=(+new Date+"").split(""),e="abcdefghijklmnopqrstuvwxyz".split("");e.length;)d.splice(o(d.length-1),0,e.splice(o(e.length-1),1)[0]);return a=d.join(""),this._setStoredItem("Chatra.clientId",a),a},_getHostedStorage:function(){var a;try{a=JSON.parse(this._getStoredItem("Chatra.hostedItems"))}catch(b){a={},this._setStoredItem("Chatra.hostedItems","{}")}return a},_sendHostedStorage:function(){this._postMessage("hostedStorage",this._getHostedStorage())},_setHostedItem:function(a,b){if("string"==typeof a){var c=this._getHostedStorage();c[a]=b,this._setStoredItem("Chatra.hostedItems",JSON.stringify(c))}},_getStoredItem:function(a){var b;try{b=localStorage.getItem(a)}catch(c){}return b||m(a)},_setStoredItem:function(a,b){try{localStorage.setItem(a,b)}catch(c){l(a,b)}},_addClass:function(a){var b=this._wrapper;a=[].concat(a);for(var c=a.length-1;c>=0;c--)a[c]="chatra--"+a[c],new RegExp("(\\s|^)"+a[c]+"(\\s|$)").test(b.className)||(b.className+=" "+a[c])},_removeClass:function(a){var b=this._wrapper;a=[].concat(a);for(var c=a.length-1;c>=0;c--)a[c]="chatra--"+a[c],b.className=b.className.replace(new RegExp("(\\s+|^)"+a[c]+"(\\s+|$)","g")," ").replace(/^\s+|\s+$/g,"")},_redraw:function(){var a=this._zIndex;this.setZIndex(a-1),this._wrapper.offsetWidth,this.setZIndex(a)},_titleBlink:function(a){clearTimeout(x._titleBlink._timeout),x._titleBlink.originalNow&&a?(x._titleBlink.originalTitle=document.title,document.title=x._titleBlink.newTitle=a):(document.title!==x._titleBlink.newTitle&&(x._titleBlink.originalTitle=document.title),document.title=x._titleBlink.originalTitle),x._titleBlink.originalNow=!a||!x._titleBlink.originalNow,a&&(this._titleBlink._timeout=setTimeout(function(){x._titleBlink(a)},o(1e3,2e3)))},_logAnalyticsEvent:function(b){"function"==typeof this._setup.onAnalyticEvent&&this._setup.onAnalyticEvent(b);var c;a.GoogleAnalyticsObject&&"function"==typeof a[a.GoogleAnalyticsObject]?c=a[a.GoogleAnalyticsObject]:"function"==typeof a.ga&&(c=a.ga),c?c("send","event","Chatra",b):a._gaq&&"function"==typeof a._gaq.push&&a._gaq.push(["_trackEvent","Chatra",b]);var d,e=a.Ya&&a.Ya.Metrika&&"function"==typeof a.Ya.Metrika.counters&&a.Ya.Metrika.counters(),f=e&&e[0]&&e[0].id;f&&a["yaCounter"+f]&&(d=a["yaCounter"+f]),d&&d.reachGoal&&d.reachGoal("Chatra_"+b.replace(/\s/g,"_"))},_eventRemovers:[],_addAutoRemovableEvent:function(){this._eventRemovers.push(j.apply(this,arguments))},_cleanEventListeners:function(){for(var a=this._eventRemovers.length-1;a>=0;a--)this._eventRemovers[a]()},restart:function(){r()},kill:function(){this._cleanEventListeners(),this._iframe&&(h(this._iframe),this._iframe.src=""),this._wrapper&&h(this._wrapper),this._killed=!0;for(var b in a.Chatra)a.Chatra.hasOwnProperty(b)&&"function"==typeof a.Chatra[b]&&"restart"!=b&&(a.Chatra[b]=c)}}),a.Chatra&&a.Chatra.kill&&a.Chatra.kill(),a.Chatra=k,a.Chatra._init()}var s=function(a){function b(){for(var a in g)c(g[a])}function c(b){for(var c=0;c<b.length;c++){for(var e=!0,f=0;f<b[c].test.length;f++)if(b[c].test[f]instanceof RegExp){if(!b[c].test[f].test(a)){e=!1;break}}else if(-1==a.indexOf(b[c].test[f])){e=!1;break}if(e){d(b[c]);break}}}function d(a){for(var b in g)if(g.hasOwnProperty(b)&&a[b]){if(a[b].$version){var c=e(a[b].$version.search);if(c){var d=c.split("."),h=a[b].$version.names,i=a[b].$version.altNames;if(a[b].version=c,d[0]&&(a[b].majorVersion=parseInt(d[0])),d[1]&&(a[b].minorVersion=parseInt(d[1])),d[2]&&(a[b].patchVersion=parseInt(d[2])),h)for(var j,k=[],l=0;l<d.length;l++)k.push(d[l]),j=k.join("."),h[j]&&(a[b].versionName=h[j]),i&&i[j]&&(a[b].versionAltNames=i[j])}}for(var m in a[b])a[b].hasOwnProperty(m)&&"$"!==m[0]&&(f[b][m]=a[b][m])}}function e(b){var c;if(b instanceof RegExp){if(c=(a.match(b)||[])[0],!c)return}else c=b;var d,e=a.indexOf(c);if(-1!=e&&(d=a.substring(e+c.length),regexpResult=/^(\d+(\.|_)){0,2}\d+/.exec(d),regexpResult))return regexpResult[0].replace(/_/g,".")}var f={browser:{fullName:"",name:"",version:"",majorVersion:null,minorVersion:null,patchVersion:null,engine:""},os:{fullName:"",name:"",version:"",versionName:"",versionAltNames:[],majorVersion:null,minorVersion:null,patchVersion:null},features:{bw:!1,mobile:!1,tv:!1,proxy:!1}},g={browser:[{test:["SailfishBrowser"],browser:{fullName:"Sailfish Browser",name:"sailfishbrowser",engine:"gecko",$version:{search:"SailfishBrowser/"}},features:{mobile:!0}},{test:["Edge/"],browser:{fullName:"Edge",name:"edge",engine:"edgehtml",$version:{search:"Edge/"}}},{test:["MSIE"],browser:{fullName:"Internet Explorer",name:"ie",engine:"trident",$version:{search:"MSIE "}}},{test:["Trident"],browser:{fullName:"Internet Explorer",name:"ie",engine:"trident",$version:{search:"rv:"}}},{test:["OPR/"],browser:{fullName:"Opera",name:"opera",engine:"webkit",$version:{search:"OPR/"}}},{test:["Chrome"],browser:{fullName:"Chrome",name:"chrome",engine:"webkit",$version:{search:"Chrome/"}}},{test:["Firefox"],browser:{fullName:"Firefox",name:"firefox",engine:"gecko",$version:{search:"Firefox/"}}},{test:["NokiaBrowser"],browser:{fullName:"Nokia Browser",name:"nokiabrowser",engine:"webkit",$version:{search:"NokiaBrowser/"}},features:{mobile:!0}},{test:["Opera Mini","Presto"],browser:{fullName:"Opera Mini",name:"operamini",engine:"presto",$version:{search:"Version/"}},features:{mobile:!0,proxy:!0}},{test:["Opera Mini","WebKit"],browser:{fullName:"Opera Mini",name:"operamini",engine:"webkit"},features:{mobile:!0,proxy:!0}},{test:["Opera"],browser:{fullName:"Opera",name:"opera",engine:"presto",$version:{search:"Version/"}}},{test:["OviBrowser"],browser:{fullName:"Ovi Browser",name:"ovi",engine:"gecko",$version:{search:"OviBrowser/"}},features:{mobile:!0,proxy:!0}},{test:["CriOS/"],browser:{fullName:"Chrome",name:"chrome",engine:"webkit",$version:{search:"CriOS/"}}},{test:["Coast/"],browser:{fullName:"Opera Coast",name:"coast",engine:"webkit",$version:{search:"Coast/"}}},{test:["Safari","Version/",/(iPhone|iPod|iPad|Macintosh|Windows)/],browser:{fullName:"Safari",name:"safari",engine:"webkit",$version:{search:"Version/"}}},{test:["WebKit"],browser:{engine:"webkit"}},{test:["Gecko/"],browser:{engine:"gecko"}}],os:[{test:["Sailfish"],os:{fullName:"Sailfish OS",name:"sailfish"},features:{mobile:!0}},{test:["Windows Phone"],os:{fullName:"Windows Phone",name:"winphone",$version:{search:"Windows Phone "}},features:{mobile:!0}},{test:["Windows"],os:{fullName:"Windows",name:"win",$version:{search:"Windows NT ",names:{"10.0":"10",6.3:"8.1",6.2:"8",6.1:"7","6.0":"Vista",5.2:"XP",5.1:"XP",5.01:"2000","5.0":"2000"},altNames:{5.2:["Server 2003"]}}}},{test:["Macintosh","OS X 10"],os:{fullName:"Mac OS X",name:"osx",$version:{search:/OS X /,names:{10.6:"Snow Leopard",10.7:"Lion",10.8:"Mountain Lion",10.9:"Mavericks","10.10":"Yosemite",10.11:"El Capitan"}}}},{test:["Ubuntu"],os:{fullName:"Ubuntu",name:"ubuntu"}},{test:["Fedora"],os:{fullName:"Fedora",name:"fedora",$version:{search:"Fedora/",names:{20:"Heisenbug",19:"Schrödinger's Cat",18:"Spherical Cow",17:"Beefy Miracle",16:"Verne",15:"Lovelock",14:"Laughlin",13:"Goddard",12:"Constantine",11:"Leonidas",10:"Cambridge",9:"Sulphur",8:"Werewolf",7:"Moonshine"}}}},{test:["Kindle"],os:{fullName:"Kindle",name:"kindle",$version:{search:"Kindle/"}},features:{bw:!0,mobile:!0}},{test:[/(BlackBerry|BB\d+)/],os:{fullName:"BlackBerry",name:"blackberry",$version:{search:"Version/"}},features:{mobile:!0}},{test:["Symbian"],os:{fullName:"Symbian",name:"symbian"},features:{mobile:!0}},{test:["Series40"],os:{fullName:"Symbian",name:"symbian"},features:{mobile:!0}},{test:["PlayStation Vita"],os:{fullName:"PlayStation Vita",name:"psvita"},features:{mobile:!0}},{test:["Nintendo DSi"],os:{fullName:"Nintendo DSi",name:"dsi"},features:{mobile:!0}},{test:["New Nintendo 3DS"],os:{fullName:"New Nintendo 3DS",name:"n3ds"},browser:{engine:"webkit"},features:{mobile:!0}},{test:["Nintendo 3DS"],os:{fullName:"Nintendo 3DS",name:"3ds"},browser:{engine:"webkit"},features:{mobile:!0}},{test:["Viera"],os:{fullName:"Viera",name:"viera"},browser:{engine:"webkit"},features:{tv:!0}},{test:["SonyDTV"],features:{tv:!0}},{test:["Android"],os:{fullName:"Android",name:"android",$version:{search:"Android "}},features:{mobile:!0}},{test:[/iPhone|iPod|iPad/],os:{fullName:"iOS",name:"ios",$version:{search:"OS "}},features:{mobile:!0}}],features:[{test:[/mobile/i],features:{mobile:!0}},{test:[/smart-{0,1}tv/i],features:{tv:!0}}]};return a?(b(),f):f},t=function(){var a,b,c,d,e,f,g,h;return c=function(a){return window.document.createElement(a)},d=window.encodeURIComponent,g=Math.random,a=function(a){var d,f,g,i,j;if(a=a?a:{},i={data:a.data||{},error:a.error||e,success:a.success||e,beforeSend:a.beforeSend||e,complete:a.complete||e,url:a.url||""},i.computedUrl=b(i),0===i.url.length)throw new Error("MissingUrl");return f=!1,i.beforeSend({},i)!==!1?(d=i.data[a.callbackName||"callback"]="jsonp_"+h(15),window[d]=function(a){i.success(a,i),i.complete(a,i);try{return delete window[d]}catch(b){return void(window[d]=void 0)}},j=c("script"),j.src=b(i),j.async=!0,j.charset="UTF-8",j.onerror=function(a){return i.error({url:j.src,event:a}),i.complete({url:j.src,event:a},i)},j.onload=j.onreadystatechange=function(){return f||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState?void 0:(f=!0,j.onload=j.onreadystatechange=null,j&&j.parentNode&&j.parentNode.removeChild(j),j=null)},g=g||window.document.getElementsByTagName("head")[0]||window.document.documentElement,g.insertBefore(j,g.firstChild)):void 0},e=function(){return void 0},b=function(a){var b;return b=a.url,b+=a.url.indexOf("?")<0?"?":"&",b+=f(a.data)},h=function(a){var b;for(b="";b.length<a;)b+=g().toString(36)[2];return b},f=function(a){var b,c,e;b=[];for(c in a)e=a[c],b.push(d(c)+"="+d(e));return b.join("&")},a}(),u=350,v="#chatra{visibility:hidden;opacity:0;position:fixed;max-height:95%;max-width:90%;max-width:calc(100% - 40px);transition:0.2s linear;transition-property:visibility, opacity;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden;width:auto;height:auto;min-height:0;min-width:0;} #chatra.chatra--animating{transition:"+u+"ms cubic-bezier(.04,.74,.4,.98);transition-property:height, width, max-width, max-height, top, bottom, left, right, margin-bottom, visibility, opacity, transform, -webkit-transform, -moz-transform;}#chatra.chatra--animating.chatra--style-round{transition:none;} #chatra.chatra--side-bottom{bottom:0;} #chatra.chatra--side-bottom.chatra--style-round:not(.chatra--expanded){bottom:15px;} #chatra.chatra--side-left{left:0;} #chatra.chatra--side-left.chatra--style-round:not(.chatra--expanded){left:15px;} #chatra.chatra--side-right{right:0;} #chatra.chatra--side-right.chatra--style-round:not(.chatra--expanded){right:15px;} #chatra.chatra--side-left.chatra--expanded{bottom:0;left:20px;} #chatra.chatra--side-right.chatra--expanded{bottom:0;right:20px;} #chatra.chatra--pos-right{right:20px;} #chatra.chatra--pos-right.chatra--style-round:not(.chatra--expanded){right:15px;} #chatra.chatra--pos-left{left:20px;} #chatra.chatra--pos-left.chatra--style-round:not(.chatra--expanded){left:15px;} #chatra.chatra--pos-center{left:50%;} #chatra.chatra--pos-top.chatra--style-tab:not(.chatra--expanded){bottom:100%;margin-bottom:-40px;max-height:90%;max-height:calc(100% - 80px);} #chatra.chatra--pos-top.chatra--style-round:not(.chatra--expanded){top:15px;} #chatra.chatra--pos-bottom:not(.chatra--expanded){bottom:40px;max-height:90%;max-height:calc(100% - 80px);} #chatra.chatra--pos-bottom.chatra--style-round:not(.chatra--expanded){bottom:15px;} #chatra.chatra--pos-middle:not(.chatra--expanded){bottom:50%;max-height:90%;max-height:calc(100% - 80px);} #chatra.chatra--visible{visibility:visible;opacity:1;} #chatra.chatra--mobile{overflow:visible;transition:none;display:none;} #chatra.chatra--mobile.chatra--visible{display:block;}#chatra.chatra--mobile.chatra--style-tab{max-width:100%;padding-bottom:8px;} #chatra.chatra--mobile.chatra--style-round{visibility:hidden;} #chatra.chatra--mobile.chatra--pos-right.chatra--style-tab{right:0;padding-right:20px;} #chatra.chatra--mobile.chatra--pos-left.chatra--style-tab{left:0;padding-left:20px;} #chatra.chatra--mobile.chatra--pos-right.chatra--style-round, #chatra.chatra--mobile.chatra--side-right.chatra--style-round{right:0;padding-right:15px;} #chatra.chatra--mobile.chatra--pos-left.chatra--style-round, #chatra.chatra--mobile.chatra--side-left.chatra--style-round{left:0;padding-left:15px;} #chatra.chatra--mobile.chatra--pos-bottom.chatra--style-round, #chatra.chatra--mobile.chatra--side-bottom.chatra--style-round{bottom:0;padding-bottom:15px;} #chatra.chatra--mobile.chatra--pos-top.chatra--style-round{top:0;padding-top:15px;} #chatra__iframe{height:100%;width:100%;left:0;top:0;margin:0;} @media print {#chatra{display:none;}}",w=[];a.Chatra&&a.Chatra.q&&(w=a.Chatra.q),r()}(window,document);