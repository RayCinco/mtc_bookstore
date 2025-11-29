import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { categories } from "../../../utils/constants";
import { useProducts } from "../../product/productHooks/useProducts";
import Spinner from "../../../components/Spinner";
function Categories({ showTitle = false, title = "Shop by Category" }) {
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  function handleCategoryClick(category) {
    // Clear old data
    sessionStorage.removeItem("startSection");
    sessionStorage.removeItem("startPage");

    // Assign section and page depending on category clicked
    switch (category.name) {
      case "Program Attires":
        sessionStorage.setItem("startSection", "uniforms");
        sessionStorage.setItem("startPage", "3");
        break;
      case "College Textbooks":
        sessionStorage.setItem("startSection", "textbooks");
        sessionStorage.setItem("startPage", "1");
        break;
      case "Accessories":
        sessionStorage.setItem("startSection", "accessories");
        sessionStorage.setItem("startPage", "1");
        break;
      case "School Stationery":
        sessionStorage.setItem("startSection", "stationery");
        sessionStorage.setItem("startPage", "1");
        break;
      case "Tytana Merchandise":
        sessionStorage.setItem("startSection", "merchandise");
        sessionStorage.setItem("startPage", "1");
        break;
      case "School Uniforms":
      default:
        sessionStorage.setItem("startSection", "uniforms");
        sessionStorage.setItem("startPage", "1");
        break;
    }

    // Redirect to shop
    navigate("/shop");
  }

  // Normalize product category strings to match the canonical category names
  function normalizeCategory(cat) {
    if (!cat || typeof cat !== "string") return cat;
    const c = cat.toLowerCase();
    if (c.includes("uniform")) return "School Uniforms";
    if (c.includes("textbook")) return "College Textbooks";
    if (c.includes("tytana") || c.includes("merch"))
      return "Tytana Merchandise";
    if (c.includes("accessor")) return "Accessories";
    if (c.includes("supply") || c.includes("stationery"))
      return "School Supplies";
    // fallback: title-case the incoming category
    return cat;
  }

  const categoryCounts = Array.isArray(products)
    ? products.reduce((acc, product) => {
        const key = normalizeCategory(product.category);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {})
    : {};

  if (isLoading) return <Spinner />;
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
        {categories.map((category) => (
          <div key={category.id} className="col-lg-4 col-md-6 pb-1">
            <div
              className="cat-item d-flex flex-column border mb-4"
              style={{ padding: "30px", cursor: "pointer", height: "100%" }}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="text-right text-muted mb-3">
                {categoryCounts[category.name] || 0} Products
              </p>

              <div
                className="cat-img position-relative overflow-hidden mb-3 text-decoration-none"
                style={{ height: "300px" }}
              >
                <img
                  className="img-fluid w-100 h-100"
                  src={category.image}
                  alt={category.name}
                  style={{ objectFit: "cover" }}
                />
                <div className="cat-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="cat-hover-content text-center text-white">
                    <FaEye className="fa-2x mb-2" />
                    <p className="mb-0">Browse Collection</p>
                  </div>
                </div>
              </div>

              <h5 className="font-weight-semi-bold m-0 text-dark category-title text-center">
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
