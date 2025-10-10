import { Link } from "react-router-dom";

// Default categories data
const categories = [
  {
    id: 1,
    name: "Men's Dresses",
    productCount: 15,
    image: "/img/cat-1.jpg",
    link: "/shop?category=mens-dresses",
    slug: "mens-dresses",
  },
  {
    id: 2,
    name: "Women's Dresses",
    productCount: 23,
    image: "/img/cat-2.jpg",
    link: "/shop?category=womens-dresses",
    slug: "womens-dresses",
  },
  {
    id: 3,
    name: "Baby's Dresses",
    productCount: 8,
    image: "/img/cat-3.jpg",
    link: "/shop?category=baby-dresses",
    slug: "baby-dresses",
  },
  {
    id: 4,
    name: "Accessories",
    productCount: 31,
    image: "/img/cat-4.jpg",
    link: "/shop?category=accessories",
    slug: "accessories",
  },
  {
    id: 5,
    name: "Bags",
    productCount: 19,
    image: "/img/cat-5.jpg",
    link: "/shop?category=bags",
    slug: "bags",
  },
  {
    id: 6,
    name: "Shoes",
    productCount: 27,
    image: "/img/cat-6.jpg",
    link: "/shop?category=shoes",
    slug: "shoes",
  },
];
function Categories({ showTitle = false, title = "Shop by Category" }) {
  function handleCategoryClick(category) {
    // Analytics tracking
    console.log("Category clicked:", category.name);
    // You can add analytics tracking here
    // gtag('event', 'category_click', { category_name: category.name });
  }

  return (
    <div className="container-fluid pt-5">
      {showTitle && (
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">{title}</span>
          </h2>
        </div>
      )}

      <div className="row px-xl-5 pb-3">
        {categories.map((category, index) => (
          <div key={category.id || index} className="col-lg-4 col-md-6 pb-1">
            <div
              className="cat-item d-flex flex-column border mb-4"
              style={{ padding: "30px" }}
            >
              <p className="text-right text-muted mb-3">
                {category.productCount}{" "}
                {category.productCount === 1 ? "Product" : "Products"}
              </p>

              <Link
                to={category.link}
                className="cat-img position-relative overflow-hidden mb-3 text-decoration-none"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  className="img-fluid"
                  src={category.image}
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = "/img/cat-1.jpg"; // Fallback image
                  }}
                />
                <div className="cat-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="cat-hover-content text-center text-white">
                    <i className="fas fa-eye fa-2x mb-2"></i>
                    <p className="mb-0">Browse Collection</p>
                  </div>
                </div>
              </Link>

              <Link
                to={category.link}
                className="text-decoration-none"
                onClick={() => handleCategoryClick(category)}
              >
                <h5 className="font-weight-semi-bold m-0 text-dark category-title">
                  {category.name}
                </h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
