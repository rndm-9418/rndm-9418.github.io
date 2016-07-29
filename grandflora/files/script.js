var itcube = {
    fn: {},
    vars: {}
};

$(document).ready(function(){

    var otziv_form            = $(".review-form").find("form");
    var quickorder1           = $("#quick1");
    var quickorder2           = $("#quick2");
    var quickorder3           = $("#quick3");
    var quickorder_composite1 = $("#quickorder_composite1");
    var quickorder_composite2 = $("#quickorder_composite2");
    var quickorder_composite3 = $("#quickorder_composite3");
    var freeorder             = $("#free_order");
    var askform               = $("#askform");

    //путь к файлу с компонентом. Указываем параметр
    var sect_id = +$(".sect_id").val();
    
    var par = '';
    
    if( sect_id != 0 ){
        par = '?sect='+sect_id;
    }
    
    (par) ? par += '&surl=' + $("[name = surl]").val() : par = '?surl=' + $("[name = surl]").val();
    
    var epars = '';
    if ($('#more-goods-params input').size() > 0) {
        
        $('#more-goods-params input').each(function() {
            
            if (this.name) {
                (epars) ? epars += '&' + this.name + '=' + this.value : epars += this.name + '=' + this.value;
            }
            
        });
        
        (par) ? par += '&' + epars : par += '?' + epars;
        
    }
    
    var path = "/include/products.php"+par;
    //счетчик страниц
    var currentPage = 1;
    var countProducts = $(".goods-list").data("count");
    var productsPerPage = 15;

    itcube.fn.reloadSmallBask = function(){
        $.ajax({
            type: "POST",
            url: "/ajax/reloadbasket.php",
            success: function(data) {
                $(".basket_reload")
                    .empty()
                    .html(data);
            },
            dataType: "html"
        });
    };

    itcube.fn.add2bask = function(prnt, prod_id, callback){
        $.ajax({
            type: "POST",
            url: "/ajax/addtobasket.php",
            data: {prod_id:prod_id},
            success: function(data) {
                if (data.type == 'success') {
                    prnt
                        .find(".before_add")
                        .hide("slow");

                    prnt
                        .find(".after_add")
                        .show("slow");

                    itcube.fn.reloadSmallBask();
                    
                    if (typeof callback == "function") callback();

                } else {
                    alert(data.mes);
                }
            },
            dataType: "json"
        });
    };

    /*itcube.fn.sendQuickOrder = function(formSelector){
        if( formSelector.valid() ) {
            var phone = formSelector.find(".quick_phone").val();
            var product_id = formSelector.find(".quick_product_id").val();
            var price = formSelector.find(".quick_price").val();

            $.ajax({
                type: "POST",
                url: "/ajax/addorder.php",
                data: {phone:phone, id:product_id, price:price},
                success: function(data) {
                    if (data == 'success') {
                        //alert("Спасибо! Мы свяжемся с вами для уточнения деталей.");
                        formSelector.closest(".order-small-form-wrapper").hide();
                        formSelector.closest(".order-small-form-wrapper").next(".order-small-form-wrapper").show();
                        formSelector.trigger("reset");
                        formSelector.trigger("reset");
                    } else {
                        alert(data);
                    }
                }
            });
        }
    };*/
    
    $('#buy-1klik').on('click', function() {
        
        $('#quick-callform').children().eq(1).css('display', 'none');
        $('#quick-callform').children().eq(0).css('display', 'block');
        
        $('#buy-1klik').css('display', 'none');
        $('#quick-callform').css('display', 'block');
        
    });
    
    $('#quick-callform .call-form-close-btn').on('click', function() {
        $('#quick-callform').css('display', 'none');
        $('#buy-1klik').css('display', 'block');
    });
    
    itcube.fn.sendQuickOrder = function(formSelector){
        
            var phone = formSelector.find(".quick_phone").val();
            var product_id = formSelector.find(".quick_product_id").val();
            var price = formSelector.find(".quick_price").val();
            
            if (phone.length == 0 || phone.split('_').join('').length != phone.length) {
                formSelector.find(".quick_phone").addClass('error'); 
                return;
            }

            $.ajax({
                type: "POST",
                url: "/ajax/addorder.php",
                data: {phone:phone, id:product_id, price:price},
                success: function(data) {
                    if (data == 'success') {
                        //alert("Спасибо! Мы свяжемся с вами для уточнения деталей.");
                        formSelector.closest(".call-form-wrapper").hide();
                        formSelector.closest(".call-form-wrapper").next(".call-form-wrapper").show();
                        formSelector.trigger("reset");
                        formSelector.trigger("reset");
                    } else {
                        alert(data);
                    }
                }
            });
        
    };
    
    itcube.fn.sendQuickOrderComposite = function(formSelector){
            
            var phone = formSelector.find(".quick_phone").val();
            var amount = $("#select_amount").val();
            var size = $("#select_sizes").val();
            var price = +$(".price_change").text();
            var name = $(".name_change").first().text();
            
            if (!name.length) name = $('#shortname').html() + $('.name-for-case').first().html();
            
            var prod_id = formSelector.find(".quick_product_id").val();
            
            if (phone.length == 0 || phone.split('_').join('').length != phone.length) {
                formSelector.find(".quick_phone").addClass('error'); 
                return;
            }

            $.ajax({
                type: "POST",
                url: "/ajax/compositequickorder.php",
                data: {phone:phone, amount:amount, size:size, price:price, name:name, prod_id:prod_id},
                success: function(data) {
                    if (data == 'success') {
                        //alert("Спасибо! Мы свяжемся с вами для уточнения деталей.");
                        formSelector.closest(".call-form-wrapper").hide();
                        formSelector.closest(".call-form-wrapper").next(".call-form-wrapper").show();
                        formSelector.trigger("reset");
                    } else {
                        alert(data);
                    }
                }
            });
        
    };

    itcube.fn.productsPreload = function(){
        if( countProducts <= productsPerPage ) return false;
        
        var params = {PAGEN_1: ++currentPage};
        if ($("[name = q][type = text]").size() > 0 && $("[name = q][type = text]").val()) params['q'] = $("[name = q][type = text]").val();

        $(".more-goods").hide("slow");
        //var path = window.location.href;
        $.get(path, params, function(data){
            //добавим новости к списку
            $(".products_preload").empty().html(data);
            $(".more-goods").show("slow");
        });
    };

    itcube.fn.getNumEnding = function (iNumber, aEndings)
    {
        var sEnding, i;
        iNumber = iNumber % 100;
        if (iNumber>=11 && iNumber<=19) {
            sEnding=aEndings[2];
        }
        else {
            i = iNumber % 10;
            switch (i)
            {
                case (1): sEnding = aEndings[0]; break;
                case (2):
                case (3):
                case (4): sEnding = aEndings[1]; break;
                default: sEnding = aEndings[2];
            }
        }
        return sEnding;
    };

    /*
    добавление товара в корзину
     */
    $(".similar-goods-item").on("click", ".button-add-to-cart-recommend", function(event){
        event.stopPropagation();
        var prod_id = $(this).data("id");
        var prnt = $(this).closest(".similar-goods-item");

        itcube.fn.add2bask(prnt, prod_id, function() {
            location.reload();
        });
        
    });

    $(document).on("click", ".before_add .button-add-to-cart", function(){
        var prod_id = $(this).data("id");
        var prnt = $(this).closest(".col-2");

        itcube.fn.add2bask(prnt, prod_id);
    });

    $(".before_add").on("click", ".item-details-button", function(){
        var prod_id = $(this).data("id");
        var prnt = $(this).closest(".item-details-buy");

        itcube.fn.add2bask(prnt, prod_id);
    });
    $(".detail-price-addcart").on("click", function(){
        var prod_id = $(this).data("id");
        var prnt = $(this).closest(".item-details-buy");

        itcube.fn.add2bask(prnt, prod_id);
    });
    /*
     *******************************************************************************
     */

    /*
    показ формы добавления отзыва и скрытие сообщения об успешной отправки отзыва
     */
    $(".link-add-review").on("click", "a", function(){
        $(this)
            .closest(".reviews")
            .find(".review-form")
            .toggle("slow");
    });

    otziv_form
        .closest(".reviews")
        .find(".review-submitted")
        .on("click", "a", function(){
            $(this).parent().parent().hide("slow");
        });
    /*
     *******************************************************************************
     */

    /*
    валидатор и сабмит формы отправки отзыва
     */
    otziv_form.validate({
        errorLabelContainer: otziv_form.find( ".error_text" ),
        errorElement: "em",
        messages: {
            name: {
                required: "Укажите Ваше имя<br>"
            },
            email: {
                required: "Укажите почту (не публикуется)<br>",
                email: "Введите корректный адрес электронной почты<br>"
            },
            comment: {
                required: "Напишите текст отзыва<br>"
            }
        },
        rules: {
            email: {
                email: true
            }
        }
    });
    otziv_form.on("click", ".submit", function(){
        if( otziv_form.valid() ){
            var name       = otziv_form.find("#name").val();
            var surname    = otziv_form.find("#surname").val();
            var email      = otziv_form.find("#email").val();
            var comment    = otziv_form.find("#comment").val();
            var product_id = otziv_form.find("#product_id").val();
            $.ajax({
                type: "POST",
                url: "/ajax/addcomment.php",
                data: {name:name, surname:surname, email:email, comment:comment, product_id:product_id},
                success: function(data) {
                    if (data.type == 'success') {
                        otziv_form
                            .closest(".reviews")
                            .find(".review-submitted")
                            .show("slow");
                        otziv_form.trigger("reset");
                    } else {
                        alert(data.mes);
                    }
                },
                dataType: "json"
            });
        }
    });
    /*
    *******************************************************************************
     */

    /*
    работа с bxslider
     */
    $('.similar-goods-list').bxSlider({
        slideSelector: "div.similar-goods-item",
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 1,
        slideWidth: 162,
        pager: false,
        nextSelector: ".similar-goods .next-slide",
        prevSelector: ".similar-goods .prev-slide",
        nextText: '<div class="big-arrow-right"></div>',
        prevText: '<div class="big-arrow-left"></div>'
    });
    /*
     *******************************************************************************
     */

    /*
    быстрый заказ
     */
    /*quickorder1.validate({
        messages: {
            quick_phone: {
                required: ""
            }
        }
    });
    quickorder2.validate({
        messages: {
            quick_phone: {
                required: ""
            }
        }
    });
    quickorder1.on("click", "a", function(){
        itcube.fn.sendQuickOrder(quickorder1);
    });
    quickorder2.on("click", "a", function(){
        itcube.fn.sendQuickOrder(quickorder2);
    });*/
    
    quickorder3.find('.quick_phone').on('click', function() {
       $(this).removeClass('error'); 
    });
    
    quickorder3.on("click", "a.order-call-btn", function(){
        itcube.fn.sendQuickOrder(quickorder3);
    });
    
    /*
     *******************************************************************************
     */

    /*
    подгрузка новых товаров на страницу
     */
    if( typeof countProducts !== 'undefined' ) {
        itcube.fn.productsPreload();
    }
    $(".more-goods").on("click", "a", function(){

        var appendData = $(".products_preload").html();
        $(".goods-list").append(appendData);
        //делаем ajax запрос и сразу инкремент номера страницы
        
        if(currentPage * productsPerPage >= countProducts){
            $(".more-goods").hide("slow");
        }else{
            itcube.fn.productsPreload();
        }
    });
    /*
     *******************************************************************************
     */

    /*
    форма свободного заказа
     */
    freeorder.validate({
        errorLabelContainer: freeorder.find( ".cart-form-error-text" ),
        errorElement: "em",
        errorClass: "alarm",
        messages: {
            email: {
                required: "Укажите почту<br>",
                email: "Введите корректный адрес электронной почты<br>"
            },
            comment: {
                required: "Напишите свои пожелания<br>"
            },
            phone: {
                required: "Укажите ваш телефон<br>"
            }
        },
        rules: {
            email: {
                email: true
            }
        }
    });
    freeorder.on("click", "a", function(){
        if( freeorder.valid() ){
            freeorder.submit();
        }
    });
    /*
     *******************************************************************************
     */

    /*
    отправка сообщения со страницы координат
     */
    askform.validate({
        errorLabelContainer: askform.find( ".cart-form-error-text" ),
        errorElement: "em",
        errorClass: "alarm",
        messages: {
            email: {
                required: "Укажите почту<br>",
                email: "Введите корректный адрес электронной почты<br>"
            },
            comment: {
                required: "Напишите вопрос<br>"
            },
            phone: {
                required: "Укажите ваш телефон<br>"
            }
        },
        rules: {
            email: {
                email: true
            }
        }
    });
    askform.on("click", "a", function(){
        if( askform.valid() ){
            askform.submit();
        }
    });
    /*
     *******************************************************************************
     */

    /*
    добавление в корзину составного букета
     */
    $(".before_add_composite").on("click", ".item-details-button", function(){
        var prod_id = $(this).data("id");
        var pict = $(this).data("pict");
        var prnt = $(this).closest(".item-details-buy");
        var amount = $("#select_amount").val();
        var size = $("#select_sizes").val();
        var price = +$(".price_change").text();
        var name = $(".name_change").first().text();

        if( name == '' ){
            name = $(".item-details-right").find("h1").text();
        }

        var desc = $(".item-common-text").text();

        $.ajax({
            type: "POST",
            url: "/ajax/addcompositetobasket.php",
            data: {prod_id:prod_id, amount:amount, size:size, price:price, name:name, pict:pict, desc:desc},
            success: function(data) {
                if (data.type == 'success') {
                    prnt
                        .find(".before_add_composite")
                        .hide("slow");

                    prnt
                        .find(".after_add_composite")
                        .show("slow");

                    itcube.fn.reloadSmallBask();

                } else {
                    alert(data.mes);
                }
            },
            dataType: "json"
        });
    });
    $(".detail-price-addcart-composite").on("click", function(){
        var prod_id = $(this).data("id");
        var pict = $(this).data("pict");
        var prnt = $(this).closest(".item-details-buy");
        var amount = $("#select_amount").val();
        var size = $("#select_sizes").val();
        var price = +$(".price_change").text();
        var name = $(".name_change").first().text();

        if( name == '' ){
            name = $(".item-details-right").find("h1").text();
        }

        var desc = $(".item-common-text").text();

        $.ajax({
            type: "POST",
            url: "/ajax/addcompositetobasket.php",
            data: {prod_id:prod_id, amount:amount, size:size, price:price, name:name, pict:pict, desc:desc},
            success: function(data) {
                if (data.type == 'success') {
                    prnt
                        .find(".before_add_composite")
                        .hide("slow");

                    prnt
                        .find(".after_add_composite")
                        .show("slow");

                    itcube.fn.reloadSmallBask();

                } else {
                    alert(data.mes);
                }
            },
            dataType: "json"
        });
    });
    /*
     *******************************************************************************
     */

    /*
    быстрый заказ составного букета
     */
    /*quickorder_composite1.validate({
        messages: {
            quick_phone: {
                required: ""
            }
        }
    });
    quickorder_composite2.validate({
        messages: {
            quick_phone: {
                required: ""
            }
        }
    });
    quickorder_composite1.on("click", "a", function(){
        itcube.fn.sendQuickOrderComposite(quickorder_composite1);
    });
    quickorder_composite2.on("click", "a", function(){
        itcube.fn.sendQuickOrderComposite(quickorder_composite2);
    });*/
    quickorder_composite3.find('.quick_phone').on('click', function() {
       $(this).removeClass('error'); 
    });
    quickorder_composite3.on("click", "a.order-call-btn", function(){
        itcube.fn.sendQuickOrderComposite(quickorder_composite3);
    });
    /*
     *******************************************************************************
     */

});