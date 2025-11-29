import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/helpers";
import { useOrder } from "../orderHooks/useOrder";
import Spinner from "../../../components/Spinner";
import OrderItems from "./OrderItems";

function OrderDetails() {
  const { order, isLoading, items } = useOrder();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <div className="col-lg-8 mx-auto">
          <div className="card border-secondary">
            <div className="card-header bg-secondary border-0">
              <h4 className="mb-0">
                <i className="fa fa-file-text mr-2"></i>
                Order Details
              </h4>
            </div>
            <div className="card-body">
              {/* Order Details */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="font-weight-semi-bold mb-3">
                    Order Information
                  </h5>
                  <div className="mb-2">
                    <strong>Order Number:</strong>
                    <br />
                    <span className="h5 text-primary font-weight-bold">
                      {order.order_number}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong>Status:</strong>{" "}
                    <span className="badge badge-info text-capitalize">
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="col-md-6">
                  <h5 className="font-weight-semi-bold mb-3">
                    Customer Information
                  </h5>
                  <div className="mb-2">
                    <strong>Name:</strong> {order.full_name}
                  </div>
                  <div className="mb-2">
                    <strong>Student ID:</strong> {order.student_id}
                  </div>
                  <div className="mb-2">
                    <strong>Email:</strong> {order.email}
                  </div>
                  <div className="mb-2">
                    <strong>Phone:</strong> {order.phone}
                  </div>
                </div>
              </div>

              <hr />

              {/* Pickup Information */}
              <div className="mb-4">
                <h5 className="font-weight-semi-bold mb-3">
                  Pickup Information
                </h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong>Pickup Date:</strong>{" "}
                      {new Date(order.pickup_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2">
                      <strong>Pickup Time:</strong> {order.pickup_time}
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Order Items */}
              <OrderItems
                items={items}
                total={order.total_amount}
                is_reservation={order.is_reservation}
              />

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Link
                  to="/account/orders"
                  className="btn btn-outline-secondary"
                >
                  <i className="fa fa-arrow-left mr-2"></i>
                  Back to Orders
                </Link>
                <div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => window.print()}
                  >
                    <i className="fa fa-print mr-2"></i>
                    Print Order
                  </button>
                  <Link to="/" className="btn btn-outline-primary">
                    <i className="fa fa-home mr-2"></i>
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
