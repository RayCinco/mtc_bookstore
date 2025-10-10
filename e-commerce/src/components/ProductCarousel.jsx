import { useEffect, useRef } from "react";

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
        <div
          key={product.id || index}
          className="card product-item border-0 mb-4"
        >
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img
              className="img-fluid w-100"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{product.name}</h6>
            <div className="d-flex justify-content-center">
              <h6>${product.price}</h6>
              {product.originalPrice && (
                <h6 className="text-muted ml-2">
                  <del>${product.originalPrice}</del>
                </h6>
              )}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            <a href="#" className="btn btn-sm text-dark p-0">
              <i className="fas fa-eye text-primary mr-1"></i>View Detail
            </a>
            <a href="#" className="btn btn-sm text-dark p-0">
              <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To
              Cart
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
