function dropDown(){

	var toggle = ".js-dropdown-toggle";
	var list = ".js-dropdown-list";

	$(toggle).on("click", function(){
		$(this).toggleClass("js-dropdown-toggle-unfolded");
		$(list).toggleClass("js-visible");

	})
}

dropDown();

function popup(){
	var popupIcon = ".js-popup-icon";
	var popup = ".js-popup";

	$(popupIcon).on("click", function(){
		$(".js-popup-icon").not(this).each(function() {
			$(this).find(popup).hide();
			$(this).removeClass("js-z");
		});
		
		$(this).toggleClass("js-z");

		$(this).find(popup).toggle();
	})
}

popup();

function copyToClip(str) {
	function listener(e) {
	e.clipboardData.setData("text/html", str);
	e.clipboardData.setData("text/plain", str);
	e.preventDefault();
	}
	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);
};