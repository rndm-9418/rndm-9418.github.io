function AnimateIt(obj, anim, delay){
	$(obj).addClass(anim + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass(anim + ' animated');
      if (typeof delay !='undefined'){
	      setTimeout(function(){
		      AnimateIt(obj, anim, delay);
		     }, delay);
      }
    });
}