$(document).ready(function(){

  function selections(){

    $(".js-link").on("click", function(event){

      event.preventDefault();

      $(this).parent().prev(".js-pack").toggleClass("pack--selected");
      $(this).parent().hide();
      $(this).parent().next(".item__caption--when-selected").show();
    })

    $(".js-pack").on("click", function(event){

      event.preventDefault();

      $(this).toggleClass("pack--selected");
      $(this).removeClass("pack--selected-hover");
      $(this).find(".pack__tagline").removeClass("pack__tagline--selected-hover").text("Сказочное заморское яство");
      $(this).parent().find(".item__caption--default").toggle();
      $(this).parent().find(".item__caption--when-selected").toggle();
    });

    $(".js-pack").hover(function(){

      $(this).addClass("pack--hover");

      if($(this).hasClass("pack--selected")){
          $(this).addClass("pack--selected-hover");
          $(this).find(".pack__tagline").addClass("pack__tagline--selected-hover").text("Котэ не доволен?");
        }
    }, function(){
        $(this).removeClass("pack--selected-hover");
        $(this).removeClass("pack--hover");
        $(this).find(".pack__tagline").removeClass("pack__tagline--selected-hover").text("Сказочное заморское яство");
      });

  }
  
  selections();
});



