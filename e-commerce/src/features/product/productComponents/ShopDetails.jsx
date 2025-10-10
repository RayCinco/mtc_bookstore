import { useState, useEffect } from "react";

const socialLinks = [
  { icon: "fab fa-facebook-f", url: "#", name: "Facebook" },
  { icon: "fab fa-twitter", url: "#", name: "Twitter" },
  { icon: "fab fa-linkedin-in", url: "#", name: "LinkedIn" },
  { icon: "fab fa-pinterest", url: "#", name: "Pinterest" },
];

const defaultProduct = {
  id: 1,
  name: "Colorful Stylish Shirt",
  price: 150.0,
  originalPrice: 200.0,
  rating: 3.5,
  reviewCount: 50,
  description:
    "Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc invidunt ipsum et, labore clita lorem magna lorem ut. Erat lorem duo dolor no sea nonumy. Accus labore stet, est lorem sit diam sea et justo, amet at lorem et eirmod ipsum diam et rebum kasd rebum.",
  images: [
    "/img/product-1.jpg",
    "/img/product-2.jpg",
    "/img/product-3.jpg",
    "/img/product-4.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black", "White", "Red", "Blue", "Green"],
  reviews: [
    {
      id: 1,
      name: "John Doe",
      date: "01 Jan 2025",
      rating: 3.5,
      comment:
        "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.",
      avatar: "/img/user.jpg",
    },
  ],
};

function ShopDetails({ product = null, onAddToCart, onReviewSubmit }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    review: "",
  });

  // Default product data
  const productData = defaultProduct;

  // Auto-select first size and color if available
  useEffect(() => {
    if (productData.sizes && productData.sizes.length > 0 && !selectedSize) {
      setSelectedSize(productData.sizes[0]);
    }
    if (productData.colors && productData.colors.length > 0 && !selectedColor) {
      setSelectedColor(productData.colors[0]);
    }
  }, [productData, selectedSize, selectedColor]);

  function handleImageNavigation(direction) {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? productData.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
    }
  }

  function handleQuantityChange(operation) {
    if (operation === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (operation === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    const cartItem = {
      ...productData,
      selectedSize,
      selectedColor,
      quantity,
      totalPrice: productData.price * quantity,
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    } else {
      console.log("Added to cart:", cartItem);
      alert("Product added to cart!");
    }
  }

  function handleReviewFormChange(e) {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleReviewSubmit(e) {
    e.preventDefault();
    const newReview = {
      ...reviewForm,
      rating: userRating,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };

    if (onReviewSubmit) {
      onReviewSubmit(newReview);
    } else {
      console.log("Review submitted:", newReview);
      alert("Review submitted successfully!");
    }

    // Reset form
    setReviewForm({ name: "", email: "", review: "" });
    setUserRating(0);
  }

  function renderStars(
    rating,
    interactive = false,
    onStarClick = null,
    onStarHover = null
  ) {
    return [...Array(5)].map((_, index) => {
      const starIndex = index + 1;
      const isFilled =
        starIndex <= (interactive ? hoverRating || userRating : rating);
      const isHalf = !interactive && starIndex - 0.5 === rating;

      return (
        <i
          key={index}
          className={`fa${isFilled ? "s" : "r"} fa-star${
            isHalf ? "-half-alt" : ""
          } ${interactive ? "cursor-pointer" : ""} text-primary`}
          onClick={interactive ? () => onStarClick(starIndex) : undefined}
          onMouseEnter={interactive ? () => onStarHover(starIndex) : undefined}
          onMouseLeave={interactive ? () => onStarHover(0) : undefined}
          style={interactive ? { cursor: "pointer" } : {}}
        ></i>
      );
    });
  }

  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        {/* Product Images */}
        <div className="col-lg-5 pb-5">
          <div
            id="product-carousel"
            className="carousel slide position-relative"
          >
            <div className="carousel-inner border">
              {productData.images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                >
                  <img
                    className="w-100 h-100"
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    style={{ objectFit: "cover", height: "400px" }}
                    onError={(e) => {
                      e.target.src = "/img/product-1.jpg";
                    }}
                  />
                </div>
              ))}
            </div>

            {productData.images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  onClick={() => handleImageNavigation("prev")}
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fa fa-2x fa-angle-left text-dark"></i>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  onClick={() => handleImageNavigation("next")}
                  style={{ background: "none", border: "none" }}
                >
                  <i className="fa fa-2x fa-angle-right text-dark"></i>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product Details */}
        <ProductDetails
          productData={productData}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          renderStars={renderStars}
        />
      </div>

      {/* Product Tabs */}
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productData={productData}
        userRating={userRating}
        setUserRating={setUserRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        reviewForm={reviewForm}
        handleReviewFormChange={handleReviewFormChange}
        handleReviewSubmit={handleReviewSubmit}
        renderStars={renderStars}
      />
    </div>
  );
}

export default ShopDetails;

