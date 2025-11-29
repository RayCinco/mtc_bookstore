import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import React, { useState } from "react";
import OrderForm from "./OrderForm";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useOrders } from "./orderHooks/useOrders";
import { useDeleteOrder } from "./orderHooks/useDeleteOrder";
import { useUser } from "../auth/authHooks/useUser";
function OrderTable() {
  const { isLoadingOrders, orders } = useOrders();
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const [modalOpen, setModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const { user, isLoading } = useUser();
  if (isLoadingOrders || isLoading) {
    return <Spinner />;
  }

  console.log(orders);
  function toggleModal() {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setEditOrder(null);
    }
  }

  function handleEdit(order) {
    setEditOrder(order);
    setModalOpen(true);
  }

  function handleDeleteClick(order) {
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  }

  function confirmDelete() {
    if (orderToDelete) {
      deleteOrder(orderToDelete.id, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setOrderToDelete(null);
        },
        onError: (error) => {
          console.error("Error deleting order:", error);
          setDeleteModalOpen(false);
          setOrderToDelete(null);
        },
      });
    }
  }

  function cancelDelete() {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  }

  return (
    <Card>
      <CardHeader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardTitle tag="h4" style={{ marginBottom: 0 }}>
          MANAGE ORDERS
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Student ID</th>
              <th>Pickup Date</th>
              <th>Pickup Time</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.full_name}</td>
                <td>{order.student_id}</td>
                <td>{order.pickup_date}</td>
                <td>{order.pickup_time}</td>
                <td>₱{order.total_amount}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.85em",
                      fontWeight: "600",
                      backgroundColor:
                        order.status === "pending"
                          ? "#ffc107"
                          : order.status === "completed"
                          ? "#28a745"
                          : order.status === "cancelled"
                          ? "#dc3545"
                          : "#6c757d",
                      color: "#fff",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td>{order.created_at}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleEdit(order)}
                  >
                    View
                  </button>

                  {user && user.role === "admin" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(order)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>

      {/* Edit Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
        <ModalHeader
          toggle={toggleModal}
          style={{ color: "#376453", borderBottom: "2px solid #376453" }}
        >
          EDIT ORDER
        </ModalHeader>
        <ModalBody style={{ padding: "20px" }}>
          <OrderForm orderToEdit={editOrder} onClose={toggleModal} />
        </ModalBody>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmDelete
        isOpen={deleteModalOpen}
        toggle={cancelDelete}
        onConfirm={confirmDelete}
        itemName={orderToDelete ? orderToDelete.full_name : "this order"}
        itemDetails={
          orderToDelete && (
            <>
              <strong>{orderToDelete.full_name}</strong>
              <br />
              <small>
                Order Number: {orderToDelete.order_number} | Status:{" "}
                {orderToDelete.status}
              </small>
            </>
          )
        }
      />
    </Card>
  );
}

export default OrderTable;
