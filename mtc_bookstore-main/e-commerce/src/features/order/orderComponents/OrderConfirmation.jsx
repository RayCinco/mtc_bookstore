import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/helpers";

function OrderConfirmation({ order }) {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <div className="col-lg-8 mx-auto">
          <div className="card border-success">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                <i className="fa fa-check-circle mr-2"></i>
                Order Confirmed!
              </h4>
            </div>
            <div className="card-body">
              <div className="alert alert-success mb-4">
                <h5 className="alert-heading">
                  Your order has been successfully created!
                </h5>
                <p className="mb-0">
                  Please keep your order number for reference.
                </p>
              </div>

              {/* Order Details */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="font-weight-semi-bold mb-3">Order Details</h5>
                  <div className="mb-2">
                    <strong>Order Number:</strong>
                    <br />
                    <span className="h5 text-primary font-weight-bold">
                      {order.order_number}
                    </span>
                  </div>
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

                <div className="col-md-6">
                  <h5 className="font-weight-semi-bold mb-3">
                    Pickup Information
                  </h5>
                  <div className="mb-2">
                    <strong>Date:</strong>{" "}
                    {new Date(order.pickup_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="mb-2">
                    <strong>Time:</strong> {order.pickup_time}
                  </div>
                  <div className="mb-2">
                    <strong>Total Amount:</strong>{" "}
                    <span className="text-primary font-weight-bold">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <i className="fa fa-info-circle mr-2"></i>
                  Important Information
                </h6>
                <ul className="mb-0 pl-3">
                  <li>
                    Please bring your order number and valid student ID when
                    picking up your items.
                  </li>
                  <li>
                    Your order will be held for 24 hours after the scheduled
                    pickup time.
                  </li>
                  <li>
                    Payment can be made at the time of pickup (Cash or Card
                    accepted).
                  </li>
                  <li>A confirmation email has been sent to {order.email}</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="fa fa-home mr-2"></i>
                  Go to Home
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print mr-2"></i>
                  Print Confirmation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