function ProductDetails({
  productData,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  handleQuantityChange,
  handleAddToCart,
  renderStars,
}) {
  return (
    <div className="col-lg-7 pb-5">
      <h3 className="font-weight-semi-bold">{productData.name}</h3>

      {/* Rating */}
      <div className="d-flex mb-3">
        <div className="text-primary mr-2">
          {renderStars(productData.rating)}
        </div>
        <small className="pt-1">({productData.reviewCount} Reviews)</small>
      </div>

      {/* Price */}
      <div className="d-flex align-items-center mb-4">
        <h3 className="font-weight-semi-bold mb-0">
          ${productData.price.toFixed(2)}
        </h3>
        {productData.originalPrice &&
          productData.originalPrice > productData.price && (
            <h4 className="text-muted ml-2 mb-0">
              <del>${productData.originalPrice.toFixed(2)}</del>
            </h4>
          )}
      </div>

      {/* Description */}
      <p className="mb-4">{productData.description}</p>

      {/* Sizes */}
      {productData.sizes && productData.sizes.length > 0 && (
        <div className="d-flex mb-3">
          <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
          <div>
            {productData.sizes.map((size, index) => (
              <div
                key={index}
                className="custom-control custom-radio custom-control-inline"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`size-${index}`}
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) => setSelectedSize(e.target.value)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`size-${index}`}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {productData.colors && productData.colors.length > 0 && (
        <div className="d-flex mb-4">
          <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
          <div>
            {productData.colors.map((color, index) => (
              <div
                key={index}
                className="custom-control custom-radio custom-control-inline"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`color-${index}`}
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`color-${index}`}
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="d-flex align-items-center mb-4 pt-2">
        <div className="input-group quantity mr-3" style={{ width: "130px" }}>
          <div className="input-group-prepend">
            <button
              className="btn btn-primary btn-minus"
              type="button"
              onClick={() => handleQuantityChange("decrement")}
              disabled={quantity <= 1}
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            className="form-control bg-secondary text-center"
            value={quantity}
            readOnly
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-plus"
              type="button"
              onClick={() => handleQuantityChange("increment")}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <button
          className="btn btn-primary px-3"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
        >
          <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
        </button>
      </div>

      {/* Social Share */}
      <div className="d-flex pt-2">
        <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
        <div className="d-inline-flex">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              className="text-dark px-2"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Share on ${social.name}`}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductTabs({
  activeTab,
  setActiveTab,
  productData,
  userRating,
  setUserRating,
  hoverRating,
  setHoverRating,
  reviewForm,
  handleReviewFormChange,
  handleReviewSubmit,
  renderStars,
}) {
  return (
    <div className="row px-xl-5">
      <div className="col">
        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
          <button
            className={`nav-item nav-link ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`nav-item nav-link ${
              activeTab === "information" ? "active" : ""
            }`}
            onClick={() => setActiveTab("information")}
          >
            Information
          </button>
          <button
            className={`nav-item nav-link ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({productData.reviewCount})
          </button>
        </div>

        <div className="tab-content">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="tab-pane fade show active">
              <h4 className="mb-3">Product Description</h4>
              <p>{productData.description}</p>
              <p>
                This high-quality product is crafted with attention to detail
                and designed to meet your needs. Perfect for various occasions
                and built to last.
              </p>
            </div>
          )}

          {/* Information Tab */}
          {activeTab === "information" && (
            <div className="tab-pane fade show active">
              <h4 className="mb-3">Additional Information</h4>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      Material: High-quality fabric blend
                    </li>
                    <li className="list-group-item px-0">
                      Care Instructions: Machine washable
                    </li>
                    <li className="list-group-item px-0">
                      Country of Origin: Made with premium materials
                    </li>
                    <li className="list-group-item px-0">
                      Warranty: 30-day return policy
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">
                      Available Sizes: {productData.sizes?.join(", ")}
                    </li>
                    <li className="list-group-item px-0">
                      Available Colors: {productData.colors?.join(", ")}
                    </li>
                    <li className="list-group-item px-0">
                      Weight: Lightweight and comfortable
                    </li>
                    <li className="list-group-item px-0">
                      Style: Modern and fashionable design
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="tab-pane fade show active">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="mb-4">
                    {productData.reviews?.length || 0} review(s) for "
                    {productData.name}"
                  </h4>
                  {productData.reviews &&
                    productData.reviews.map((review) => (
                      <div key={review.id} className="media mb-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="img-fluid mr-3 mt-1"
                          style={{ width: "45px" }}
                          onError={(e) => {
                            e.target.src = "/img/user.jpg";
                          }}
                        />
                        <div className="media-body">
                          <h6>
                            {review.name}
                            <small>
                              {" "}
                              - <i>{review.date}</i>
                            </small>
                          </h6>
                          <div className="text-primary mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="col-md-6">
                  <h4 className="mb-4">Leave a review</h4>
                  <small>
                    Your email address will not be published. Required fields
                    are marked *
                  </small>
                  <div className="d-flex my-3">
                    <p className="mb-0 mr-2">Your Rating * :</p>
                    <div className="text-primary">
                      {renderStars(
                        userRating,
                        true,
                        setUserRating,
                        setHoverRating
                      )}
                    </div>
                  </div>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="form-group">
                      <label htmlFor="review">Your Review *</label>
                      <textarea
                        id="review"
                        name="review"
                        cols="30"
                        rows="5"
                        className="form-control"
                        value={reviewForm.review}
                        onChange={handleReviewFormChange}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={reviewForm.name}
                        onChange={handleReviewFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={reviewForm.email}
                        onChange={handleReviewFormChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        type="submit"
                        className="btn btn-primary px-3"
                        disabled={
                          !userRating ||
                          !reviewForm.review ||
                          !reviewForm.name ||
                          !reviewForm.email
                        }
                      >
                        Leave Your Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
