import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const defaultRelatedProducts = [
  {
    id: 1,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 150.0,
    image: "/img/product-1.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Modern Casual Wear",
    price: 89.0,
    originalPrice: 110.0,
    image: "/img/product-2.jpg",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Premium Designer Top",
    price: 199.0,
    originalPrice: 250.0,
    image: "/img/product-3.jpg",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Comfortable Casual Shirt",
    price: 75.0,
    originalPrice: 95.0,
    image: "/img/product-4.jpg",
    rating: 4.1,
  },
  {
    id: 5,
    name: "Elegant Evening Wear",
    price: 299.0,
    originalPrice: 350.0,
    image: "/img/product-5.jpg",
    rating: 4.7,
  },
];

function ProductDetails({
  onAddToCart,
  onViewProduct,
  sectionTitle = "You May Also Like",
}) {
  const carouselRef = useRef(null);

  // Default related products if none provided

  const productsToShow = defaultRelatedProducts;

  // Initialize Owl Carousel
  useEffect(() => {
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
          576: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      });

      // Cleanup function
      return () => {
        $carousel.trigger("destroy.owl.carousel");
      };
    }
  }, [productsToShow]);

  function handleAddToCart(product) {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log("Added to cart:", product);
      // Default cart functionality
    }
  }

  function handleViewProduct(product) {
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      // Default navigation to product detail page
      window.location.href = `/product/${product.id}`;
    }
  }

  if (!productsToShow || productsToShow.length === 0) {
    return null;
  }

  return (
    <div className="container-fluid py-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">{sectionTitle}</span>
        </h2>
      </div>

      <div className="row px-xl-5">
        <div className="col">
          <div ref={carouselRef} className="owl-carousel related-carousel">
            {productsToShow.map((product) => (
              <div key={product.id} className="card product-item border-0">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img
                    className="img-fluid w-100"
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "/img/product-1.jpg"; // Fallback image
                    }}
                  />
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <div
                        className="position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      >
                        <span className="badge badge-danger">SALE</span>
                      </div>
                    )}
                </div>

                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3" title={product.name}>
                    {product.name}
                  </h6>
                  <div className="d-flex justify-content-center">
                    <h6>${product.price.toFixed(2)}</h6>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <h6 className="text-muted ml-2">
                          <del>${product.originalPrice.toFixed(2)}</del>
                        </h6>
                      )}
                  </div>
                  {product.rating && (
                    <div className="d-flex justify-content-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa fa-star ${
                            i < Math.floor(product.rating)
                              ? "text-warning"
                              : "text-muted"
                          }`}
                          style={{ fontSize: "0.8rem" }}
                        ></i>
                      ))}
                      <small className="ml-2 text-muted">
                        ({product.rating})
                      </small>
                    </div>
                  )}
                </div>

                <div className="card-footer d-flex justify-content-between bg-light border">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="btn btn-sm text-dark p-0 border-0 bg-transparent"
                    title="View Product Details"
                  >
                    <i className="fas fa-eye text-primary mr-1"></i>View Detail
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-sm text-dark p-0 border-0 bg-transparent"
                    title="Add to Cart"
                  >
                    <i className="fas fa-shopping-cart text-primary mr-1"></i>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
