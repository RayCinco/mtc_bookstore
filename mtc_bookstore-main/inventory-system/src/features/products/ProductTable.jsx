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
import ProductAdd from "./ProductAdd";
import React, { useState } from "react";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useProducts } from "./productHooks/useProducts";
import { useDeleteProduct } from "./productHooks/useDeleteProduct";
import { parseSizesDisplay } from "../../utils/helpers";
import { getTotalQuantityFromSizes } from "../../utils/helpers";
import { toast } from "react-hot-toast";
function ProductTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { isLoading, products } = useProducts();
  const { removeProduct, isDeleting } = useDeleteProduct();

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    if (modalOpen) {
      setEditProduct(null); // Clear edit product when closing
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      removeProduct(productToDelete.id, {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          setDeleteModalOpen(false);
          setProductToDelete(null);
        },
        onError: (error) => {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product. Please try again.");
        },
      });
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  if (isLoading) {
    return <Spinner />;
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
          MANAGE PRODUCTS
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
            ADD PRODUCT
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
            <ModalHeader
              toggle={toggleModal}
              style={{ color: "#376453", borderBottom: "2px solid #376453" }}
            >
              {editProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
            </ModalHeader>
            <ModalBody style={{ padding: "20px" }}>
              <ProductAdd
                productToEdit={editProduct}
                onCloseModal={toggleModal}
              />
            </ModalBody>
          </Modal>

          {/* Delete Confirmation Modal */}
          <ConfirmDelete
            isOpen={deleteModalOpen}
            toggle={cancelDelete}
            onConfirm={confirmDelete}
            itemName={productToDelete ? productToDelete.name : "this product"}
            itemDetails={
              productToDelete && (
                <>
                  <strong>{productToDelete.name}</strong>
                  <br />
                  <small>Category: {productToDelete.category}</small>
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
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Original Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Date Added</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.original_price || "-"}</td>
                <td>
                  {product.quantity
                    ? product.quantity
                    : getTotalQuantityFromSizes(product.sizes)}
                </td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
                <td>{product.created_at}</td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(product)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default ProductTable;
