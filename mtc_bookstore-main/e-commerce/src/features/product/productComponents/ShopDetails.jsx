import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../productHooks/useProduct";
import ProductDetails from "./ProductDetails";
import Spinner from "../../../components/Spinner";
import { EmptyProduct } from "../../../components/Empty";
import {
  getSizeLabels,
  getMaxQuantity,
  hasSizes,
} from "../../../utils/helpers";
import { useAddCartItem } from "../../cart/cartHooks/useAddCartItem";
import toast from "react-hot-toast";
import { useImage } from "../../../hooks/useImage";
function ShopDetails() {
  const { product, isLoading } = useProduct();
  const { addItem, isAdding } = useAddCartItem();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isReservationMode, setIsReservationMode] = useState(false);

  const productData = product;
  console.log("Product Data:", productData);
  console.log("Selected Size:", selectedSize);
  console.log("Current Quantity:", quantity);
  console.log("Max Quantity:", getMaxQuantity(productData, selectedSize));

  const currentSizes = getSizeLabels(productData?.sizes);
  const currentImage = productData?.image || "";
  const { data: productImageUrl, isLoading: isImageLoading } =
    useImage(currentImage);

  if (isLoading) return <Spinner />;

  if (!product) return <EmptyProduct />;

  function handleAddToCart() {
    const maxQty = getMaxQuantity(productData, selectedSize);
    const isSizedProduct = hasSizes(productData.category);

    // Validation
    if (isSizedProduct && !selectedSize && maxQty !== 0 && !isReservationMode) {
      toast.error("Please select a size");
      return;
    }

    // If stock is 0 or in reservation mode, treat as reservation
    const isReservation = maxQty === 0 || isReservationMode;

    const cartItem = {
      product_id: productData.id,
      name: productData.name,
      price: productData.price,
      quantity: quantity,
      image: currentImage,
      selected_size: selectedSize || null,
      category: productData.category,
      is_reservation: isReservation ? 1 : 0,
    };

    console.log("Add to Cart:", cartItem);

    if (isReservation) {
      toast.success("Item reserved successfully!");
    }

    addItem(cartItem);

    // Reset reservation mode after adding
    setIsReservationMode(false);
  }

  function handleQuantityChange(operation) {
    const maxQty = getMaxQuantity(productData, selectedSize);

    console.log(
      "handleQuantityChange called:",
      operation,
      "maxQty:",
      maxQty,
      "current:",
      quantity
    );

    if (operation === "increment") {
      if (quantity < maxQty) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(
          `Maximum ${maxQty} item${maxQty !== 1 ? "s" : ""} available`
        );
      }
    } else if (operation === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleSizeChange(newSize) {
    console.log("Size changed to:", newSize);
    setSelectedSize(newSize);
    setQuantity(1); // Reset quantity when size changes
    setIsReservationMode(false); // Exit reservation mode on size change
  }

  function toggleReservationMode() {
    setIsReservationMode((prev) => !prev);
    if (!isReservationMode) {
      toast.info("Reservation mode activated - you can reserve this item");
    }
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
              <div className="carousel-item active" style={{ height: "500px" }}>
                <img
                  className="w-100 h-100"
                  src={productImageUrl || "/img/product-1.jpg"}
                  alt={productData.name}
                  style={{
                    objectFit: "contain",
                    opacity: isImageLoading ? 0.6 : 1,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/product-1.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Product Details */}
        <ProductDetails
          productData={productData}
          currentSizes={currentSizes}
          selectedSize={selectedSize}
          setSelectedSize={handleSizeChange}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          isReservationMode={isReservationMode}
          toggleReservationMode={toggleReservationMode}
        />
      </div>{" "}
      {/* Product Tabs */}
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productData={productData}
      />
    </div>
  );
}

export default ShopDetails;

function ProductTabs({ activeTab, setActiveTab, productData }) {
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
        </div>

        <div className="tab-content">
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
        </div>
      </div>
    </div>
  );
}
