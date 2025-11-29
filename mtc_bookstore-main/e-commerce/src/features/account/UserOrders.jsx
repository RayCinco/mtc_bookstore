import { useState } from "react";
import {
  FaEye,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaBan,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../order/orderHooks/useOrders";
import Spinner from "../../components/Spinner";
import { formatPrice } from "../../utils/helpers";

function UserOrders() {
  const { isLoading, orders, error } = useOrders();
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  function handleViewDetails(orderId) {
    navigate(`/account/orders/${orderId}`);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error loading orders: {error.message}
      </div>
    );
  }

  console.log("User Orders:", orders);
  // Filter orders by status
  const filteredOrders =
    orders?.filter((order) => {
      if (activeTab === "all") return true;
      const status = (order.status || "pending").toLowerCase();
      return status === activeTab;
    }) || [];

  const orderTabs = [
    { id: "all", label: "All Orders", icon: FaShoppingBag },
    { id: "pending", label: "Pending", icon: FaClock },
    { id: "confirmed", label: "Confirmed", icon: FaCheckCircle },
    { id: "ready", label: "Ready", icon: FaTruck },
    { id: "completed", label: "Completed", icon: FaCheckCircle },
    { id: "cancelled", label: "Cancelled", icon: FaBan },
  ];

  const getStatusBadge = (status) => {
    const statusLower = (status || "pending").toLowerCase();
    const badges = {
      pending: "badge-warning",
      confirmed: "badge-info",
      ready: "badge-primary",
      completed: "badge-success",
      cancelled: "badge-danger",
    };
    return badges[statusLower] || "badge-secondary";
  };

  return (
    <div className="mb-4">
      <div className="p-0">
        <h4 className="mb-3" style={{ fontWeight: 500, color: "#333" }}>
          My Orders
        </h4>

        {/* Order Status Tabs */}
        <div className="mb-4">
          <ul
            className="nav nav-pills"
            style={{
              backgroundColor: "transparent",
              padding: "0",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {orderTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const count =
                tab.id === "all"
                  ? orders?.length || 0
                  : orders?.filter(
                      (o) => (o.status || "pending").toLowerCase() === tab.id
                    ).length || 0;

              return (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`btn btn-sm ${
                      isActive ? "btn-primary" : "btn-light"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "10px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    <span
                      className={`badge ${
                        isActive ? "badge-light" : "badge-secondary"
                      }`}
                      style={{
                        fontSize: "11px",
                        padding: "3px 7px",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Orders List */}
        {!filteredOrders || filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <FaShoppingBag size={64} color="#dee2e6" className="mb-3" />
            <h5 className="text-muted">No orders yet</h5>
            <p className="text-muted">
              {activeTab === "all"
                ? "You haven't placed any orders yet."
                : `You have no ${activeTab} orders.`}
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/shop")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="mb-3"
                style={{
                  border: "1px solid #f1f1f1",
                  borderRadius: "4px",
                  background: "#fff",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="mb-1 font-weight-bold">
                        Order #{order.order_number}
                      </h6>
                      <div className="small text-muted">
                        <span>
                          {new Date(order.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                        {" · "}
                        <span
                          className={`badge ${getStatusBadge(order.status)}`}
                        >
                          {(order.status || "Pending").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h5 mb-1 font-weight-bold text-primary">
                        {formatPrice(order.total_amount)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      height: 1,
                      background: "#f1f1f1",
                      margin: "12px 0",
                    }}
                  />

                  {/* Order Items Preview */}
                  <div className="row">
                    {order.order_items?.slice(0, 3).map((item) => (
                      <div className="col-md-4 mb-3" key={item.id}>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.product?.image || "/img/product-1.jpg"}
                            alt={item.product_name}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 6,
                              border: "1px solid #e9ecef",
                            }}
                            onError={(e) => {
                              e.target.src = "/img/product-1.jpg";
                            }}
                          />
                          <div style={{ marginLeft: 12, flex: 1 }}>
                            <div className="small font-weight-semibold text-truncate">
                              {item.product_name}
                              {(item.is_reservation === 1 ||
                                item.is_reservation === true) && (
                                <span
                                  className="badge badge-warning ml-1"
                                  style={{ fontSize: "10px" }}
                                >
                                  R
                                </span>
                              )}
                            </div>
                            <div className="small text-muted">
                              Qty: {item.quantity}
                            </div>
                            {item.selected_size && (
                              <div className="small text-muted">
                                Size: {item.selected_size}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.order_items?.length > 3 && (
                      <div className="col-md-4 mb-3">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            height: "60px",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "6px",
                            border: "1px dashed #dee2e6",
                          }}
                        >
                          <span className="text-muted small">
                            +{order.order_items.length - 3} more items
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      <FaEye className="mr-2" aria-hidden="true" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
