import { apiDelete, apiGet, apiPost } from "./laravelApis";
import { uploadImage, deleteImage } from "./apiImages";

export async function getProducts() {
  // Fetch all products from Laravel API
  return await apiGet("/products");
}

export async function getProduct(id) {
  // Fetch a single product by ID from Laravel API
  return await apiGet(`/products/${id}`);
}

export async function deleteProduct(id) {
  // Delete a single product by ID from Laravel API
  return await apiDelete(`/delete_product/${id}`);
}

export async function createUpdateProduct(productData) {
  let imagePath = productData.image;

  // Handle image upload if a File object is provided
  if (productData.imageFile && productData.imageFile instanceof File) {
    try {
      // If updating and there's an old image, delete it first
      if (productData.id && productData.oldImagePath) {
        try {
          await deleteImage(productData.oldImagePath);
        } catch (error) {
          console.warn("Failed to delete old image:", error);
          // Continue even if old image deletion fails
        }
      }

      // Upload the new image to 'products' folder
      const uploadResult = await uploadImage(productData.imageFile, "products");
      imagePath = uploadResult.path;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload product image");
    }
  }

  // Prepare product data for API (exclude File object and temporary fields)
  const { imageFile, oldImagePath, ...productPayload } = productData;
  productPayload.image = imagePath;

  // Create or update the product
  if (productData.id) {
    return await apiPost(
      `/create_update_product/${productData.id}`,
      productPayload
    );
  } else {
    return await apiPost(`/create_update_product`, productPayload);
  }
}
