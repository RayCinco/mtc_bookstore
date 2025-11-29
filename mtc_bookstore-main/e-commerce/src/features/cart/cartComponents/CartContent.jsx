import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/helpers";
import { useCart } from "../cartHooks/useCart";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useImage } from "../../../hooks/useImage";
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaShoppingBag,
  FaInfoCircle,
} from "react-icons/fa";
import { EmptyCart } from "../../../components/Empty";
import { useUpdateCartItem } from "../cartHooks/useUpdateCartItem";
import { useDeleteCartItem } from "../cartHooks/useDeleteCartItem";

function CartContent() {
  const { isLoadingCart, cart } = useCart();
  const { updateItem, isUpdating } = useUpdateCartItem();
  const { deleteItem, isDeleting } = useDeleteCartItem();

  const [cartItems, setCartItems] = useState([]);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const navigate = useNavigate();
  // Update cartItems when cart data is loaded
  useEffect(() => {
    // Always sync local cartItems with server data.
    // Use an empty array when `cart` is falsy so the UI reflects an empty cart immediately.
    setCartItems(cart || []);
  }, [cart]);

  if (isLoadingCart) {
    return <Spinner />;
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = subtotal;

  function handleQuantityChange(itemId, newQuantity) {
    if (newQuantity < 1) return;

    // Find the item to update
    const itemToUpdate = cartItems.find((item) => item.id === itemId);
    if (!itemToUpdate) return;
    setUpdatingItemId(itemId);
    updateItem(
      { ...itemToUpdate, quantity: newQuantity },
      {
        onSettled: () => setUpdatingItemId(null),
      }
    );
  }

  function handleRemoveItem(itemId) {
    // Optimistically remove the item from local state so the UI updates immediately.
    setDeletingItemId(itemId);
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));

    deleteItem(itemId, {
      onSettled: () => setDeletingItemId(null),
    });
  }

  function handleReserve() {
    navigate("/order");
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <CartItemsTable
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />
        <CartSummary
          subtotal={subtotal}
          total={total}
          onReserve={handleReserve}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

export default CartContent;

// Cart Items Table Component
function CartItemsTable({ cartItems, onQuantityChange, onRemoveItem }) {
  return (
    <div className="col-lg-8 table-responsive mb-5">
      <table className="table table-bordered text-center mb-0">
        <thead className="bg-secondary text-dark">
          <tr>
            <th>Products</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Cart Item Row Component
function CartItemRow({ item, onQuantityChange, onRemoveItem }) {
  // Resolve image path and load via useImage hook (same behavior as ProductCard)
  const imagePath = Array.isArray(item.image) ? item.image[0] : item.image;
  const { data: productImageUrl, isLoading: isImageLoading } =
    useImage(imagePath);

  return (
    <tr>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <img
            src={productImageUrl || "/img/product-1.jpg"}
            alt={item.name}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              opacity: isImageLoading ? 0.6 : 1,
            }}
            className="mr-3"
            onError={(e) => {
              e.target.src = "/img/product-1.jpg";
            }}
          />
          <div className="text-left">
            <h6 className="mb-1">{item.name}</h6>
            <small className="text-muted">
              {item.size && `Size: ${item.size}`}
              {item.size && item.color && " | "}
            </small>
            {item.is_reservation == 1 && (
              <span className="badge badge-warning ml-2">Reserved</span>
            )}
          </div>
        </div>
      </td>
      <td className="align-middle">{item.selected_size || "-"}</td>
      <td className="align-middle">{formatPrice(item.price)}</td>
      <td className="align-middle">
        <QuantityControl
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item.id, newQuantity)
          }
        />
      </td>
      <td className="align-middle font-weight-medium">
        {formatPrice(item.price * item.quantity)}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onRemoveItem(item.id)}
          title="Remove item"
        >
          <FaTimes />
        </button>
      </td>
    </tr>
  );
}

// Quantity Control Component
function QuantityControl({ quantity, onQuantityChange }) {
  return (
    <div className="input-group quantity mx-auto" style={{ width: "120px" }}>
      <div className="input-group-prepend">
        <button
          className="btn btn-sm btn-primary btn-minus"
          type="button"
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <FaMinus />
        </button>
      </div>
      <div
        className="form-control form-control-sm bg-secondary text-center quantity-display"
        aria-live="polite"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {quantity}
      </div>
      {/* <div className="input-group-append">
        <button
          className="btn btn-sm btn-primary btn-plus"
          type="button"
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={true}
          style={{ cursor: "not-allowed", opacity: 0.5 }}
          title="Cannot increase quantity in cart"
        >
          <FaPlus />
        </button>
      </div> */}
    </div>
  );
}

// Cart Summary Component
function CartSummary({ subtotal, total, onReserve, cartItems }) {
  return (
    <div className="col-lg-4">
      <div className="card border-secondary mb-5">
        <div className="card-header bg-secondary border-0">
          <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3 pt-1">
            <h6 className="font-weight-medium">Subtotal</h6>
            <h6 className="font-weight-medium">{formatPrice(subtotal)}</h6>
          </div>
        </div>
        <div className="card-footer border-secondary bg-transparent">
          <div className="d-flex justify-content-between mt-2">
            <h5 className="font-weight-bold">Total</h5>
            <h5 className="font-weight-bold">{formatPrice(total)}</h5>
          </div>
          <button
            className="btn btn-block btn-primary my-3 py-3"
            onClick={onReserve}
            disabled={cartItems.length === 0}
          >
            <FaCreditCard className="mr-2" />
            Proceed To Order
          </button>
          <Link to="/shop" className="btn btn-block btn-outline-primary">
            <FaShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

// Shipping Alert Component
function ShippingAlert({ subtotal }) {
  return (
    <div className="alert alert-info p-2 mb-3">
      <small>
        <FaInfoCircle className="mr-1" />
        Add {formatPrice(100 - subtotal)} more for free shipping!
      </small>
    </div>
  );
}
