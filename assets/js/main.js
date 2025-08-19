/**
* Template Name: Personal - v2.5.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  /**
   * Helper function for debounce
   * - Reduces the frequency of function calls during events like resize.
   * - Improves performance on smaller devices.
   */
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  /**
   * Smooth scrolling and navigation menu handling
   */
  function handleNavMenu() {
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
      const pathname = location.pathname.replace(/^\//, '');
      const hostname = location.hostname;

      if (pathname === this.pathname.replace(/^\//, '') && hostname === this.hostname) {
        const hash = this.hash;
        const target = $(hash);

        if (target.length) {
          e.preventDefault();

          // Update active class for navigation links
          const isNavMenu = $(this).parents('.nav-menu, .mobile-nav').length > 0;
          if (isNavMenu) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }

          // Handle scrolling for header
          if (hash === '#header') {
            $('#header').removeClass('header-top');
            $("section").removeClass('section-show');

            if ($('body').hasClass('mobile-nav-active')) {
              $('body').removeClass('mobile-nav-active');
              $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
              $('.mobile-nav-overly').fadeOut();
            }
            return;
          }

          // Handle scrolling for other sections
          if (!$('#header').hasClass('header-top')) {
            $('#header').addClass('header-top');
            setTimeout(() => {
              $("section").removeClass('section-show');
            }, 350);
          }

          // Smooth scroll to section
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 500, 'easeInOutExpo');
        }
      }
    });
  }

  /**
   * Responsive adjustments on window resize
   */
  function handleResponsiveResize() {
    $(window).on('resize', debounce(function() {
      if ($(window).width() >= 768) {
        // Tutup navigasi mobile jika ukuran layar lebih besar dari 768px
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    }, 200));
  }

  /**
   * Activate/show sections on load with hash links
   */
  function activateHashLinks() {
    if (window.location.hash) {
      const initial_nav = window.location.hash;

      
      // Validasi apakah hash adalah string yang valid
      if (initial_nav && $(initial_nav).length) {
        $('#header').addClass('header-top');
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $('.nav-menu, .mobile-nav')
          .find('a[href="' + initial_nav + '"]')
          .parent('li')
          .addClass('active');
        setTimeout(function() {
          $("section").removeClass('section-show');
          $(initial_nav).addClass('section-show');
        }, 350);
      } else {
        console.warn('Hash target not found or invalid:', initial_nav);
        //Tambahkan fallback untuk menangani hash yang tidak valid, seperti menggulir ke bagian default atau menampilkan pesan kepada pengguna.
        $('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
      }
    }
  }

  /**
   * Mobile Navigation setup
   */
  function setupMobileNav() {
    if ($('.nav-menu').length) {
      const $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');

      // Tambahkan event listener untuk toggle navigasi mobile
      $(document).on('click', '.mobile-nav-toggle', function() {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeToggle();
      });

      // Tutup navigasi mobile jika klik di luar
      $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-nav, .mobile-nav-toggle').length) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else {
      console.error('Failed to initialize mobile navigation: .nav-menu not found');
    }
  }

  /**
   * Initialize counterUp plugin
   */
  function initCounterUp() {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  }

  /**
   * Skills section animation
   */
  function animateSkillsSection() {
    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, {
      offset: '80%'
    });
  }

  /**
   * Testimonials carousel setup
   */
  function setupTestimonialsCarousel() {
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        900: { items: 3 }
      }
    });
  }

  /**
   * Portfolio isotope and filter
   * Mengatur layout grid portfolio agar rapi dengan bantuan plugin Isotope.
   * Memberikan kemampuan filtering → pengguna bisa klik kategori (misalnya "All", "App", "Web"), lalu item yang sesuai saja yang ditampilkan.
   * Menandai kategori yang sedang aktif dengan class filter-active (biasanya untuk memberi efek visual, misalnya tombol berubah warna).
   */
  function setupPortfolioIsotope() {
    $(window).on('load', function() {
      const portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    });
  }

  /**
   * Initialize venobox (lightbox feature)
   */
  function initVenobox() {
    $(document).ready(function() {
      if ($('.venobox').length) {
        $('.venobox').venobox({ 'share': false });
      } else {
        console.warn('Venobox elements not found');
      }
    });

  }
  
  /**
   * Portfolio details carousel setup
   */
  function setupPortfolioDetailsCarousel() {
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  }

  // Initialize all functions
  handleNavMenu();
  handleResponsiveResize();
  activateHashLinks();
  setupMobileNav();
  initCounterUp();
  animateSkillsSection();
  setupTestimonialsCarousel();
  setupPortfolioIsotope();
  initVenobox();
  setupPortfolioDetailsCarousel();

})(jQuery);