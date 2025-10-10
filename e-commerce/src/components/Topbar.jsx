import { useState } from "react";
import { Link } from "react-router-dom";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const socialLinks = [
    { icon: "fab fa-facebook-f", url: "#", label: "Facebook" },
    { icon: "fab fa-twitter", url: "#", label: "Twitter" },
    { icon: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
    { icon: "fab fa-instagram", url: "#", label: "Instagram" },
    { icon: "fab fa-youtube", url: "#", label: "YouTube" },
  ];

  return (
    <div className="container-fluid">
      {/* Top Bar */}
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <Link className="text-dark" to="/faq">
              FAQs
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/help">
              Help
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/support">
              Support
            </Link>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                className={`text-dark px-2 ${
                  index === socialLinks.length - 1 ? "pl-2" : ""
                }`}
                href={social.url}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <Link to="/" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">
                E
              </span>
              Shopper
            </h1>
          </Link>
        </div>

        <div className="col-lg-6 col-6 text-left">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
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
        </div>

        <div className="col-lg-3 col-6 text-right">
          <Link to="/wishlist" className="btn border">
            <i className="fas fa-heart text-primary"></i>
            <span className="badge">{wishlistCount}</span>
          </Link>
          <Link to="/cart" className="btn border ml-2">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
