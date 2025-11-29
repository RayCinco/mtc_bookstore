import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";
import { useState } from "react";
import ConfirmDelete from "../../components/ConfirmDelete";

import { useCustomers } from "./useCustomers";
import CustomerAdd from "./CustomerAdd";
import { useDeleteUser } from "../users/userHooks/useDeleteUser";
import { useUser } from "../auth/authHooks/useUser";
import { useImage } from "../../hooks/useImage";
function CustomerTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { isLoadingCustomers, customers } = useCustomers();
  const { deleteUser, isDeleting } = useDeleteUser();
  const { user, isLoading } = useUser();

  if (isLoadingCustomers || isLoading) {
    return <Spinner />;
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setEditUser(null); // Clear edit user when closing
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setUserToDelete(null);
      },
      onError: (err) => {
        alert(err?.message || "Failed to delete user");
      },
    });
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

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
          MANAGE CUSTOMERS
        </CardTitle>
        <div>
          <Button
            type="button"
            style={{
              width: "150px",
              background: "#376453",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
            }}
            onClick={toggleModal}
          >
            ADD CUSTOMERS
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal} centered>
            <ModalHeader toggle={toggleModal} style={{ color: "#376453" }}>
              {editUser ? "VIEW CUSTOMER" : "ADD NEW CUSTOMER"}
            </ModalHeader>
            <ModalBody>
              <CustomerAdd userToEdit={editUser} onCloseModal={toggleModal} />
            </ModalBody>
          </Modal>

          {/* Delete Confirmation Modal */}
          <ConfirmDelete
            isOpen={deleteModalOpen}
            toggle={cancelDelete}
            onConfirm={confirmDelete}
            itemName={userToDelete ? userToDelete.name : "this user"}
            itemDetails={
              userToDelete && (
                <>
                  <strong>{userToDelete.name}</strong>
                  <br />
                  <small>
                    Email: {userToDelete.email} | Role: {userToDelete.role}
                  </small>
                </>
              )
            }
          />
        </div>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Student ID</th>
              <th>Phone</th>
              {/* <th>Date Added</th> */}
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                isDeleting={isDeleting}
              />
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

function UserRow({ user, onEdit, onDelete, isDeleting }) {
  const { data: avatarUrl, isLoading: isLoadingImage } = useImage(user?.avatar);

  // Determine the image source
  const imageSrc = avatarUrl || "/assets/default-avatar.png";

  if (isLoadingImage) {
    return <Spinner size="sm" />;
  }
  return (
    <tr>
      <td style={{ width: 80 }}>
        <img
          src={imageSrc}
          alt={user.name}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            objectFit: "cover",
            opacity: isLoadingImage ? 0.5 : 1,
            transition: "opacity 0.3s",
          }}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.85em",
            fontWeight: "600",
            backgroundColor: user.is_active ? "#28a745" : "#dc3545",
            color: "#fff",
          }}
        >
          {user.is_active ? "ACTIVE" : "INACTIVE"}
        </span>
      </td>
      <td>{user.student_id}</td>
      <td>{user.phone}</td>
      <td className="text-right">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(user)}
          style={{ marginRight: "5px" }}
        >
          View
        </button>
        {user && user.role === "admin" && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(user)}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner size="sm" /> : "Delete"}
          </button>
        )}
      </td>
    </tr>
  );
}

export default CustomerTable;
