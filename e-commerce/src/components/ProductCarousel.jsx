// ...existing code...
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ products, className = "" }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Initialize Owl Carousel when component mounts
    if (window.$ && window.$.fn.owlCarousel && carouselRef.current) {
      const $carousel = $(carouselRef.current);

      $carousel.owlCarousel({
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

      // Cleanup function
      return () => {
        $carousel.trigger("destroy.owl.carousel");
      };
    }
  }, [products]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div ref={carouselRef} className={`owl-carousel ${className}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
};

export default ProductCarousel;
// ...existing code...
