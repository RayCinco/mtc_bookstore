import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "../features/auth/Logout";
function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Cart", link: "/cart" },
    { name: "Contact", link: "/contact" },
    { name: "Account", link: "/account" },
  ];

  function toggleNavbar() {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const isActiveLink = (link) => {
    if (link === "/" && location.pathname === "/") return true;
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
        {/* Main Navigation */}
        <div className="col-12">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            {/* Mobile Logo */}
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  Tytana
                </span>
                Bookstore
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
                  <Link
                    key={index}
                    to={item.link}
                    className={`nav-item nav-link ${
                      isActiveLink(item.link) ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Auth Links */}
              <div className="navbar-nav ml-auto py-0">
                <Logout
                  className={`nav-item nav-link ${
                    isActiveLink("/login") ? "active" : ""
                  }`}
                >
                  Logout
                </Logout>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
