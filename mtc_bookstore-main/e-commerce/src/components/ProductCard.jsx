import { useNavigate } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { formatPrice } from "../utils/helpers";
import { useAddCartItem } from "../features/cart/cartHooks/useAddCartItem";
import { getSizeLabels } from "../utils/helpers";
import { useImage } from "../hooks/useImage";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem, isAdding } = useAddCartItem();

  /** -----------------------------------------
   * 1. DETERMINE IMAGE
   * ----------------------------------------- */
  const imagePath = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  const { data: productImageUrl, isLoading: isImageLoading } =
    useImage(imagePath);

  /** -----------------------------------------
   * 2. DETERMINE CATEGORY HANDLING
   * ----------------------------------------- */
  const hasSizes =
    product.category === "Tytana Merchandise" ||
    product.category === "School Uniform";

  /** -----------------------------------------
   * 3. GET DEFAULT SIZE + STOCK
   * ----------------------------------------- */
  let defaultSize = null;
  let defaultStock = 0;

  if (hasSizes && product.sizes) {
    const sizeLabels = getSizeLabels(product.sizes); // ["S","M","L"...]
    if (sizeLabels.length > 0) {
      defaultSize = sizeLabels[0];
      defaultStock = product.sizes[defaultSize] ?? 0;
    }
  } else {
    // If NOT size-based category
    defaultStock = product.quantity ?? 0;
  }

  /** -----------------------------------------
   * 4. DETERMINE RESERVATION MODE
   * If stock = 0 → automatically reservation
   * ----------------------------------------- */
  const isReservation = defaultStock === 0 ? 1 : 0;

  /** -----------------------------------------
   * 5. ADD TO CART HANDLER
   * ----------------------------------------- */
  const handleAddToCart = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: imagePath,
      selected_size: defaultSize,
      category: product.category,
      quantity: 1, // default add 1
      is_reservation: isReservation,
    });
  };

  return (
    <div
      className="card product-item border-0 mb-4"
      style={{ height: "100%", maxWidth: "320px", margin: "0 auto" }}
    >
      {/* IMAGE */}
      <div
        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
        style={{ height: "400px" }}
      >
        <img
          className="img-fluid w-100 h-100"
          src={productImageUrl || "/img/product-1.jpg"}
          alt={product.name}
          style={{ objectFit: "cover", opacity: isImageLoading ? 0.6 : 1 }}
          onError={(e) => (e.target.src = "/img/product-1.png")}
        />
      </div>

      {/* PRODUCT NAME + PRICE */}
      <div
        className="card-body border-left border-right text-center p-0 pt-4 pb-3"
        style={{ minHeight: "120px" }}
      >
        <h6 className="text-truncate mb-3">{product.name}</h6>
        <div className="d-flex justify-content-center">
          <h6>{formatPrice(product.price)}</h6>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="card-footer d-flex justify-content-between bg-light border">
        <button
          type="button"
          className="btn btn-sm text-dark p-0"
          onClick={() => navigate(`/product/${product.id}`)}
          disabled={isAdding}
        >
          <FaEye className="text-primary mr-1" />
          View Detail
        </button>

        <button
          type="button"
          className="btn btn-sm text-dark p-0"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <FaShoppingCart className="text-primary mr-1" />
          {isReservation ? "Reserve" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
