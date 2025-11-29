import { useEffect } from "react";

const StyleProvider = ({ children }) => {
  useEffect(() => {
    // Initialize any jQuery-based components when the component mounts
    const initializeComponents = () => {
      // Initialize Owl Carousel if jQuery is available
      if (window.$ && window.$.fn.owlCarousel) {
        // Product carousel
        $(".product-carousel").owlCarousel({
          autoplay: true,
          smartSpeed: 1000,
          center: false,
          dots: false,
          loop: true,
          margin: 25,
          nav: true,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>',
          ],
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        });

        // Vendor carousel
        $(".vendor-carousel").owlCarousel({
          loop: true,
          margin: 29,
          nav: false,
          autoplay: true,
          smartSpeed: 1000,
          responsive: {
            0: {
              items: 2,
            },
            576: {
              items: 3,
            },
            768: {
              items: 4,
            },
            992: {
              items: 5,
            },
            1200: {
              items: 6,
            },
          },
        });
      }

      // Initialize other jQuery plugins
      if (window.$) {
        // Smooth scrolling
        $('a[href*="#"]').on("click", function (e) {
          if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $("html, body").animate(
              {
                scrollTop: $(hash).offset().top,
              },
              800,
              function () {
                window.location.hash = hash;
              }
            );
          }
        });

        // Back to top button
        $(window).scroll(function () {
          if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
          } else {
            $(".back-to-top").fadeOut("slow");
          }
        });

        $(".back-to-top").click(function () {
          $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
          return false;
        });
      }
    };

    // Wait for jQuery and other libraries to load
    const checkLibraries = () => {
      if (window.$ && window.$.fn.owlCarousel) {
        initializeComponents();
      } else {
        setTimeout(checkLibraries, 100);
      }
    };

    checkLibraries();

    // Cleanup function
    return () => {
      if (window.$ && window.$.fn.owlCarousel) {
        $(".owl-carousel").trigger("destroy.owl.carousel");
      }
    };
  }, []);

  return <>{children}</>;
};

export default StyleProvider;
