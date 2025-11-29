import { laravelApiUrl } from "./laravelApis";

/**
 * Upload an image to Laravel storage
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder name (e.g., 'products', 'users', 'avatars')
 * @returns {Promise<Object>} - Returns {path, url, filename}
 */
export async function uploadImage(file, folder = "images") {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const response = await fetch(`${laravelApiUrl}/upload_image`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Upload failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

/**
 * Delete an image from Laravel storage
 * @param {string} path - The storage path of the image
 * @returns {Promise<Object>}
 */
export async function deleteImage(path) {
  try {
    const response = await fetch(`${laravelApiUrl}/delete_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Delete failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Image delete error:", error);
    throw error;
  }
}

/**
 * Get the public URL for an image
 * @param {string} path - The storage path of the image
 * @returns {Promise<string>} - The public URL
 */
export async function getImageUrl(path) {
  // If path is falsy, return null quickly
  if (!path) return null;

  // If the path is already a full URL, return it directly
  if (
    typeof path === "string" &&
    (path.startsWith("http://") || path.startsWith("https://"))
  ) {
    return path;
  }

  // Construct a public URL pointing to Laravel's `public/storage/{path}`
  // Assumes you have run `php artisan storage:link` so files are available at
  // <laravelBaseUrl>/storage/<path>
  try {
    const base = laravelApiUrl.replace(/\/api\/?$/, "");
    const cleaned = String(path).replace(/^\/+/, "");
    return `${base}/storage/${cleaned}`;
  } catch (error) {
    console.error("Get image URL error:", error);
    throw error;
  }
}
