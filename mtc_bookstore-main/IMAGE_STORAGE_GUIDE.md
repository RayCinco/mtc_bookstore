# Image Storage Setup Complete! ✅

## Backend Setup

### 1. Storage Configuration

- ✅ `.env` updated with `FILESYSTEM_DISK=public`
- ✅ Symbolic link already exists: `public/storage` → `storage/app/public`
- ✅ `ImageController.php` created with upload, delete, and getUrl methods
- ✅ API routes added to `routes/api.php`

### 2. Available API Endpoints

#### Upload Image

```
POST http://localhost:8000/api/upload_image
Content-Type: multipart/form-data

Body:
- image: [FILE] (required) - Max 5MB, formats: jpeg, png, jpg, gif, webp
- folder: [STRING] (optional) - Default: 'images'

Response:
{
  "message": "Image uploaded successfully",
  "path": "images/1234567890_abcdef1234.jpg",
  "url": "/storage/images/1234567890_abcdef1234.jpg",
  "filename": "1234567890_abcdef1234.jpg"
}
```

#### Delete Image

```
POST http://localhost:8000/api/delete_image
Content-Type: application/json

Body:
{
  "path": "images/1234567890_abcdef1234.jpg"
}

Response:
{
  "message": "Image deleted successfully"
}
```

#### Get Image URL

```
GET http://localhost:8000/api/image_url?path=images/1234567890_abcdef1234.jpg

Response:
{
  "url": "/storage/images/1234567890_abcdef1234.jpg"
}
```

---

## Frontend Usage

### Files Created

- ✅ `inventory-system/src/services/apiImages.js`
- ✅ `e-commerce/src/services/apiImages.js`

### React Component Example

```jsx
import { useState } from "react";
import { uploadImage, deleteImage } from "../services/apiImages";
import toast from "react-hot-toast";

function ImageUploadExample() {
  const [imageUrl, setImageUrl] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      // Upload to 'products' folder (can be: 'products', 'avatars', 'banners', etc.)
      const result = await uploadImage(file, "products");

      setImageUrl(`http://localhost:8000${result.url}`);
      setImagePath(result.path);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteImage(imagePath);
      setImageUrl("");
      setImagePath("");
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to delete image");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <p>Uploading...</p>}

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
          <button onClick={handleDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageUploadExample;
```

### Using with React Hook Form

```jsx
import { useForm } from "react-hook-form";
import { uploadImage } from "../services/apiImages";

function ProductForm() {
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (data) => {
    let productImagePath = "";

    // Upload image if selected
    if (data.image && data.image[0]) {
      const result = await uploadImage(data.image[0], "products");
      productImagePath = result.path;
      setImageUrl(`http://localhost:8000${result.url}`);
    }

    // Save product with image path
    const productData = {
      name: data.name,
      price: data.price,
      image: productImagePath, // Store the path in database
    };

    // Submit to your product API...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Product Name" />
      <input {...register("price")} type="number" placeholder="Price" />
      <input {...register("image")} type="file" accept="image/*" />

      {imageUrl && <img src={imageUrl} alt="Preview" />}

      <button type="submit">Save Product</button>
    </form>
  );
}
```

---

## Storage Structure

```
backend/
├── storage/
│   └── app/
│       └── public/           ← Images stored here
│           ├── images/       ← Default folder
│           ├── products/     ← Product images
│           ├── avatars/      ← User avatars
│           └── banners/      ← Banner images
│
└── public/
    └── storage/              ← Symbolic link (public access)
        ├── images/
        ├── products/
        ├── avatars/
        └── banners/
```

---

## Important Notes

1. **Image Access URL**: Images are accessible at:

   ```
   http://localhost:8000/storage/{folder}/{filename}
   ```

2. **Maximum File Size**: 5MB (configured in ImageController)

3. **Allowed Formats**: jpeg, png, jpg, gif, webp

4. **Folder Organization**: Use descriptive folder names:

   - `products` - Product images
   - `avatars` - User profile pictures
   - `banners` - Banner/hero images
   - `categories` - Category images

5. **Database Storage**: Store the `path` field in your database (e.g., `products/123456_abc.jpg`), then construct the full URL when needed:

   ```javascript
   const fullUrl = `http://localhost:8000/storage/${product.image}`;
   ```

6. **Delete Old Images**: When updating a product/user image, remember to delete the old image first:
   ```javascript
   if (oldImagePath) {
     await deleteImage(oldImagePath);
   }
   const newImage = await uploadImage(file, "products");
   ```

---

## Testing with Postman

### Upload Test

1. Method: POST
2. URL: `http://localhost:8000/api/upload_image`
3. Body → form-data:
   - Key: `image` | Type: File | Value: [Select an image]
   - Key: `folder` | Type: Text | Value: `products`

### Delete Test

1. Method: POST
2. URL: `http://localhost:8000/api/delete_image`
3. Body → raw → JSON:
   ```json
   {
     "path": "products/1234567890_abcdef1234.jpg"
   }
   ```

---

## Troubleshooting

**Images not accessible?**

- Run: `php artisan storage:link` in backend directory
- Check that `storage/app/public` folder exists
- Verify `FILESYSTEM_DISK=public` in `.env`

**Upload fails?**

- Check file size (max 5MB)
- Verify file format (jpeg, png, jpg, gif, webp only)
- Ensure `storage/app/public` has write permissions

**Images not displaying?**

- Verify the URL includes `/storage/` prefix
- Check browser console for CORS errors
- Ensure Laravel backend is running on port 8000
