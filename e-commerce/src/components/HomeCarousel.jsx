import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomeCarousel({
  slides = null,
  autoPlay = true,
  autoPlayInterval = 5000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default slides data
  const defaultSlides = [
    {
      id: 1,
      image: "/img/carousel-1.jpg",
      subtitle: "10% Off Your First Order",
      title: "Fashionable Dress",
      buttonText: "Shop Now",
      buttonLink: "/shop?category=dresses",
      isActive: true,
    },
    {
      id: 2,
      image: "/img/carousel-2.jpg",
      subtitle: "10% Off Your First Order",
      title: "Reasonable Price",
      buttonText: "Shop Now",
      buttonLink: "/shop?sale=discounted",
      isActive: false,
    },
  ];

  const slidesToShow = slides || defaultSlides;

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && slidesToShow.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slidesToShow.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slidesToShow.length - 1 : prev - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
  };

  const handleSlideClick = (slide) => {
    console.log("Slide clicked:", slide.title);
    // Analytics tracking can be added here
  };

  if (!slidesToShow || slidesToShow.length === 0) {
    return null;
  }

  return (
    <div id="header-carousel" className="carousel slide position-relative">
      <div className="carousel-inner">
        {slidesToShow.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`carousel-item ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ height: "410px" }}
          >
            <img
              className="img-fluid w-100 h-100"
              src={slide.image}
              alt={slide.title}
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "/img/carousel-1.jpg"; // Fallback image
              }}
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: "700px" }}>
                <h4 className="text-light text-uppercase font-weight-medium mb-3">
                  {slide.subtitle}
                </h4>
                <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                  {slide.title}
                </h3>
                <Link
                  to={slide.buttonLink}
                  className="btn btn-light py-2 px-3"
                  onClick={() => handleSlideClick(slide)}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Only show if more than 1 slide */}
      {slidesToShow.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <div
              className="btn btn-dark"
              style={{ width: "45px", height: "45px" }}
            >
              <span
                className="carousel-control-prev-icon mb-n2"
                aria-hidden="true"
              ></span>
            </div>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <div
              className="btn btn-dark"
              style={{ width: "45px", height: "45px" }}
            >
              <span
                className="carousel-control-next-icon mb-n2"
                aria-hidden="true"
              ></span>
            </div>
          </button>

          {/* Slide Indicators */}
          <ol className="carousel-indicators">
            {slidesToShow.map((_, index) => (
              <li
                key={index}
                className={index === currentSlide ? "active" : ""}
                onClick={() => goToSlide(index)}
                style={{ cursor: "pointer" }}
              ></li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default HomeCarousel;
