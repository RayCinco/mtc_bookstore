import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

function ConfirmDelete({
  isOpen,
  toggle,
  onConfirm,
  itemName,
  itemDetails,
  title = "CONFIRM DELETE",
}) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} style={{ color: "#dc3545" }}>
        {title}
      </ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete{" "}
          {itemName ? <b>{itemName}</b> : "this item"}?
        </p>
        {itemDetails && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            {itemDetails}
          </div>
        )}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button
            style={{
              flex: 1,
              background: "#4a4744",
              border: "none",
              color: "#fff",
              fontWeight: "600",
            }}
            onClick={toggle}
          >
            CANCEL
          </Button>
          <Button
            style={{
              flex: 1,
              background: "#dc3545",
              border: "none",
              color: "#fff",
              fontWeight: "600",
            }}
            onClick={onConfirm}
          >
            DELETE
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ConfirmDelete;
