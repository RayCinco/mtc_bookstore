import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useImage } from "../../../hooks/useImage";
function OrderSummary({
  orderItems = [],
  total = 0,
  isSubmitting = false,
  onConfirm = null,
  isStandalone = false,
}) {
  const navigate = useNavigate();

  // when embedded in a form, the button should be type="submit" and let the
  // form's onSubmit handler run; when standalone, navigate home.

  const items = Array.isArray(orderItems) ? orderItems : [];

  return (
    <>
      <div className="card border-secondary mb-5">
        <div className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">
            <i className="fa fa-shopping-bag mr-2"></i>
            Order Summary
          </h4>
        </div>
        <div className="card-body">
          {/* Items */}
          <h6 className="font-weight-semi-bold mb-3">Items to Order</h6>
          <div className="mb-3">
            {items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>

          <div className="alert alert-info mt-3 mb-3 py-2">
            <small>
              <i className="fa fa-info-circle mr-1"></i>
              Pay on the cashier before picking up your order.
            </small>
          </div>
        </div>

        <div className="card-footer border-secondary bg-transparent">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="font-weight-bold">Total</h5>
            <h5 className="font-weight-bold text-primary">
              {formatPrice(total)}
            </h5>
          </div>

          <button
            type={isStandalone ? "button" : "submit"}
            className="btn btn-block btn-primary py-3"
            disabled={isSubmitting}
            onClick={isStandalone ? () => navigate("/") : undefined}
          >
            {isSubmitting ? (
              <>
                <i className="fa fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fa fa-calendar-check mr-2"></i>
                Confirm Order
              </>
            )}
          </button>

          <Link to="/cart" className="btn btn-block btn-outline-primary mt-2">
            <i className="fa fa-arrow-left mr-2"></i>
            Back to Cart
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;

// Subcomponent: OrderItem — uses `useImage` to load product images like ProductCard
function OrderItem({ item }) {
  const imgIndex = Array.isArray(item.image)
    ? item.gender === "Women"
      ? 1
      : 0
    : null;

  const imagePath = Array.isArray(item.image)
    ? item.image[imgIndex] || item.image[0]
    : item.image;

  const { data: productImageUrl, isLoading: isImageLoading } =
    useImage(imagePath);

  return (
    <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
      <img
        src={productImageUrl || "/img/product-1.jpg"}
        alt={item.name}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          opacity: isImageLoading ? 0.6 : 1,
        }}
        className="mr-3"
        onError={(e) => (e.target.src = "/img/product-1.jpg")}
      />
      <div className="flex-grow-1">
        <h6 className="mb-1">
          {item.name}
          {(item.is_reservation === 1 || item.is_reservation === true) && (
            <span className="badge badge-warning ml-2">Reservation</span>
          )}
        </h6>
        <small className="text-muted">
          Size: {item.selected_size} | Qty: {item.quantity}
        </small>
        <div className="d-flex justify-content-between mt-1">
          <span className="font-weight-bold">
            {formatPrice((item.price || 0) * (item.quantity || 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
