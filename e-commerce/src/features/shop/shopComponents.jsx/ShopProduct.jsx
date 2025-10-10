import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shop from "../../../pages/Shop";
import ShopPagination from "./ShopPagination";
import ShopProductCard from "./ShopProductCard";
import { productsPerPage } from "../../../utils/constants";

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Best Rating" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];
const defaultProducts = [
  {
    id: 1,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 150.0,
    image: "/img/product-1.jpg",
    rating: 4.5,
    popularity: 95,
  },
  {
    id: 2,
    name: "Modern Casual Wear",
    price: 89.0,
    originalPrice: 110.0,
    image: "/img/product-2.jpg",
    rating: 4.2,
    popularity: 88,
  },
  {
    id: 3,
    name: "Premium Designer Top",
    price: 199.0,
    originalPrice: 250.0,
    image: "/img/product-3.jpg",
    rating: 4.8,
    popularity: 92,
  },
  {
    id: 4,
    name: "Comfortable Casual Shirt",
    price: 75.0,
    originalPrice: 95.0,
    image: "/img/product-4.jpg",
    rating: 4.1,
    popularity: 76,
  },
  {
    id: 5,
    name: "Elegant Evening Wear",
    price: 299.0,
    originalPrice: 350.0,
    image: "/img/product-5.jpg",
    rating: 4.7,
    popularity: 89,
  },
  {
    id: 6,
    name: "Sporty Active Wear",
    price: 65.0,
    originalPrice: 80.0,
    image: "/img/product-6.jpg",
    rating: 4.3,
    popularity: 81,
  },
  {
    id: 7,
    name: "Classic Business Shirt",
    price: 129.0,
    originalPrice: 160.0,
    image: "/img/product-7.jpg",
    rating: 4.6,
    popularity: 87,
  },
  {
    id: 8,
    name: "Trendy Fashion Top",
    price: 99.0,
    originalPrice: 120.0,
    image: "/img/product-8.jpg",
    rating: 4.4,
    popularity: 83,
  },
  {
    id: 9,
    name: "Summer Collection Shirt",
    price: 85.0,
    originalPrice: 105.0,
    image: "/img/product-1.jpg",
    rating: 4.0,
    popularity: 78,
  },
  {
    id: 10,
    name: "Summer Collection Shirt",
    price: 85.0,
    originalPrice: 105.0,
    image: "/img/product-1.jpg",
    rating: 4.0,
    popularity: 78,
  },
  {
    id: 11,
    name: "Summer Collection Shirt",
    price: 85.0,
    originalPrice: 105.0,
    image: "/img/product-1.jpg",
    rating: 4.0,
    popularity: 78,
  },
];

function ShopProduct({ onAddToCart, onViewProduct }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(defaultProducts);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  function handleSearch(e) {
    e.preventDefault();
  }

  function handleSortChange(sortOption) {
    setSortBy(sortOption);
    setIsSortDropdownOpen(false);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  function handleAddToCart(product) {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log("Added to cart:", product);
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

  function generatePaginationItems() {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    return items;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="col-lg-9 col-md-12">
        <div className="row pb-3">
          {/* Search and Sort Controls */}
          <div className="col-12 pb-1">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <form onSubmit={handleSearch} className="flex-grow-1 mr-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="input-group-text bg-transparent text-primary border-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <SortDropdown
                isSortDropdownOpen={isSortDropdownOpen}
                setIsSortDropdownOpen={setIsSortDropdownOpen}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Results Count */}
            <div className="mb-3">
              <small className="text-muted">
                Showing {startIndex + 1}-{Math.min(endIndex, products.length)}{" "}
                of {products.length} products
              </small>
            </div>
          </div>

          {/* Product Grid */}
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
                handleViewProduct={handleViewProduct}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h5 className="text-muted">No products found</h5>
              <p className="text-muted">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages >= 1 && (
            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              generatePaginationItems={generatePaginationItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopProduct;

function SortDropdown({
  isSortDropdownOpen,
  setIsSortDropdownOpen,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="dropdown">
      <button
        className="btn border dropdown-toggle"
        type="button"
        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
        aria-haspopup="true"
        aria-expanded={isSortDropdownOpen}
      >
        {sortOptions.find((option) => option.value === sortBy)?.label ||
          "Sort by"}
      </button>
      <div
        className={`dropdown-menu dropdown-menu-right ${
          isSortDropdownOpen ? "show" : ""
        }`}
      >
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className="dropdown-item"
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
