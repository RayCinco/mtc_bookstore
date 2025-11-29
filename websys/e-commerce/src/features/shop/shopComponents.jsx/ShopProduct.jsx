import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ShopProductCard from "./ShopProductCard";
import { useProducts } from "../../product/productHooks/useProducts";
import Spinner from "../../../components/Spinner";
import { navItems } from "../../../utils/constants";

function ShopProduct() {
  const [activeSection, setActiveSection] = useState("uniforms");
  const [uniformPage, setUniformPage] = useState(1);
  const [textbookPage, setTextbookPage] = useState(1);
  const { isLoading, products } = useProducts();

  useEffect(() => {
    const section = sessionStorage.getItem("startSection");
    const page = sessionStorage.getItem("startPage");

    if (section) setActiveSection(section);
    if (page) {
      if (section === "uniforms") setUniformPage(Number(page));
      if (section === "textbooks") setTextbookPage(Number(page));
    }

    sessionStorage.removeItem("startSection");
    sessionStorage.removeItem("startPage");
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  // ==== PRODUCT DATA ===

  const uniforms = products.filter(
    (product) => product.category === "School Uniform"
  );
  const textbooks = products.filter(
    (product) => product.category === "Textbook"
  );
  const accessories = products.filter(
    (product) => product.category === "Accessories"
  );
  const stationery = products.filter(
    (product) => product.category === "School Supplies"
  );
  const merchandise = products.filter(
    (product) => product.category === "Tytana Merchandise"
  );

  // ==== PAGE DATA ====
  const itemsPerPage = 6;
  const uniformStart = (uniformPage - 1) * itemsPerPage;
  const uniformEnd = uniformStart + itemsPerPage;
  const currentUniformItems = uniforms.slice(uniformStart, uniformEnd);
  const uniformPages = Math.ceil(uniforms.length / itemsPerPage);

  const textbookPerPage =
    textbookPage === 1 ? textbooks.slice(0, 6) : textbooks.slice(6, 8);

  return (
    <div className="container-fluid pt-5">
      {/* === TOP NAVIGATION BAR === */}
      <div className="text-center mb-4">
        <div className="btn-group" role="group">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`btn mx-1 ${
                activeSection === item.key
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* === UNIFORMS === */}
      {activeSection === "uniforms" && (
        <>
          <ShopProductCard
            products={currentUniformItems}
            category="School Uniform"
          />
          <div className="pagination d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: uniformPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      uniformPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setUniformPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* === COLLEGE TEXTBOOKS === */}
      {activeSection === "textbooks" && (
        <>
          <ShopProductCard products={textbookPerPage} category="Textbook" />
        </>
      )}

      {/* === ACCESSORIES === */}
      {activeSection === "accessories" && (
        <ShopProductCard products={accessories} category="Accessories" />
      )}

      {/* === STATIONERY === */}
      {activeSection === "stationery" && (
        <ShopProductCard products={stationery} category="School Supplies" />
      )}

      {/* === MERCHANDISE === */}
      {activeSection === "merchandise" && (
        <ShopProductCard products={merchandise} category="Tytana Merchandise" />
      )}
    </div>
  );
}

export default ShopProduct;
