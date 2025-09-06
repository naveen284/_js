jQuery(document).ready(function($) {

    // Fun Facts Counter Animation
    var counterAnimated = false;
    $(window).on('scroll', function() {

        // Check if the element exists and if the animation hasn't run yet
        if ( !counterAnimated && $('.fun-facts').length > 0 ) {
            var oTop = $('.fun-facts').offset().top - window.innerHeight;
            if ($(window).scrollTop() > oTop) {
                $('.count-digit').each(function() {
                    var $this = $(this);
                    var countTo = parseInt($this.attr('data-count'));
                    $({ countNum: $this.text()}).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum.toLocaleString());
                        }
                    });
                });
                counterAnimated = true; // Set flag to true to prevent re-running
            }
        }
    });
});