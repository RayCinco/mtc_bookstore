import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeCarousel from "./HomeCarousel";

function Navbar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [page, setPage] = useState("/");
  const location = useLocation();

  //Not usable as of now
  const categories = [
    {
      name: "Dresses",
      subcategories: ["Men's Dresses", "Women's Dresses", "Baby's Dresses"],
    },
    { name: "Shirts", link: "/shop?category=shirts" },
    { name: "Jeans", link: "/shop?category=jeans" },
    { name: "Swimwear", link: "/shop?category=swimwear" },
    { name: "Sleepwear", link: "/shop?category=sleepwear" },
    { name: "Sportswear", link: "/shop?category=sportswear" },
    { name: "Jumpsuits", link: "/shop?category=jumpsuits" },
    { name: "Blazers", link: "/shop?category=blazers" },
    { name: "Jackets", link: "/shop?category=jackets" },
    { name: "Shoes", link: "/shop?category=shoes" },
  ];

  const mainNavItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Product Detail", link: "/product" },
    {
      name: "Pages",
      dropdown: [
        { name: "Shopping Cart", link: "/cart" },
        { name: "Reserve", link: "/reserve" },
      ],
    },
    { name: "Contact", link: "/contact" },
  ];

  function toggleCategories() {
    setIsCategoriesOpen(!isCategoriesOpen);
  }

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  function toggleDropdown(itemName) {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  }

  function closeAllDropdowns() {
    setOpenDropdown(null);
  }

  function handleDropdownClick(e, itemName) {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown(itemName);
  }

  const isActiveLink = (link) => {
    if (link === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname === link;
  };

  return (
    <div
      className="container-fluid"
      onClick={(e) => {
        // Close mobile menu when clicking nav links
        if (e.target.tagName === "A") {
          setIsNavbarOpen(false);
        }
      }}
    >
      <div className="row border-top px-xl-5">
        {/* Categories Sidebar */}
        <div className="col-lg-3 d-none d-lg-block">
          <button
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            onClick={toggleCategories}
            style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
          >
            <h6 className="m-0">Categories</h6>
            <i
              className={`fa fa-angle-${
                isCategoriesOpen ? "up" : "down"
              } text-dark`}
            ></i>
          </button>

          <nav
            className={`${
              isCategoriesOpen ? "" : "collapse"
            } position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light`}
            style={{ width: "calc(100% - 30px)", zIndex: 1 }}
          >
            <div
              className="navbar-nav w-100 overflow-hidden"
              style={{ height: "410px" }}
            >
              {categories.map((category, index) => (
                <div key={index}>
                  {category.subcategories ? (
                    <div className="nav-item dropdown">
                      <button
                        className="nav-link btn btn-link text-left w-100 border-0 bg-transparent"
                        onClick={(e) => handleDropdownClick(e, category.name)}
                        aria-expanded={openDropdown === category.name}
                      >
                        {category.name}
                        <i
                          className={`fa fa-angle-${
                            openDropdown === category.name ? "up" : "down"
                          } float-right mt-1`}
                        ></i>
                      </button>
                      <div
                        className={`dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0 ${
                          openDropdown === category.name ? "show" : ""
                        }`}
                      >
                        {category.subcategories.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/shop?category=${sub
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}`}
                            className="dropdown-item"
                            onClick={closeAllDropdowns}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/${category.link}`}
                      className="nav-item nav-link"
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Navigation */}
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            {/* Mobile Logo */}
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                Shopper
              </h1>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="navbar-toggler"
              onClick={toggleNavbar}
              aria-expanded={isNavbarOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Menu */}
            <div
              className={`collapse navbar-collapse justify-content-between ${
                isNavbarOpen ? "show" : ""
              }`}
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                {mainNavItems.map((item, index) => (
                  <div key={index}>
                    {item.dropdown ? (
                      <div className="nav-item dropdown">
                        <button
                          className={`nav-link dropdown-toggle btn btn-link border-0 bg-transparent ${
                            isActiveLink("/cart") || isActiveLink("/reserve")
                              ? "active"
                              : ""
                          }`}
                          onClick={(e) => handleDropdownClick(e, item.name)}
                          aria-expanded={openDropdown === item.name}
                        >
                          {item.name}
                        </button>
                        <div
                          className={`dropdown-menu rounded-0 m-0 ${
                            openDropdown === item.name ? "show" : ""
                          }`}
                        >
                          {item.dropdown.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              to={dropItem.link}
                              className="dropdown-item"
                              onClick={closeAllDropdowns}
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.link}
                        className={`nav-item nav-link ${
                          isActiveLink(item.link) ? "active" : ""
                        }`}
                        onClick={() => {
                          setPage(item.link);
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Auth Links */}
              <div className="navbar-nav ml-auto py-0">
                <Link
                  to="/login"
                  className={`nav-item nav-link ${
                    isActiveLink("/login") ? "active" : ""
                  }`}
                >
                  Login
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
