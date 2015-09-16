/* slider */

$(".js-slide:gt(0)").hide();
$(".js-bullet").eq(0).addClass("js-bullet-active");

$(".js-bullet").on("click", function () {    
    var $this = $(this);
    if ($this.hasClass("js-bullet-one")) {
    	$(".js-slide").not(".js-slide-one").fadeOut();
        $(".js-slide-one").delay(400).fadeIn();
        $this.siblings()
        .removeClass("js-bullet-active")
        .end()
        .addClass("js-bullet-active");
    } else if ($this.hasClass("js-bullet-two")) {
    	$(".js-slide").not(".js-slide-two").fadeOut();
        $(".js-slide-two").delay(400).fadeIn();
        $this.siblings()
        .removeClass("js-bullet-active")
        .end()
        .addClass("js-bullet-active");
    } else if ($this.hasClass("js-bullet-three")) {
    	$(".js-slide").not(".js-slide-three").fadeOut();
        $(".js-slide-three").delay(400).fadeIn();
        $this.siblings()
        .removeClass("js-bullet-active")
        .end()
        .addClass("js-bullet-active");
    } else if ($this.hasClass("js-bullet-four")) {
    	$(".js-slide").not(".js-slide-four").fadeOut();
        $(".js-slide-four").delay(400).fadeIn();
        $this.siblings()
        .removeClass("js-bullet-active")
        .end()
        .addClass("js-bullet-active");
    }else if ($this.hasClass("js-bullet-five")) {
    	$(".js-slide").not(".js-slide-five").fadeOut();
        $(".js-slide-five").delay(400).fadeIn();
        $this.siblings()
        .removeClass("js-bullet-active")
        .end()
        .addClass("js-bullet-active");
    }
});

/* management icons */

$(".js-person-two").addClass("js-person-active");

var left_man = '<div class="block-testimonials__position-inner"><span>Ann Smith</span> / Front-end developer</div>';
var middle_man = '<div class="block-testimonials__position-inner"><span>John Doe</span> / CEO</div>';
var right_man = '<div class="block-testimonials__position-inner"><span>Mary Smith</span> / Back-end developer</div>';
var position = ".block-testimonials__position"

$(position)
.html(middle_man);

$(".js-person").on("click", function(){

	var $this = $(this);

	$this.siblings().removeClass("js-person-active").end().addClass("js-person-active");

	if($this.hasClass("js-person-one")){
		$(position)
		.html(left_man);
	} else if($this.hasClass("js-person-two")){
		$(position)
		.html(middle_man);
	} else if($this.hasClass("js-person-three")){
		$(position)
		.html(right_man);
	}
});

/*remove hover*/

if($(window).width() < 1100){
        $(".block-header__menu-item").removeClass("block-header__menu-item--hover");
    };

$(window).resize(function(){
    if($(window).width() < 1100){
        $(".block-header__menu-item").removeClass("block-header__menu-item--hover");
    } else {
        $(".block-header__menu-item").addClass("block-header__menu-item--hover");
    };
});


