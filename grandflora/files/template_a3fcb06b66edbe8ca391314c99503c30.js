
; /* Start:/bitrix/templates/main/components/bitrix/menu/main_top/script.js*/
var jshover = function()
{
	var menuDiv = document.getElementById("horizontal")
	if (!menuDiv)
		return;

	var sfEls = menuDiv.getElementsByTagName("li");
	for (var i=0; i<sfEls.length; i++) 
	{
		sfEls[i].onmouseover=function()
		{
			this.className+=" jshover";
		}
		sfEls[i].onmouseout=function() 
		{
			this.className=this.className.replace(new RegExp(" jshover\\b"), "");
		}
	}
}

if (window.attachEvent) 
	window.attachEvent("onload", jshover);
/* End */
;; /* /bitrix/templates/main/components/bitrix/menu/main_top/script.js*/
