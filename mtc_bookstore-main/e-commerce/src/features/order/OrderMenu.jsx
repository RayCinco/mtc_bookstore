import { useState, useEffect, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import { useCart } from "../cart/cartHooks/useCart";
import { useUser } from "../auth/authHooks/useUser";
import Spinner from "../../components/Spinner";
import OrderSummary from "./orderComponents/OrderSummary";
import OrderForm from "./orderComponents/OrderForm";
import Empty from "../../components/Empty";
import { getMaxDate } from "../../utils/helpers";
import { getMinDate } from "../../utils/helpers";
import { useCreateOrder } from "./orderHooks/useCreateOrder";
import OrderConfirmation from "./orderComponents/OrderConfirmation";

function OrderMenu() {
  const navigate = useNavigate();
  const { isLoadingCart, cart } = useCart();
  const { user } = useUser();
  const { createOrder, isCreating } = useCreateOrder();
  const { user: currentUser, isLoadingUser } = useUser();

  // Use cart items as the order items
  const orderItems = Array.isArray(cart) ? cart : [];

  // Form state
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Calculate totals
  const total_amount = orderItems.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 0);
  }, 0);

  // Validation rules
  function validateField(name, value) {
    switch (name) {
      case "pickupDate":
        if (!value) return "Please select a pickup date";
        const selectedDate = new Date(value);
        const minDate = new Date(getMinDate());
        const maxDate = new Date(getMaxDate());
        if (selectedDate < minDate || selectedDate > maxDate) {
          return "Please select a date within the next 30 days";
        }
        return "";

      case "pickupTime":
        if (!value) return "Please select a pickup time";
        return "";

      default:
        return "";
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const newErrors = {};
    const requiredFields = ["pickupDate", "pickupTime"];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate user is logged in
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Prepare order data
    const orderData = {
      user_id: user.id,
      full_name: user.name,
      student_id: user.student_id || "000000",
      email: user.email,
      phone: user.phone || "",
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      special_instructions: formData.specialInstructions || "",
      status: "pending",
    };

    console.log("ORDER DATA:", orderData);
    console.log("USER:", user);
    // Create order (backend will fetch cart items and calculate total)
    createOrder(orderData, {
      onSuccess: (data) => {
        setSubmittedOrder(data.order);
      },
      onError: (error) => {
        console.error("Order creation failed:", error);
        alert("Failed to create order. Please try again.");
      },
    });
  }

  // Show spinner while cart loads or order is being created
  if (isLoadingCart || isCreating) return <Spinner />;

  // Success page after order creation
  if (submittedOrder) {
    return (
      <OrderConfirmation
        order={submittedOrder}
        formData={formData}
        total={total_amount}
      />
    );
  }

  if (orderItems.length === 0) return <Empty />;

  // Reservation Form
  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Order Your Items</span>
        </h2>
        <p className="text-muted">
          Complete the form below to schedule your pickup
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row px-xl-5">
          {/* Order Form */}
          <div className="col-lg-8 mb-5">
            <OrderForm
              formData={formData}
              onFormChange={handleInputChange}
              errors={errors}
              isSubmitting={isCreating}
            />
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <OrderSummary
              orderItems={orderItems}
              total={total_amount}
              isSubmitting={isCreating}
            />

            {/* Information Card */}
            <div className="card border-secondary">
              <div className="card-body">
                <h6 className="font-weight-semi-bold mb-3">
                  <i className="fa fa-question-circle mr-2"></i>
                  How it Works
                </h6>
                <ol className="pl-3 mb-0">
                  <li className="mb-2">
                    <small>Fill out the order form</small>
                  </li>
                  <li className="mb-2">
                    <small>Choose your preferred pickup date and time</small>
                  </li>
                  <li className="mb-0">
                    <small>
                      Pick up and pay at the cashier before picking up your
                      order
                    </small>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderMenu;
