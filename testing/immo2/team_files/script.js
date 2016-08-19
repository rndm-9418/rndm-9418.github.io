(function() {
    var handlers = document.querySelectorAll('.accordion__handler');

    handlers.forEach(function (item) {
        item.addEventListener('click', function () {
            this.parentNode.classList.toggle('accordion__section_active');
        })
    });


})();