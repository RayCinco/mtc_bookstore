import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import Spinner from "./Spinner";
import { useUser } from "../features/auth/authHooks/useUser";
import { useImage } from "../hooks/useImage";

function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { isLoading, user } = useUser();
  const { data: avatarUrl } = useImage(user?.avatar);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container-fluid">
      {/* Main Header */}
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <Link to="/" className="text-decoration-none">
            <h2 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">
                Tytana
              </span>
              Bookstore
            </h2>
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
                  <FaSearch />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-3 col-6 text-right">
          <Link to="/cart" className="btn border ml-2">
            <FaShoppingCart className="text-primary" />
            <span className="badge">{cartCount}</span>
          </Link>
          <Link
            to="/account"
            className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg ml-2"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || "User"}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <FaUser className="text-primary" />
            )}
          </Link>
          <small className="font-medium ">{user?.name || "Guest"}</small>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
