import { useEffect, useRef } from "react";

const VendorCarousel = ({ vendors, className = "" }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Initialize Owl Carousel when component mounts
    if (window.$ && window.$.fn.owlCarousel && carouselRef.current) {
      const $carousel = $(carouselRef.current);

      $carousel.owlCarousel({
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
          1400: {
            items: 7,
          },
        },
      });

      // Cleanup function
      return () => {
        $carousel.trigger("destroy.owl.carousel");
      };
    }
  }, [vendors]);

  if (!vendors || vendors.length === 0) {
    return null;
  }

  return (
    <div ref={carouselRef} className={`owl-carousel ${className}`}>
      {vendors.map((vendor, index) => (
        <div key={vendor.id || index} className="vendor-item border p-4">
          <img src={vendor.logo} alt={vendor.name} className="img-fluid" />
        </div>
      ))}
    </div>
  );
};

export default VendorCarousel;
