function responsiveMenu(){var a=$(".js-list"),b=$(".js-toggle"),c=$(".js-bar"),d="js-closed",e="js-visible",f=".js-header";$(window).width()<=1e3&&a.prependTo("body"),$(window).resize(function(){$(window).width()<=1e3?a.prependTo("body"):(a.removeClass(e).insertBefore(f),c.removeClass(d))}),b.on("click",function(){c.toggleClass(d),a.toggleClass(e)})}function setHeight(){var a=photo.innerWidth(),b=Math.floor(a/100*99.12);photo.css("height",b),$(window).resize(function(){var a=photo.innerWidth(),b=Math.floor(a/100*99.12);photo.css("height",b)})}function setBlock(){if($(window).width()>500){var a=photo.height();block.css("height",a)}else $(window).width()<=500&&block.css("height","auto");$(window).resize(function(){if($(window).width()>500){var a=photo.height();block.css("height",a)}else $(window).width()<=500&&block.css("height","auto")})}responsiveMenu();var photo=$(".js-picture"),block=$(".js-top-left");setHeight(),setBlock();