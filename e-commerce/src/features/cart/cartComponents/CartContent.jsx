import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/helpers";

const defaultCartItems = [
  {
    id: 1,
    name: "Colorful Stylish Shirt",
    price: 150,
    quantity: 1,
    image: "/img/product-1.jpg",
    size: "M",
    color: "Blue",
  },
  {
    id: 2,
    name: "Trendy Summer Dress",
    price: 120,
    quantity: 2,
    image: "/img/product-2.jpg",
    size: "L",
    color: "Red",
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 180,
    quantity: 1,
    image: "/img/product-3.jpg",
    size: "XL",
    color: "Blue",
  },
  {
    id: 4,
    name: "Elegant Evening Gown",
    price: 250,
    quantity: 1,
    image: "/img/product-4.jpg",
    size: "M",
    color: "Black",
  },
  {
    id: 5,
    name: "Casual Cotton T-Shirt",
    price: 45,
    quantity: 3,
    image: "/img/product-5.jpg",
    size: "L",
    color: "White",
  },
];

function CartContent({
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onCheckout,
}) {
  const [cartItems, setCartItems] = useState(defaultCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Default cart items for demo

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shippingCost = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal + shippingCost - discountAmount;

  function handleQuantityChange(itemId, newQuantity) {
    if (newQuantity < 1) return;

    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }

  function handleRemoveItem(itemId) {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  }

  function handleCouponSubmit(e) {}
  function handleCheckout() {}
  if (cartItems.length === 0) {
    return (
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-12 text-center">
            <div className="card border-secondary">
              <div className="card-body py-5">
                <i className="fa fa-shopping-cart fa-4x text-muted mb-4"></i>
                <h4 className="font-weight-semi-bold mb-3">
                  Your Cart is Empty
                </h4>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/shop" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        {/* Cart Items Table */}
        <div className="col-lg-8 table-responsive mb-5">
          <table className="table table-bordered text-center mb-0">
            <thead className="bg-secondary text-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
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
                          {item.color && `Color: ${item.color}`}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{formatPrice(item.price)}</td>
                  <td className="align-middle">
                    <div
                      className="input-group quantity mx-auto"
                      style={{ width: "120px" }}
                    >
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-sm btn-primary btn-minus"
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        className="form-control form-control-sm bg-secondary text-center"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          handleQuantityChange(item.id, newQuantity);
                        }}
                        min="1"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-sm btn-primary btn-plus"
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle font-weight-medium">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                  <td className="align-middle">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          {/* Coupon Code */}
          <form className="mb-5" onSubmit={handleCouponSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control p-4"
                placeholder="Coupon Code (try: SAVE10, SAVE20, WELCOME)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={isLoading}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isLoading || !couponCode.trim()}
                >
                  {isLoading ? (
                    <>
                      <i className="fa fa-spinner fa-spin mr-1"></i>
                      Applying...
                    </>
                  ) : (
                    "Apply Coupon"
                  )}
                </button>
              </div>
            </div>
            {appliedCoupon && (
              <div className="alert alert-success mt-2 mb-0">
                <i className="fa fa-check mr-2"></i>
                Coupon "{appliedCoupon.name}" applied! {appliedCoupon.discount}%
                off
                <button
                  type="button"
                  className="btn btn-sm btn-link text-success p-0 ml-2"
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponDiscount(0);
                    setCouponCode("");
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Cart Summary Card */}
          <div className="card border-secondary mb-5">
            <div className="card-header bg-secondary border-0">
              <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pt-1">
                <h6 className="font-weight-medium">Subtotal</h6>
                <h6 className="font-weight-medium">{formatPrice(subtotal)}</h6>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </h6>
              </div>
              {appliedCoupon && (
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="font-weight-medium text-success">
                    Discount ({appliedCoupon.discount}%)
                  </h6>
                  <h6 className="font-weight-medium text-success">
                    -{formatPrice(discountAmount)}
                  </h6>
                </div>
              )}
              {subtotal > 0 && subtotal <= 100 && (
                <div className="alert alert-info p-2 mb-3">
                  <small>
                    <i className="fa fa-info-circle mr-1"></i>
                    Add {formatPrice(100 - subtotal)} more for free shipping!
                  </small>
                </div>
              )}
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <div className="d-flex justify-content-between mt-2">
                <h5 className="font-weight-bold">Total</h5>
                <h5 className="font-weight-bold">{formatPrice(total)}</h5>
              </div>
              <button
                className="btn btn-block btn-primary my-3 py-3"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                <i className="fa fa-credit-card mr-2"></i>
                Proceed To Checkout
              </button>
              <Link to="/shop" className="btn btn-block btn-outline-primary">
                <i className="fa fa-shopping-bag mr-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartContent;
