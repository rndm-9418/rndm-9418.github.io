function scrollToBlock(){
	var predproject = "js-predproject";
	var project = "js-project";
	var building = "js-building";
	var predexp = "js-predexp";
	var exp = "js-exp";
	var predprojectCard = $(".js-predproject-card");
	var projectCard = $(".js-project-card");
	var buildingCard = $(".js-building-card");
	var predexpCard = $(".js-predexp-card");
	var expCard = $(".js-exp-card");
	var stage = $(".js-stage");
	var stages = $(".js-stages");
	var sticky = "js-sticky";
	var body = "body";

	stage.on("click", function(event){

		event.preventDefault();

		stages.prependTo(body).addClass(sticky);
                                                                                                 
    	if($(this).hasClass(predproject)){
    		var position = $(predprojectCard).offset().top;
    	}else if($(this).hasClass(project)){
    		var position = $(projectCard).offset().top;
    	}else if($(this).hasClass(building)){
    		var position = $(buildingCard).offset().top;
    	}else if($(this).hasClass(predexp)){
    		var position = $(predexpCard).offset().top;
    	}else if($(this).hasClass(exp)){
    		var position = $(expCard).offset().top;
    	}

		var height = stages.outerHeight();

		$(window).scrollTop(position - height);
		
	});
}

scrollToBlock();

function sticky(){

	var stages = $(".js-stages");
	var body = "body";
	var sticky = "js-sticky";
	var after = $(".js-after");
	var position = stages.offset().top;

	$(window).scroll(function() {
		if ($(this).scrollTop() > position){  
    		stages.prependTo(body).addClass(sticky);	
  		}
  		else{
    		stages.insertAfter(after).removeClass(sticky);
  		}
	});


};

sticky();

function linksHighlight(){

	$(window).scroll(function(){

		var fromTop = $(window).scrollTop() + $(".js-stages").outerHeight();
		
		var predprojectCard = $(".js-predproject-card");
		var projectCard = $(".js-project-card");
		var buildingCard = $(".js-building-card");
		var predexpCard = $(".js-predexp-card");
		var expCard = $(".js-exp-card");

		var stage = $(".js-stage");

		var gap = 50;

		var predprojectTop = $(predprojectCard).offset().top - gap;
		var predprojectBottom = $(predprojectCard).offset().top + predprojectCard.outerHeight();

		var projectCardTop = $(projectCard).offset().top - gap;
		var projectCardBottom = $(projectCard).offset().top + projectCard.outerHeight();

		var buildingCardTop = $(buildingCard).offset().top - gap;
		var buildingCardBottom = $(buildingCard).offset().top + buildingCard.outerHeight();

		var predexpCardTop = $(predexpCard).offset().top - gap;
		var predexpCardBottom = $(predexpCard).offset().top + predexpCard.outerHeight();

		var expCardTop = $(expCard).offset().top - gap;
		var expCardBottom = $(expCard).offset().top + expCard.outerHeight();

		if(fromTop > predprojectTop && fromTop < predprojectBottom){
			stage.removeClass("js-active");
			$(".js-predproject").addClass("js-active");
		}else if(fromTop > projectCardTop && fromTop < projectCardBottom){
			stage.removeClass("js-active");
			$(".js-project").addClass("js-active");
		}else if(fromTop > buildingCardTop && fromTop < buildingCardBottom){
			stage.removeClass("js-active");
			$(".js-building").addClass("js-active");
		}else if(fromTop > predexpCardTop && fromTop < predexpCardBottom){
			stage.removeClass("js-active");
			$(".js-predexp").addClass("js-active");
		}else if(fromTop > expCardTop && fromTop < expCardBottom){
			stage.removeClass("js-active");
			$(".js-exp").addClass("js-active");
		}else{
			stage.removeClass("js-active");
		};
	});
};

linksHighlight();