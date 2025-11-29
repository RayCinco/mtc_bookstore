import React, { useState, useEffect } from "react";
import { Row, Col, Button, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { categories } from "../../utils/constants";
import { useCreateProduct } from "./productHooks/useCreateProduct";
import { useUpdateProduct } from "./productHooks/useUpdateProduct";
const ProductAdd = ({ productToEdit, onCloseModal }) => {
  const { id: editId, ...editValues } = productToEdit || {};
  const isEditSession = Boolean(editId);
  const { createProduct, isCreating } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();

  // Initialize sizes from edit data
  const [sizes, setSizes] = useState(() => {
    if (productToEdit?.sizes) {
      try {
        const parsedSizes =
          typeof productToEdit.sizes === "string"
            ? JSON.parse(productToEdit.sizes)
            : productToEdit.sizes;
        return { XS: 0, S: 0, M: 0, L: 0, XL: 0, ...parsedSizes };
      } catch {
        return { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
      }
    }
    return { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
  });

  const [quantity, setQuantity] = useState(productToEdit?.quantity || 0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const selectedCategory = watch("category");
  const hasSizes =
    selectedCategory === "Tytana Merchandise" ||
    selectedCategory === "School Uniform";

  useEffect(() => {
    // Reset sizes/quantity when category changes (only in create mode)
    if (!isEditSession) {
      if (hasSizes) {
        setQuantity(0);
      } else {
        setSizes({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });
      }
    }
  }, [selectedCategory, hasSizes, isEditSession]);

  const isWorking = isCreating || isUpdating;

  function handleSizeChange(size, value) {
    setSizes((prev) => ({
      ...prev,
      [size]: parseInt(value) || 0,
    }));
  }

  function onSubmit(data) {
    // Extract the image file from the FileList
    const imageFile = data.image?.[0] || null;

    const productData = {
      ...data,
      imageFile: imageFile, // Pass the File object
      image: productToEdit?.image || "", // Keep existing image path for updates
      oldImagePath: productToEdit?.image || null, // Track old image for deletion
      sizes: hasSizes ? JSON.stringify(sizes) : JSON.stringify({}),
      quantity: hasSizes
        ? Object.values(sizes).reduce((sum, qty) => sum + qty, 0)
        : quantity,
      rating: data.rating || "5.0",
      original_price: data.original_price || null,
    };

    if (isEditSession) {
      updateProduct(
        { ...productData, id: editId },
        {
          onSuccess: () => {
            console.log("Product updated successfully");
            reset();
            setSizes({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });
            setQuantity(0);
            if (onCloseModal) onCloseModal();
          },
          onError: (error) => {
            console.error("Error updating product:", error);
          },
        }
      );
    } else {
      createProduct(productData, {
        onSuccess: () => {
          console.log("Product created successfully");
          reset();
          setSizes({ XS: 0, S: 0, M: 0, L: 0, XL: 0 });
          setQuantity(0);
          if (onCloseModal) onCloseModal();
        },
        onError: (error) => {
          console.error("Error creating product:", error);
        },
      });
    }
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <Row>
          <Col md={12}>
            <FormGroup>
              <input
                type="text"
                placeholder="Product Name"
                disabled={isWorking}
                className="form-control"
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors.name && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.name.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Category */}
        <Row>
          <Col md={12}>
            <FormGroup>
              <select
                disabled={isWorking}
                className="form-control"
                {...register("category", {
                  required: "This field is required",
                })}
              >
                <option value="">Select Product Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.category.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Price */}
        <Row>
          <Col md={12}>
            <FormGroup>
              <input
                type="number"
                step="0.01"
                placeholder="Product Price"
                disabled={isWorking}
                className="form-control"
                {...register("price", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Price should be at least 1",
                  },
                })}
              />
              {errors.price && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.price.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Image Upload */}
        <Row>
          <Col md={12}>
            <FormGroup>
              <label style={{ fontWeight: "600", marginBottom: "5px" }}>
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                disabled={isWorking}
                className="form-control"
                {...register("image", {
                  required: isEditSession ? false : "This field is required",
                })}
              />
              {isEditSession && productToEdit?.image && (
                <small
                  style={{ color: "#666", marginTop: "5px", display: "block" }}
                >
                  Current: {productToEdit.image.split("/").pop()}
                </small>
              )}
              {errors.image && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.image.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Description */}
        <Row>
          <Col md={12}>
            <FormGroup>
              <textarea
                placeholder="Product Description"
                disabled={isWorking}
                className="form-control"
                rows="3"
                {...register("description")}
              />
            </FormGroup>
          </Col>
        </Row>

        {/* Sizes or Quantity based on Category */}
        {selectedCategory && (
          <Row>
            <Col md={12}>
              {hasSizes ? (
                <FormGroup>
                  <label style={{ fontWeight: "bold", marginBottom: "10px" }}>
                    Sizes and Quantities:
                  </label>
                  <Row>
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <Col
                        xs={4}
                        md={2}
                        key={size}
                        style={{ marginBottom: "10px" }}
                      >
                        <label
                          style={{ fontSize: "0.85em", fontWeight: "600" }}
                        >
                          {size}
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={sizes[size]}
                          onChange={(e) =>
                            handleSizeChange(size, e.target.value)
                          }
                          disabled={isWorking}
                          placeholder="0"
                        />
                      </Col>
                    ))}
                  </Row>
                  <small style={{ color: "#666" }}>
                    Total Quantity:{" "}
                    {Object.values(sizes).reduce((sum, qty) => sum + qty, 0)}
                  </small>
                </FormGroup>
              ) : (
                <FormGroup>
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    disabled={isWorking}
                    placeholder="Enter quantity"
                  />
                </FormGroup>
              )}
            </Col>
          </Row>
        )}

        {/* Buttons */}
        <Row className="mt-3">
          <Col xs={6}>
            <Button
              type="button"
              style={{
                width: "100%",
                background: "#4a4744",
                border: "none",
                color: "#fff",
                fontWeight: "600",
              }}
              onClick={() => {
                reset();
                if (onCloseModal) onCloseModal();
              }}
            >
              CANCEL
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              type="submit"
              style={{
                width: "100%",
                background: "#376453",
                border: "none",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              {isEditSession ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default ProductAdd;
