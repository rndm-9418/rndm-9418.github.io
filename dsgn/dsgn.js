function sort(){function a(){var a=b.join("");0===a.length?$(".js-card").removeClass("js-card-faded"):$(".js-card").addClass("js-card-faded").filter(b.join("")).removeClass("js-card-faded")}var b=[];$(".js-menu").each(function(c,d){b.push(""),$(d).on("click",".js-button",function(d){d.preventDefault(),b[c]=$(this).data("toggle"),$(this).parent().siblings().removeClass("js-item-active"),$(this).parent().addClass("js-item-active"),a()})})}sort();