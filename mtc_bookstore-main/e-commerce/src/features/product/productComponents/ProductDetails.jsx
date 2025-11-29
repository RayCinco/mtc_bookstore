import {
  formatPrice,
  getSizeStock,
  hasSizes,
  getMaxQuantity,
  getStockStatus,
} from "../../../utils/helpers";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import StarRating from "../../../components/StarRating";

function ProductDetails({
  productData,
  currentSizes,
  selectedSize,
  setSelectedSize,
  quantity,
  handleQuantityChange,
  handleAddToCart,
  genderDescription,
  peLevel,
  setPeLevel,
  isReservationMode,
  toggleReservationMode,
}) {
  const isPeUniform = productData.category === "PE Uniform";
  const availableSizes = productData.universalSizes || currentSizes;
  const isSizedProduct = hasSizes(productData.category);
  const actualStock = getMaxQuantity(productData, selectedSize);

  // Determine max quantity based on mode:
  // - Cart mode: max = actual stock
  // - Reservation mode: max = 10
  const maxQuantity = isReservationMode ? 10 : actualStock;
  const stockStatus = getStockStatus(productData, selectedSize);

  console.log("ProductDetails - Max Quantity:", maxQuantity);
  console.log("ProductDetails - Current Quantity:", quantity);
  console.log("ProductDetails - Selected Size:", selectedSize);

  return (
    <div className="col-lg-7 pb-5">
      <h3 className="font-weight-semi-bold">{productData.name}</h3>

      <div className="d-flex mb-3">
        <StarRating rating={productData.rating} className="mr-2" />
      </div>

      <div className="d-flex align-items-center mb-4">
        <h3 className="font-weight-semi-bold mb-0">
          {formatPrice(productData.price)}
        </h3>
      </div>

      <p className="mb-2">{genderDescription}</p>

      {/* PE Uniform toggle */}
      {isPeUniform && (
        <div className="mb-3">
          <div
            className="btn-group pe-toggle"
            role="group"
            aria-label="PE Level"
          >
            <button
              type="button"
              className={`btn ${
                peLevel === "SHS" ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setPeLevel("SHS")}
            >
              SHS
            </button>
            <button
              type="button"
              className={`btn ${
                peLevel === "College" ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setPeLevel("College")}
            >
              College
            </button>
          </div>
        </div>
      )}
      {/* Sizes */}
      {availableSizes && availableSizes.length > 0 && (
        <div className="mb-3">
          <p className="text-dark font-weight-medium mb-2">Sizes:</p>
          <div className="d-flex flex-wrap">
            {availableSizes.map((size, index) => {
              const sizeStock = getSizeStock(productData.sizes, size);
              const isOutOfStock = sizeStock === 0;

              return (
                <div key={index} className="mr-3 mb-2">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id={`size-${index}`}
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      disabled={isOutOfStock}
                    />
                    <label
                      className={`custom-control-label ${
                        isOutOfStock ? "text-muted" : ""
                      }`}
                      htmlFor={`size-${index}`}
                      style={{
                        cursor: isOutOfStock ? "not-allowed" : "pointer",
                      }}
                    >
                      {size}
                      <small
                        className={`ml-2 ${
                          isOutOfStock ? "text-danger" : "text-success"
                        }`}
                      >
                        {isOutOfStock
                          ? "(Out of Stock)"
                          : `(${sizeStock} left)`}
                      </small>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Status for non-sized products */}
      {!isSizedProduct && (
        <div className="mb-3">
          <p
            className={`font-weight-medium ${
              actualStock === 0 ? "text-danger" : "text-success"
            }`}
          >
            {stockStatus}
          </p>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="mb-4 pt-2">
        <div className="d-flex align-items-center mb-3">
          <div className="input-group quantity mr-3" style={{ width: "130px" }}>
            <div className="input-group-prepend">
              <button
                className="btn btn-primary btn-minus"
                type="button"
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
            </div>
            <input
              type="text"
              className="form-control bg-secondary text-center"
              value={quantity}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary btn-plus"
                type="button"
                onClick={() => handleQuantityChange("increment")}
                disabled={isReservationMode && quantity >= maxQuantity}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center flex-wrap">
            <button
              className={`btn px-3 ${
                isReservationMode || actualStock === 0
                  ? "btn-warning"
                  : "btn-primary"
              }`}
              onClick={() => handleAddToCart()}
              disabled={
                !isReservationMode &&
                actualStock !== 0 &&
                isSizedProduct &&
                !selectedSize
              }
            >
              <FaShoppingCart className="mr-1" />
              {actualStock === 0 || isReservationMode
                ? "Reserve Item"
                : "Add To Cart"}
            </button>

            {quantity >= maxQuantity && !isReservationMode && (
              <small
                className="text-warning ml-3 ms-3"
                style={{ fontWeight: 600 }}
              >
                {actualStock === 0 ? "Out of stock" : "Max stock reached"}
              </small>
            )}

            {isReservationMode && quantity >= maxQuantity && (
              <small
                className="text-info ml-3 ms-3"
                style={{ fontWeight: 600 }}
              >
                Max reservation limit (10)
              </small>
            )}
          </div>
        </div>

        {/* Reservation Option */}
        {quantity >= actualStock && actualStock > 0 && (
          <div className="alert alert-info py-2 px-3 mb-0">
            <div className="d-flex align-items-center justify-content-between">
              <small>
                {isReservationMode
                  ? "🔔 Reservation mode active - item will be reserved for pickup (max 10 units)"
                  : "Out of stock? Reserve this item for later pickup"}
              </small>
              <button
                className={`btn btn-sm ml-3 ${
                  isReservationMode
                    ? "btn-outline-secondary"
                    : "btn-outline-primary"
                }`}
                onClick={toggleReservationMode}
              >
                {isReservationMode ? "Cancel Reservation" : "Reserve Instead"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stock warning */}
      {actualStock > 0 && actualStock < 5 && !isReservationMode && (
        <div className="alert alert-warning py-2 px-3 mb-3">
          <small>
            Only {actualStock} item{actualStock !== 1 ? "s" : ""} left in stock!
          </small>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
