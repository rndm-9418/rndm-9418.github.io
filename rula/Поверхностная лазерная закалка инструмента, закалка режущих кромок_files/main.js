(function($) {

	$(function() {
	   
       var self = this;

		if ($('section, div').hasClass('offset-checker')) {
			function offsetCheck() {
			var offsetCheckExtra;
				offsetCheckExtra = $('.offset-checker').offset().top - 180;

				if ($(this).scrollTop() > offsetCheckExtra) {
					$('.offset-checker').addClass('push-right');
				} else {
					$('.offset-checker').removeClass('push-right');
				}
			}

			$(offsetCheck);

			$(window).scroll(offsetCheck);
		}

		$(function() {
		  
			$('.pagination li.current a').on('click', function() {
				return false;
			});
            
		});
        
        this.basketChangeItemCount = function() {
            
            var data = {'action': 'recount', 'items': {}}
            var counter = 0;
            
            $('.basket-item-row').each(function() {
                
                var node = $(this);
                var inode = node.find('[data-gid]');
                
                var count = node.find('.spinner').val();
                var gid = inode.attr('data-gid');
                
                if (!gid || !count) return;
                counter++;
                
                data['items'][counter] = {
                    'gid': gid,
                    'pid': inode.attr('data-pid'),
                    'ctype': inode.attr('data-ctype'),
                    'count': count
                }
                
            });
            
            $.post('/bitrix/components/rula/basket/ajax.php', data, self.basketViewUpdate);
            
        }
        
        if (window.spinner) {
            spinner.init();
            spinner.callbacks.add(self.basketChangeItemCount); 
        }
        
        this.basketItemDelete = function(event) {
            
            event.preventDefault();
          
          var node = $(this);
          
          var params = {
            'gid': 'data-gid',
            'ctype': 'data-ctype',
            'pid': 'data-pid'
          }
          
          var data = {'action': 'del'}
          for (var param in params) data[param] = node.attr(params[param]);
          
          $.post('/bitrix/components/rula/basket/ajax.php', data, function() {
            
            self.basketViewUpdate(function() {
                
                if ($('#empty_basket_message').size()) {
                    $('#basket_form').css('display', 'none');
                }
                
            });
            
          });
            
        }
        
        this.basketViewUpdate = function(callback) {
            
            $.post('/bitrix/components/rula/basket.small/ajax.php', {}, function(output) {
                $('#small_basket_block').html(output);
            });
            
            $.post('/bitrix/components/rula/basket/ajax.php', {'action': 'showList'}, function(output) {
                
                $("#basket_items,#basket_hardware").remove();
                $("#basket_form").before(output);
                
                $('#basket_hardware .jcarousel-hardware').jcarousel({
                    //wrap: "circular"
                });

                /*$('#basket_hardware .jcarousel-hardware').jcarouselAutoscroll({
                    target: '+=4',
                    interval: 5000
                });

                $('#basket_hardware .jcarousel-hardware').hover(function() {
                    $(this).jcarouselAutoscroll('stop');
                }, function() {
                    $(this).jcarouselAutoscroll('start');
                });*/

                $('#basket_hardware .jcarousel-prev').jcarouselControl({
                    target: '-=4'
                });

                $('#basket_hardware .jcarousel-next').jcarouselControl({
                    target: '+=4'
                });
                
                $('.basket-remove-item-button').on('click', self.basketItemDelete);
                  
                if ($('#empty_basket_message').size()) {
                    $('#checkout, .checkout-success-close').css('display', 'none');
                    $('.checkout-success').css('display', 'block');
                }
                
                $( '.spinner').spinner({
                    min: 1
                });
                
                if (window.spinner) {
                    spinner.init();
                    spinner.callbacks.add(self.basketChangeItemCount); 
                }
                
                if (typeof callback == 'function') callback();
                
            });
            
        }
        
        self.basketViewUpdate();
        
        $.validator.addMethod("cemail", function(value, element) {
            var ex = /^[\w\.\-]+@[\w\.\-]+\.[a-z]{2,3}$/i
            return this.optional( element ) || ex.test( value );
        }, 'Неверный формат');
        
        $("#checkout").validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    cemail: true
                },
                tel: "required",
                subject: "required",
                company: "required",
                message: "required"
            },
            messages: {
                name: "Поле не заполнено",
                email: {
                    required: "Поле не заполнено",
                    cemail: "Неверный формат"
                },
                tel: "Поле не заполнено",
                subject: "Поле не заполнено",
                company: "Поле не заполнено",
                message: "Поле не заполнено"
            }
        });
        
         $('#checkout').ajaxForm({
            'url': '/bitrix/components/rula/basket/ajax.php',
            'data': {
                'action': 'send'
            },
            'success':  function(){
                document.getElementById('checkout').reset();
                $('#checkout').css('display', 'none');
                $('.checkout-success').css('display', 'block');
                $(functionHeight);
                self.basketViewUpdate();
            }
        });
        
        $('.checkout-success-close').on('click', function() {
            $('#checkout').css('display', 'block');
            $('.checkout-success').css('display', 'none');
            $(functionHeight);
            return false;
        });

		$('.basket-remove-item-button').on('click', self.basketItemDelete);

		$('.catalog-item-aside li a').on('click', function() {
			$(this).toggleClass('selected-item');
			return false;
		});

		$('.add-hardware-button').on('click', function() {
			$('.catalog-item-row').toggleClass('open-item-aside');
			$('.catalog-item-aside li a').removeClass('selected-item');
			return false;
		});

		$('.aside-add-btn').on('click', function() {
		  
            $('.catalog-item-aside li a.selected-item').each(function() {
                
                var node = $(this).closest('[data-gid]');
                //node.css('display', 'none');
                
                var gid = $(this).closest('[data-gid]').attr('data-gid');
                
                if ($(".add-hardware-wrap [data-gid = " + gid + "]:visible").size()) {
                    var dnode = $(".add-hardware-wrap [data-gid = " + gid + "]").eq(0);
                    dnode.after(dnode.clone(true));
                }else{
                    $(".add-hardware-wrap [data-gid = " + gid + "]").css('display', 'block');
                }
                
                
            });
            
            if (!$('.catalog-item-aside [data-gid]:visible').size()) {
                $('.add-hardware-button').css('display', 'none');
            }
          
			$('.catalog-item-row').removeClass('open-item-aside');
			$('.catalog-item-aside li a').removeClass('selected-item');
            
            priceRecount();
            
			return false;
            
		});

		$('.extra-close').on('click', function(event) {
		  
            event.preventDefault();
		  
			var node = $(this).parent('.add-hardware-item');
            var gid = node.attr('data-gid');
            
            if ($('.add-hardware-wrap [data-gid = ' + gid + ']').size() > 1) {
                node.remove();
            }else{
                node.css('display', 'none');
            }
            
            //$('.catalog-item-aside').find('[data-gid = ' + gid + ']').css('display', 'block');
            //$('.add-hardware-button').css('display', 'block');
            
            priceRecount();
            
		});

		$.preloadImages = function() {
		  for (var i = 0; i < arguments.length; i++) {
		    $("<img />").attr("src", arguments[i]);
		  }
		}
        
        $('.basket-add-button').on('click', function(event) {
            
           event.preventDefault();
           
           var gid = $('.basket-add-button').attr('data-gid');
           
           gid = +gid;
           if (gid <= 0) return;
           
           var order = {
                'items': {}
           }
           
           order['items'][gid] = {
                'id': gid,
                'count': 1,
                'type': 'equipment'
           }
           
           $('.added-items [data-gid]:visible').each(function() {
                
                var gid = $(this).attr('data-gid');
                
                gid = +gid;
                if (gid <= 0) return;
                
                if (order['items'][gid]) {
                    order['items'][gid]['count'] += order['items'][gid]['count'];
                }else{
                    
                    order['items'][gid] = {
                        'id': gid,
                        'count': 1,
                        'type': 'hardware'
                    }
                    
                } 
                
           });
           
           var sdata = '';
           for (gid in order['items']) {
                sdata += '<input type="hidden" name="items[' + gid + '][id]" value="' + order['items'][gid]['id'] + '">'
                    + '<input type="hidden" name="items[' + gid + '][count]" value="' + order['items'][gid]['count'] + '">'
                    + '<input type="hidden" name="items[' + gid + '][type]" value="' + order['items'][gid]['type'] + '">'
                ;
           }
           
           $('.basket-add-button').after('<form id="add_to_basket_form" action="/basket/" method="post">' + sdata + '</form>');
           $('#add_to_basket_form').submit();
            
        });
        
        $('body').on('click', '.basket-item-add', function(event) {
            
            event.preventDefault();
            
            var gid = $(this).attr('data-gid');
            if (gid <= 0) return;
            
            var order = {}
            order[gid] = {
                'id': gid,
                'count': 1,
                'type': 'equipment'
            }
            
            var data = {
                'action': 'add',
                'items': order
            }
            
            if ($('#basket_form').size() > 0) {
                $.post('/bitrix/components/rula/basket/ajax.php', data, self.basketViewUpdate);
            }else{
                $.post('/bitrix/components/rula/basket/ajax.php', data);
            }
            
        });
        
        $(".item-hardware-add").on('click', function(event) {
            
            event.preventDefault();
            
            var node = $(this);
            var gid  = node.attr('data-gid');
                
            if ($(".add-hardware-wrap [data-gid = " + gid + "]:visible").size()) {
                var dnode = $(".add-hardware-wrap [data-gid = " + gid + "]").eq(0);
                dnode.after(dnode.clone(true));
            }else{
                $(".add-hardware-wrap [data-gid = " + gid + "]").css('display', 'block');
            }
            
            node.css('color', 'green').html('Успешно добавлено');
            node.delay(1000).animate({'opacity': 0.3}, 1000, 'swing', function() {
                $(this).css('color', '').html('Добавить в заказ');
                $(this).delay(300).animate({'opacity': 1}, 1000, 'swing');
            });
            
            priceRecount();
            
        });

		$.preloadImages("../rula/images/thumb-1-hover.png","../rula/images/thumb-2-hover.png","../rula/images/thumb-3-hover.png","../rula/images/thumb-4-hover.png","../rula/images/prev-small-hover.png","../rula/images/next-small-hover.png");
	
        function priceRecount() {
            
            var price = parseFloat($('.order-button').attr('data-price'));
            if (isNaN(price)) price = 0;
            
            var currency = $('.order-button').attr('data-currency');
            var currencyStr = $('.order-button').attr('data-currency-str');
            
            var prices = {}
            var currencyCodes = {}
            
            prices[currency] = price;
            currencyCodes[currency] = (currencyStr) ? currencyStr : "руб.";
            
            $('.add-hardware-wrap [data-gid]:visible').each(function() {
                
                var pp = parseFloat($(this).attr('data-price'));
                if (isNaN(pp)) pp = 0;
                
                var pcurrency = $(this).attr('data-currency');
                var pcurrencyStr = $(this).attr('data-currency-str');
                
                prices[pcurrency] = parseFloat(prices[pcurrency]);
                if (isNaN(prices[pcurrency])) prices[pcurrency] = 0;
                
                currencyCodes[pcurrency] = (pcurrencyStr) ? pcurrencyStr : "руб."
                
                prices[pcurrency] += pp;
                
            });
            
            var priceLine = 'На заказ';
            if (price > 0) {
                
                priceLine = '';
                
                counter = 0;
                for (var pcode in prices) {
                    
                    counter++;
                    if (counter > 1) priceLine += ' + ';
                    
                    priceLine += prices[pcode];
                    (currencyCodes[pcode] && pcode != "RUR") ? priceLine += ' ' + currencyCodes[pcode] : priceLine += ' <span class="rubl">c</span>';
                
                }
                
            }
            
            $('.order-button').html(priceLine);
            
        }
        
        function functionHeight() {
            var windowHeight,
                mainHeight;

            windowHeight = $(window).innerHeight();
            mainHeight = $('.content').innerHeight();

            $('.content').css('min-height', windowHeight);
            $('.left-sidebar').css('min-height', mainHeight);
        }
    
    })

})(jQuery);