// ...existing code...

import React, { useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Spinner,
  Card,
  CardBody,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useOrder } from "./orderHooks/useOrder";
import { useUpdateOrderDetails } from "./orderHooks/useUpdateOrderDetails";

export const statusOptions = [
  "pending",
  "confirmed",
  "ready",
  "completed",
  "cancelled",
];

const OrderForm = ({ orderToEdit = {}, onClose }) => {
  const { id: editId } = orderToEdit || {};
  const isEditSession = Boolean(editId);
  const { order: orderData, isLoadingOrder } = useOrder(editId);
  const { updateOrderDetails, isUpdating } = useUpdateOrderDetails();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (orderData?.order) {
      // Format pickup_date for input type="date"
      let pickupDate = orderData.order.pickup_date;
      if (pickupDate && pickupDate.includes("/")) {
        // If date is in dd/mm/yyyy format, convert to yyyy-mm-dd
        const [day, month, year] = pickupDate.split("/");
        pickupDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
      }
      setValue("pickup_date", pickupDate);
      setValue("pickup_time", orderData.order.pickup_time);
      setValue("status", orderData.order.status);
    }
  }, [orderData, setValue]);

  const onSubmit = (data) => {
    if (isEditSession && orderData?.order?.id) {
      const updateData = {
        status: data.status,
        pickup_date: data.pickup_date,
        pickup_time: data.pickup_time,
      };

      updateOrderDetails(
        { id: orderData.order.id, data: updateData },
        {
          onSuccess: () => {
            onClose?.();
          },
        }
      );
    }
  };

  if (isLoadingOrder) return <Spinner />;
  console.log("ORDER", orderData);
  const order = orderData?.order;
  const items = orderData?.items || [];

  return (
    <div style={{ maxWidth: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Order Information Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h5
            style={{
              fontWeight: "700",
              color: "#376453",
              marginBottom: "15px",
              fontSize: "1.1em",
            }}
          >
            Order Information
          </h5>
          <Row className="mb-2">
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Order Number:{" "}
                </span>
                <span style={{ color: "#333" }}>
                  {order?.order_number || "N/A"}
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Order Date:{" "}
                </span>
                <span style={{ color: "#333" }}>
                  {order?.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Total Amount:{" "}
                </span>
                <span
                  style={{
                    color: "#376453",
                    fontWeight: "700",
                    fontSize: "1.1em",
                  }}
                >
                  ₱{order?.total_amount || "0.00"}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Customer Information Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h5
            style={{
              fontWeight: "700",
              color: "#376453",
              marginBottom: "15px",
              fontSize: "1.1em",
            }}
          >
            Customer Information
          </h5>
          <Row className="mb-2">
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Full Name:{" "}
                </span>
                <span style={{ color: "#333" }}>
                  {order?.full_name || "N/A"}
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Student ID:{" "}
                </span>
                <span style={{ color: "#333" }}>
                  {order?.student_id || "N/A"}
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Email:{" "}
                </span>
                <span style={{ color: "#333" }}>{order?.email || "N/A"}</span>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "600", color: "#555" }}>
                  Phone:{" "}
                </span>
                <span style={{ color: "#333" }}>{order?.phone || "N/A"}</span>
              </div>
            </Col>
          </Row>
          {order?.special_instructions && (
            <Row className="mt-2">
              <Col md={12}>
                <div>
                  <span style={{ fontWeight: "600", color: "#555" }}>
                    Special Instructions:{" "}
                  </span>
                  <p
                    style={{
                      marginTop: "8px",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    {order.special_instructions}
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </div>

        {/* Order Items Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h5
            style={{
              fontWeight: "700",
              color: "#376453",
              marginBottom: "15px",
              fontSize: "1.1em",
            }}
          >
            Order Items
          </h5>
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                marginBottom: index < items.length - 1 ? "15px" : "0",
                paddingBottom: index < items.length - 1 ? "15px" : "0",
                borderBottom:
                  index < items.length - 1 ? "1px solid #d0d0d0" : "none",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ flex: "1 1 200px", position: "relative" }}>
                  <strong style={{ fontSize: "1em", color: "#333" }}>
                    {item.name}
                  </strong>
                  {item.is_reservation === 1 && (
                    <span
                      style={{
                        background: "#ffc107",
                        color: "#333",
                        fontWeight: "700",
                        borderRadius: "12px",
                        padding: "2px 10px",
                        fontSize: "0.85em",
                        marginLeft: "10px",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    >
                      Reserved
                    </span>
                  )}
                  <div
                    style={{
                      marginTop: "3px",
                      color: "#666",
                      fontSize: "0.85em",
                    }}
                  >
                    Category: {item.category}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ textAlign: "center", minWidth: "60px" }}>
                    <div
                      style={{
                        fontSize: "0.8em",
                        color: "#777",
                        fontWeight: "600",
                      }}
                    >
                      Qty
                    </div>
                    <div
                      style={{
                        fontSize: "1em",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {item.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: "60px" }}>
                    <div
                      style={{
                        fontSize: "0.8em",
                        color: "#777",
                        fontWeight: "600",
                      }}
                    >
                      Size
                    </div>
                    <div
                      style={{
                        fontSize: "1em",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {item.selected_size || "N/A"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: "80px" }}>
                    <div
                      style={{
                        fontSize: "0.8em",
                        color: "#777",
                        fontWeight: "600",
                      }}
                    >
                      Subtotal
                    </div>
                    <div
                      style={{
                        fontSize: "1.05em",
                        fontWeight: "700",
                        color: "#376453",
                      }}
                    >
                      ₱{item.subtotal}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editable Fields Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "2px solid #376453",
          }}
        >
          <h5
            style={{
              fontWeight: "700",
              color: "#376453",
              marginBottom: "15px",
              fontSize: "1.1em",
            }}
          >
            Update Order Details
          </h5>

          {/* Pickup Date and Time */}
          <Row>
            <Col md={6}>
              <FormGroup>
                <label style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Pickup Date
                </label>
                <input
                  type="date"
                  disabled={isUpdating}
                  className="form-control"
                  {...register("pickup_date", {
                    required: "Pickup date is required",
                  })}
                />
                {errors.pickup_date && (
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.pickup_date.message}
                  </span>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Pickup Time
                </label>
                <select
                  disabled={isUpdating}
                  className="form-control"
                  {...register("pickup_time", {
                    required: "Pickup time is required",
                  })}
                >
                  <option value="">Select Pickup Time</option>
                  <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">
                    10:00 AM - 11:00 AM
                  </option>
                  <option value="11:00 AM - 12:00 PM">
                    11:00 AM - 12:00 PM
                  </option>
                  <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                  <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                </select>
                {errors.pickup_time && (
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.pickup_time.message}
                  </span>
                )}
              </FormGroup>
            </Col>
          </Row>

          {/* Status */}
          <Row>
            <Col md={12}>
              <FormGroup>
                <label style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Order Status
                </label>
                <select
                  disabled={isUpdating}
                  className="form-control"
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <span style={{ color: "red", fontSize: "0.9em" }}>
                    {errors.status.message}
                  </span>
                )}
              </FormGroup>
            </Col>
          </Row>
        </div>

        {/* Buttons */}
        <Row className="mt-3">
          <Col xs={6}>
            <Button
              type="button"
              disabled={isUpdating}
              style={{
                width: "100%",
                background: "#4a4744",
                border: "none",
                color: "#fff",
                fontWeight: "600",
                padding: "12px",
                fontSize: "0.95em",
              }}
              onClick={() => onClose?.()}
            >
              CANCEL
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              type="submit"
              disabled={isUpdating}
              style={{
                width: "100%",
                background: "#376453",
                border: "none",
                color: "#fff",
                fontWeight: "600",
                padding: "12px",
                fontSize: "0.95em",
              }}
            >
              {isUpdating ? <Spinner size="sm" /> : "UPDATE ORDER DETAILS"}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default OrderForm;
