function dropDown(){

	var toggle = ".js-dropdown-toggle";
	var list = ".js-dropdown-list";

	$(toggle).on("click", function(){

		$(this).toggleClass("js-dropdown-toggle-unfolded");
		$(list).toggle();

	})

	
}

dropDown();