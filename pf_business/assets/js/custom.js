jQuery( document ).ready(function( $ ) {


	"use strict";


    
        $(function() {
            $( "#tabs" ).tabs();
        });


        // Page loading animation

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });       

        $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          var box = $('.header-text').height();
          var header = $('header').height();

          if (scroll >= box - header) {
            $("header").addClass("background-header");
          } else {
            $("header").removeClass("background-header");
          }
        });
		if ($('.owl-testimonials').length) {
            $('.owl-testimonials').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 2,
                        margin: 30
                    }
                }
            });
        }
        if ($('.owl-partners').length) {
            $('.owl-partners').owlCarousel({
                loop: true,
                nav: false,
                dots: true,
                items: 1,
                margin: 30,
                autoplay: false,
                smartSpeed: 700,
                autoplayTimeout: 6000,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    460: {
                        items: 1,
                        margin: 0
                    },
                    576: {
                        items: 2,
                        margin: 20
                    },
                    992: {
                        items: 4,
                        margin: 30
                    }
                }
            });
        }

        $(".Modern-Slider").slick({
            autoplay:true,
            autoplaySpeed:10000,
            speed:600,
            slidesToShow:1,
            slidesToScroll:1,
            pauseOnHover:false,
            dots:true,
            pauseOnDotsHover:true,
            cssEase:'linear',
           // fade:true,
            draggable:false,
            prevArrow:'<button class="PrevArrow"></button>',
            nextArrow:'<button class="NextArrow"></button>', 
        });

        function visible(partial) {
            var $t = partial,
                $w = jQuery(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

        }        $('.count-digit').each(function () {
          var $number = $(this).find('.number');
          var countTo = parseInt($number.text());
          jQuery({ Counter: 0 }).animate({ Counter: countTo }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
              $number.text(Math.ceil(this.Counter));
            }
          });
        });
        $(window).scroll(function(){

          if(visible($('.count-digit')))
            {
              if($('.count-digit').hasClass('counter-loaded')) return;
              $('.count-digit').addClass('counter-loaded');
              
              $('.count-digit').each(function () {
                var $number = $(this).find('.number');
                var countTo = parseInt($number.text());
                jQuery({ Counter: 0 }).animate({ Counter: countTo }, {
                  duration: 3000,
                  easing: 'swing',
                  step: function () {
                    $number.text(Math.ceil(this.Counter));
                  }
                });
              });
            }
        })
 
});
$(document).ready(function() {
  let currentPage = 0;
  const pages = $('#testimonial-carousel .testimonial-page');
  const totalPages = pages.length;

  function showPage(index) {
    pages.removeClass('active');
    pages.eq(index).addClass('active');
    $('#prevBtn').prop('disabled', index === 0);
    $('#nextBtn').prop('disabled', index === totalPages - 1);
  }

  $('#prevBtn').click(function() {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $('#nextBtn').click(function() {
    if (currentPage < totalPages - 1) {
      currentPage++;
      showPage(currentPage);
    }
  });

  showPage(currentPage);
});
$(document).ready(function() {
  const images = [
    'assets/images/image1.jpg',
    'assets/images/image2.jpg',
    'assets/images/image3.jpg',
    'assets/images/image4.jpg',
    'assets/images/image5.jpg'
  ];
  let currentImg = 0;

  function showImg(index) {
    $('#carousel-img').attr('src', images[index]);
    $('#prevImg').prop('disabled', index === 0);
    $('#nextImg').prop('disabled', index === images.length - 1);
  }

  $('#prevImg').click(function() {
    if (currentImg > 0) {
      currentImg--;
      showImg(currentImg);
    }
  });

  $('#nextImg').click(function() {
    if (currentImg < images.length - 1) {
      currentImg++;
      showImg(currentImg);
    }
  });

  showImg(currentImg);
});
